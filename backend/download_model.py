from transformers import pipeline

print("Triggering T5 model download...")
# For text-to-text generation, use "t5-small" or "t5-base" or "t5-large" as you prefer
generator = pipeline("text2text-generation", model="t5-base")
print("Done.")