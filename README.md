# RapidQuake AI Assistent Bot🌍🚨

It is an AI-powered earthquake preparedness and emergency response assistant. It helps users access safety guidance, emergency information, voice assistance, and disaster-related support through an interactive chatbot interface.

---

## 📖 Overview

RapidQuake AI Assistent Bot combines a conversational AI engine with real-time interaction to help people prepare for, respond to, and stay informed during earthquake-related emergencies. Users can ask questions, get safety instructions, and receive guidance through both text and voice — all from a simple web interface.

---

## ✨ Features

- 🤖 Interactive AI chatbot for earthquake safety guidance
- 🎙️ Voice assistance support
- 🆘 Emergency and disaster-related information on demand
- 💻 Lightweight, browser-based interface
- ⚡ Local AI inference using Ollama (no external API dependency)

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- FastAPI
- Uvicorn

### AI Engine
- Ollama
- Llama 3.2

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/vishakhabhadane1/rapidquake-ai-assistant.git
cd rapidquake-ai-assistant
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Start Ollama
```bash
ollama run llama3.2
```

### 4. Run the FastAPI Application
```bash
uvicorn app:app --reload
```

### 5. Open in Browser
```text
http://localhost:8000
```

---

## 🧰 Prerequisites

- Python 3.9+
- [Ollama](https://ollama.com/) installed locally
- pip (Python package manager)

---

## 📂 Project Structure

```text
rapidquake-ai-assistant/
├── app.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
├── static/              # CSS, JS, and frontend assets
├── templates/            # HTML templates
└── README.md
```
> Update this section to match your actual folder layout.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve RapidQuake:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
> Replace this with your actual license if different.

---

## 👩‍💻 Developer

**Vishakha Vinod Bhadane**
GitHub: [@vishakhabhadane1](https://github.com/vishakhabhadane1)

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!
