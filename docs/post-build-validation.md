# Post-Build Validation

## Overview

The post-build validation system ensures that generated firmware includes all critical PCI configuration space elements required for proper driver binding and device initialization in the target operating system.

## Why Validation Matters

When a device driver attempts to bind to a PCIe device, it performs several critical checks:

1. **Device Identification**: Matches vendor ID, device ID, subsystem IDs, and revision
2. **Capability Discovery**: Walks the capability list looking for required features (PM, MSI/MSI-X, PCIe)
3. **Resource Allocation**: Probes BARs to determine memory/IO requirements
4. **Class Code Verification**: Ensures the device matches expected class/subclass

If any of these elements are missing or malformed, the driver will fail to bind (often with Windows Device Manager Code 10 or Linux probe failure).

## Validation Checks

### 1. PCI Identification Fields

Validates presence and format of:

- **Vendor ID** (VID): 16-bit vendor identifier
- **Device ID** (DID): 16-bit device identifier  
- **Subsystem Vendor ID**: 16-bit subsystem vendor identifier
- **Subsystem Device ID**: 16-bit subsystem device identifier
- **Revision ID**: 8-bit revision
- **Class Code**: 24-bit class/subclass/programming interface

**Why it matters**: OS driver matching relies on exact PCI ID matches. Missing or invalid IDs prevent driver binding entirely.

### 2. Config Space Structure

Validates:

- **Size**: Must be 256 bytes (standard) or 4096 bytes (extended)
- **Header integrity**: Checks that VID/DID in raw config space match device info
- **No invalid markers**: Ensures IDs are not 0xFFFF (invalid device)

**Why it matters**: Malformed config space causes bus enumeration failures or system crashes during PCI scanning.

### 3. PCI Capabilities

Checks for presence and proper configuration of:

#### Power Management (Cap ID: 0x01)
- **Required**: Yes (for modern devices)
- **Driver expectation**: Used for D-state management and wake events
- **Failure mode**: Driver may fail to initialize power states

#### MSI / MSI-X (Cap ID: 0x05 / 0x11)
- **Required**: At least one for modern devices
- **Driver expectation**: Required for interrupt delivery
- **Failure mode**: Driver probe fails immediately ("No MSI/MSI-X support")

#### PCI Express (Cap ID: 0x10)
- **Required**: For PCIe devices
- **Driver expectation**: Used for link control, ASPM, and advanced features
- **Failure mode**: Driver may disable features or fail probe

### 4. Capability List Order

Validates:

- **Ascending offset order**: PCI spec requires capabilities in ascending address order
- **PM first** (recommended): Best practice puts PM as first capability
- **No circular references**: Detects infinite loops in capability chain

**Why it matters**: Some drivers have strict capability walking logic that fails on out-of-order capabilities.

### 5. BAR Configuration

Checks:

- **At least one valid BAR**: Devices need resources to function
- **Size validation**: BAR sizes must be non-zero
- **Type detection**: Validates I/O vs. MMIO, 32-bit vs. 64-bit, prefetchable flags

**Why it matters**: Drivers probe registers in BARs during initialization. Missing BARs = driver probe failure.

### 6. Class Code

Validates:

- **Non-zero**: Class code 0x000000 indicates "device before class code definitions" (invalid)
- **Matches device type**: Network cards should be 0x02xxxx, storage 0x01xxxx, etc.

**Why it matters**: OS uses class code for driver selection and generic driver binding.

## Validation Output

### Console Output

During build, validation runs automatically after file generation:

```
[BUILD] ➤ Running post-build validation …
[VALID] Running post-build validation checks
[VALID] Validation Report: 0 errors, 1 warnings, 15 info
[VALID] WARNINGS:
[VALID]   • Power Management not first capability (non-critical)
[VALID] All critical checks passed (15 checks)
```

### validation_report.json

Detailed JSON report saved to output directory:

```json
{
  "validation_passed": true,
  "total_checks": 16,
  "errors": 0,
  "warnings": 1,
  "results": [
    {
      "check": "pci_id_vendor_id",
      "valid": true,
      "severity": "info",
      "message": "PCI ID vendor_id present: 0x10ec",
      "details": {"value": "0x10ec"}
    },
    {
      "check": "interrupt_capability",
      "valid": true,
      "severity": "info",
      "message": "Interrupt capabilities present: MSI, MSI-X",
      "details": {"capabilities": ["MSI", "MSI-X"]}
    }
  ]
}
```

## Driver Compatibility Matrix

| Check | Severity | Windows Impact | Linux Impact |
|-------|----------|----------------|--------------|
| Missing VID/DID | **ERROR** | No device enumeration | No device enumeration |
| Missing Subsystem IDs | **ERROR** | Driver mismatch | Driver may not match |
| Invalid Class Code | **ERROR** | Wrong driver class | Wrong driver class |
| No MSI/MSI-X | **WARNING** | Driver probe fails | Driver probe fails |
| No Power Management | **WARNING** | May fail power ops | May fail suspend/resume |
| BAR misconfiguration | **ERROR** | Driver fails resource allocation | Driver fails probe |
| Out-of-order capabilities | **WARNING** | Some drivers fail | Rare driver issues |

## Common Validation Failures

### "Missing required PCI ID field"

**Cause**: Config space extraction failed or donor device data incomplete

**Fix**: 
1. Verify VFIO binding is correct
2. Check donor device accessibility
3. Run with `--donor-info-file` providing complete device info

### "No valid BARs configured"

**Cause**: Device has no MMIO regions or BAR parsing failed

**Fix**:
1. Check donor device BAR configuration with `lspci -vvv`
2. Verify device is not a bridge or special function
3. Ensure VFIO can read config space

### "No MSI or MSI-X capability found"

**Cause**: Capability processing removed interrupt capabilities

**Fix**:
1. Check capability processor logs for MSI/MSI-X handling
2. Verify donor device has these capabilities
3. Review pruning rules if using custom capability configuration

### "Config space header has invalid device IDs (0xFFFF)"

**Cause**: Config space read returned all 1s (device not accessible)

**Fix**:
1. Verify device is bound to VFIO-PCI
2. Check IOMMU group accessibility
3. Ensure no other driver claims the device

## Integration with Build Process

Validation runs automatically during every build:

```python
# In FirmwareBuilder.build()
generation_result = self._generate_firmware(donor_template)
self._write_modules(generation_result)
# ... other steps ...
self._run_post_build_validation(generation_result)  # ← Automatic
```

### Disabling Validation

Validation cannot be disabled - it's a critical safety check. However, warnings don't prevent build completion.

## Advanced: Extending Validation

To add custom validation checks, extend `PostBuildValidator`:

```python
from src.utils.post_build_validator import PostBuildValidator, ValidationResult

class CustomValidator(PostBuildValidator):
    def validate_custom_check(self, data):
        # Your custom validation logic
        if not meets_requirement(data):
            self.results.append(ValidationResult(
                is_valid=False,
                check_name="custom_requirement",
                message="Custom check failed",
                severity="error"
            ))
```

## See Also

- [PCI Configuration Space](./config-space-structure.md)
- [Capability Processing](./capability-processing.md)
- [BAR Configuration](./bar-configuration.md)
- [Driver Binding Troubleshooting](./driver-troubleshooting.md)
