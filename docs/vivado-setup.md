# Vivado Setup

This guide covers everything you need to run Vivado synthesis for PCILeech firmware: which edition to install, which version pairs with which board, and how to diagnose the most common synthesis errors.

The PCILeech generator itself does NOT pin a Vivado version — it shells out to whatever `vivado` it finds. The compatibility envelope is set by Xilinx (which FPGAs each Vivado edition supports) and by the TCL flow strings shipped with the board sources (`Vivado Synthesis 2017`, `Vivado Synthesis 2023`, etc., embedded in each board's `vivado_generate_project.tcl`).

## Edition: WebPACK or paid?

For every board this project supports today, **Vivado ML Standard (free, no license file needed)** works. The legacy "WebPACK" name was retired in 2022.x — modern Vivado has three tiers:

- **Standard edition** — free, no node-locked license required. Supports Artix-7 up to **100T**, plus Spartan-7, Kintex-7 70T/160T, Zynq-7000, and parts of Zynq UltraScale+. Sufficient for **every board in the current PCILeech board catalog except `pcileech_ac701`** (which uses `xc7a200t` and needs the Enterprise edition).
- **Enterprise edition** — paid. Required for `xc7a200t` (`pcileech_ac701`), Kintex UltraScale, Virtex UltraScale+, etc.
- **Vivado AI / Versal edition** — not relevant for PCILeech.

| Board | FPGA part | Edition needed |
|---|---|---|
| `pcileech_squirrel`, `pcileech_35t484_x1`, `pcileech_gbox`, `pcileech_netv2_35t` | `xc7a35tfgg484-2` | Standard (free) |
| `pcileech_pciescreamer_xc7a35`, `pcileech_35t325_x1`, `pcileech_35t325_x4`, `pcileech_screamer_m2` | `xc7a35tcsg324-2` | Standard (free) |
| `pcileech_enigma_x1`, `pcileech_75t484_x1` | `xc7a75tfgg484-2` | Standard (free) |
| `pcileech_100t484_x1`, `pcileech_100t484_x4`, `pcileech_netv2_100t` | `xc7a100tfgg484-1` | Standard (free) |
| `pcileech_ac701` | `xc7a200tfbg676-2` | **Enterprise (paid)** |

If you're choosing a board specifically to keep costs down, stay on any of the 35t/75t/100t boards. The community recommendation in `BoardDiscovery.get_board_display_info()` is `pcileech_75t484_x1` or `pcileech_35t325_x4`.

## Version compatibility

The TCL build scripts shipped with each board's submodule embed an explicit synthesis-flow string that tells Vivado which flow generation to use:

- Boards using `Vivado Synthesis 2023` / `Vivado Implementation 2023`: `ScreamerM2`, `ZDMA` (incl. `pcileech_100t484_x4`)
- Boards using `Vivado Synthesis 2017` / `Vivado Implementation 2019`: `pciescreamer`, `acorn_ft2232h`

Any Vivado 2023.x or later opens both flows without complaint. **Vivado 2024.2 and 2025.1** are the versions actively tested by maintainers. Older Vivado (2020.x and earlier) can fail to open the 2023-flow projects.

Rule of thumb: install the latest Vivado Standard your host can spare disk for (~70 GB after install) and ignore version pinning. If you encounter a flow-version mismatch, a TCL error will surface that names the expected flow string — match it.

## Installation

### Linux (recommended)

```bash
# 1. Download "Xilinx Unified Installer" (Linux, self-extracting) from
#    https://www.xilinx.com/support/download.html
#    Pick the latest "Vivado ML Standard Edition - Linux".

# 2. Install
chmod +x Xilinx_Unified_2025.1_*_Lin64.bin
./Xilinx_Unified_2025.1_*_Lin64.bin

# When prompted, choose:
#   - Product:           Vivado
#   - Edition:           Vivado ML Standard
#   - Devices:           7 Series  (uncheck everything else to save ~60 GB)
#   - Install path:      /tools/Xilinx        (recommended; PCILeech searches here)

# 3. Make Vivado discoverable
echo 'source /tools/Xilinx/2025.1/Vivado/settings64.sh' >> ~/.bashrc
source ~/.bashrc

# 4. Verify
vivado -version
# Should print:  Vivado v2025.1 (64-bit) ...
```

The PCILeech runner looks for `vivado` in this order:

1. `vivado` on `$PATH`
2. `$XILINX_VIVADO` environment variable
3. `/opt/Xilinx/Vivado`, `/tools/Xilinx/Vivado`, `/usr/local/Xilinx/Vivado`, `~/Xilinx/Vivado`
4. The pattern `/tools/Xilinx/<year>.<minor>/Vivado`

You can also bypass discovery entirely:

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1 \
    --vivado-path /tools/Xilinx/2025.1/Vivado
```

### Windows

Vivado runs on Windows but PCILeech's host pipeline (VFIO) does not. Practical setup is dual-boot or WSL2 on Linux for Stage 1 and Stage 2, and either a Linux host or a Windows host for Stage 3 (Vivado synthesis). The Windows installer mirrors the Linux installer; choose `C:\Xilinx\Vivado\2025.1` and add `C:\Xilinx\Vivado\2025.1\bin` to `PATH`.

### macOS

Xilinx does not ship Vivado for macOS. Use a Linux VM with at least 16 GB RAM and 100 GB disk, or run Vivado on a separate Linux box and copy the build artifacts over.

### Disk and RAM

- **Disk:** ~70 GB after install with 7-Series devices selected. The default "everything" install is ~250 GB.
- **RAM:** 8 GB minimum for the 35t/75t boards; 16 GB recommended for `pcileech_100t484_x4` and `pcileech_ac701`. Implementation passes occasionally peak above 12 GB.

## Running Vivado from PCILeech

The full pipeline:

```bash
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

Vivado-related flags:

| Flag | Default | Notes |
|---|---|---|
| `--vivado-path PATH` | auto | Override the discovery search. Point at the directory containing `bin/vivado`. |
| `--vivado-jobs N` | `4` | Parallel synthesis jobs. Up to physical core count. |
| `--vivado-timeout SECONDS` | `3600` | Kill Vivado if it exceeds this. Increase for 100t/ac701 boards. |

The bitstream lands at `pcileech_datastore/output/<board_name>.bit`.

Vivado is invoked in batch mode:

```bash
vivado -mode batch \
       -source pcileech_datastore/output/vivado_build.tcl \
       -log pcileech_datastore/output/vivado_build.log
```

If you want to debug a build interactively, open the same TCL project in the Vivado GUI:

```bash
vivado pcileech_datastore/output/vivado_generate_project.tcl
```

## Common errors and what they mean

The PCILeech build wraps Vivado output through `VivadoErrorParser`. When a build fails, look at `pcileech_datastore/output/error_report.txt` first — it strips ANSI codes and groups errors by category.

| Vivado error code | What it means | Most common cause | Fix |
|---|---|---|---|
| `ERROR: [Common 17-349]` | License problem | Trying to synthesize a part the installed edition doesn't cover — most likely you have a board that needs Enterprise. | Confirm board's FPGA part vs. the edition table above. Reinstall Standard with 7-Series enabled. |
| `ERROR: [Synth 8-6859]` | Multi-driven net in generated SystemVerilog | Conflict between the config-space shadow and TLP handling code, often from a stale `device_context.json`. | Delete `pcileech_datastore/` and rerun Stage 1. |
| `ERROR: [Timing 38-282]` | Timing not met | PCIe clock constraints or pipeline depth issue — common on 35t boards with `--advanced-sv` enabled. | Drop `--advanced-sv`, or move up to a 75t board. |
| `ERROR: [Place 30-640]` | Cannot fit | FPGA too small for the requested feature set. Especially common with `--enable-variance` or extra capability templates on 35t. | Either prune features or move to `pcileech_75t484_x1` / `pcileech_100t484_x1`. |
| `ERROR: [Route 35-39]` | Routing congestion | Pin assignments or board file mismatch for the target FPGA package. | Verify `--board` matches the physical board — `xc7a35tfgg484` (FGG484 package) and `xc7a35tcsg324` (CSG324 package) are not interchangeable. |
| `ERROR: [Vivado 12-4739]` | PCIe timing not met | Clock constraints out of spec. | Check `pcie_clk` constraint in the generated XDC; try a fresh Stage 1 capture in case MMIO learning produced a long path. |
| `ERROR: [HDL 9-806]` | SystemVerilog syntax error | Either the donor produced an oddly shaped capability list or a generator template bug. | Inspect the named file at the named line. Open an issue with the generated `pcileech_top.sv` attached. |
| `ERROR: [IP_Flow 19-3664]` | PCIe IP core generation failed | Vivado version mismatch with the board's flow string (e.g. running 2017-flow TCL on Vivado 2024 with no migration). | Reinstall Vivado 2023.x or later. |

There are also two TCL-level errors raised by the PCILeech-generated build script (not Vivado-native error codes):

- `error "Synthesis failed"` — `synth_1` reported anything other than `100%` progress. Look up in the log for the first `ERROR:` line before this.
- `error "Implementation failed"` — same, but for `impl_1`. Causes are usually timing or routing.
- `error [format "Bitstream not found at %s" ...]` — implementation succeeded but the `.bit` file isn't where Vivado said it would be. Often a permissions issue in `pcileech_datastore/output/`.

## "Vivado not found"

Two distinct error strings to keep separate:

1. **`Vivado not found in PATH. Use --vivado-path to specify installation directory.`** — You haven't sourced `settings64.sh`, and Vivado isn't in any of the standard locations. Either source it, set `$XILINX_VIVADO`, or pass `--vivado-path`.
2. **`Vivado executable not found at <path>`** — You passed `--vivado-path` but `bin/vivado` doesn't exist under that path. Point at the directory that *contains* `bin/`, not at the binary itself.

## "Container detected. Vivado must be run on host."

The Stage-2 container has no Vivado and no GUI. Stage 3 always runs on the host. If you see this message the build is trying to launch Vivado from inside the container — re-run with `--container-mode local` for the whole pipeline, or just let the runner emit the host script and run it yourself.

## Synthesis time expectations

Order-of-magnitude on a recent desktop (8 cores, 16 GB):

- `pcileech_35t325_x1`: 8–15 minutes
- `pcileech_75t484_x1`: 15–25 minutes
- `pcileech_100t484_x1`: 25–40 minutes
- `pcileech_ac701` (`xc7a200t`): 45–90 minutes

Bump `--vivado-jobs` to your physical core count. Pass `--vivado-timeout 5400` for the 100t and ac701 boards.

## Where to look when it fails

In order:

1. `pcileech_datastore/output/error_report.txt` — PCILeech's parsed summary
2. `pcileech_datastore/output/vivado_build.log` — full Vivado batch log
3. `pcileech_datastore/output/<board>.runs/synth_1/runme.log` — synthesis-only log
4. `pcileech_datastore/output/<board>.runs/impl_1/runme.log` — implementation-only log

`error_report.txt` will usually tell you which file to open next. If it doesn't (e.g. an error before the parser engages), start from the bottom of `vivado_build.log` and scroll up to the first `ERROR:`.
