if __name__ == "__main__":
    from pprint import pprint

    # Test with a URL (YouTube or article)
    result = process_url_to_flashcards("https://en.wikipedia.org/wiki/Artificial_intelligence", num_flashcards=3)
    pprint(result)

    # Or test with plain text
    sample_text = """Artificial intelligence (AI) refers to the simulation of human intelligence in machines. These systems are designed to perform tasks that normally require human intelligence."""
    result = process_text_to_flashcards(sample_text, num_flashcards=3)
    pprint(result)
