# PCIe Power Management flags

## Overview

Brief guide to the power-management options exposed by the generator: PME, D-states, D3cold, WAKE#, L1 Substates, and LTR. Defaults are safe for PCILeech-compatible boards.

## Defaults for PCILeech-compatible boards

- PME/PMCSR state machine is enabled internally.
- Sideband pins are NOT exposed by default.
- WAKE# events are disabled by default.
- LTR is auto-enabled only if Device Capabilities 2 advertises it.

## Flags and when to use them

- enable_pme (default: true)
  - Enables PMCSR behavior, D-state transition timers, PME TurnOff/PME_To_Ack handling.
  - Keep enabled unless you have a specific reason to disable for testing.

- enable_wake_events (default: false)
  - Generates WAKE# assertion from D3cold on internal events.
  - Only set true if your board/IP actually routes WAKE#; signal is active-low (wake_n).

- expose_pm_sideband (default: false)
  - When true, exposes top-level ports: pme_turnoff, pme_to_ack, wake_n, aux_pwr_present.
  - Use only if your PCIe IP or board breaks out these pins. Otherwise leave false.

- power_management.has_interface_signals (default: false)
  - Alternative gate used by platform integrations to indicate PME/WAKE sidebands exist.
  - If true, sideband ports are exposed without setting expose_pm_sideband.

## Behavior summary (concise)

- PMCSR side-effects: PME_Status is write-1-to-clear; writes to power state bits request D-state transitions with timers; PME_Enable gates PME events.
- PME TurnOff/To_Ack handshake is implemented; PME is gated in D3cold.
- WAKE# (wake_n) is driven only when in D3cold; polarity is active-low.
- L1 Substates and LTR are enabled automatically when the capability structures advertise support; no generic hardcoding.

## Enabling sidebands (only if routed on your board)

Minimal override example (YAML-like):

```yaml
power_management:
  has_interface_signals: true

enable_wake_events: true
expose_pm_sideband: true
```

Notes:

- aux_pwr_present should be driven by your platform if available; otherwise the generator ties safe defaults internally.
- Don’t enable sidebands unless you have the corresponding pins on your PCIe IP or board.

## See also

- Dynamic Device Capabilities: ./dynamic-device-capabilities.md
- Template Architecture: ./template-architecture.md
- Troubleshooting: ./troubleshooting.md
