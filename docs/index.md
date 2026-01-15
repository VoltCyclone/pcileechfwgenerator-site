# PCILeech Firmware Generator

[![CI](https://github.com/voltcyclone/PCILeechFWGenerator/workflows/CI/badge.svg?branch=main)](https://github.com/voltcyclone/PCILeechFWGenerator/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ramseymcgrath/PCILeechFWGenerator/graph/badge.svg?token=JVX3C1WL86)](https://codecov.io/gh/ramseymcgrath/PCILeechFWGenerator)
[![Python Version](https://img.shields.io/badge/python-3.11%2B-blue)](https://github.com/voltcyclone/PCILeechFWGenerator)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE.txt)

Generate authentic PCIe DMA firmware from real donor hardware using a **3-stage host-container-host pipeline**. This tool extracts donor configurations via VFIO and generates unique PCILeech FPGA bitstreams.

!!! warning "Real Hardware Required"
    This tool requires a real donor PCIe device. Placeholder values are explicitly avoided - your firmware will be unique to your donor hardware.

## 🚀 Quick Start

```bash
# Create virtual environment (required on modern Linux)
python3 -m venv ~/.pcileech-venv
source ~/.pcileech-venv/bin/activate

# Install with TUI support
pip install pcileechfwgenerator[tui]

# Add alias for running with sudo (add to ~/.bashrc)
alias pcileech-sudo='sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main'

# Load VFIO modules
sudo modprobe vfio vfio-pci

# Launch interactive TUI
pcileech-sudo tui

# Or use CLI directly
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

For complete setup including IOMMU configuration, see the **[Installation Guide](installation.md)**.

## 🔄 3-Stage Build Pipeline

PCILeech uses a host → container → host pipeline:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Stage 1       │    │   Stage 2       │    │   Stage 3       │
│   HOST          │───▶│   CONTAINER     │───▶│   HOST          │
│                 │    │   (or local)    │    │                 │
│ VFIO Collection │    │ Templating      │    │ Vivado Synth    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
     Requires              No VFIO              Requires
     hardware              access               Vivado
```

1. **Stage 1 (Host)**: Collects PCIe device data via VFIO
2. **Stage 2 (Container or Local)**: Generates firmware from collected data
3. **Stage 3 (Host)**: Runs Vivado synthesis (optional)

The container does **NOT** access VFIO - it only performs templating. See [Host-Container Pipeline](host-container-pipeline.md) for details.

## ✨ Key Features

- **Donor Hardware Analysis**: Extract real PCIe configurations via VFIO
- **Full 4KB Config-Space Shadow**: Complete configuration space in BRAM
- **MSI-X Table Replication**: Exact interrupt table cloning
- **Dynamic Device Capabilities**: Automatic PCIe capability detection
- **Interactive TUI**: Guided workflow with real-time monitoring
- **Containerized Builds**: Isolated, reproducible Stage 2 templating

## 📋 Requirements

| Requirement | Details |
|-------------|---------|
| **OS** | Linux only (Ubuntu 22.04+ recommended) |
| **Python** | 3.11 or higher |
| **Hardware** | Any PCIe device as donor |
| **Optional** | Podman (container builds), Vivado (synthesis) |

## 📖 Documentation

### Getting Started
- **[Installation Guide](installation.md)** - Complete setup instructions
- **[Quick Start](quick-start.md)** - Generate your first firmware

### Build Process
- **[Host-Container Pipeline](host-container-pipeline.md)** - Understanding the 3-stage flow
- **[Container Builds](container-builds.md)** - Container configuration

### Technical Reference
- **[Config Space Shadow](config-space-shadow.md)** - PCIe config space emulation
- **[Template Architecture](template-architecture.md)** - Firmware generation system
- **[Dynamic Capabilities](dynamic-device-capabilities.md)** - PCIe capability handling

### Troubleshooting
- **[Troubleshooting Guide](troubleshooting.md)** - Common issues and solutions
- **[Device Cloning](device-cloning.md)** - Cloning workflow details

## 🎯 Use Cases

- **Security Research**: PCIe/DMA security testing
- **Education**: PCIe protocol learning, FPGA development
- **Development**: Driver development, hardware debugging

## 🛡️ Responsible Use

!!! warning "Legal Compliance"
    This tool is for legitimate security research, education, and development. Users must ensure compliance with all applicable laws. Only use on systems you own or have permission to test.

## 📄 License

MIT License - see [LICENSE](https://github.com/voltcyclone/PCILeechFWGenerator/blob/main/LICENSE.txt).

---

**Ready?** Start with the **[Installation Guide](installation.md)** →
