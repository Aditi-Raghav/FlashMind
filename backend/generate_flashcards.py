# Load GPT-Neo model (EleutherAI/gpt-neo-2.7B)

from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import re
model_name = "EleutherAI/gpt-neo-1.3B"

print("Loading GPT-Neo model...")  # <-- DEBUG
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
generator = pipeline("text-generation", model=model, tokenizer=tokenizer, device=-1) # -1 = CPU, change to 0 if using GPU (not likely on M1 Mac)
print("Model loaded!")  # <-- DEBUG

def generate_flashcards(text):
    print("Starting flashcard generation...")  # <-- DEBUG
    prompt = f"""
    Create 5-10 simple flashcards from this lecture text.
    Format each flashcard like this exactly:

    Q: A question
    A: The answer

    Lecture Notes:
    {text}
    """

    print("Prompt length:", len(prompt))  # <-- Debug prompt size
    import time
    start = time.time()
    print(">>> Before generation")
    output = generator(prompt, max_new_tokens=128, temperature=0.7, do_sample=True, repetition_penalty=1.2, pad_token_id=tokenizer.eos_token_id ) # explicitly tell it when to stop
    print(">>> After generation")  # Does this ever print?
    end = time.time()
    print(f"⏱️ Generation took {end - start:.2f} seconds") # DEBUG
    raw_output = output[0]['generated_text'].strip()
    print("Model raw output:\n", raw_output)  # <-- Debug print
    #return parse_flashcards(raw_output)

    flashcards = parse_flashcards(raw_output)
    print(f"Parsed {len(flashcards)} flashcards.")  # <-- DEBUG
    return flashcards

def parse_flashcards(raw_text):
    qa_pairs = re.findall(r"Q:\s*(.*?)\nA:\s*(.*?)(?=\nQ:|\Z)", raw_text, re.DOTALL)
    flashcards = [{"question": q.strip(), "answer": a.strip()} for q, a in qa_pairs]
    return flashcards

if __name__ == "__main__":
    sample_text = "Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water."
    #print(generate_flashcards(sample_text))
    flashcards = generate_flashcards(sample_text)  # <-- DEBUG
    print("Flashcards generated:")
    for card in flashcards:
        print(f"Q: {card['question']}")
        print(f"A: {card['answer']}\n")
    #send_to_anki(flashcards)


import requests

def send_to_anki(flashcards, deck_name="FlashMind"):
    for card in flashcards:
        payload = {
            "action": "addNote",
            "version": 6,
            "params": {
                "note": {
                    "deckName": deck_name,
                    "modelName": "Basic",
                    "fields": {
                        "Front": card["question"],
                        "Back": card["answer"]
                    },
                    "options": {
                        "allowDuplicate": False
                    },
                    "tags": ["flashmind"]
                }
            }
        }
        response = requests.post("http://localhost:8765", json=payload)
        if response.status_code != 200:
            print(f"Failed to add card: {card['question']}")
        else:
            print(f"Added card: {card['question']}")

'''from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "EleutherAI/gpt-neo-1.3B"

try:
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    print("GPT-Neo model and tokenizer loaded successfully!")
except Exception as e:
    print("Error loading model/tokenizer:", e)'''