# End-to-End Build Walkthrough

This is a complete annotated build, run twice — once on `pcileech_35t325_x1` (free Vivado Standard, smaller FPGA) and once on `pcileech_75t484_x1` (still free, more headroom). Each stage shows the exact command, the real output to expect on success, and the most likely thing that breaks if it doesn't go as shown.

The two boards differ only in three places, called out inline as **35t** vs **75t**. Everything else applies to both.

## Before you start

You should already have:

- A Linux host with VT-d / AMD-Vi enabled in BIOS and IOMMU enabled in the kernel (`intel_iommu=on` or `amd_iommu=on` in your GRUB cmdline; reboot once after editing).
- A donor PCIe card (see [Donor Card Guide](donor-cards-guide.md)). For this walkthrough we'll use a generic Realtek RTL8111 NIC at BDF `0000:03:00.0`.
- The physical PCILeech board flashed/programmable. We'll worry about flashing in the last step.
- Vivado 2024.2 or 2025.1 Standard edition installed (see [Vivado Setup](vivado-setup.md)).
- Podman or Docker (for Stage 2 container mode — optional but recommended).

## 0. Install PCILeechFWGenerator

```bash
python3 -m venv ~/.pcileech-venv
source ~/.pcileech-venv/bin/activate
pip install pcileechfwgenerator[tui]

# Convenience alias for running VFIO ops as root with the venv's Python
echo "alias pcileech-sudo='sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main'" >> ~/.bashrc
source ~/.bashrc

# Load VFIO modules
sudo modprobe vfio vfio-pci

# Verify install
pcileech version
```

You should see a version string like:

```
pcileechfwgenerator 0.x.y
```

If `pip install` fails with `error: externally-managed-environment`, you skipped the venv step. Go back and create the venv.

## 1. Pre-flight: `check`

The `check` subcommand is a dry run that validates everything except the synthesis step. Always run it on a new donor / new host before a build.

```bash
pcileech-sudo check --device 0000:03:00.0 --interactive --fix
```

Expected output (truncated to the interesting lines):

```
[PCILeech] Checking VFIO requirements...
  ✓ vfio module loaded
  ✓ vfio_pci module loaded
  ✓ /dev/vfio/vfio readable

[PCILeech] Checking device 0000:03:00.0...
  ✓ Device exists in sysfs
  ✓ IOMMU group: 14
  ✓ IOMMU group contains only one device
  ✓ Vendor: 0x10ec  Device: 0x8168  Class: 020000 (Ethernet)
  ✓ Capabilities chain walked (cap pointers: 0x40, 0x50, 0x70, 0xb0)
  ✓ MSI-X table size: 4

Donor looks good. Ready to build.
```

If anything is missing, `--interactive --fix` walks you through it: unbinding the kernel driver, binding `vfio-pci`, suggesting `modprobe`, etc. Re-run after each fix until you get all green.

Common stoppers at this stage:

- **`IOMMU group contains <N> devices`** — your donor shares an IOMMU group with something else. You can't bind one without the other going offline. Pick a different PCIe slot or a different donor.
- **`Driver bound: rtl8169`** (or similar) — `--fix` will offer to unbind it and bind `vfio-pci`. Say yes.
- **`Vendor/Device: 0xffff:0xffff`** — donor is not properly enumerated. Reseat the card.

## 2. Stage 1: Collect device data

This is the only stage that touches real hardware. It runs entirely on the host.

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --host-collect-only
```

For **75t** the only difference is the board name:

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_75t484_x1 --host-collect-only
```

You should see something like:

```
[PCILeech] Stage 1: Collecting device data on host (VFIO operations enabled)
[PCILeech] Binding 0000:03:00.0 to vfio-pci...
[PCILeech] Reading 4 KiB configuration space shadow...
[PCILeech] Walking PCIe capability list...
  - PM @ 0x40
  - MSI-X @ 0x50  (table size: 4, BIR: 0, offset: 0x0)
  - PCIe @ 0x70
  - AER @ 0xb0
[PCILeech] Reading BAR layouts...
  - BAR0: 64-bit memory, 4 KiB, prefetchable=no
  - BAR1: (high half of BAR0)
  - BAR2: I/O, 256 B
[PCILeech] Capturing MSI-X table contents...
[PCILeech] MMIO learning: 240 reads captured over 5.0s
[PCILeech] Host collect complete → pcileech_datastore/device_context.json
```

The output you actually care about is in `pcileech_datastore/`:

```
pcileech_datastore/
├── device_context.json     # Stage 1 result — committable, hardware-independent now
└── msix_data.json          # MSI-X table copy
```

Once you have these two files you can disconnect the donor, give the host back to its day job, and do all subsequent stages without touching the donor again.

### What if Stage 1 fails?

- `"Root privileges required for hardware operations."` — you forgot `pcileech-sudo` (or `sudo`).
- `"VFIO modules not loaded. Run: sudo modprobe vfio vfio-pci"` — run that.
- `"Invalid BDF format: <bdf>. Expected format: XXXX:XX:XX.X (e.g., 0000:03:00.0)"` — your BDF is missing the domain prefix or has wrong punctuation.
- Host hard freezes — you almost certainly picked an onboard device. Reboot, pick a different donor, never look back.

## 3. Stage 2: Generate firmware templates

This stage takes the JSON from Stage 1 and produces SystemVerilog / hex / TCL outputs. It does NOT need VFIO and does NOT need root. You can run it in a container (recommended for reproducibility) or directly on the host.

