# Donor Card Guide

Picking the right donor card is the single highest-leverage decision in the whole pipeline. A good donor takes 30 seconds to acquire data from and produces a clean, unique firmware. A bad donor produces zero-valued IDs, crashes the host during VFIO binding, or compiles to a generic-looking bitstream that defeats the point of cloning.

This guide is practical: which cards work, which ones don't, where to buy them, and how to tell whether the donor you already have is going to give you trouble.

## What "donor" means

A donor is a physical PCIe card whose configuration space the generator will read and faithfully replicate inside the FPGA. The generator copies:

- Vendor ID, Device ID, Subsystem Vendor/Device IDs
- Class code, revision
- BAR sizes and layouts
- PCIe capability list (MSI/MSI-X, PM, AER, etc.) with their exact field values
- DSN (Device Serial Number) if present
- Class-specific capability tables (e.g. an MSI-X table layout)

The donor only needs to be **readable** — it does not need to be functional, online, or even plugged into the network/audio output it claims to drive. A dead NIC with intact silicon is fine.

## The five rules

1. **Discrete PCIe cards only.** No onboard devices, no PCH-integrated controllers, no graphics cards.
2. **Prefer single-function devices.** Multi-function cards (e.g. NIC+management) often confuse capability extraction.
3. **Cheap, plentiful, dedicated PCIe slot.** Specifically the kinds of cards that flood eBay/AliExpress at $5–$30.
4. **Not your boot disk, not your only NIC.** VFIO binding takes the device offline; you don't want that to be your only path to the network.
5. **Avoid devices that are still loaded by the kernel under a complex driver tree.** Anything ZFS, Bluetooth subsystem, or onboard audio counts.

## Device categories the generator handles

The code recognizes these device types via class code (`src/device_clone/hex_constants.py`):

| Type | Class code (hex) | What works as donor |
|---|---|---|
| Ethernet | `020000` | Almost any discrete PCIe NIC. Best donors live here. |
| Audio | `040100` | Sound cards, capture cards with audio class. Variance manager has audio-specific tuning. |
| USB controller | `0c0300` | USB 3.0/3.1 expansion cards. Common, cheap, work well. |
| SATA | `010601` | SATA add-in controllers (NOT your boot SATA chipset). |
| NVMe | `010802` | Discrete NVMe-on-AIC adapters. Usually fine but pricier. |
| VGA | `030000` | **Avoid.** Class is supported but graphics cards are too entangled with the running system. |

If your card's class code is none of the above the generator uses the `generic` device template — still works, just without category-specific variance tweaks.

## Tier ranking of common donor cards

These tiers reflect community experience. "S" cards are recommended starting points; "C" cards work but require extra care; "F" cards are known problems.

### Tier S — buy these without thinking

| Card | Chipset | Why it's good | Approx. price |
|---|---|---|---|
| Generic "RTL8111H" PCIe x1 NIC | Realtek RTL8111/8168/8411 | Vendor ID `0x10ec`, ubiquitous, intact MSI/MSI-X cap chain, single function, ships under a dozen brand names. | $5–8 |
| Intel I210-T1 / I210-AT | Intel I210 | Real Intel vendor ID `0x8086`, server-grade DSN, clean cap list. Used in lots of OEM machines so the cards are everywhere on the second-hand market. | $15–25 |
| StarTech / generic ASM1142 USB 3.1 card | ASMedia ASM1142 | USB controller class, well-formed BARs and MSI-X. Distinct from onboard USB. | $10–15 |
| Marvell 88SE9215 / 9230 SATA AIC | Marvell SATA | Discrete SATA controller, simple cap chain. Good if you want a non-NIC donor. | $10–20 |

### Tier A — proven donors

- **Intel 82574L** — Older Gigabit chip, also widely available; sometimes lacks DSN.
- **Intel 82579LM** — Often integrated; only viable as an add-in card variant.
- **Broadcom NetXtreme BCM5719 / BCM5720** — Solid donor. Bigger PCB, slightly pricier.
- **Creative Sound Blaster Audigy / X-Fi** — Audio donor with proper MSI/MSI-X.
- **ASUS Xonar D1 / DX** — PCIe audio donor; clean caps.
- **VIA VL805 USB 3.0 PCIe card** — Cheap USB 3.0 controller, simple structure.

### Tier B — works with extra care

