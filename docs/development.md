# 🛠️ Development Guide

The code needs to run on linux but can be developed anywhere with a python vers >3.9

```bash
# Clone repository
git clone https://github.com/VoltCyclone/PCILeechFWGenerator
cd PCILeechFWGenerator

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install development dependencies
pip install -r requirements-dev.txt

# Install pre-commit hooks
pre-commit install

# Run tests
pytest tests/
```

## 📦 Building from Source

```bash
# Build distributions
python -m build

# Install locally
pip install dist/*.whl
```

## Unit testing

TUI Tests are next to the code in the tui dir, app tests are in the tests/ dir.
`make test` in the repo is the easiest way to run unit tests locally. The github action will run them in CI.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/VoltCyclone/PCILeechFWGenerator/blob/main/CONTRIBUTING.rst) for detailed guidelines.

**Quick Start:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Submit a pull request

## 🏗️ Architecture

The project is structured as follows:

- **Core Generator**: Main PCILeech firmware generation logic
- **TUI Interface**: Modern terminal interface using Textual
- **VFIO Integration**: Linux VFIO driver interaction
- **Template System**: SystemVerilog template processing
- **Testing Framework**: Comprehensive test suite

## 📝 Coding Standards

- Follow PEP 8 style guidelines
- Use type hints for all functions
- Write comprehensive docstrings
- Add unit tests for new features
- Use descriptive commit messages

## 🔍 Debugging

The project includes extensive logging and debugging features:

```bash
# Verbose logs
sudo -E pcileech build -v --bdf 0000:03:00.0 --board pcileech_35t325_x4
```

## 🐳 Container Development (optional)

The repository provides a `Containerfile` for CI and reproducible runtime images. Building or running the container is optional and not required for normal development or VFIO workflows. If you need a development container for CI/testing, use the commands below as commented examples.

```bash
# Optional: build development container for CI/reproducible environments
# podman build -t pcileech-dev .

# Optional: run with development mounts (not required for VFIO workflows)
# podman run -it --privileged \
#   -v $(pwd):/workspace \
#   -v /sys/kernel/debug:/sys/kernel/debug:rw \
#   pcileech-dev bash
```
