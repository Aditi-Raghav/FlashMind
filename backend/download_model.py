from transformers import pipeline

print("Triggering GPT-Neo model download...")
generator = pipeline("text-generation", model="EleutherAI/gpt-neo-1.3B")
print("Done.")