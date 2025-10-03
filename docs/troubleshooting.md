# Troubleshooting Guide

This guide covers common issues and their solutions when using PCILeech Firmware Generator.

## Table of Contents

- [VFIO Setup Issues](#vfio-setup-issues)
- [Installation Issues](#installation-issues)
- [BAR Detection Issues](#bar-detection-issues)
- [VFIO Binding Problems](#vfio-binding-problems)
- [Build Failures](#build-failures)
- [Device-Specific Issues](#device-specific-issues)
- [SystemVerilog Generation Errors](#systemverilog-generation-errors)
- [Getting Help](#getting-help)

## VFIO Setup Issues

> **Warning:** Avoid using on-board devices (audio, graphics cards) for donor info. The VFIO process can lock the bus during extraction and cause system reboots.

The most common issues involve VFIO (Virtual Function I/O) configuration. Use the built-in diagnostic tool:

```bash
# Check VFIO setup and device compatibility
sudo pcileech check

# Check a specific device
sudo pcileech check --device 0000:03:00.0

# Interactive mode with guided fixes
sudo pcileech check --interactive

# Attempt automatic fixes
sudo pcileech check --fix

# When running from a developer checkout, prefer installing the console entrypoint or running `pcileech` from your checkout.
```

**2. VFIO modules not loaded**
```bash
sudo modprobe vfio vfio_pci vfio_iommu_type1
```

**3. Device not in IOMMU group**
```bash
# Check IOMMU groups
find /sys/kernel/iommu_groups/ -name '*' -type l | grep YOUR_DEVICE_BDF
```

**4. Permission issues**
```bash
# Add user to required groups
sudo usermod -a -G vfio $USER
sudo usermod -a -G dialout $USER  # For USB-JTAG access
```

**5. ACS (Access Control Services) errors**
```bash
# Devices sharing IOMMU groups - common on Ubuntu
# See diagnostic tool output for solutions
```

## Installation Issues

```bash
# If pip installation fails
pip install --upgrade pip setuptools wheel
pip install pcileechfwgenerator

# TUI (Linux only): install required UI packages
pip install textual rich psutil
```

## BAR Detection Issues

**Problem**: BARs not detected or incorrectly sized

**Solutions**:

1. Ensure device is properly bound to VFIO
1. Check that the device is not in use by another driver
1. Verify IOMMU group isolation
1. Regenerate after fixing binding and IOMMU issues

## VFIO Binding Problems

**Problem**: Cannot bind device to VFIO driver

**Solutions**:

1. **Check if device is in use**:

```bash
lspci -k -s 0000:03:00.0
# Should show vfio-pci as driver
```

1. **Unbind from current driver**:

```bash
echo "0000:03:00.0" | sudo tee /sys/bus/pci/devices/0000:03:00.0/driver/unbind
```

1. **Bind to VFIO**:

```bash
echo "1234 5678" | sudo tee /sys/bus/pci/drivers/vfio-pci/new_id
```

## Build Failures

**Problem**: SystemVerilog generation fails

**Common causes and solutions**:

1. **Template errors**: Check log output for specific template issues
2. **Missing device data**: Ensure VFIO extraction completed successfully
3. **BAR configuration conflicts**: Verify BAR sizes and types
4. **MSI-X table issues**: Check MSI-X capability detection

```bash
# Enable verbose logging
sudo pcileech build --bdf 0000:03:00.0 -v
```

## Device-Specific Issues

### Network Cards

- **Intel NICs**: May require special VFIO handling
- **Realtek cards**: Often work well as donors
- **Broadcom devices**: Check for firmware dependencies

### USB Controllers

- **XHCI controllers**: Complex capability structures
- **Legacy USB**: May have simpler BAR layouts
- **USB 3.0 hubs**: Good donor candidates

### Audio Cards

- **Sound Blaster**: Usually good donors
- **USB audio**: May have complex descriptors
- **Onboard audio**: Avoid - can cause system issues

## SystemVerilog Generation Errors

**Problem**: Generated SystemVerilog has syntax errors

**Solutions**:

1. Check device extraction completed without errors (see generation log)
2. Enable verbose logging to capture more detail (-v)
3. If you suspect a template issue, open an issue with logs; avoid editing templates unless you’re contributing

## Getting Help

If you're still experiencing issues:

1. **Check the documentation**: Browse all available guides
2. **Use diagnostic tools**: Run built-in checks and diagnostics
3. **Enable verbose logging**: Use `-v`
4. **Search existing issues**: Check GitHub issues for similar problems
5. **Create a detailed issue**: Include logs, system info, and device details

### Creating Effective Bug Reports

Include the following information:

- Operating system and kernel version
- Device PCI ID and BDF
- Complete error logs with `-v` enabled
- Output of diagnostic checks
- Steps to reproduce the issue

### Community Support

- See [Issue Reporting](issue-reporting.md) for what to include and how to share logs

Remember: This tool requires real hardware and proper VFIO setup. Most issues are related to VFIO configuration rather than the tool itself.
