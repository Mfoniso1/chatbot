import os
from dotenv import load_dotenv

from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings,
    ChatGoogleGenerativeAI
)
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader, WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()


class RAGEngine:
    def __init__(self, db_directory="./chroma_db"):
        self.db_directory = db_directory

        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001"
        )

        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0.2
        )

        self.vector_store = Chroma(
            persist_directory=db_directory,
            embedding_function=self.embeddings
        )

        self.retriever = self.vector_store.as_retriever(search_kwargs={"k": 4})

        self.prompt = ChatPromptTemplate.from_template(
            """
            Answer the question using ONLY the context below.
            If the answer is not contained in the context, say you don't know.

            Context:
            {context}

            Question:
            {question}
            """
        )

        self.chain = self.prompt | self.llm | StrOutputParser()

    def ingest_pdf(self, file_path):
        docs = PyPDFLoader(file_path).load()
        self._process_documents(docs)

    def ingest_url(self, url):
        docs = WebBaseLoader(url).load()
        self._process_documents(docs)

    def _process_documents(self, documents):
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100
        )

        chunks = splitter.split_documents(documents)
        
        try:
            if self.vector_store:
                self.vector_store.add_documents(chunks)
            else:
                self.vector_store = Chroma.from_documents(
                    documents=chunks,
                    embedding=self.embeddings,
                    persist_directory=self.db_directory
                )
        except Exception as e:
            if "429" in str(e) or "ResourceHasBeenExhausted" in str(e):
                raise Exception("API Quota Exhausted: Could not create embeddings for the document. Please try again in a few minutes.")
            raise e

    def query(self, question: str) -> str:
        try:
            # Ensure retriever is ready
            if not self.retriever:
                return "System is initializing or knowledge base is empty."
            
            docs = self.retriever.invoke(question)

            if not docs:
                return "I couldn't find any relevant information in the provided context."

            context = "\n\n".join(doc.page_content for doc in docs)

            return self.chain.invoke({
                "context": context,
                "question": question
            })
        except Exception as e:
            if "429" in str(e) or "ResourceHasBeenExhausted" in str(e):
                return "The AI's quota is exhausted. Please try again in 1-2 minutes or use a different API key."
            raise e
