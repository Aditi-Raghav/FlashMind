const response = await fetch("http://localhost:5000/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: inputText,
    num: 5
  })
});

const data = await response.json();
console.log(data.flashcards);
