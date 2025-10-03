
# Kernel Driver Metadata (Always-On Context Enrichment)

## Overview


The `kernel_driver` section is always present in the unified template context, populated with live kernel module details for the donor device. This enrichment is always enabled and expected by all templates and downstream tools.

## What It Provides

- Resolved kernel module name bound to (VID, DID)
- Normalized vendor/device identifiers used during resolution
- Optional (capped) list of driver source file paths (best‑effort)
- Truncation metadata: `sources_truncated` + `sources_limit`
- Soft‑failure semantics: enrichment silently skips on non‑Linux, missing IDs, or resolution errors (warnings logged)


## Source Discovery Flags

You may still control source file enumeration with these optional kwargs:

- `include_kernel_sources=True` (attempt source discovery)
- `kernel_source_limit=<int>` (default: 40)

Example (pseudocode):

```python
context = builder.create_complete_template_context(
    device_config=cfg,
    include_kernel_sources=True,
    kernel_source_limit=40,
)
```

## Behavior & Safety

- Never hardcodes VID/DID: uses existing context values.
- Imports enrichment lazily to avoid circular dependencies.
- Source enumeration is best‑effort; absence never aborts a build.
- Extraction/collection routines validate paths and log via `log_*_safe`.

## When To Use


All templates and downstream tooling must expect and handle the `kernel_driver` section. It is always present (may be empty or partial if enrichment fails or is not applicable).

## Template Access

After enabling, templates may safely reference (guard with existence checks):

```jinja
{{ kernel_driver.module }}
{{ kernel_driver.sources | length }}
```

## Related Docs

- [Device Cloning](device-cloning.md)
- [Template Architecture](template-architecture.md)
- [Firmware Uniqueness](firmware-uniqueness.md)

## Troubleshooting

| Scenario | Outcome |
|----------|---------|
| Non-Linux host | Section omitted |
| Missing vendor/device ID | Section omitted |
| Module resolution failure | Section omitted (warning logged) |
| Source discovery partial | `sources_truncated=True` set |


Minimal by design; extend only if new stable keys are added to `kernel_driver`.
