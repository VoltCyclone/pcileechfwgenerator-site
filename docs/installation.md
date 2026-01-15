# Installation Guide

This is the **one definitive guide** for installing PCILeech Firmware Generator. Follow these steps in order.

## System Requirements

| Requirement | Details |
|-------------|---------|
| **Operating System** | Linux only (Ubuntu 22.04+ recommended) |
| **Python** | 3.11 or higher |
| **RAM** | 4GB minimum, 8GB recommended |
| **Disk** | 2GB free space |
| **Hardware** | Any PCIe device as donor (cheap NICs work great) |

## Step 1: Install the Package

### On Ubuntu 22.04+ / Debian 12+ / Modern Linux

Modern Linux distributions protect system Python. You **must** use a virtual environment:

```bash
# Create virtual environment
python3 -m venv ~/.pcileech-venv

# Activate it
source ~/.pcileech-venv/bin/activate

# Install with TUI support (recommended)
pip install pcileechfwgenerator[tui]

# Verify it works
pcileech version
```

!!! warning "Don't skip the virtual environment"
    Running `pip install pcileechfwgenerator` directly **will fail** on modern systems with an `externally-managed-environment` error. Always use a venv.

### Running with Root Access (Required for VFIO)

Since VFIO requires root, you must use the venv's Python directly with sudo:

```bash
# This is the correct way to run with sudo:
sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main tui

# Add this alias to your ~/.bashrc for convenience:
echo "alias pcileech-sudo='sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main'" >> ~/.bashrc
source ~/.bashrc

# Then you can simply run:
pcileech-sudo tui
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

## Step 2: Enable IOMMU

IOMMU must be enabled in your BIOS and kernel for VFIO to work.

### 2.1 Edit GRUB Configuration

```bash
sudo nano /etc/default/grub
```

Find the line starting with `GRUB_CMDLINE_LINUX` and add IOMMU parameters:

```bash
# For Intel CPUs:
GRUB_CMDLINE_LINUX="intel_iommu=on iommu=pt"

# For AMD CPUs:
GRUB_CMDLINE_LINUX="amd_iommu=on iommu=pt"
```

### 2.2 Update GRUB and Reboot

```bash
sudo update-grub
sudo reboot
```

### 2.3 Verify IOMMU is Active

After reboot:

```bash
dmesg | grep -i iommu
# Should show IOMMU enabled messages

cat /proc/cmdline
# Should include intel_iommu=on or amd_iommu=on
```

## Step 3: Load VFIO Modules

```bash
# Load modules now
sudo modprobe vfio vfio-pci

# Make them load on boot
echo "vfio" | sudo tee -a /etc/modules
echo "vfio-pci" | sudo tee -a /etc/modules
```

## Step 4: Verify Installation

Run the built-in diagnostics:

```bash
# Check overall system readiness
pcileech-sudo check

# Check a specific device (replace with your device's BDF)
pcileech-sudo check --device 0000:03:00.0 --interactive
```

## Step 5: First Build

You're ready to generate firmware!

```bash
# Launch the interactive TUI (recommended for first-time users)
pcileech-sudo tui

# Or use CLI directly
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

See the [Quick Start Guide](quick-start.md) for detailed usage instructions.

---

## Optional: Vivado for FPGA Synthesis

Vivado is only needed if you want to synthesize the generated firmware into a bitstream. The generator can produce all SystemVerilog and TCL files without Vivado.

### Install Vivado WebPACK (Free)

1. Download from [Xilinx Downloads](https://www.xilinx.com/support/download.html)
2. Choose "Vivado ML Edition" → WebPACK (free, no license required)
3. Run installer: `sudo ./xsetup`

### Configure Vivado Environment

Add to `~/.bashrc`:

```bash
source /opt/Xilinx/Vivado/2023.1/settings64.sh  # Adjust version
```

### Use Vivado with PCILeech

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 \
    --vivado-path /opt/Xilinx/Vivado/2023.1 \
    --vivado-jobs 4
```

---

## Optional: Container Mode (Podman)

Container mode provides isolated, reproducible builds for Stage 2 (templating). The container does NOT access VFIO - all hardware access happens on the host in Stage 1.

```bash
# Install Podman
sudo apt install podman

# Container is built automatically on first use
# No additional configuration needed
```

When you run a build, you'll be prompted to choose container or local mode. Set `PCILEECH_AUTO_CONTAINER=1` to auto-select container mode.

---

## Troubleshooting

### "externally-managed-environment" Error

You're trying to install without a virtual environment. Go back to Step 1 and create a venv.

### "ModuleNotFoundError: No module named 'textual'"

You installed without TUI support. Reinstall with:

```bash
source ~/.pcileech-venv/bin/activate
pip install pcileechfwgenerator[tui]
```

### "Permission denied" / "VFIO" Errors

Make sure you're running with sudo using the venv's Python:

```bash
sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main tui
```

### "IOMMU not available"

1. Check that IOMMU is enabled in your BIOS (often called "VT-d" for Intel or "AMD-Vi" for AMD)
2. Verify kernel parameters: `cat /proc/cmdline` should show `intel_iommu=on` or `amd_iommu=on`
3. Check dmesg: `dmesg | grep -i iommu`

### "Device not found" / "No VFIO group"

1. List your devices: `lspci -Dnn`
2. Check IOMMU groups: `find /sys/kernel/iommu_groups/ -type l`
3. Run interactive diagnostics: `pcileech-sudo check --device 0000:XX:XX.X --interactive`

### Locked IP Cores (Vivado)

If Vivado complains about locked IP cores during synthesis:

1. Make sure you have Vivado WebPACK or a valid license
2. The TCL scripts attempt to unlock IPs automatically
3. You may need to regenerate IP cores: `reset_target all [get_ips]` in Vivado

For detailed troubleshooting, see the [Troubleshooting Guide](troubleshooting.md).

---

## Alternative Installation Methods

### From Source (Development)

```bash
git clone --recurse-submodules https://github.com/voltcyclone/PCILeechFWGenerator.git
cd PCILeechFWGenerator
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[tui]"
```

### Using pipx

```bash
sudo apt install pipx
pipx ensurepath
pipx install 'pcileechfwgenerator[tui]'
sudo $(which pcileech) tui
```

---

## Next Steps

- **[Quick Start Guide](quick-start.md)** - Generate your first firmware
- **[Host-Container Pipeline](host-container-pipeline.md)** - Understand the 3-stage build process
- **[Troubleshooting](troubleshooting.md)** - Fix common issues
