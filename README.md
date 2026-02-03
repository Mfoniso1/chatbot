# AI Chatbot System

> **Customizable RAG-powered chatbot with embeddable widget and admin dashboard**

A production-ready AI chatbot system that allows organizations to create their own AI assistants by uploading documents or providing URLs. The chatbot can be embedded into any website with a single script tag.

[![GitHub](https://img.shields.io/badge/GitHub-Mfoniso1%2Fchatbot-blue)](https://github.com/Mfoniso1/chatbot)

## 🌟 Features

- **🧠 RAG (Retrieval-Augmented Generation)**: Answers questions based on your uploaded documents
- **💬 Embeddable Widget**: Beautiful floating chat bubble that works on any website
- **⚙️ Admin Dashboard**: Manage documents, customize appearance, and configure settings
- **🚀 FastAPI Backend**: High-performance Python API with ChromaDB vector storage
- **🎨 Customizable UI**: Brand colors, bot names, and greeting messages
- **📄 Multi-Format Support**: PDF uploads and URL scraping

## 📂 Project Structure

```
chatbot/
├── backend/                 # FastAPI server + RAG engine
│   ├── main.py             # API endpoints
│   ├── rag_engine.py       # LangChain + ChromaDB logic
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment template
├── frontend/
│   ├── widget/             # Embeddable chat widget (React)
│   └── dashboard/          # Admin control panel (React)
├── test_embed.html         # Demo integration page
├── DEPLOYMENT.md           # Production hosting guide
└── WALKTHROUGH.md          # Full feature overview
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** (for frontend)
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/Mfoniso1/chatbot.git
cd chatbot
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GOOGLE_API_KEY=your_actual_api_key_here" > .env

# Start the server
python main.py
```

Backend will run on `http://localhost:8000`

### 3. Setup Admin Dashboard

```bash
cd frontend/dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Dashboard will run on `http://localhost:5173`

### 4. Test the Widget

Open `test_embed.html` in your browser to see the chatbot in action!

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
GOOGLE_API_KEY=your_gemini_api_key
PORT=8000
```

### Widget Integration

Add this to any website:

```html
<script src="https://your-cdn.com/widget.js"></script>
```

## 📖 Documentation

- **[WALKTHROUGH.md](./WALKTHROUGH.md)** - Complete feature guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production hosting instructions
- **[SETUP.md](./SETUP.md)** - Detailed setup guide

## 🤝 Contributing

This project is designed for collaboration! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- LangChain
- ChromaDB
- Google Gemini API

**Frontend:**
- React + Vite
- Framer Motion
- Lucide Icons
- Axios

## 📝 License

This project is open source and available under the MIT License.

## 🙋 Support

For questions or issues:
- Open an issue on GitHub
- Check the [WALKTHROUGH.md](./WALKTHROUGH.md) for detailed usage
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting help

---

**Built with ❤️ for developers who want to add AI to their websites**
