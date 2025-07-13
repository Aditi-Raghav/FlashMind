# Load GPT-Neo model (EleutherAI/gpt-neo-2.7B)

from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM, T5ForConditionalGeneration, T5Tokenizer
import re
model_name = "google/flan-t5-base"


tokenizer = T5Tokenizer.from_pretrained(model_name, model_max_length=1024)
model = T5ForConditionalGeneration.from_pretrained(model_name)
print("Loading T5 model...")  # <-- DEBUG
#tokenizer = AutoTokenizer.from_pretrained(model_name)
#model = AutoModelForCausalLM.from_pretrained(model_name)
generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer, device=-1) # -1 = CPU, change to 0 if using GPU (not likely on M1 Mac)
print("Model loaded!")  # <-- DEBUG

def generate_flashcards(text):
    print("Starting flashcard generation...")  # <-- DEBUG
    #prompt = f"summarize: Create 5-10 simple flashcards from this lecture text.\n\n{text}"
    '''prompt = f"""Generate 5 flashcards based on the following text. Format each as:

    Q: <question>
    A: <answer>

    Here is the text:
    {text}

    Flashcards:"""'''

    prompt = f""" Summarize input text in the exact format below:

Q: <question>
A: <answer>


Here is the input text:

{text}

"""


    print("Prompt length:", len(prompt))  # <-- Debug prompt size
    #import time
    #start = time.time()
    print(">>> Before generation")
    output = generator(prompt, max_new_tokens=256, temperature=0.3, do_sample=False, repetition_penalty=1.2, early_stopping=True, num_return_sequences=1,) # explicitly tell it when to stop
    print(output)
    print(">>> After generation")  # Does this ever print?
    #end = time.time()
    #print(f"⏱️ Generation took {end - start:.2f} seconds") # DEBUG
    raw_output = output[0]['generated_text'].strip()
    print("Model raw output:\n", raw_output)  # <-- Debug print
    #return parse_flashcards(raw_output)
    # Add the warning check here
    if "Q:" not in raw_output or "A:" not in raw_output:
        print("Warning: Output does not contain flashcard format!")

    flashcards = parse_flashcards(raw_output)
    print(f"Parsed {len(flashcards)} flashcards.")  # <-- DEBUG
    return flashcards

def parse_flashcards(raw_text):
    # Match Q: ... A: ... with optional spaces and tolerate missing newlines
    qa_pairs = re.findall(r"Q[:\-]?\s*(.*?)\s*A[:\-]?\s*(.*?)(?=\s*Q[:\-]|$)", raw_text, re.DOTALL | re.IGNORECASE)
    flashcards = [{"question": q.strip(), "answer": a.strip()} for q, a in qa_pairs]
    return flashcards

# ✅ STEP 4: TEST FUNCTION WHEN RUN DIRECTLY
if __name__ == "__main__":
    sample_text = "Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water."
    #print(generate_flashcards(sample_text))
    flashcards = generate_flashcards(sample_text)  # <-- DEBUG
    print("Flashcards generated:")
    for card in flashcards:
        print(f"Q: {card['question']}")
        print(f"A: {card['answer']}\n")
    #send_to_anki(flashcards)

print(generate_flashcards("Sunlight gives energy to plants to make glucose."))

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
