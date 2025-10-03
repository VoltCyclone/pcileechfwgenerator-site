# Issue Reporting

## Overview

When a firmware build fails, include concise logs and environment details in your issue. If maintainers request deeper diagnostics, attach the minimal logs needed to reproduce.

By default (unless suppressed) a human‑friendly reproduction command hint is also logged so you can immediately retry the failing build locally or share the minimal command in an issue without pasting JSON.

## What to include

- Exact command used (e.g., `sudo pcileech build --bdf ... --board ...`)
- OS, kernel, Python version
- `pcileech --version` output
- The tail of `logs/generation.log` from the output folder

## Minimal reproduction

Use the simplest possible command and include the BDF and board only. Add `-v` if more detail is needed:

```bash
sudo pcileech build --bdf 0000:03:00.0 --board pcileech_35t325_x4 -v
```

Avoid attaching large data blobs; maintainers will ask if deeper diagnostics are needed.
