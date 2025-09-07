from transformers import pipeline, T5ForConditionalGeneration, T5Tokenizer
import re

model_name = "google/flan-t5-large"

print("🔄 Loading model...")
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)
generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer, device=-1)
print("✅ Model loaded!")

def generate_flashcards(text):
    prompt = f"""Create 3 flashcards from the following text in the format:
Q: <question>
A: <answer>

Text:
{text}

Flashcards:
Q:"""

    print("⚙️ Generating flashcards...")
    output = generator(
        prompt,
        max_new_tokens=256,
        num_return_sequences=1,
        repetition_penalty=1.2
    )

    raw_output = output[0]["generated_text"].strip()
    print("📦 Raw Output:\n", raw_output)

    if "Q:" not in raw_output or "A:" not in raw_output:
        print("❗ No flashcards detected.")
        return []

    return parse_flashcards("Q:" + raw_output)  # Ensure first Q is included

def parse_flashcards(raw_text):
    qa_pairs = re.findall(r"Q[:\-]?\s*(.*?)\s*A[:\-]?\s*(.*?)(?=\nQ[:\-]|$)", raw_text, re.DOTALL | re.IGNORECASE)
    return [{"question": q.strip(), "answer": a.strip()} for q, a in qa_pairs]

if __name__ == "__main__":
    sample_input = input("🔡 Enter your text to generate flashcards:\n")
    flashcards = generate_flashcards(sample_input)

    print("\n🧠 Flashcard Output:\n")
    for card in flashcards:
        print(f"Q: {card['question']}")
        print(f"A: {card['answer']}\n")
