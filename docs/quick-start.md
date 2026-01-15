# Quick Start Guide

Get up and running with PCILeech Firmware Generator in just a few minutes! This guide assumes you have already completed the [installation](installation.md).

## 🎯 Overview

This tutorial will walk you through:

1. Checking system requirements
2. Generating your first firmware
3. Understanding the 3-stage pipeline
4. Reviewing the output
5. Optional: Flashing to an FPGA

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ PCILeech Firmware Generator installed in a virtual environment
- ✅ The `pcileech-sudo` alias configured (see [Installation](installation.md))
- ✅ Linux operating system with VFIO modules loaded
- ✅ At least one PCIe device available
- ✅ (Optional) Podman for containerized builds
- ✅ (Optional) Xilinx Vivado for synthesis

## Step 1: Check System Configuration

First, let's verify your system is ready:

```bash
# Check VFIO configuration for a specific device
pcileech-sudo check --device 0000:01:00.0

# Interactive mode with auto-fix suggestions
pcileech-sudo check --device 0000:01:00.0 --interactive --fix
```

!!! tip "Finding Your Device"
    Use `lspci -Dnn` to list all PCIe devices with their BDF (Bus:Device.Function) addresses.

## Step 2: Choose Your Method

### Option A: Interactive TUI (Recommended for First-Time Users)

```bash
# Launch the interactive TUI
pcileech-sudo tui
```

The TUI will guide you through:
- Device selection and VFIO binding
- Board configuration selection
- Build options
- Real-time progress monitoring

### Option B: CLI Interface (Scripted Builds)

```bash
# Full 3-stage build pipeline
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1
```

## Step 3: Understanding the 3-Stage Pipeline

PCILeech uses a **host → container → host** pipeline for building firmware:

### Stage 1: Host Collection (VFIO Operations)

```bash
# Run only Stage 1 to collect device data
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --host-collect-only
```

This stage:
- Reads PCIe configuration space from the donor device via VFIO
- Extracts MSI-X capability information
- Captures BAR layout and device capabilities
- Writes data to the datastore (`pcileech_datastore/` by default)

### Stage 2: Template Generation (Container or Local)

The second stage generates firmware artifacts from the collected data:

```bash
# Container mode (default if Podman/Docker available)
# Automatically builds the container image if not present
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --container-mode container

# Local mode (faster, direct execution)
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --container-mode local
```

!!! info "Container Mode Selection"
    After Stage 1 completes, you'll be prompted to choose container or local mode for Stage 2 (templating). The container does NOT access VFIO - it only generates firmware from the pre-collected device data. Set `PCILEECH_AUTO_CONTAINER=1` to auto-select container mode.

### Stage 3: Vivado Synthesis (Host)

```bash
# Full pipeline including Vivado synthesis
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 \
    --vivado-path /tools/Xilinx/2025.1/Vivado \
    --vivado-jobs 8
```

## Step 4: Understanding the Output

After generation, you'll find artifacts in the datastore:

```
pcileech_datastore/
├── device_context.json       # Stage 1: Collected device data
├── msix_data.json            # Stage 1: MSI-X capability data
└── output/
    ├── pcileech_top.sv       # Top-level SystemVerilog module
    ├── device_config.sv      # Device configuration module
    ├── config_space_init.hex # Configuration space initialization
    ├── *.tcl                 # Vivado project/build scripts
    └── ...
```

### Key Files Explained

- **`device_context.json`**: Complete device analysis from Stage 1
- **`msix_data.json`**: MSI-X table and interrupt configuration
- **`pcileech_top.sv`**: The main FPGA design file
- **`device_config.sv`**: Device-specific configuration module
- **`config_space_init.hex`**: Device configuration data for BRAM initialization

## Step 5: Verify Generation Success

Check that generation completed successfully:

```bash
# Verify datastore contents
ls -la pcileech_datastore/
ls -la pcileech_datastore/output/

# Check the device context
cat pcileech_datastore/device_context.json | head -50

# Review any build logs
cat pcileech_datastore/output/*.log 2>/dev/null || echo "No logs found"
```

## Step 6: Build FPGA Bitstream (Optional)

If you have Xilinx Vivado installed, the full pipeline includes synthesis:

```bash
# Full build with Vivado synthesis
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 \
    --vivado-path /opt/Xilinx/Vivado/2023.1 \
    --vivado-jobs 4 \
    --vivado-timeout 3600

# Or navigate to output and run manually
cd pcileech_datastore/output/
vivado -mode batch -source vivado_project.tcl
```

