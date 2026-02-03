from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from rag_engine import RAGEngine
import uvicorn
import os
import shutil

app = FastAPI(title="Custom AI Chatbot API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Engine
rag = RAGEngine()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Chatbot API is running"}

@app.post("/chat")
async def chat(question: str = Form(...)):
    try:
        answer = rag.query(question)
        return {"question": question, "answer": answer}
    except Exception as e:
        print(f"ERROR IN CHAT ENDPOINT: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}, 500

@app.post("/ingest/pdf")
async def ingest_pdf(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        rag.ingest_pdf(temp_path)
        return {"status": "success", "message": f"Ingested {file.filename}"}
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.post("/ingest/url")
async def ingest_url(url: str = Form(...)):
    rag.ingest_url(url)
    return {"status": "success", "message": f"Ingested URL: {url}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
