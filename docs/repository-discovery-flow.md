# Repository Discovery Flow

## Overview

The PCILeechFWGenerator uses a sophisticated multi-environment repository discovery system that automatically detects and adapts to different deployment scenarios:

1. **Local Development** - Git submodule at `lib/voltcyclone-fpga`
2. **Container Deployment** - Cloned repository at `/app/lib/voltcyclone-fpga`
3. **pip Installation** - Bundled files in package data

## How It Works

### Dynamic Path Resolution

The `RepoManager.ensure_repo()` method uses environment-aware path discovery:

```python
# Priority order for voltcyclone-fpga location:
1. PCILEECH_VOLTCYCLONE_FPGA_PATH environment variable (explicit override)
2. <project_root>/lib/voltcyclone-fpga (local dev with submodule)
3. /app/lib/voltcyclone-fpga (container runtime)
4. /src/lib/voltcyclone-fpga (container build stage fallback)
5. <project_root>/voltcyclone-fpga (pip install bundle)
```

### Validation Strategy

The system validates discovered paths through multiple checks:

1. **Directory Existence** - Path must exist and be a directory
2. **Board Directory Presence** - Must contain expected board dirs (CaptainDMA, EnigmaX1, PCIeSquirrel)
3. **Git Metadata** (optional) - Validates .git presence for dev environments
4. **File Content** - Ensures at least one .xdc file exists in board trees

## Environment-Specific Behaviors

### Local Development

**Setup Required:**

```bash
git clone --recurse-submodules https://github.com/voltcyclone/PCILeechFWGenerator.git
# OR if already cloned:
git submodule update --init --recursive
```

**Detection:**

- Looks for `lib/voltcyclone-fpga/.git` directory
- Validates git repository status
- Enables submodule update capabilities

**Fallback:**

If `.git` is missing but board files exist, treats as vendored payload.

### Container Deployment

**Setup (Automatic):**

The Containerfile clones the repository during build:

```dockerfile
# Build stage
RUN mkdir -p lib && \
    git clone --depth 1 https://github.com/VoltCyclone/voltcyclone-fpga.git \
    lib/voltcyclone-fpga

# Runtime stage
COPY --from=build /src/lib/voltcyclone-fpga ./lib/voltcyclone-fpga
```

**Detection:**

- Checks for `/.dockerenv` or `/app` directory to detect container
- Accepts missing git metadata gracefully
- Validates board directory structure only

**Error Messages:**

Container-specific errors guide users to rebuild the image rather than run git commands.

### pip Installation

**Setup (Automatic):**

The `setup.py` bundles voltcyclone-fpga files as package data.

**Detection:**

- Looks in package installation directory
- No git metadata expected
- Validates only file presence

## Board Discovery Flow

### 1. Repository Initialization

```python
from src.file_management.repo_manager import RepoManager

# Automatically finds the correct path
repo_root = RepoManager.ensure_repo()
```

### 2. Board Path Resolution

```python
# Get board-specific directory
board_path = RepoManager.get_board_path("pcileech_75t484_x1", repo_root=repo_root)
```

The board mapping resolves to:

```python
{
    "pcileech_75t484_x1": repo_root / "CaptainDMA" / "75t484_x1",
    "pcileech_35t325_x4": repo_root / "CaptainDMA" / "35t325_x4",
    "35t": repo_root / "PCIeSquirrel",
    # ... etc
}
```

### 3. Board Configuration Discovery

```python
from src.file_management.board_discovery import BoardDiscovery

# Discover all boards
boards = BoardDiscovery.discover_boards(repo_root)

# Get specific board config
config = boards["pcileech_75t484_x1"]
# Returns: {
#     "name": "pcileech_75t484_x1",
#     "fpga_part": "xc7a75tfgg484-2",
#     "fpga_family": "7series",
#     "max_lanes": 1,
#     "supports_msix": False,
#     "has_dma": True,
#     ...
# }
```

### 4. Template Discovery

```python
from src.file_management.template_discovery import TemplateDiscovery

# Discover templates for specific board
templates = TemplateDiscovery.discover_templates("pcileech_75t484_x1", repo_root)

# Returns:
# {
#     "systemverilog": [Path("board/src/file.sv"), ...],
#     "constraints": [Path("board/constraints/file.xdc"), ...],
#     "vivado_tcl": [Path("board/build.tcl"), ...],
# }
```

## Error Handling

### Missing Repository

**Local Development:**

```
RuntimeError: voltcyclone-fpga submodule not found at /path/to/lib/voltcyclone-fpga.
For local development, initialize with: git submodule update --init --recursive
```

**Container:**

