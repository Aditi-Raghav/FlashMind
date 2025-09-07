// ✅ STEP 1: Import Router-related tools
// users+auth backend, login to save toast, flashcards, test stats, backend, get button->paste, wait mssg generating..
// toaster and darktheme retention, onload login, logout, users done
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { BookmarkIcon } from '@heroicons/react/24/outline'; // or /solid for filled version
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  const fullPlaceholder = "Paste your lecture notes here...";
  const [placeholder, setPlaceholder] = useState('');
  const [index, setIndex] = useState(0);

  const fullUrlPlaceholder = "Enter a reference website URL";
  const [urlPlaceholder, setUrlPlaceholder] = useState('');
  const [urlIndex, setUrlIndex] = useState(0);


  useEffect(() => {
    if (index < fullPlaceholder.length) {
      const timeout = setTimeout(() => {
        setPlaceholder((prev) => prev + fullPlaceholder[index]);
        setIndex((prev) => prev + 1);
      }, 80); // typing speed in ms

      return () => clearTimeout(timeout);
    }
  }, [index]);

  useEffect(() => {
    if (urlIndex < fullUrlPlaceholder.length) {
      const timeout = setTimeout(() => {
        setUrlPlaceholder((prev) => prev + fullUrlPlaceholder[urlIndex]);
        setUrlIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [urlIndex]);
  

  const [url, setUrl] = useState('');
  const [pdf, setPdf] = useState(null);

  function ScrollToHashElement() {
    const location = useLocation();
  
    useEffect(() => {
      if (location.hash) {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]);
  
    return null;
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const feedback = e.target.elements[0].value.trim();
    if (feedback) {
      console.log('User review:', feedback);
      toast.success('Thank you for your feedback!');
      e.target.reset();
    }
  };
  
  useEffect(() => {
    //AOS.init({ duration: 1000 }); // animation duration 1s
    AOS.init({ once: true });
    AOS.refresh();  // refresh on load, ensures all elements registered
  }, []);
  


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

      <ScrollToHashElement />

        {/* ✅ STEP 5: Use Routes for pages */}
        <Routes>
          <Route
            path="/"
            element={
              <header className="App-header bg-cyan-50 text-black p-0 dark:bg-gray-900 font-lexend"> {/* p-6 in header, text-[#4A3F35], bg-[#FAF9F6]*/}
                {/* ✅ Intro Text   🧚🏻 💡 */}

                <img
                  src="https://assets.designhill.com/resize_img.php?atyp=st_page_file&pth=ft_bt_bobirtiibi_org%7C%7CBT188410%7C%7Cbcm-one-bg-img-rgt-three-img-info_bg_img&flp=1573469001-16321605135dc93b497aa7a2-90415826.svg"
                  //src="https://s3.ca-central-1.amazonaws.com/tandral.public.files/blog_page/images/blog_flascards.webp" //https://cdn.creazilla.com/cliparts/7794451/flashcards-clipart-xl.png
                  alt="Colorful index cards"
                  className="w-full h-96 object-cover"
                />


                <h1 className="text-7xl px-40 mt-14 font-semibold text-center text-cyan-900 dark:text-cyan-200 mb-4">
                Transform your lecture notes into smart flashcards !
                </h1>

                <div className="px-6 text-lg text-center text-cyan-800 dark:text-gray-300 mb-16">
                  Turning passive notes into active learning experiences—quickly, intelligently, and intuitively.
                </div> 

                <div className="overflow-hidden whitespace-nowrap bg-cyan-100 dark:bg-gray-900">
                  <div className="animate-marquee inline-block py-1 text-cyan-800 dark:text-gray-300 text-md font-medium">
                    Get FlashMind and start learning smarter today! {' '}              
                    Click <a href="/login" className="text-cyan-400 hover:underline"> here </a> to get started.&nbsp;&nbsp;&nbsp;
                    Get FlashMind and start learning smarter today! {' '}             
                    Click <a href="/login" className="text-cyan-400 hover:underline"> here </a> to get started.             &nbsp;&nbsp;&nbsp;
                  </div>
                </div>

                {/*  Gotcha! Here’s a feature-focused highlight version for you, no fluff:
                     Details + Moving + Save + BG + animation + data-aos="fade-up"?
                     Interactive & Personalized: Tailors study aids to your content and learning style.
                     Time-Saving: Cuts down hours of prep to just seconds.
                     Smart Study Assistant: Helps you focus on learning, not organizing.  */}





                <div className="bg-cyan-100 dark:bg-gray-900 py-20 px-6">
                <div className="mx-auto mt-20 max-w-4xl bg-cyan-50 dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
                  <h1 className="text-5xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8 text-center">
                    FlashMind
                  </h1> 
                  <p className="text-gray-600 font-semibold dark:text-white mb-14 text-center sm:text-2xl text-xl">
                    From Chaos to Clarity — One Flashcard at a Time {/* Your notes, but way cooler and smarter. */}
                  </p>
                  {/* Textarea */}
                  <h2 className='text-center text-cyan-700 dark:text-gray-100 mb-2 text-lg '> Flashcards from Text Notes </h2>
                  <div className="flex justify-center">
                    <textarea
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                      cols={50}
                      placeholder={placeholder} //"Paste your lecture notes here..."
                      className="sm:w-1/2 w-2/3 mx-auto p-2 border-2 mb-12 border-cyan-700 dark:border-cyan-200 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-cyan-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y shadow-sm "
                    />
                  </div>
                  <br />

                  {/* URL input */}
                  <h2 className='text-center text-cyan-700 dark:text-gray-100 mb-2 text-lg '> Flashcards from URL </h2>
                  <div className="flex flex-col items-center gap-4">
                    <input
                      type="url"
                      placeholder={urlPlaceholder}
                      className="sm:w-1/3 w-2/3 p-2 mb-12 border-2 border-cyan-700 dark:border-cyan-200 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-cyan-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  {/* PDF upload */} {/*file:font-semibold*/}
                  <h2 className='text-center text-cyan-700 dark:text-gray-100 mb-2 text-lg'> Flashcards from PDF File </h2>
                  <div className="flex flex-col items-center gap-4">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="sm:w-1/3 w-2/3 h-32 p-2 mb-12 border-2 border-dashed border-cyan-700 dark:border-cyan-200 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full
                      file:text-base
                      file:bg-cyan-700 file:text-white
                      hover:file:bg-cyan-900
                      dark:file:bg-cyan-100 dark:file:text-cyan-700 file:border-0
                      dark:hover:file:bg-cyan-200" 
                      onChange={(e) => setPdf(e.target.files[0])} 
                    />
                  </div>
                  {pdf && (
                    <p className="text-sm text-center text-cyan-800 dark:text-cyan-100 mt-2">
                      Selected file: {pdf.name}
                    </p>
                  )}

                  <div className="flex flex-col items-center justify-center mt-4">
                    <button
                      className="py-3 mb-10 border border-cyan-900 text-white bg-cyan-700 hover:border-transparent hover:bg-cyan-900 hover:text-white active:bg-cyan-700 mt-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white py-2 px-4 rounded-full"
                      onClick={submitNotes}
                    >
                      Generate Flashcards
                    </button>
  
                    <img src="https://cdn-icons-png.flaticon.com/512/9100/9100649.png" className="App-logo animate-sway mb-6" alt="logo" />
                  </div>
                </div>
                </div> 
  

                <div id="overview-section" className="pt-32 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-20 py-12 bg-cyan-50 dark:bg-gray-900 text-cyan-900 dark:text-cyan-100">
                  {/* Left Side: Heading + Text */}
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-[2.8rem] md:text-30px font-semibold mb-4">
                      Learn Smarter, Not Harder
                    </h2>
                    <p className="text-md md:text-lg text-cyan-800 dark:text-cyan-200">
                      Turn your notes into powerful flashcards and boost your retention. FlashMind helps you study efficiently, whether you're prepping for exams or just brushing up.
                    </p>
                    <p className="mt-4 text-md md:text-lg text-cyan-800 dark:text-cyan-200">
                      Powered by generative AI, FlashMind instantly turns your notes or PDFs into personalized flashcards — no manual work needed. It's like having a smart study assistant that helps you focus on what matters most: learning.
                    </p>

                    <button className="mt-6 px-6 py-3 bg-cyan-700 text-white rounded-full hover:bg-cyan-900 animate-pulseBorder dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white">
                      Contact Us
                    </button>
                  </div>

                  {/* Right Side: Image */}
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src="https://images.prismic.io/edapp-website/ZpdNEB5LeNNTxOD1_Signup-CTA-2024-Gamification.png?auto=format,compress"
                      //src="https://www.shutterstock.com/image-vector/colorful-index-card-set-study-260nw-2655612535.jpg"
                      alt="Study Cards"
                      className="w-full max-w-md rounded-xl shadow-lg object-cover bg-cyan-100 dark:bg-gray-800"
                    />
                  </div>
                </div>


                <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-20 py-12 bg-cyan-100 dark:bg-gray-900 text-cyan-900 dark:text-cyan-100">
                {/* Left Side: Image */}
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src="https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/4/a/4a7cd4848ed29990a1c10ceb7dc1b98e1dc9aa608140da379704ca557bc534b2/generative-ai-in-education-slide1.png"
                      alt="Study Cards"
                      className="w-full max-w-md rounded-xl shadow-lg object-cover"
                    />
                  </div>

                {/* Right Side: Heading + Text */}
                  <div className="pt-8 pb-10 md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-[2.8rem] md:text-[2.8rem] font-semibold mb-4">
                      From notes to flashcards in seconds
                    </h2>
                    <p className="text-md md:text-lg text-cyan-800 dark:text-cyan-200">
                      Make studying faster, easier, and more effective with interactive flashcards. FlashMind
                      automatically identifies key concepts and generates question-answer pairs,
                      significantly reducing manual effort in study preparation.
                    </p>
                    <p className="text-md mt-4 md:text-lg text-cyan-800 dark:text-cyan-200">
                    Leverage the power of AI to create personalized study aids with which, studying becomes effortless and engaging — turning your notes into smart learning tools that keep you motivated and on track to succeed.
                    </p>
                  </div>
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


                <div className="px-20 sm:px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-20">
                  {/* Card 1 */} 
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                    <img src="https://img.freepik.com/premium-vector/monitoring-analysis-report-statistics-investment-website-seo-screen-pc-monitor-with-tiny-people-concept-business-people-stock-market-database-information-graph-illustration_3322-994.jpg" alt="Key Concepts" className="w-full h-44 object-cover mb-4 rounded-xl" />
                            {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdnA24ZKYG2pecPXAvKlGp6XDuUlLLD1dfZ0u-IRdgj2426LHn6ERoBIG-vNP2LvdPIo&usqp=CAU*/}
                            {/*https://cdn-icons-png.freepik.com/256/10438/10438814.png?semt=ais_white_label */}
                            {/*https://cdn.iconscout.com/icon/premium/png-256-thumb/extracting-data-icon-svg-png-download-3587055.png */}
                            {/* https://png.pngtree.com/png-clipart/20230921/original/pngtree-extracting-data-color-icon-filled-symbol-automation-vector-png-image_12477164.png */}
                            {/*https://img.freepik.com/premium-vector/data-extraction-concept-illustration_114360-4906.jpg*/}
                    <div className="p-6 flex flex-col items-center text-center">
                      <h3 className="text-xl font-semibold mb-2 text-cyan-800 dark:text-cyan-200">Instant Key Concept Extraction</h3>
                      <p className="text-gray-500 dark:text-gray-300">
                        Automatically finds important ideas in your notes or PDFs.
                      </p>
                      <button className="mt-6 mb-3 px-6 py-3 bg-cyan-700 text-white rounded-full hover:bg-cyan-900 animate-pulseBorder dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white">
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                    <img src="https://cdn.prod.website-files.com/640f4f30f0ecd3685f6e970e/6504831079f409da60e0354f_th-flashcards.png" alt="AI Generated Q&A" className="w-full h-44 object-cover mb-4 rounded-xl" />
                    {/*https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2FXpBH6BxVZsTpc-xQDvIBlre8BWxLjiYg&s */}
                    <div className="p-6 flex flex-col items-center text-center">
                      <h3 className="text-xl font-semibold mb-2 text-cyan-800 dark:text-cyan-200">AI-Generated Q&A Pairs</h3>
                      <p className="text-gray-500 dark:text-gray-300">
                        Creates question-answer sets on the fly, saving you manual work.
                      </p>
                     <button className="mt-6 px-6 py-3 bg-cyan-700 text-white rounded-full hover:bg-cyan-900 animate-pulseBorder dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white">
                        How
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                    <img src="https://tubeonai.com/wp-content/uploads/2024/12/Tools-7.webp" alt="Multi Source Input" className="w-full h-44 object-cover mb-4 rounded-xl" />
                    {/*https://130e178e8f8ba617604b-8aedd782b7d22cfe0d1146da69a52436.ssl.cf1.rackcdn.com/how-multimodal-ai-rewriting-enterprise-playbooks-showcase_image-6-a-28294.jpg*/}
                    <div className="p-6 flex flex-col items-center text-center">
                      <h3 className="text-xl font-semibold mb-2 text-cyan-800 dark:text-cyan-200">Multi-Source Input</h3>
                      <p className="text-gray-500 dark:text-gray-300">
                        Supports text notes, URLs, and PDF files for flexible study material.
                      </p>
                      <button className="mt-6 px-6 py-3 bg-cyan-700 text-white rounded-full hover:bg-cyan-900 animate-pulseBorder dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white">
                        How
                      </button>
                    </div>
                  </div>

                  {/* Add more cards similarly */}
                </div>

                <section
                  id="reviews"
                  className="pt-24 pb-16 px-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/056/028/954/non_2x/blue-abstract-background-with-clouds-and-stars-magic-or-fantasy-world-scene-with-place-for-text-cute-fairytale-horizontal-nature-landscape-for-card-social-media-post-night-sky-illustration-vector.jpg')" }}
                  /*https://img.freepik.com/premium-vector/cute-cloud-background_643365-216.jpg */
                  /* */
                  /*https://cdn.wallpapersafari.com/63/58/0oidVn.jpg */
                  /*https://i1.wp.com/www.skiptomylou.org/wp-content/uploads/2023/01/Blue-Heart-Wallpaper-Computer-600x338.png */
                  /*https://png.pngtree.com/background/20211215/original/pngtree-green-cyan-gradient-blur-light-effect-background-picture-image_1458593.jpg */
                >
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6 text-cyan-700 dark:text-cyan-300">
                      We’d love your feedback!
                    </h2>
                    <p className="mb-8 text-lg">
                      Help us improve FlashMind by sharing your thoughts.
                    </p>
                    
                    <form onSubmit={handleReviewSubmit} className="flex flex-col items-center gap-4">
                      <textarea
                        rows="5"
                        placeholder="Write your review or feedback here..."
                        className="w-full md:w-3/4 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-800"
                      ></textarea>
                      <button
                        type="submit"
                        className="mt-6 px-6 py-3 bg-cyan-700 text-white rounded-full hover:bg-cyan-900 animate-pulseBorder dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200 dark:text-white"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </section>


                <section id="study-tips" className="bg-cyan-50 dark:bg-gray-900 py-20 px-6">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-cyan-800 dark:text-cyan-200 mb-6">
                      Study Tips 🧠
                    </h2>
                    <p className="text-lg text-cyan-700 dark:text-gray-300 mb-12">
                      Boost your learning with quick, effective techniques.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">🎯 Focus Sessions</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Study in 25-minute Pomodoro bursts with 5-minute breaks.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">🔁 Spaced Repetition</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Review flashcards at increasing intervals to retain more.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">✍️ Active Recall</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Test yourself instead of re-reading—retain more in less time.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">🗂️ Organize by Topic</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Group flashcards into subjects or categories for better focus.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>


                <section id="how-it-works" className="py-20 bg-cyan-100 dark:bg-gray-900 text-center">
                  <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-cyan-800 dark:text-cyan-200 mb-10">
                      How It Works 🚀
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Step 1 */}
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105">
                        <div className="text-4xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">Paste Your Notes</h3>
                        <p className="text-gray-600 dark:text-gray-300">Add lecture notes, PDF, or URLs you want to study from.</p>
                      </div>

                      {/* Step 2 */}
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">Click Generate</h3>
                        <p className="text-gray-600 dark:text-gray-300">AI creates flashcards instantly from your content.</p>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">Study Smarter</h3>
                        <p className="text-gray-600 dark:text-gray-300">Review, save, and use flashcards to boost retention.</p>
                      </div>
                    </div>
                  </div>
                </section>


                <section className="py-20 bg-cyan-50 dark:bg-gray-900 text-center">
                  <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-200 mb-10">Flashcard Preview</h2>
                  <p className="text-lg text-cyan-700 dark:text-gray-300 mb-12">
                      Quick Preview of Demo Flashcards
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {[
                      { q: 'What is React?', a: 'A JavaScript library for building UIs.' },
                      { q: 'What is a hook?', a: 'A special function to use state or effects.' },
                      { q: 'What is useEffect?', a: 'A React Hook for side effects.' },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className="group [perspective:1000px] w-72 h-48 cursor-pointer"
                      >
                        <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 flip">
                          {/* Front */}
                          <div className="absolute w-full h-full backface-hidden bg-cyan-100 dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center text-cyan-900 dark:text-cyan-100 font-semibold text-lg p-4">
                            Q: {card.q}
                          </div>
                          {/* Back */}
                          <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-cyan-700 dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold text-lg p-4">
                            A: {card.a}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>


                <section className="py-20 bg-cyan-900 dark:bg-gray-900 text-white text-center">
                  <h2 className="text-4xl font-semibold mb-6">Ready to Learn Smarter?</h2>
                  <p className="sm:text-lg text-md mb-8 px-2">Sign up now and transform your notes into flashcards effortlessly.</p>
                  <a
                    href="/login"
                    className="mt-6 inline-block px-8 py-4 bg-cyan-700 animate-pulseBorder text-white dark:bg-gray-700 dark:hover:bg-gray-900 rounded-full hover:bg-cyan-900 transition dark:border-gray-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200"
                  >
                    Get Started →
                  </a>
                </section>

              </header>
            }
          />

          {/* ✅ Placeholder routes (optional, for demo) */}
          <Route path="/flashcards" element={<div className="p-4">Flashcards Page</div>} />
          <Route path="/#overview-section" element={<div className="p-4">Overview Page</div>} />
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