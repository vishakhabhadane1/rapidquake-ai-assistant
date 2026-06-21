from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import requests

app = FastAPI(title="RapidQuake AI Assistant")

# Static Files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

# Chat Memory
chat_history = []

from typing import Optional

class ChatRequest(BaseModel):
    message: str
    location: Optional[dict] = None

# Home Page
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# Chat Endpoint
@app.post("/chat")
async def chat(data: ChatRequest):

    msg = data.message.lower()

    # Emergency Detection
    if "trapped" in msg:
        return {
            "response":
            "🚨 Emergency Detected!\n\n"
            "Please share:\n"
            "1. Your location\n"
            "2. Number of people trapped\n"
            "3. Injury status"
        }

    if "ambulance" in msg:
        return {
            "response": "🚑 Emergency Ambulance Number: 108"
        }

    if "fire" in msg:
        return {
            "response": "🔥 Fire Emergency Number: 101"
        }

    if "police" in msg:
        return {
            "response": "👮 Police Emergency Number: 100"
        }

    if "shelter" in msg:
        return {
            "response":
            "🏠 Nearby Shelters:\n\n"
            "1. Community Hall\n"
            "2. City School Ground\n"
            "3. Municipal Shelter Center"
        }

    # Store User Message
    chat_history.append(f"User: {data.message}")

    # Keep last 10 messages
    context = "\n".join(chat_history[-10:])

    prompt = f"""
You are RapidQuake Assistant.

Responsibilities:
- Answer general questions
- Help during earthquakes
- Give safety guidance
- Explain emergency preparedness
- Remain calm and professional
- Keep answers short and clear

Conversation:
{context}

Assistant:
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2:3b",
                "prompt": prompt,
                "stream": False
            },
            timeout=120
        )

        answer = response.json()["response"]

        # Store Assistant Response
        chat_history.append(f"Assistant: {answer}")

        return {
            "response": answer
        }

    except Exception as e:
        return {
            "response": f"Error connecting to Ollama: {str(e)}"
        }
    