```
RuntimeError: voltcyclone-fpga files not found at /app/lib/voltcyclone-fpga.
Container build may have failed. Expected files to be cloned during docker/podman build.
```

### Incomplete Repository

```
RuntimeError: voltcyclone-fpga directory at /path exists but is incomplete.
Missing required board directories.
For local dev: git submodule update --init --recursive.
For containers: rebuild the container image.
```

### Unknown Board

```
RuntimeError: Unknown board type 'invalid_board'. Known types: 35t, 75t, 100t, ...
```

## Testing Different Environments

### Test Local Development Flow

```bash
# Clone without submodules (simulate user error)
git clone https://github.com/voltcyclone/PCILeechFWGenerator.git
cd PCILeechFWGenerator

# Try to run - should get helpful error
python3 -m pytest tests/test_repo_manager.py

# Fix it
git submodule update --init --recursive

# Should work now
python3 -m pytest tests/test_repo_manager.py
```

### Test Container Flow

```bash
# Build container (automatically clones voltcyclone-fpga)
podman build -t dma-fw .

# Run build - should work without submodule
podman run --rm -it dma-fw python3 -c "
from src.file_management.repo_manager import RepoManager
print(f'Repo found at: {RepoManager.ensure_repo()}')
"
```

### Test with Environment Override

```bash
# Point to custom location
export PCILEECH_VOLTCYCLONE_FPGA_PATH=/custom/path/voltcyclone-fpga

# Discovery will use this path first
python3 -m pcileechfwgenerator.pcileech_main build --bdf 0000:03:00.0 --board 75t
```

## Caching Strategy

### Board Configuration Cache

Board discovery results are cached to avoid repeated filesystem scans:

```python
# First call - scans filesystem
boards = BoardDiscovery.discover_boards()

# Subsequent calls - uses cache
boards = BoardDiscovery.discover_boards()  # Instant

# Cache is invalidated when repo_root changes
boards = BoardDiscovery.discover_boards(repo_root=Path("/different/path"))  # Re-scans
```

### Template Cache Invalidation

Template discovery does NOT cache to ensure fresh results:

```python
# Always scans filesystem
templates = TemplateDiscovery.discover_templates("pcileech_75t484_x1")
```

## Best Practices

### For Users

1. **Local Development**: Always use `git clone --recurse-submodules`
2. **Containers**: Just build the image - submodule management is automatic
3. **pip Install**: No action needed - files are bundled

### For Contributors

1. **Always check both environments**: Test changes in both local dev and container
2. **Use `ensure_repo()` not hardcoded paths**: Let the system find the repo
3. **Validate board existence**: Use `RepoManager.get_board_path()` which validates
4. **Handle missing boards gracefully**: Catch `RuntimeError` and provide helpful messages

### For CI/CD

```yaml
# GitHub Actions example
- name: Setup Repository
  run: |
    git submodule update --init --recursive
    
- name: Test Board Discovery
  run: |
    python3 -c "
    from src.file_management.board_discovery import BoardDiscovery
    boards = BoardDiscovery.discover_boards()
    assert len(boards) > 0, 'No boards discovered'
    print(f'Discovered {len(boards)} boards')
    "
```

## Troubleshooting

### "voltcyclone-fpga not found" in Local Dev

**Problem**: Submodule not initialized

**Solution**:

```bash
git submodule update --init --recursive
```

### "voltcyclone-fpga not found" in Container

**Problem**: Container build failed to clone repo

**Solution**:

```bash
# Check build logs for git clone errors
podman build -t dma-fw . 2>&1 | grep "git clone"

# Rebuild with network access
podman build --network=host -t dma-fw .
```

### Board Discovery Returns Empty

**Problem**: Repository exists but boards not found

**Check**:

```bash
# Verify board directories exist
ls -la lib/voltcyclone-fpga/CaptainDMA/
ls -la lib/voltcyclone-fpga/EnigmaX1/
ls -la lib/voltcyclone-fpga/PCIeSquirrel/

# Check for XDC files (validation requirement)
find lib/voltcyclone-fpga -name "*.xdc"
```

### Wrong Repository Path Used

**Problem**: System using unexpected path

**Debug**:

```python
from src.file_management.repo_manager import SUBMODULE_PATH
print(f"Using path: {SUBMODULE_PATH}")

# Override if needed
import os
os.environ["PCILEECH_VOLTCYCLONE_FPGA_PATH"] = "/correct/path"
```

## See Also

- [Container Builds](container-builds.md) - Container-specific build process
- [Development Setup](development.md) - Local development environment
- [Troubleshooting Guide](troubleshooting.md) - Common issues and solutions
