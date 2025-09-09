# ai_flashcards.py
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()  # this will read .env from your backend folder

# --- Gemini API key ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Please set GEMINI_API_KEY in your .env file")

# --- Configure Gemini client ---
genai.configure(api_key=GEMINI_API_KEY)

# --- Use Gemini model ---
model = genai.GenerativeModel("gemini-1.5-pro-001")

def generate_from_notes(notes: str):
    """
    Accepts notes text and returns a list of flashcards.
    Each flashcard is a dict: {'question': ..., 'answer': ...}
    """
    prompt = f"""
    Read the following notes and generate concise flashcards in JSON format.
    Each flashcard should be an object with 'question' and 'answer'.
    Notes: {notes}
    """

    response = model.generate_content(prompt)
    text = response.text

    try:
        flashcards = json.loads(text)
    except json.JSONDecodeError:
        # fallback if JSON is malformed
        flashcards = []
        lines = text.split("\n")
        for line in lines:
            if "Q:" in line and "A:" in line:
                q, a = line.split("A:", 1)
                flashcards.append({
                    "question": q.replace("Q:", "").strip(),
                    "answer": a.strip()
                })

    return flashcards
