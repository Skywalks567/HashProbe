# HashProbe Web 🌐

A modern, high-performance web dashboard for HashProbe. This dashboard allows you to analyze and detect hash types through a beautiful user interface.

## 🚀 Getting Started (Local)

To run the web version locally, you need to start both the **Backend (Python)** and the **Frontend (Next.js)**.

### 1. Prerequisite
Ensure you have the virtual environment activated and dependencies installed (from the root directory).

### 2. Start Backend API
Open a terminal and run:
```bash
cd web
python api/main.py
```
The API will be available at `http://localhost:8000`.

### 3. Start Frontend
Open another terminal and run:
```bash
cd web
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

## 🛠 Features

- **Hash Identification**: Automatically identifies hash types using the core engine.
- **Premium UI**: Sleek dark-mode dashboard with glassmorphism and real-time animations.
- **Real-time Feedback**: Instant detection results with confidence scores.

## 🏗 Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Lucide React
- **Backend**: FastAPI (Python)
- **Shared Logic**: HashProbe Core Engine (CLI)

---
[Return to Main Menu](../README.md)
