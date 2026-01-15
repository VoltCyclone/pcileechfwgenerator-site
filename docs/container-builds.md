# Container Builds

## Overview

PCILeechFWGenerator uses a **3-stage host-container-host pipeline** where containers handle only the templating stage (Stage 2). The container does NOT access VFIO devices directly.

**Key Point**: The build stages are:

1. **Stage 1 (Host)**: Collect device data via VFIO on the host
2. **Stage 2 (Container or Local)**: Generate firmware artifacts from collected data
3. **Stage 3 (Host)**: Run Vivado synthesis on the host

The container only runs Stage 2 (templating) with `PCILEECH_HOST_CONTEXT_ONLY=1` set, which means it skips all VFIO/sysfs operations and uses the pre-collected device data.

## How It Works

### 3-Stage Build Pipeline

When you execute a build command:

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

The build system orchestrates:

1. **Stage 1 - Host Collection**: Binds device to VFIO, extracts config space, capabilities, BAR info
2. **Stage 2 - Container Templating**: Generates SystemVerilog, TCL scripts from collected data (no VFIO access)
3. **Stage 3 - Host Vivado**: Runs synthesis on the host (if Vivado is configured)

### Container Does NOT Access VFIO

The container is passed environment variables that signal it to skip VFIO operations:

- `PCILEECH_HOST_CONTEXT_ONLY=1` - Use pre-collected context files
- `DEVICE_CONTEXT_PATH=/app/output/device_context.json` - Path to collected data
- `MSIX_DATA_PATH=/app/output/msix_data.json` - Path to MSI-X data

The `entrypoint.sh` detects these flags and skips all VFIO/module operations:

```bash
# From entrypoint.sh
case "${PCILEECH_HOST_CONTEXT_ONLY:-0}" in
    1|true|TRUE|yes|on) SHOULD_SKIP_VFIO=1 ;;
esac
```

### Container Build Process

The Containerfile builds an image with:

- `voltcyclone-fpga` repository cloned during build (not as submodule)
- Patched VFIO constants for the container's kernel headers
- Python dependencies pre-installed

```dockerfile
# From Containerfile
RUN mkdir -p lib && \
    git clone --depth 1 https://github.com/VoltCyclone/voltcyclone-fpga.git lib/voltcyclone-fpga
```

## User Workflow

### Standard Build (Recommended)

```bash
# Full 3-stage build
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1

# With custom output directory
pcileech-sudo build \
  --bdf 0000:03:00.0 \
  --board pcileech_35t325_x1 \
  --datastore ~/pcileech-builds

# Using TUI (recommended for first-time users)
pcileech-sudo tui
```

### Container Mode Selection

You can explicitly choose container or local mode for Stage 2:

```bash
# Force container mode for Stage 2 templating
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --container-mode container

# Force local mode (no container)
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --container-mode local

# Or use --local shorthand
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --local
```

### Output Files

Generated firmware appears in your datastore:

```bash
pcileech_datastore/
├── device_context.json       # Stage 1: Collected device data
├── msix_data.json            # Stage 1: MSI-X capability data
└── output/
    ├── pcileech_top.sv       # Top-level SystemVerilog module
    ├── device_config.sv      # Device configuration module
    ├── config_space_init.hex # Configuration space initialization
    └── *.tcl                 # Vivado project/build scripts
```

## Benefits

### Clean Separation of Concerns

- **Stage 1**: Host handles all VFIO operations (requires kernel modules, hardware access)
- **Stage 2**: Container handles pure templating (isolated, reproducible)
- **Stage 3**: Host handles Vivado synthesis (requires local Xilinx tools)

### No VFIO in Container

The 3-stage design eliminates:

- VFIO permission issues inside containers
- Kernel module compatibility problems
- Device passthrough complexity
- SELinux/AppArmor policy conflicts

## Development Workflows

### Firmware Generation

If you're building firmware for your device:

```bash
# 1. Install (pip or from source)
pip install pcileechfwgenerator

# 2. Run build (3-stage pipeline)
sudo python3 -m pcileechfwgenerator.pcileech_main build --bdf 0000:03:00.0 --board pcileech_35t325_x1

# Output in ./pcileech_datastore/ directory
```