## Step 7: Flash to FPGA (Optional)

If you have a compatible FPGA board and usbloader installed:

```bash
# Flash the generated bitstream (after Vivado synthesis completes)
pcileech-sudo flash pcileech_datastore/output/*.bit --board pcileech_35t325_x1
```

!!! note "Bitstream Generation"
    The `.bit` file is only created after Vivado synthesis completes (Stage 3). If you only ran host collection or templating, you'll need to run the full pipeline first.

## 🎛️ Interactive TUI Mode

For beginners, the TUI provides a user-friendly interface:

```bash
# Launch TUI
pcileech-sudo tui
```

The TUI will guide you through:

1. **System Check**: Validates VFIO configuration and permissions
2. **Device Selection**: Browse and select from available PCIe devices
3. **Board Configuration**: Choose your target FPGA board
4. **Build Options**: Configure advanced settings
5. **Progress Monitoring**: Real-time build progress
6. **Result Review**: Summary of generated files and next steps

## 🔧 Common Use Cases

### Network Card Cloning

```bash
# Clone Intel 10G network card
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1

# With custom datastore location
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --datastore ./my_nic_build
```

### NVMe Storage Controller

```bash
# Clone Samsung NVMe controller
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x4
```

### Host Collection Only (No Build)

```bash
# Just collect device data for later use
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --host-collect-only

# Later, build from collected data
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --datastore pcileech_datastore
```

### Local Build (No Container)

```bash
# Force local execution instead of container
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --container-mode local

# Or use --local shorthand
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --local
```

### Generate Donor Template

```bash
# Create a donor info template pre-filled with device data
pcileech-sudo donor-template --bdf 0000:01:00.0 --save-to my_device.json

# Validate an existing template
pcileech-sudo donor-template --validate my_device.json
```

## 🐛 Troubleshooting Quick Fixes

### "VFIO modules not loaded"

```bash
# Load VFIO modules
sudo modprobe vfio vfio-pci

# Run diagnostics
pcileech-sudo check
```

### "Root privileges required"

```bash
# PCILeech requires sudo for hardware access
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1
```

### "Device not found"

```bash
# List available devices
lspci -Dnn

# Check VFIO binding
ls /sys/bus/pci/drivers/vfio-pci/

# Run interactive diagnostics
pcileech-sudo check --device 0000:01:00.0 --interactive
```

### "Vivado not found"

```bash
# Source Vivado environment
source /opt/Xilinx/Vivado/*/settings64.sh

# Or specify path manually
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 \
    --vivado-path /opt/Xilinx/Vivado/2023.1
```

### "Container build failed"

```bash
# Check container runtime
which podman || which docker

# Build container manually
podman build -t pcileech-fwgen -f Containerfile .

# Use local mode instead
pcileech-sudo build --bdf 0000:01:00.0 --board pcileech_35t325_x1 --local
```

## ✨ Tips for Success

### 1. Choose the Right Donor Device
- Simple devices (network cards) are easier than complex ones (GPUs)
- Ensure the device has standard PCIe capabilities
- Inexpensive NICs work great as donors

### 2. Match PCIe Lane Count
- Use appropriate board for your use case
- Check the board capabilities in the TUI

### 3. Use the Datastore
- The datastore persists between runs
- Use `--host-collect-only` to separate data collection from building
- Useful for iterating on builds without re-probing hardware

### 4. Container Mode Benefits
- Isolated, reproducible builds
- No dependency conflicts
- Recommended for production use

## 🎓 Next Steps

Now that you've generated your first firmware:

1. **[Host-Container Pipeline](host-container-pipeline.md)**: Deep dive into the build flow
2. **[Device Cloning Guide](device-cloning.md)**: Advanced device extraction techniques
3. **[Template Architecture](template-architecture.md)**: Understand how generation works
4. **[TUI Guide](tui-readme.md)**: Complete TUI interface documentation
5. **[Troubleshooting](troubleshooting.md)**: Fix common issues

## 📚 Additional Resources

- **[Configuration Space Documentation](config-space-shadow.md)**: Deep dive into PCIe config space handling
- **[Supported Devices](supported-devices.md)**: Full list of tested devices
- **[Development Guide](development.md)**: Contributing to the project

---

**Questions?** Check our [Troubleshooting Guide](troubleshooting.md) or run `pcileech-sudo check --interactive` for diagnostics!
