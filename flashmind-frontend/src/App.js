// ✅ STEP 1: Import Router-related tools
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline'; // or /solid
import { BookmarkIcon } from '@heroicons/react/24/outline'; // or /solid for filled version


// ✅ STEP 2: Import your Navbar
import Navbar from './components/Navbar';

function App() {
  // ✅ STEP 3: Mock state for Navbar (user, dark mode, logout)
  const [notes, setNotes] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [user, setUser] = useState({ name: 'User' }); // or null if not logged in
  const [darkMode, setDarkMode] = useState(false);

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

  const handleLogout = () => {
    setUser(null);
  };

  return (
    // ✅ STEP 4: Add dark mode wrapper & router
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Navbar
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ✅ STEP 5: Use Routes for pages */}
        <Routes>
          <Route
            path="/"
            element={
              <header className="App-header bg-cyan-50 text-black p-6 dark:bg-gray-900">
                <textarea
                  onChange={(e) => setNotes(e.target.value)}
                  rows={10}
                  cols={50}
                  placeholder="Paste your lecture notes here..."
                  className="w-full p-2 border-2 border-cyan-700 dark:border-cyan-200 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-cyan-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y shadow-sm "
                />
                <br />

                <div className="flex flex-col items-center justify-center mt-4">
                  <button
                    className="py-3 mb-10 border border-cyan-700 text-cyan-700 bg-cyan-100 hover:border-transparent hover:bg-cyan-700 hover:text-white active:bg-cyan-700 mt-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white font-semibold py-2 px-4 rounded-full"
                    onClick={submitNotes}
                  >
                    Generate Flashcards
                  </button>

                  <img src="https://cdn-icons-png.flaticon.com/512/9100/9100649.png" className="App-logo animate-sway" alt="logo" />
                </div>

                <div className="flex flex-col md:flex-row justify-center items-stretch gap-x-20 gap-y-6 mt-10 px-4 md:px-12 mt-6">
                  <div className="flex-1 max-w-md p-4 bg-white dark:bg-gray-800 border border-cyan-200 rounded-xl shadow text-center text-cyan-700 dark:text-cyan-100 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer font-mono">
                    <code className="block mb-2 text-xl font-bold  mt-3">How To Get Flashcards ?</code>
                    <code className="block mb-4 text-gray-500 dark:text-gray-400 mt-2 text-base"> Paste the Lecture Notes or Text in the Textbox, click on 'Generate Flashcards', and you're done :) </code>
                    <button className="py-3 mb-3 border border-cyan-700 text-cyan-700 bg-cyan-100 hover:border-transparent hover:bg-cyan-700 hover:text-white active:bg-cyan-700 mt-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white font-semibold py-2 px-4 rounded-full  animate-pulseBorder">
                    Get Flashcards !
                    </button>
                  </div>

                  <div className="flex-1 max-w-md h-full p-4 bg-white dark:bg-gray-800 border border-cyan-200 rounded-xl ring shadow-xl ring-gray-900/5 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer font-mono">
                    <h3 class="text-gray-900 dark:text-white text-base font-medium tracking-tight "><code className="block mb-2 text-xl font-bold mt-5 dark:text-cyan-100">Saving Flashcards</code></h3>
                    <p class="text-gray-500 dark:text-gray-400 mt-2 text-base ">
                      <code className="block mb-4"> Click below to save your generated flashcards ! </code>
                    </p>
                    <div>
                      <span class="inline-flex items-center justify-center rounded-md bg-cyan-100 dark:bg-gray-900 border border-cyan-700 hover:bg-cyan-700 hover:text-white p-2 shadow-lg">
                        <BookmarkIcon className="h-6 w-6 text-cyan-700 dark:text-white hover:text-white" />
                      </span>
                    </div>
                  <button className="py-3 mb-3 border border-cyan-700 text-cyan-700 bg-cyan-100 hover:border-transparent hover:bg-cyan-700 hover:text-white active:bg-cyan-700 mt-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white font-semibold py-2 px-4 rounded-full animate-pulseBorder">
                    Save Flashcards !
                  </button>
                  </div>
                </div>

                <ul className="text-left mt-4">
                  {flashcards.map((card, i) => (
                    <li key={i} className="mb-4">
                      <b>Q:</b> {card.question} <br />
                      <b>A:</b> {card.answer}
                    </li>
                  ))}
                </ul>
              </header>
            }
          />

          {/* ✅ Placeholder routes (optional, for demo) */}
          <Route path="/users" element={<div className="p-4">Flashcards Page</div>} />
          <Route path="/dashboard" element={<div className="p-4">Test Stats Page</div>} />
          <Route path="/login" element={<div className="p-4">Login Page</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;