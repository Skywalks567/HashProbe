# HashProbe CLI 💻

The command-line interface for HashProbe. This is the core engine used for high-performance hash analysis and cracking.

## 🛠 Features

- **Hash Identification**: Automatically identifies the type of hash provided.
- **Dictionary Attack**: Tests hashes against wordlists (e.g., `rockyou.txt`).
- **Information Gathering**: Interactive generator for personalized wordlists.
- **Multiprocessing**: (In Progress) Optimized for multi-core CPUs.

## 🚀 Installation

Ensure you have Python 3.9+ installed.

```bash
# From the cli directory
pip install .
```

## 📖 Usage

### Basic Analysis
```bash
hashprobe -H 5d41402abc4b2a76b9719d911017c592
```

### Cracking with Wordlist
```bash
hashprobe -H 5d41402abc4b2a76b9719d911017c592 -b path/to/wordlist.txt
```

### Interactive Smart Wordlist
```bash
hashprobe -H <hash> -i -b
```

## ⚙️ Arguments

| Argument | Description |
| :--- | :--- |
| `-H`, `--hash` | The hash value to analyze (Required) |
| `-b`, `--bruteforce` | Enable dictionary attack (default: rockyou.txt) |
| `-i`, `--info` | Launch interactive info input for smart wordlist |
| `--threads` | Number of threads to use |
| `--limit` | Limit the number of attempts |

---
[Return to Main Menu](../README.md)