- **Mellanox ConnectX-3 / ConnectX-4** — Excellent technically but multi-function and BAR-heavy; not the easiest first donor.
- **Intel 8260 / AX200 M.2 WiFi cards** — Technically PCIe but extracting them safely is awkward; firmware blobs can confuse the cap walk.
- **PCIe capture cards (Blackmagic DeckLink, AVerMedia Live Gamer)** — Complex BAR layouts; some have writable EEPROMs that vary by board. Capable donor once you know what to expect.
- **PCIe parallel/serial port cards (MosChip, etc.)** — Class-code obscurity; generator falls back to `generic`.

### Tier F — do not use

- **Any onboard NIC, audio, USB, or storage controller.** VFIO binding can lock the bus and force a reboot. The troubleshooting docs flag this explicitly.
- **Discrete GPUs.** Class supported in theory; in practice the driver attachment graph is fragile and you'll lose your display.
- **NVMe SSDs holding your OS.** Self-explanatory.
- **Bluetooth combo cards / wireless multi-radio modules.** Multi-function devices with quirky subsystems.
- **Anything brand-new on the market.** If `lspci -nn` doesn't surface IDs in stable databases yet, the build will probably reject the donor.

## How to validate a donor before committing

Plug the card in and from a Linux root shell:

```bash
# Find it
lspci -nnD

# Suppose it shows up as 0000:03:00.0
lspci -nnvvv -s 0000:03:00.0 | head -40
```

Look for:

- **Vendor / Device IDs are not all-`ffff`** — `ffff:ffff` means the card is dead or not enumerated. Reseat and recheck.
- **Vendor / Device IDs are not zero** — A zero ID is a sign the card returned uninitialized config space. PCILeech rejects this with `"... is zero (0x0000), which indicates a generic or uninitialized value. Use a real device for cloning."`
- **Capabilities list is present** — `Capabilities: <access denied>` from non-root `lspci` is fine. The PCILeech check command will tell you if cap walking fails.
- **One IOMMU group, contains only this device** — `find /sys/kernel/iommu_groups -type l | grep <bdf>`. If the group contains other devices, those will go offline with it.

Then the canonical pre-flight:

```bash
pcileech-sudo check --device 0000:03:00.0 --interactive --fix
```

If the check command is green for VFIO binding and class detection, the donor is good. If it complains about IOMMU groups or driver attachment, the fix command will offer steps.

## Symptoms of a bad donor

When something is going to fail because of donor choice — not because of build configuration — the error is almost always one of these.

| Symptom | Likely donor problem |
|---|---|
| Build aborts with `"Device configuration is missing from template context"` | Cap walk found nothing extractable. Often a card that was already in a low-power state or wasn't fully enumerated. |
| Build aborts with `"<field> is zero (0x0000)"` | A required field came back zero. Sometimes a flaky cable/riser; sometimes the card is genuinely returning bogus config space. |
| Build aborts with `"Invalid vendor/device ID combination (0xFFFF:0xFFFF)"` | Card not present from the host's point of view. Re-seat. If it persists, the card is dead. |
| Build succeeds but the bitstream looks "generic" (no class-specific caps) | Donor's class code wasn't one of the recognized categories. Either accept the generic template or pick a donor in a recognized class. |
| Host reboots or freezes during Stage 1 | You picked an onboard device, or your donor shares an IOMMU group with something critical. Re-pick. |
| `lspci` shows the device but `vfio-pci` won't bind | The kernel has a driver claiming the device. Either unbind via `echo` to `/sys/bus/pci/drivers/*/unbind` or use the check command's `--fix`. |

## Sourcing advice

- **eBay** — search "RTL8111 PCIe NIC" or "I210-T1". $5–8 shipped. Bulk lots of 5–10 are common.
- **AliExpress** — same searches, cheaper, slower. Quality is hit or miss; buy two so you have a spare.
- **Old work computers / e-waste piles** — gigabit add-in NICs from circa 2008–2014 are perfect donors. Anyone refreshing office hardware throws these away.
- **Tindie** — purpose-built donor cards exist; usually overkill for first-time builds.

For a first build the cheapest reliable path is: **two generic RTL8111 PCIe x1 NICs from the same listing, ~$12 total**. Use one as donor, keep one as a known-good spare for the next time.

## After cloning: protecting uniqueness

Once a donor produces a working bitstream, the resulting firmware is bound to that donor's IDs. If you flash the same firmware onto multiple cloned cards they'll all claim to be the same device, which defeats detection-resistance. The `firmware-uniqueness.md` doc covers how to vary subsystem IDs and DSN values without losing the cloned characteristics. A simple rule: **one donor → one cloned card.**
