// ✅ STEP 1: Import Router-related tools
// users+auth backend, login to save toast, flashcards, test stats, backend, get button->paste, wait mssg generating..
// toaster and darktheme retention, onload login, logout, users done
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkIcon } from '@heroicons/react/24/outline'; // or /solid for filled version
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

// ✅ STEP 2: Import your Navbar
import Navbar from './components/Navbar';

function App() {
  // ✅ STEP 3: Mock state for Navbar (user, dark mode, logout)
  const [notes, setNotes] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [user, setUser] = useState(null); // or { name: 'User' } if logged in
  const [darkMode, setDarkMode] = useState(false);

  // 1️⃣ Initial load — decide dark mode based on saved or system preference // STEP 1: Load theme from localStorage or system preference on first load
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const shouldUseDark = savedTheme
    ? savedTheme === 'dark'
    : prefersDark;

  setDarkMode(shouldUseDark);
  document.documentElement.classList.toggle('dark', shouldUseDark);
}, []);

// 2️⃣ Update DOM + save when darkMode changes // STEP 2: Apply dark class and save to localStorage when darkMode changes
useEffect(() => {
  document.documentElement.classList.toggle('dark', darkMode);
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}, [darkMode]);


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

      <Toaster 
      position="top-center" 
      toastOptions={{
        className:
          'bg-white text-black border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700',
      }}
      //toastOptions={{
        //className: darkMode
          //? 'bg-gray-800 text-white border border-gray-700'
          //: 'bg-white text-black border border-gray-200',
        //success: {
        //iconTheme: {
          //primary: darkMode ? '#10b981' : '#10b981',
          //secondary: darkMode ? '#1f2937' : '#e5e7eb',
        //},
       //},
      //}}
      />

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
              <header className="App-header bg-cyan-50 text-black p-6 dark:bg-gray-900 font-lexend">
                {/* ✅ Intro Text   🧚🏻 💡 */}
                <h1 className="text-4xl mt-8 font-semibold text-center text-cyan-900 dark:text-cyan-200 mb-4">
                Transform your lecture notes into smart flashcards !
                </h1>
                <div className="text-lg text-center text-cyan-900 dark:text-gray-300 mb-10">
                Making studying faster, easier, and more effective with interactive flashcards.
                Get FlashMind and start learning smarter today! {' '} <br />
                
                Click <a href="/login" className="text-cyan-400 hover:underline"> here </a> to get started.
                </div>

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
                    Get Flashcards ✨
                    </button>
                  </div>

                  <div className="flex-1 max-w-md h-full p-4 bg-white dark:bg-gray-800 border border-cyan-200 rounded-xl ring shadow-xl ring-gray-900/5 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer font-mono">
                    <h3 className="text-gray-900 dark:text-white text-base font-medium tracking-tight "><code className="block mb-2 text-xl font-bold mt-5 text-cyan-700 dark:text-cyan-100">Saving Flashcards !</code></h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-base ">
                      <code className="block mb-4"> Click below to save your generated flashcards. </code>
                    </p>
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-cyan-100 dark:bg-gray-900 border border-cyan-700 hover:bg-cyan-700 hover:text-white p-2 shadow-lg">
                        <BookmarkIcon className="h-6 w-6 text-cyan-700 dark:text-white hover:text-white" />
                      </span>
                    </div>
                  <button className="py-3 mb-3 border border-cyan-700 text-cyan-700 bg-cyan-100 hover:border-transparent hover:bg-cyan-700 hover:text-white active:bg-cyan-700 mt-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white font-semibold py-2 px-4 rounded-full animate-pulseBorder">
                    Save Flashcards ↓
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
          <Route path="/flashcards" element={<div className="p-4">Flashcards Page</div>} />
          <Route path="/dashboard" element={<div className="p-4">Test Stats Page</div>} />
          <Route path="/login" element={<Login setUser={setUser} darkMode={darkMode} />} /> 
          <Route path="/signup" element={<Signup setUser={setUser}  darkMode={darkMode} />} />
          <Route path="/users" element={user ? <User user={user} setUser={setUser} darkMode={darkMode} /> : <Login setUser={setUser} darkMode={darkMode} />}/> {/* {<User user={user} setUser={setUser} darkMode={darkMode} />} */}
        </Routes>

        <footer className="bg-cyan-100 dark:bg-gray-700 text-cyan-800 dark:text-cyan-200 text-sm text-center py-6 border-t dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="">&copy; {new Date().getFullYear()} FlashMind. All rights reserved.</p>
    
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
              {/* GitHub Repo */}
              <a
                href="https://github.com/Aditi-Raghav/FlashMind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-700 dark:text-cyan-200 hover:underline font-medium"
              >
                GitHub Repo
              </a>

              {/* Credit- Made with ❤️ by You*/}
              <a
                href="mailto:your.email@example.com"
                className="text-sm text-cyan-700 dark:text-cyan-200 font-medium mt-2 md:mt-0 hover:underline"
              >
              Contact
              </a>


              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className="w-5 h-5 fill-cyan-700 dark:fill-cyan-200 hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1s-1.64.96-3.1 1.52a4.48 4.48 0 00-7.64 4.1A12.94 12.94 0 013 2.1a4.48 4.48 0 001.39 6 4.48 4.48 0 01-2-.55v.06a4.49 4.49 0 003.6 4.4 4.5 4.5 0 01-2 .08 4.49 4.49 0 004.19 3.12A9 9 0 013 19.54 12.94 12.94 0 009.29 21c7.55 0 11.68-6.25 11.68-11.68 0-.18 0-.35-.01-.53A8.35 8.35 0 0023 3z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg className="w-5 h-5 fill-cyan-700 dark:fill-cyan-200 hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.3h.05c.5-.95 1.7-2.3 3.5-2.3 3.8 0 4.5 2.5 4.5 5.8V24h-4v-9.5c0-2.3-.04-5.3-3.3-5.3-3.3 0-3.8 2.6-3.8 5.1V24h-4V8z" />
                  </svg>
                </a>
                <a href="https://github.com/Aditi-Raghav/FlashMind" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg className="w-5 h-5 fill-cyan-700 dark:fill-cyan-200 hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.17c-3.34.73-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.75-1.34-1.75-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1 .1-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.37 1.25-3.2-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.78.83 1.25 1.9 1.25 3.2 0 4.58-2.8 5.6-5.48 5.9.43.37.81 1.1.81 2.23v3.3c0 .32.22.69.82.58A12 12 0 0012 0z" />
                  </svg>
                </a>
                <a href="mailto:your.email@example.com" aria-label="Email" className="hover:scale-110 transition">
                  <svg className="w-5 h-5 fill-cyan-700 dark:fill-cyan-200" viewBox="0 0 24 24">
                    <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.8l-10 6.2L2 5.8V4zm0 4.2v11.8a2 2 0 002 2h16a2 2 0 002-2V8.2l-10 6.2L2 8.2z" />
                  </svg>
                </a>

              </div>

              {/* Newsletter Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Thanks for subscribing!');
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="px-2 py-1 rounded border border-cyan-500 text-sm text-black dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-cyan-700 text-white rounded hover:bg-cyan-800 dark:bg-cyan-200 dark:text-gray-900"
                >
                  Subscribe
                </button>
              </form>

            </div>

          </div>
        </footer>

      </Router>
    </div>
  );
}
  
export default App;