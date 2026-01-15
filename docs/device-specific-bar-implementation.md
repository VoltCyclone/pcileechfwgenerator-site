# Device-Specific BAR Implementation

## Overview

The PCILeech firmware generator now includes **automatic generation** of device-specific BAR (Base Address Register) implementations based on learned register maps from donor devices. This feature provides authentic device behavior without manual reverse engineering.

### Key Features

- **Automatic Integration**: Generated firmware automatically uses device-specific implementations
- **Learn from Live Hardware**: MMIO tracing captures real register behavior
- **Byte-Perfect Accuracy**: Reset values, RW masks, and register widths match donor device
- **Zero Configuration**: Works out-of-the-box with container workflow
- **Fallback Support**: Gracefully falls back to generic implementation when needed

## Architecture

### Components

1. **Template**: `src/templates/sv/pcileech_bar_impl_device.sv.j2`
   - Jinja2 template for generating SystemVerilog BAR implementation module
   - Implements learned register map with proper read/write logic
   - Supports byte-enable operations and register-specific RW masks

2. **Generator Integration**: `src/templating/sv_overlay_generator.py`
   - Extended `SVOverlayGenerator._generate_bar_implementation()` method
   - Automatically generates BAR module when learned models are available
   - Outputs `pcileech_bar_impl_device.sv` alongside `.coe` overlay files

3. **Context Builder**: `src/device_clone/pcileech_context.py`
   - Extended `_build_bar_config()` to store learned BAR models
   - Serializes models for template compatibility
   - Integrates with container flow for prefilled BAR models

### Data Flow

```
Donor Device
    ↓
MMIO Tracer (captures register accesses)
    ↓
BAR Model Synthesizer (learns register behavior)
    ↓
PCILeech Context Builder (serializes models)
    ↓
Template Renderer (generates SystemVerilog)
    ↓
pcileech_bar_impl_device.sv (device-specific module)
```

## Generated Module Interface

The generated module implements the standard PCILeech BAR interface:

```systemverilog
module pcileech_bar_impl_device #(
    parameter BAR_SIZE = <learned_size>
)(
    input               rst,
    input               clk,
    
    // BAR read/write interface
    input [31:0]        wr_addr,
    input [31:0]        wr_data,
    input [3:0]         wr_be,
    input               wr_valid,
    
    input [87:0]        rd_req_ctx,
    input [31:0]        rd_req_addr,
    input               rd_req_valid,
    
    output reg [87:0]   rd_rsp_ctx,
    output reg [31:0]   rd_rsp_data,
    output reg          rd_rsp_valid,
    
    // Optional interrupt control
    output reg          interrupt_assert,
    output reg [7:0]    interrupt_data
);
```

## Features

### Learned Register Map

- **Dynamic Register Definitions**: Registers are defined based on actual donor device behavior
- **Accurate Reset Values**: Each register initialized to its learned reset value
- **Byte-Enable Support**: Proper byte-enable handling for DWORD/WORD/BYTE writes
- **RW Mask Enforcement**: Read-only bits protected via learned write masks

### Example Register Definition

For a register at offset `0x1000` with:
- Width: 4 bytes (DWORD)
- Reset value: `0xABCD1234`
- RW mask: `0xFFFF0000` (upper 16 bits writable)

Generated code:
```systemverilog
reg [31:0] reg_0x1000;  // Offset 0x1000

// Reset logic
always @(posedge clk) begin
    if (rst) begin
        reg_0x1000 <= 32'hABCD1234;
    end
end

// Write logic (simplified)
32'h00001000: begin
    if (wr_be[0]) reg_0x1000[7:0]   <= (reg_0x1000[7:0]   & ~8'h00) | (wr_data[7:0]   & 8'h00);
    if (wr_be[1]) reg_0x1000[15:8]  <= (reg_0x1000[15:8]  & ~8'h00) | (wr_data[15:8]  & 8'h00);
    if (wr_be[2]) reg_0x1000[23:16] <= (reg_0x1000[23:16] & ~8'hFF) | (wr_data[23:16] & 8'hFF);
    if (wr_be[3]) reg_0x1000[31:24] <= (reg_0x1000[31:24] & ~8'hFF) | (wr_data[31:24] & 8'hFF);
end

// Read logic
32'h00001000: begin
    rd_data_d1 <= reg_0x1000;
end
```

## Integration

### Automatic Integration

The firmware generator now **automatically** integrates the device-specific BAR implementation. When BAR models are available, the generator creates:

1. **`pcileech_bar_impl_device.sv`** - Device-specific BAR implementation module
2. **`pcileech_tlps128_bar_controller.sv`** - Templated BAR controller that uses the device implementation