### Contributing to PCILeechFWGenerator

If you're developing PCILeechFWGenerator itself:

```bash
# Clone with submodules for local development
git clone --recurse-submodules https://github.com/voltcyclone/PCILeechFWGenerator.git
cd PCILeechFWGenerator

# Install in development mode
python3 -m venv .venv && source .venv/bin/activate
pip install -e .

# Run builds (uses 3-stage pipeline, preserves environment)
sudo -E python3 pcileech.py build --bdf X --board Y
```

**Note**: Submodules are only needed for local development/testing. The container build clones voltcyclone-fpga during the image build process.

## Troubleshooting

### Build System Can't Find Podman

**Symptom**: System says "Podman not available" but you have it installed.

**Check**:

```bash
# Verify Podman is working
podman version
podman ps
```

**Fix**: If Podman is not detected, use `--local` to force local build mode.

### Container Build Network Issues

**Symptom**: Build fails with "git clone failed" or network errors.

**Cause**: Container image build requires internet access to clone voltcyclone-fpga.

**Fix**: Ensure network access during container image build. Once the image is built, Stage 2 runs offline.

### Want Specific voltcyclone-fpga Version

**For Advanced Users**: Modify the Containerfile before building the image:

```dockerfile
# Clone specific tag
RUN git clone --depth 1 --branch v1.2.3 \
    https://github.com/VoltCyclone/voltcyclone-fpga.git lib/voltcyclone-fpga

# Or specific branch
RUN git clone --depth 1 --branch dev \
    https://github.com/VoltCyclone/voltcyclone-fpga.git lib/voltcyclone-fpga
```

### Offline/Air-Gapped Environments

If you need to use the tool in an environment without internet access:

1. **Pre-build the container image** on a machine with internet access
2. **Export the image**: `podman save pcileech-fwgen -o pcileech-fwgen.tar`
3. **Transfer** the .tar file to the air-gapped system
4. **Import the image**: `podman load -i pcileech-fwgen.tar`

After importing, the tool will use the cached container image for Stage 2 builds.

### Build Issues

For systems without internet access, use local mode:

```bash
# Force local build (no container)
sudo python3 pcileech.py build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --local
```

Or manually build the container image with voltcyclone-fpga pre-populated:

```bash
# On internet-connected machine
git clone https://github.com/VoltCyclone/voltcyclone-fpga.git

# Modify Containerfile to copy instead of clone:
# COPY voltcyclone-fpga ./lib/voltcyclone-fpga

# Build image
podman build -t pcileechfwgenerator:latest -f Containerfile .
```

## Technical Details

### How Container Mode Works

The build system (`src/cli/container.py`) uses the deprecated `run_build()` function only for legacy compatibility. The preferred flow is through `pcileech.py` which:

1. Runs `run_host_collect()` - Stage 1 on host
2. Runs `run_container_templating()` or `run_local_build()` - Stage 2
3. Runs `run_host_vivado()` - Stage 3 on host (if configured)

### Volume Mounts (Stage 2 Container)

When running Stage 2 in a container:

- Datastore: `./pcileech_datastore` → `/datastore`
- Environment: `PCILEECH_HOST_CONTEXT_ONLY=1` (skips VFIO)
- Environment: `DEVICE_CONTEXT_PATH=/datastore/device_context.json`
- Environment: `MSIX_DATA_PATH=/datastore/msix_data.json`
- User namespace: `--userns=keep-id` (Podman) or `--user $(id -u):$(id -g)` (Docker)

The container does NOT mount VFIO devices.

### User Namespace Mapping

To prevent permission issues with mounted volumes, the container runs with the same user ID as the host:

- **Podman**: Uses `--userns=keep-id` to preserve the user's UID/GID inside the container
- **Docker**: Uses `--user $(id -u):$(id -g)` to run as the current user

This ensures that files created inside the container have the correct ownership on the host, preventing "Permission denied" errors when writing to mounted volumes.

## See Also

- [Host-Container Pipeline](host-container-pipeline.md) - Detailed pipeline documentation
- [Development Setup](development.md) - Full development environment setup
- [Troubleshooting Guide](troubleshooting.md) - Common issues and solutions
- [Template Architecture](template-architecture.md) - How the firmware generation system works
