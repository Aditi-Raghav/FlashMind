from fastapi import FastAPI, Form
from backend.generate_flashcards import generate_flashcards, send_to_anki
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FlashMind API is running"}

#@app.get("/favicon.ico")
#async def favicon():
#   return FileResponse("path/to/favicon.ico")

class GenerateRequest(BaseModel):
    notes: str
    send_to_anki_flag: bool = False

@app.post("/generate/")
def create_flashcards(request: GenerateRequest):
    flashcards = generate_flashcards(request.notes)
    if request.send_to_anki_flag:
        send_to_anki(flashcards)
    return {"flashcards": flashcards}