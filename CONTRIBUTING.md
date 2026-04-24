# Contributing to HashProbe

First off, thank you for considering contributing to HashProbe! It's 
people like you that make HashProbe such a great tool.

## Table of Contents

- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)


## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid 
duplicates. When you create a bug report, include as many details as 
possible.

**Great bug reports include:**
- A clear, descriptive title
- Steps to reproduce the behavior
- Expected behavior vs actual behavior
- Environment details (OS, Python version)

### 💡 Suggesting Features

Feature requests are welcome!

**Great feature requests include:**
- Clear problem statement: "I'm frustrated when..."
- Proposed solution
- Alternative solutions you've considered


## Development Setup

### Prerequisites

- **Python 3.9+** (Core CLI)
- **Node.js** (Web Dashboard - optional)
- **Git**

### Getting Started

```bash
# 1. Clone repo locally
git clone https://github.com/Skywalks567/HashProbe.git
cd HashProbe

# 2. Setup Virtual Environment (Recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install CLI dependencies
cd cli
pip install -e .

# 4. Create a branch for your changes
git checkout -b feature/your-feature-name
```

### Common Commands

| Command | Description |
|---------|-------------|
| `hashprobe -H <hash>` | Run the CLI tool |
| `pip install -e .` | Install in editable mode |
| `pytest` | Run test suite (if implemented) |
| `black .` | Auto-format code |

## Pull Request Process

### Before Submitting

1. **Test your changes** manually or with the test suite.
2. **Update documentation** if you've changed APIs or added features.

### Submitting

1. Push your branch to your fork or origin:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request against the `main` branch.

3. Wait for review.

## Style Guide

### Commit Messages

We follow [Conventional Commits](https://conventionalcommits.org/):

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `refactor`: Code change
- `chore`: Maintenance

**Examples:**
```
feat(cracker): add SHA3 support
fix(detector): improve NTLM detection
docs(readme): update installation steps
```

### Code Style

- Use **Black** for Python formatting
- Use **ESLint** for Web (if applicable)
- Write self-documenting code with meaningful variable names

---

Thank you for contributing! 🎉