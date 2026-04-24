# HashProbe 🔍

HashProbe is a powerful, modern hash analysis and dictionary-based testing tool designed for cybersecurity professionals and forensic analysts. It simplifies the process of identifying unknown hashes and testing them against high-performance wordlists.

---

## 📂 Project Structure

This project is divided into two main components:

- **[CLI Version](./cli/)**: The core engine of HashProbe. A powerful terminal-based tool for fast hash detection and multi-threaded cracking.
- **[Web Version](./web/)**: A user-friendly web interface for those who prefer a visual dashboard. (Currently under development).

---

## ✨ Key Features

- **🚀 Auto-Detection**: Intelligent scoring system to identify MD5, SHA1, SHA256, NTLM, and more.
- **⚡ Fast Cracking**: Multi-threaded dictionary attack support.
- **🧠 Smart Wordlist**: Built-in generator to create personalized wordlists based on target information.
- **🧩 Base64 Decoding**: Automatic detection and preview of Base64 encoded strings.
- **📊 Detailed Stats**: View attempts, speed, and confidence levels for each analysis.

---

## 🚦 Quick Start

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skywalks567/HashProbe.git
   cd HashProbe
   ```

2. **Setup CLI:**
   ```bash
   cd cli
   pip install .
   ```

3. **Run HashProbe:**
   ```bash
   # Test with the included small wordlist
   hashprobe -H 5f4dcc3b5aa765d61d8327deb882cf99 -b cli/src/hashprobe/wordlists/test.txt
   ```

---

## 📚 Wordlists

For performance and security reasons, large wordlists like `rockyou.txt` are **not included** in this repository.

- **`test.txt`**: A small wordlist included for testing the installation.
- **`rockyou.txt`**: You can download the standard RockYou wordlist from [Kaggle](https://www.kaggle.com/datasets/wjburns/common-password-list-rockyoutxt) or [GitHub](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt).
  
Place your downloaded wordlists in `cli/src/hashprobe/wordlists/` to use them with the default paths.

---

## ⚖️ Disclaimer

This tool is for **educational and authorized security testing purposes only**. Using this tool against targets without prior permission is illegal. Please read the full [DISCLAIMER.md](./DISCLAIMER.md) before proceeding.

---

Developed by [Raymond Frans Dodi Situmorang](https://github.com/Skywalks567)
