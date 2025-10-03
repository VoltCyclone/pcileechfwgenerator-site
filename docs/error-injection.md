# Experimental HDL Error Injection Toggle

## Overview

Enables (at build time) optional HDL hooks for advanced error injection paths during hardware simulation / validation. This is controlled by the new CLI flag:

```text
--enable-error-injection
```

When supplied, the SystemVerilog configuration space template (`sv/pcileech_cfgspace.coe.j2`) embeds a short annotation comment inside the Advanced Error Reporting (AER) capability block noting that injection hooks are compiled in. No register layout or numeric field changes occur; only build‑time guarded HDL signals are enabled downstream.

## Rationale

Some validation flows require fault scenarios (e.g. crafted AER events) without patching generated HDL. The toggle exposes internally wired stubs in a controlled, donor‑bound manner without weakening uniqueness or introducing fallback IDs.

## Behavior Summary

- Flag default: disabled (safe path, no injection hooks generated).
- Activation requires `--enable-advanced-features` (implicitly set by regular advanced feature configuration that surfaces the AER capability) because the marker resides in that capability block.
- Output difference is limited to two template comments:
  - `; Optional Error Injection Control (implementation dependent)`
  - `; This build enables error injection hooks in HDL (not represented here).`
- No additional writable registers are added; runtime software cannot toggle this feature—it's compile-time only.

## Usage

Minimal example:

```bash
python3 -m pcileechfwgenerator.build --input donor.json --out build/ --enable-error-injection
```

Confirm in the generated `pcileech_cfgspace.coe`:

```text
; Optional Error Injection Control (implementation dependent)
; This build enables error injection hooks in HDL (not represented here).
```

If the lines are absent, the flag was not active or advanced features (AER) were not enabled for the donor context.

## Validation

Unit test `tests/test_coe_error_injection.py` asserts presence/absence of the annotation comment under strict template rendering with a minimal context. This guarantees the toggle only affects the intended template span.

## Safety & Constraints

- No hardcoded Vendor/Product IDs introduced; all donor uniqueness checks remain enforced.
- The feature fails safely: absence of the flag simply omits the comments and HDL stubs.
- Not intended for production deployment artifacts; use only in controlled validation workflows.

## Future Extensions (Potential)

- Parameterized selection of specific error classes to synthesize.
- Optional integration with a structured stimulus interface (e.g. AXI-lite CSR gated behind the same build-time guard) if governance criteria are met.

## See Also

- `template-architecture.md`
- `dynamic-device-capabilities.md`
- `no-fallback-policy.md`
- `firmware-uniqueness.md`
