from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    if not os.getenv("ANTHROPIC_API_KEY"):
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")
    
    try:
        user_message = request.message
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1000,
            system="You are a helpful AI assistant with expertise in finance, invoicing, and business operations.",
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        return {"reply": response.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Anthropic API: {str(e)}")