# Installation on Python 3.12+ / Debian 12+

## The Problem

Starting with Python 3.12 and Debian 12 (Bookworm), system Python packages are protected by PEP 668's "externally managed environment" feature. Running `pip install` directly will fail with:

```
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.
```

## The Solution: Virtual Environment

The recommended approach is to use a virtual environment:

```bash
# Create a dedicated virtual environment
python3 -m venv ~/.pcileech-venv

# Activate it
source ~/.pcileech-venv/bin/activate

# Install with TUI support
pip install pcileechfwgenerator[tui]

# Verify installation
pcileech version
```

## Running with sudo

Since PCILeech requires root access for VFIO operations, you need to run the venv's Python directly with sudo:

```bash
# DON'T do this (won't find the package):
sudo pcileech tui

# DO this instead (use the venv's Python directly):
sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main tui

# Or create an alias in ~/.bashrc:
alias pcileech-sudo='sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main'

# Then use:
pcileech-sudo tui
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

## Alternative: pipx

You can also use `pipx` which automatically manages virtual environments:

```bash
# Install pipx
sudo apt install pipx
pipx ensurepath

# Install pcileechfwgenerator
pipx install 'pcileechfwgenerator[tui]'

# Run (still needs sudo for VFIO)
sudo $(which pcileech) tui
```

## Alternative: Break System Packages (Not Recommended)

If you understand the risks, you can override the protection:

```bash
# NOT RECOMMENDED - can break system packages
pip install --break-system-packages pcileechfwgenerator[tui]
```

This is discouraged because it can cause conflicts with system Python packages managed by apt.

## Troubleshooting

### "ModuleNotFoundError: No module named 'textual'"

The TUI dependencies weren't installed. Make sure you installed with `[tui]`:

```bash
pip install pcileechfwgenerator[tui]
```

### "command not found: pcileech"

The virtual environment isn't activated, or you're using sudo which doesn't inherit PATH:

```bash
# Either activate the venv first:
source ~/.pcileech-venv/bin/activate
pcileech version

# Or use the full path with the venv's Python:
sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main tui

# Or use the alias (after adding to ~/.bashrc):
pcileech-sudo tui
```

### "Permission denied" errors during build

You need root access for VFIO operations. Use the venv's Python with sudo:

```bash
sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main build --bdf 0000:03:00.0 --board pcileech_35t325_x1
```

## Quick Reference

```bash
# One-time setup
python3 -m venv ~/.pcileech-venv
source ~/.pcileech-venv/bin/activate
pip install pcileechfwgenerator[tui]

# Daily usage (add to ~/.bashrc for convenience)
alias pcileech-sudo='sudo ~/.pcileech-venv/bin/python3 -m pcileechfwgenerator.pcileech_main'

# Run commands
pcileech-sudo tui
pcileech-sudo build --bdf 0000:03:00.0 --board pcileech_35t325_x1
pcileech-sudo check --device 0000:03:00.0
```
