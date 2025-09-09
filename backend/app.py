from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.orm import Session
import crud, schemas
from database import SessionLocal, engine, Base
import models
from ai_flashcards import generate_from_notes
from typing import List
from dotenv import load_dotenv
load_dotenv()


# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- User Signup ---
@app.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)

# --- User Login ---
@app.post("/login", response_model=schemas.User)
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

# --- Create Flashcard ---
@app.post("/flashcards", response_model=schemas.Flashcard)
def create_flashcard(flashcard: schemas.FlashcardCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_flashcard(db, flashcard, user_id)

# --- Get Flashcards by User ---
@app.get("/users/{user_id}/flashcards", response_model=List[schemas.Flashcard])
def get_flashcards(user_id: int, db: Session = Depends(get_db)):
    return crud.get_flashcards_by_user(db, user_id)

# --- Generate Flashcards from Notes using Gemini ---
@app.post("/generate-flashcards", response_model=List[schemas.Flashcard])
def generate_flashcards(
    notes: str = Body(..., embed=True),
    user_id: int = Body(...),
    db: Session = Depends(get_db)
):
    try:
        # Generate flashcards using Gemini
        flashcards_data = generate_from_notes(notes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating flashcards: {e}")

    saved_flashcards = []
    for fc in flashcards_data:
        # Make sure Gemini output has both keys
        if "question" in fc and "answer" in fc:
            flashcard_create = schemas.FlashcardCreate(**fc)
            flashcard = crud.create_flashcard(db, flashcard_create, user_id)
            saved_flashcards.append(flashcard)
        else:
            # skip malformed flashcards
            continue

    if not saved_flashcards:
        raise HTTPException(status_code=500, detail="No valid flashcards were generated.")

    return saved_flashcards
