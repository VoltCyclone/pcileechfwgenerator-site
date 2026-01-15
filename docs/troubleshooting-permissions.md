# Troubleshooting Permission Errors

## Overview

Permission errors occur when the build system cannot create or write to output directories. This happens in both local builds and container builds (which run only the templating stage - Stage 2).

**Important**: The build system uses a 3-stage pipeline:

1. **Stage 1 (Host)**: Collects device data via VFIO
2. **Stage 2 (Container or Local)**: Generates firmware from collected data
3. **Stage 3 (Host)**: Runs Vivado synthesis (if configured)

The container does NOT access VFIO - it only runs Stage 2 templating using the pre-collected device context.

## Common Error Messages

### "Permission denied: '/datastore/output/constraints'"

**Full Error**:

```text
ERROR │ [PCIL] PCILeech firmware generation failed: Failed to copy XDC constraint files from submodule: [Errno 13] Permission denied: '/datastore/output/constraints'
```

**Cause**: The output directory or its subdirectories cannot be created due to insufficient permissions. This typically occurs when:
- The container runs as a different user than the host (UID/GID mismatch)
- Volume mounts don't preserve correct ownership

**Note**: As of the latest version, the build system automatically uses `--userns=keep-id` (Podman) or `--user` (Docker) to prevent this issue by running the container as the same user as the host.

**Solutions** (if you still encounter this issue):

#### 1. Fix Ownership (Works for Both Local and Container Builds)

```bash
# Make output directory writable by current user
sudo chown -R $(id -u):$(id -g) pcileech_datastore/
chmod -R u+w pcileech_datastore/

# Run build (will prompt for container or local mode after Stage 1)
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_35t325_x1
```

#### 2. Create Output Directory with Correct Permissions

```bash
# Create output directory before build
mkdir -p pcileech_datastore
chmod 755 pcileech_datastore

# Run build
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_35t325_x1
```

#### 3. Use Different Output Directory

```bash
# Use a directory where you have write permissions
mkdir -p ~/pcileech-builds
sudo python3 pcileech.py build \
  --bdf 0000:02:00.0 \
  --board pcileech_75t484_x1 \
  --output ~/pcileech-builds
```

## Permission Error Types

### 1. Cannot Create Output Directory

**Error**:
```
Cannot create output directory /path/to/output: Permission denied.
Ensure the parent directory is writable.
Try: sudo chown -R $(id -u):$(id -g) /path/to/parent
```

**Root Cause**: Parent directory doesn't exist or isn't writable.

**Fix**:

```bash
# Create parent directory first
mkdir -p /path/to/parent
chmod 755 /path/to/parent

# Or fix ownership
sudo chown -R $(id -u):$(id -g) /path/to/parent

# Then run build
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1
```

### 2. Output Directory Not Writable

**Error**:
```
### 2. Output Directory Not Writable

**Error**:

```text
Output directory /path/to/output is not writable.
Current ownership: uid=0 gid=0 mode=0o755.
Fix with: sudo chown -R $(id -u):$(id -g) /path/to/output
```

**Root Cause**: Directory exists but current user lacks write permissions.

**Fix**:

```bash
# Change ownership to current user
sudo chown -R $(id -u):$(id -g) output/

# Ensure write permissions
chmod 755 output/

# Then run build
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1
```

### 3. Cannot Create Subdirectories

**Error**:

```text
Cannot create constraints directory /path/output/constraints: Permission denied.
Parent directory /path/output ownership: uid=0 gid=0.
```

**Root Cause**: Container or build process running with different permissions than directory owner.

**Fix**:

```bash
# Fix ownership of output directory
sudo chown -R $(id -u):$(id -g) output/

# Make it writable
chmod 755 output/

# Run build
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1
```

### 4. Cannot Write Files

**Error**:

```text
Cannot write constraint file /path/output/constraints/file.xdc: Permission denied.
Directory permissions: 0o755
```

**Root Cause**: Directory exists but doesn't have write permissions for current user.

**Fix**:

```bash
# Add write permission
chmod u+w output/constraints/

# Or fix ownership
sudo chown -R $(id -u):$(id -g) output/
```

## Container-Specific Issues

**Note**: These issues are handled automatically by the build system's container orchestration. You typically don't need to worry about them unless you're debugging container problems.

### SELinux Context Mismatch

**Symptom**: Permission denied even with correct ownership (Linux systems with SELinux enabled).

**Check**:

```bash
# Check if SELinux is enforcing
getenforce

# Check SELinux context
ls -Z output/
```

**Fix**:

The build system automatically handles SELinux labeling with the `:Z` flag. If you still encounter issues:

```bash
# Temporarily set to permissive (for testing only)
sudo setenforce 0

