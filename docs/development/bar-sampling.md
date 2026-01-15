# BAR Data Collection - Direct Sampling from Donor Device

## Overview

PCILeechFWGenerator now includes **direct BAR sampling** as part of the default firmware generation flow. This feature captures actual reset values from the donor device's Base Address Registers (BARs) using safe, read-only access via Linux sysfs, providing more accurate and donor-specific firmware.

## Architecture

The BAR data collection system consists of three main components:

### 1. SysfsBarReader (`src/device_clone/sysfs_bar_reader.py`)

Low-level module for safe, read-only BAR access via `/sys/bus/pci/devices/<BDF>/resourceN`.

**Key Features:**
- Read-only mmap access to BAR memory regions
- Automatic memory decoding enablement
- Support for MMIO BAR sampling (skips I/O BARs)
- Safe permission error handling

**Example Usage:**
```python
from src.device_clone.sysfs_bar_reader import SysfsBarReader

reader = SysfsBarReader("0000:03:00.0")
bars = reader.list_bars()  # Get all present BARs

# Sample first 8KB of BAR0
data = reader.read_bar_bytes(0, offset=0, length=8192)

# Sample specific register offsets
samples = reader.sample_bar_registers(0, offsets=[0x0, 0x4, 0x8, 0xC])
```

### 2. Context Builder Integration (`src/device_clone/pcileech_context.py`)

BAR sampling is integrated into the default build flow via `_sample_bar_data_direct()`:

**Flow:**
1. Build analyzes BARs from config space
2. `_sample_bar_data_direct()` samples each MMIO BAR (first 8KB or full size)
3. Sampled data stored in build context (`bar_samples`)
4. Optional: MMIO tracing can run afterwards for behavioral modeling

**Fallback Behavior:**
- Requires root privileges (for mmap access)
- Falls back gracefully if device not found or permissions insufficient
- Does not fail build - continues with synthetic data generation

### 3. Content Generator Updates (`src/device_clone/bar_content_generator.py`)

BAR content generation now follows this priority:

1. **LEARNED models** (from MMIO tracing) - most accurate, captures dynamic behavior
2. **SAMPLED data** (direct BAR reads) - donor reset values
3. **SYNTHETIC data** (high-entropy heuristics) - fallback

**Example:**
```python
# Automatic selection in build flow
bar_contents = {}
for bar_idx, size in bar_sizes.items():
    if learned_model_available:
        content = generate_from_learned_model()  # Priority 1
    elif sampled_data_available:
        content = use_sampled_data_with_padding()  # Priority 2
    else:
        content = generate_synthetic()  # Priority 3
```

## Integration Points

### Default Flow

BAR sampling is **automatically enabled** when:
- Device BDF is provided to the build process
- Running on Linux with sysfs available (`/sys/bus/pci/devices`)
- Process has sufficient privileges (root or CAP_SYS_RAWIO)

### Build Context

Sampled data is stored in the context as:

```python
context = {
    "bar_contents": {  # Final BAR content for firmware
        0: b"\x00\x01...",  # BAR0 content
        2: b"\xff\xfe...",  # BAR2 content
    },
    "bar_samples": {  # Optional: raw sampled data
        0: b"\x00\x01...",  # First 8KB of BAR0
        2: b"\xff\xfe...",  # First 8KB of BAR2
    }
}
```

## Requirements

### System Requirements
- **Linux**: Uses sysfs (`/sys/bus/pci/devices/`)
- **Privileges**: Root or `CAP_SYS_RAWIO` for mmap access
- **Device**: Donor device must be present and accessible

### Python Requirements
- Standard library only (no additional dependencies)
- `mmap`, `os`, `struct` modules

## Testing

Comprehensive test suite at `tests/test_sysfs_bar_reader.py`:

```bash
# Run all BAR reader tests
python3 -m pytest tests/test_sysfs_bar_reader.py -v

# Run specific test
python3 -m pytest tests/test_sysfs_bar_reader.py::TestSysfsBarReader::test_read_bar_bytes_success -v
```

**Test Coverage:**
- BAR info parsing from sysfs resource file
- Memory decoding enablement
- MMIO BAR reading with mmap
- I/O BAR detection and skipping
- Permission error handling
- Invalid parameter validation

## Comparison with MMIO Tracing

| Feature | Direct Sampling | MMIO Tracing (eBPF) |
|---------|----------------|---------------------|
| **Speed** | Fast (< 1 second) | Slow (5+ seconds) |
| **Accuracy** | Reset values only | Dynamic behavior patterns |
| **Requirements** | Root + sysfs | Root + bpftrace |
| **Driver Impact** | None (read-only) | Optional rebind |
| **Use Case** | Baseline data | Advanced modeling |

## Troubleshooting

### Permission Denied

```
PermissionError: BAR read requires root privileges (for mmap)
```

**Solution:** Run with sudo or grant `CAP_SYS_RAWIO`:
```bash
sudo python3 -m pcileechfwgenerator.build ...
```

### Device Not Found

```
FileNotFoundError: Device 0000:03:00.0 not found in sysfs
```

**Solution:** Verify device BDF:
```bash
lspci -nn | grep -i "network\|ethernet\|gpu"
```

### I/O BAR Warning

```
Warning: BAR0 is I/O space (not MMIO); use port I/O instead
```

**Explanation:** I/O BARs use port I/O, not MMIO. Sampling skips these automatically.

## Best Practices

### 1. Use with MMIO Tracing

For best results, combine both methods:
```bash
python3 -m pcileechfwgenerator.build \
    --device-bdf 0000:03:00.0 \
    --enable-mmio-learning  # Combines sampling + tracing
```

### 2. Verify Sampled Data

Check build logs for confirmation:
```
[SYSFS_BAR] Sampled 8192 bytes from BAR0 (total size: 0x4000)
[BAR] BAR0: Used SAMPLED data (8192B of 16384B)
```

### 3. Cache Sampled Data

For repeated builds, sampled data is stored in context:
```python
# Save sampled data for reuse
import json
with open("device_context.json", "w") as f:
    json.dump(context, f)
```

## Future Enhancements

- **Register Mapping**: Auto-detect register offsets from sampled patterns
- **Multi-Device**: Parallel sampling of multiple donor devices
- **Differential Analysis**: Compare sampled vs. traced data
- **Smart Padding**: Use sampled patterns for high-entropy padding

## See Also

- [MMIO Tracing Documentation](./mmio-tracing.md)
- [BAR Content Generation](./bar-content-generation.md)
- [Context Builder Architecture](./context-builder.md)
