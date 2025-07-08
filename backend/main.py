from fastapi import FastAPI, Form
from backend.generate_flashcards import generate_flashcards, send_to_anki

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FlashMind API is running"}

@app.post("/generate/")
def create_flashcards(notes: str = Form(...), send_to_anki_flag: bool = Form(False)):
    flashcards = generate_flashcards(notes)
    if send_to_anki_flag:
        send_to_anki(flashcards)
    return {"flashcards": flashcards}