### Stage 2 in a container (recommended)

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --container-mode container
```

(or `--board pcileech_75t484_x1` for 75t)

The first time you run this the build will pull / build the `pcileech-fwgen` image. Expect a few minutes for the initial build:

```
[PCILeech] Stage 2: Template generation from collected device data
[PCILeech] Container image 'pcileech-fwgen' not found; building from Containerfile...
[PCILeech] Building image (this can take a few minutes the first time)...
   ... podman build output ...
[PCILeech] Image built.
[PCILeech] Using container mode with podman (VFIO not needed - using host data)
[PCILeech] Executing in container using podman
   ... template generation output ...
[PCILeech] Generated pcileech_top.sv
[PCILeech] Generated device_config.sv
[PCILeech] Generated config_space_init.hex
[PCILeech] Generated vivado_generate_project.tcl
[PCILeech] Generated vivado_build.tcl
[PCILeech] Stage 2 complete → pcileech_datastore/output/
```

### Stage 2 locally (no container)

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 --container-mode local
```

Output is identical except for the container-build lines. Slightly faster, less reproducible.

### What if Stage 2 fails?

- `"Device configuration is missing from template context"` — Stage 1's JSON is malformed or empty. Re-run Stage 1.
- `"Container mode requested but no podman/docker available"` — install Podman (`sudo apt install podman` on Ubuntu) or pass `--container-mode local`.
- `"Permission denied: '/datastore/output/constraints'"` — SELinux or rootless-Podman UID mismatch. The runner usually fixes this automatically; if it doesn't, run with `--container-mode local` once to get past it, or see [Troubleshooting Permissions](troubleshooting-permissions.md).

## 4. Stage 3: Vivado synthesis

This is the slow stage. Vivado runs unattended in batch mode and produces a bitstream.

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 \
    --vivado-jobs 8 \
    --vivado-timeout 1800
```

For **75t**:

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_75t484_x1 \
    --vivado-jobs 8 \
    --vivado-timeout 2400
```

Expected wall time (on a recent 8-core desktop):

- **35t**: 8–15 minutes
- **75t**: 15–25 minutes

Look for:

```
[PCILeech] Starting Vivado build for board: pcileech_35t325_x1
[PCILeech] Vivado: /tools/Xilinx/2025.1/Vivado/bin/vivado
[PCILeech] Launching: vivado -mode batch -source .../vivado_build.tcl -log .../vivado_build.log
   ... long stretch of synthesis log ...
[PCILeech] Synthesis progress: 100%
[PCILeech] Implementation progress: 100%
[PCILeech] Bitstream written: pcileech_datastore/output/pcileech_35t325_x1.bit
[PCILeech] Vivado implementation finished successfully ✓
[PCILeech] Build finished in 612.4 s ✓
[PCILeech] Generated artifacts in pcileech_datastore/output/
```

### What if Stage 3 fails?

Read `pcileech_datastore/output/error_report.txt` first — it's the parsed summary. Common failures and what they mean live in [Vivado Setup → Common errors](vivado-setup.md#common-errors-and-what-they-mean).

Quick triage:

- **`Vivado not found in PATH`** → source `settings64.sh` or pass `--vivado-path /tools/Xilinx/2025.1/Vivado`.
- **`Synthesis failed` with a `[Place 30-640]` upstream** → FPGA full. **35t-only failure**; move to 75t.
- **`Synthesis failed` with `[Timing 38-282]`** → drop `--advanced-sv` if you set it, or move to 75t.
- **`license` in the error** → you somehow got a paid-edition project. Re-install Standard with 7-Series enabled.

## 5. Flash the bitstream to the board

The `.bit` file is in `pcileech_datastore/output/`. Use the bundled flash command for direct USB-JTAG programming:

```bash
pcileech-sudo flash pcileech_datastore/output/pcileech_35t325_x1.bit \
    --board pcileech_35t325_x1
```

(For 75t, swap both occurrences.)

Expected:

```
[PCILeech] Detecting JTAG adapter...
  ✓ Found FT2232H @ 0x0403:0x6010
[PCILeech] Programming pcileech_35t325_x1.bit ...
  Progress: [████████████████████] 100%
[PCILeech] Flash complete. Power-cycle the board for the new firmware to take effect.
```

If the adapter isn't detected, check that the board's USB cable is plugged into the JTAG port (not the optional UART port on multi-port boards), and that no other Vivado / `openocd` / `urjtag` process is holding the FT2232 device open.

## 6. Test the cloned device

Power-cycle the host (or hot-replug the cloned board if your slot supports it) and run:

```bash
lspci -nnD | grep -i "<vendor>:<device>"
sudo lspci -nnvvv -s <new-bdf>
```

The cloned board should now claim the donor's vendor/device IDs and surface the same capability chain you saw in Stage 1's output. If `lspci` shows generic IDs (`ffff:ffff` or `Xilinx:...`), the bitstream didn't load — re-flash and power-cycle.

## Common pitfalls across the whole flow

- **Mixing `--bdf` and `--board` from different runs.** The board option locks the FPGA family; you can't take a 35t Stage-1 JSON and synthesize it for a 75t board. Re-run Stage 1 if you change boards.
- **Re-running Stage 1 against a different donor without deleting `pcileech_datastore/`.** Old `device_context.json` will overwrite cleanly; old `msix_data.json` might not. When in doubt, `rm -rf pcileech_datastore/` and start fresh.
- **Running Stage 3 inside the container by mistake.** Stage 2 runs in the container; Stage 3 (Vivado) always runs on the host. The runner enforces this — if you see `"Container detected. Vivado must be run on host."`, that's the runner reminding you.
- **Slow USB-JTAG adapter clashes.** Vivado's own hardware manager will lock the FT2232. Close any open Vivado GUI before running `pcileech flash`.

That's the whole pipeline. Once you've done it once for a 35t or 75t board, the only real per-build cost is Stage 3's Vivado time.
