import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [notes, setNotes] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const submitNotes = async () => {
    const formData = new FormData();
    formData.append('notes', notes);

    const res = await fetch('http://localhost:8000/generate/', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setFlashcards(data.flashcards);
  };

  return (
    <div>
      <header className="App-header">
      <textarea onChange={e => setNotes(e.target.value)} rows={10} cols={50} />
      <br />
      <button onClick={submitNotes}>Generate Flashcards</button>

      <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Get Flashcards !</code>
        </p>

      <ul>
        {flashcards.map((card, i) => (
          <li key={i}>
            <b>Q:</b> {card.question} <br />
            <b>A:</b> {card.answer}
          </li>
        ))}
      </ul>
      </header>
    </div>
  );
}

export default App;