# Run build
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1

# Re-enable SELinux
sudo setenforce 1
```

### Files Owned by Root After Build

**Symptom**: Output files are owned by root after build completes.

**Why**: Build ran with sudo, creating files as root.

**Fix**:

```bash
# After build completes, fix ownership
sudo chown -R $(id -u):$(id -g) output/

# For future builds, the system should preserve permissions
```

## Local Development Issues

### Running Without sudo

**Symptom**: Build fails with VFIO access errors, not permission errors.

**Why**: VFIO requires root access, but root-created files can have permission issues.

**Fix**:

```bash
# Use sudo but specify output in user-owned directory
sudo -E python3 pcileech.py build \
  --bdf 0000:02:00.0 \
  --board pcileech_75t484_x1 \
  --output /home/$(whoami)/pcileech-output

# After build, fix ownership if needed
sudo chown -R $(id -u):$(id -g) /home/$(whoami)/pcileech-output
```

### umask Too Restrictive

**Symptom**: Created files/directories not accessible by regular user.

**Check**:

```bash
umask  # Should be 0022 or similar
```

**Fix**:

```bash
# Temporarily set permissive umask
umask 0022
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1

# Or set in script
(umask 0022 && sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1)
```

## Debugging Permission Issues

### Check Directory Permissions

```bash
# Check ownership and permissions
ls -la output/
ls -laZ output/  # With SELinux context (if applicable)

# Check parent directory
ls -la $(dirname output/)

# Check if writable
[ -w output/ ] && echo "Writable" || echo "Not writable"
```

### Test Write Access

```bash
# Test if you can write to output dir
echo "test" > output/test.txt
# If this fails, you have a permissions issue

# Fix it
sudo chown -R $(id -u):$(id -g) output/
chmod 755 output/
```

### Check Filesystem Type

```bash
# Some filesystems don't support standard permissions (e.g., VFAT)
mount | grep $(df output/ | tail -1 | awk '{print $1}')

# Check for NFS with root_squash
mount | grep nfs
```

## Best Practices

### General Recommendations

1. **Create output directory before building**:

   ```bash
   mkdir -p output && chmod 755 output
   ```

2. **Use user-owned directories**:

   ```bash
   sudo python3 pcileech.py build \
     --bdf 0000:02:00.0 \
     --board pcileech_75t484_x1 \
     --output ~/pcileech-builds
   ```

3. **Fix ownership after builds if needed**:

   ```bash
   sudo chown -R $(id -u):$(id -g) output/
   ```

4. **Test write access before long builds**:

   ```bash
   echo "test" > output/test.txt && rm output/test.txt
   ```

### For Container Builds (Automated)

The build system automatically:

- Detects Podman availability
- Builds and runs containers with proper volume mounts
- Handles SELinux labeling (`:Z` flag on Linux)
- Falls back to local build if containers unavailable

You don't need to manually configure anything - just run:

```bash
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1
```

### For Local Development Builds

1. **Use sudo for VFIO access** (required for device operations)

2. **Output to user-owned directories**:

   ```bash
   sudo python3 pcileech.py build --output ~/pcileech-builds --bdf X --board Y
   ```

3. **Fix ownership after builds**:

   ```bash
   sudo chown -R $(id -u):$(id -g) ~/pcileech-builds
   ```

4. **Use ACLs for shared team access**:

   ```bash
   setfacl -R -m u:$(whoami):rwx output/
   ```

## Platform-Specific Notes

### Linux with SELinux (Fedora/RHEL)

The build system automatically handles SELinux labeling when running in containers. If you encounter SELinux denials:

```bash
# Check SELinux status
getenforce

# Temporarily set to permissive for testing
sudo setenforce 0

# Run build
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1

# Re-enable SELinux
sudo setenforce 1
```

### Linux without SELinux (Ubuntu/Debian)

Standard file permissions apply. Ensure output directory is writable:

```bash
mkdir -p output
chmod 755 output
sudo python3 pcileech.py build --bdf 0000:02:00.0 --board pcileech_75t484_x1
```

### Other Platforms

The container-based build system handles most permission complexity automatically. For local builds, standard file ownership/permissions apply.

### NFS-Mounted Home Directory

```bash
# NFS may have root_squash - use different output location
sudo python3 pcileech.py build \
  --bdf 0000:02:00.0 \
  --board pcileech_75t484_x1 \
  --output /tmp/pcileech-output
```

## See Also

- [Container Builds](container-builds.md) - Container-specific build documentation
- [Troubleshooting Guide](troubleshooting.md) - General troubleshooting
- [Development Setup](development.md) - Local development environment setup