The templated BAR controller automatically selects the correct implementation:

```systemverilog
{% if bar_config and bar_config.bar_models %}
    // Uses learned device-specific implementation
    pcileech_bar_impl_device #(
        .BAR_SIZE       ( <learned_size> )
    ) i_bar0(
        .rst            ( rst                           ),
        .clk            ( clk                           ),
        .wr_addr        ( wr_addr                       ),
        ...
    );
{% else %}
    // Falls back to generic implementation
    pcileech_bar_impl_zerowrite4k i_bar0(
        .rst            ( rst                           ),
        .clk            ( clk                           ),
        .wr_addr        ( wr_addr                       ),
        ...
    );
{% endif %}
```

**No manual intervention required!** The generated firmware automatically uses the device-specific implementation when available.

### Manual Integration (Advanced)

For custom builds or when using upstream `pcileech-fpga` directly:

In `pcileech_tlps128_bar_controller.sv`, replace the default BAR module:

**Before:**
```systemverilog
pcileech_bar_impl_zerowrite4k i_bar0(
    .rst            ( rst                           ),
    .clk            ( clk                           ),
    .wr_addr        ( wr_addr                       ),
    ...
);
```

**After:**
```systemverilog
pcileech_bar_impl_device #(
    .BAR_SIZE       ( <learned_size>                )
) i_bar0(
    .rst            ( rst                           ),
    .clk            ( clk                           ),
    .wr_addr        ( wr_addr                       ),
    ...
);
```

### Container Flow Integration

When using the container workflow:

1. Host device collector captures MMIO traces via `mmio_tracer.py`
2. BAR models are synthesized via `bar_model_synthesizer.py`
3. Models are serialized into `device_context.json`
4. Builder loads models from `DEVICE_CONTEXT_PATH` environment variable
5. Template renderer generates `pcileech_bar_impl_device.sv` automatically

## Fallback Behavior

If no learned BAR models are available:

1. **Option 1**: Module uses fallback BRAM-based storage (compatible mode)
2. **Option 2**: Generation is skipped (use existing `pcileech_bar_impl_zerowrite4k`)

## Customization

### Adding Device-Specific Logic

For devices with special interrupt behavior, customize the interrupt section:

```systemverilog
// Interrupt Logic (placeholder - customize per device requirements)
always @(posedge clk) begin
    if (rst) begin
        interrupt_assert <= 1'b0;
        interrupt_data <= 8'h00;
    end
    else begin
        // TODO: Implement device-specific interrupt triggers
        // Example: Assert on specific register write
        if (wr_valid && wr_addr[31:0] == 32'h00001004) begin
            interrupt_assert <= 1'b1;
            interrupt_data <= wr_data[7:0];
        end
    end
end
```

## Testing

### Validation Checklist

- [ ] Generated module compiles in Vivado
- [ ] Register read/write behavior matches donor device
- [ ] Byte-enable operations work correctly
- [ ] Reset values match donor device
- [ ] Read-only registers cannot be written
- [ ] Interrupt logic (if applicable) functions correctly

### Simulation

Test the generated module with:
```bash
# Generate firmware with learned models
python3 -m pcileechfwgenerator.build \
    --input donor_device.json \
    --enable-mmio-learning \
    --out output/

# Verify generated BAR implementation
grep -A 10 "module pcileech_bar_impl_device" output/src/pcileech_bar_impl_device.sv
```

## Troubleshooting

### No BAR Implementation Generated

**Symptom**: `pcileech_bar_impl_device.sv` not in output

**Causes**:
1. MMIO learning disabled (`--enable-mmio-learning` not set)
2. No BAR models captured (insufficient permissions or device incompatibility)
3. Container flow not used (models not prefilled)

**Solution**:
```bash
# Enable MMIO learning explicitly
python3 -m pcileechfwgenerator.build \
    --input donor.json \
    --enable-mmio-learning \
    --force-recapture \
    --out output/
```

### Synthesis Errors

**Symptom**: Vivado reports syntax errors in generated module

**Causes**:
1. Malformed BAR model data
2. Template rendering issue
3. Invalid register offsets

**Solution**:
1. Validate BAR model JSON structure
2. Re-capture MMIO traces with `--force-recapture`
3. Check logs for template rendering errors

## See Also

- [BAR Model Loader](../src/device_clone/bar_model_loader.py) - Model data structures
- [MMIO Tracer](../src/device_clone/mmio_tracer.py) - Capture mechanism
- [BAR Model Synthesizer](../src/device_clone/bar_model_synthesizer.py) - Learning algorithm
- [SystemVerilog Templates](../src/templates/sv/) - Template directory
