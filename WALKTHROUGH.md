# AI Chatbot Project Walkthrough

I have successfully built a customizable AI Chatbot system using the RAG (Retrieval-Augmented Generation) architecture.

## 1. Backend: The Brain (FastAPI + LangChain + Gemini)
- **RAG Engine**: Located in `backend/rag_engine.py`. It uses Google's Gemini API and ChromaDB to store and retrieve organizational knowledge.
- **REST API**: Located in `backend/main.py`. Provides endpoints for:
  - `/chat`: Ask the bot questions.
  - `/ingest/pdf`: Upload and index document files.
  - `/ingest/url`: Scrape and index website content.

## 2. Frontend: The Face (Embeddable Widget)
- **React Widget**: Located in `frontend/widget`. A floating chat bubble that can be added to any site.
- **Single-File Bundle**: Built to `frontend/widget/dist/widget.js`. 
- **Demo**: Open `test_embed.html` to see the widget in action. It communicates with the backend on `http://localhost:8000`.

## 3. Frontend: The Control (Admin Dashboard)
- **Management UI**: Located in `frontend/dashboard`. Allows organizations to:
  - Upload PDFs and URLs to their knowledge base.
  - Customize the bot's name, greeting, and primary colors.
  - Preview the bot live as they make changes.
  - Copy the integration script tag.

## How to Run Everything

### Step 1: Start the Backend
1. Go to `backend/`.
2. Ensure your `.env` file has your `GOOGLE_API_KEY`.
3. Run `python main.py`.

### Step 2: Access the Dashboard
1. Go to `frontend/dashboard/`.
2. Run `npm run dev`.
3. Open the URL (usually `http://localhost:5173`) to manage your bot.

### Step 3: Embed the Bot
1. Open `test_embed.html` in your browser.
2. Chat with your customized AI assistant!

---
> [!TIP]
> Always ensure the backend is running before using the dashboard or the widget, as they rely on the backend API for intelligence.
