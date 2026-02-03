# Setup Instructions

Follow these steps to get your AI Chatbot running:

## 1. Backend Setup
1.  **Open a terminal** in `c:\Users\DELL\Downloads\chatbot\backend`.
2.  **Create a `.env` file**:
    - Copy `.env.example` to `.env`.
    - Open `.env` and paste your Gemini API Key in the `GOOGLE_API_KEY` field.
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the Server**:
    ```bash
    python main.py
    ```
    The API will be available at `http://localhost:8000`.

## 2. Testing the Backend
You can use a tool like Postman or simple `curl` commands to test:
- **Check Status**: `GET http://localhost:8000/`
- **Ingest a URL**: 
  ```bash
  curl -X POST -F "url=https://en.wikipedia.org/wiki/Artificial_intelligence" http://localhost:8000/ingest/url
  ```
- **Chat**:
  ```bash
  curl -X POST -F "question=What is AI?" http://localhost:8000/chat
  ```

## 3. Next Steps (Frontend)
- I am now ready to build the **Chat Widget** and **Admin Dashboard**.
- Once the backend is running and you've added your API key, let me know!
