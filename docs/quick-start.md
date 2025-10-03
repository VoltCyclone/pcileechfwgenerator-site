# Quick Start Guide

Get up and running with PCILeech Firmware Generator in minutes. This guide assumes you've completed the [installation](installation.md).

## 🎯 Overview

This tutorial covers:

1. Finding a donor device (BDF)
2. Generating your first firmware
3. Understanding the output
4. Optional: Flashing to an FPGA

Before starting, ensure you have:

- PCILeech Firmware Generator installed
- At least one PCIe device bound to VFIO
- Root access (sudo) and membership in the `vfio` group
- (Optional) Xilinx Vivado for synthesis

## Step 1: Find a donor device (BDF)

Use lspci to discover PCIe devices and their BDFs:

```bash
# List PCIe devices with numeric IDs (BDFs)
lspci -Dnn

# Example output (note the BDF at the start of each line):
# 0000:01:00.0  Ethernet controller [0200]: Intel Corporation 82599ES [8086:10fb]
# 0000:02:00.0  VGA compatible controller [0300]: NVIDIA Corporation TU106 [10de:1f06]
# 0000:03:00.0  Non-Volatile memory controller [0108]: Samsung NVMe [144d:a808]
```

Pick a BDF (e.g., `0000:01:00.0`). If nothing appears, check your VFIO setup (see [Installation](installation.md#vfio-setup)).

## Step 2: Choose your target board

Supported board names are defined in the project. Common identifiers:

- `pcileech_100t484_x1` — Artix-7 100T, 484 BGA, PCIe x1
- `pcileech_35t325_x4` — Artix-7 35T, 325 BGA, PCIe x4
- `pcileech_75t484_x1` — Artix-7 75T, 484 BGA, PCIe x1

Tip: Run the interactive picker (TUI, Linux only) or consult `src/device_clone/board_config.py`.

## Step 3: Generate your first firmware

Use the CLI with a BDF and board name. Root privileges are required for hardware access.

```bash
sudo pcileech build --bdf 0000:01:00.0 --board pcileech_100t484_x1
```

### With interactive TUI (Linux only)

```bash
sudo pcileech tui
```

From a developer checkout, install the console entrypoint (`pip install -e .`) to use the `pcileech` command. Containers are optional and not required for VFIO workflows.

### Container notes (FYI only)

- You don't need to manually build or run a container for VFIO generation.
- CI may build a local image; treat it as an internal detail.
- Kernel-linked helpers must be built against the host kernel (see `src/donor_dump/Makefile`).

### Advanced options

```bash
# Enable advanced SystemVerilog features and manufacturing variance
sudo pcileech build --bdf 0000:01:00.0 --board pcileech_100t484_x1 --advanced-sv --enable-variance

# Generate a donor-info JSON template alongside build artifacts
sudo pcileech build --bdf 0000:01:00.0 --board pcileech_100t484_x1 --generate-donor-template donor_info.json
```

Note: Older flags like `--device-id`, `--vendor-id`, or `--unique` are not supported directly. Use donor templates and the build configuration. See [Firmware Uniqueness](firmware-uniqueness.md).

## Step 4: Understand the output

After generation you'll find a build directory. Typical artifacts include:

```text
my_first_firmware/
├── pcileech_top.sv           # Top-level SystemVerilog module
├── <board>_bar_*.sv         # Board-specific controllers
├── config_space_init.hex     # Configuration space initialization
├── vivado_project.tcl        # Vivado project / synthesis script
├── device_info.json          # Extracted device information (donor info)
└── logs/
  ├── generation.log        # Detailed generation log
  └── vfio_extraction.log   # VFIO extraction details
```

## Step 5: Verify generation success

```bash
# Verify output files
ls -la my_first_firmware/

# Check generation log for any issues
grep -i error my_first_firmware/logs/generation.log || echo "No errors found"

# Validate SystemVerilog / run synthesis with Vivado (optional)
cd my_first_firmware/
vivado -mode batch -source vivado_project.tcl
```

## Step 6: Build FPGA bitstream (optional)

```bash
cd my_first_firmware/
vivado -mode batch -source vivado_project.tcl

# Bitstream typically appears under:
# project.runs/impl_1/pcileech_top.bit
```

## Step 7: Flash to FPGA (optional)

```bash
sudo pcileech flash my_first_firmware/pcileech_top.bin --board pcileech_100t484_x1
```

## Custom donor templates

Generate and use a donor template:

```bash
sudo pcileech donor-template --save-to my_device.json --bdf 0000:01:00.0

# Edit my_device.json as needed, then:
sudo pcileech build --bdf 0000:01:00.0 --board pcileech_100t484_x1 --donor-template my_device.json
```

## ✨ Tips for success

1. Choose simple donors first (NICs are easier than GPUs).
2. Match PCIe lane count to your use case.
3. Always review generation logs and `device_info.json`.
4. Enforce uniqueness: don't hardcode IDs. See [Firmware Uniqueness](firmware-uniqueness.md).

## 🎓 Next steps

- [Device Cloning](device-cloning.md)
- [Template Architecture](template-architecture.md)
- [Development Guide](development.md)
- [Troubleshooting](troubleshooting.md)

---

Questions? See [Troubleshooting](troubleshooting.md) or [Issue Reporting](issue-reporting.md).
