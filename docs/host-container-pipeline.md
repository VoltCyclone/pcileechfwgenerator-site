# Host → Container → Host Pipeline

This project uses a host-first build pipeline to ensure no VFIO access occurs inside the container. The container only parses staged data and generates artifacts.

## Stages

1) Host collect
- Reads PCIe config space from the donor device
- Parses MSI-X capability
- Writes a datastore with:
  - device_context.json (config_space_hex)
  - msix_data.json (config_space_hex + msix_info)

2) Container templating (or local fallback)
- Runs parsing and template generation against the staged datastore
- No device access in this stage
- Outputs SystemVerilog, TCL, and other artifacts into `output/`

3) Host Vivado
- Runs Vivado batch using generated artifacts

## Commands

### For Installed Package (Recommended)

- Stage 1 only (collect and exit):
```bash
pcileech-sudo build --bdf 0000:03:00.0 --board <BOARD> --host-collect-only
```

- Full pipeline (collect → container → Vivado):
```bash
pcileech-sudo build --bdf 0000:03:00.0 --board <BOARD>
```

- Local (no container):
```bash
pcileech-sudo build --bdf 0000:03:00.0 --board <BOARD> --local
```

### For Development from Repository

```bash
sudo python3 pcileech.py build --bdf 0000:03:00.0 --board <BOARD>
```

## Datastore

- Default directory: `pcileech_datastore/` (override with `--datastore`)
- Files:
  - device_context.json
  - msix_data.json
  - output/ (generated artifacts)

## Notes

- Container image tag: `pcileech-fwgen` (built from `Containerfile` if not present)
- No VFIO actions run inside the container; failures occur early if the datastore is missing or incomplete.
