import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Login({ setUser, darkMode }) {
   
  const location = useLocation();

  useEffect(() => {
    console.log('Login page location.state:', location.state);
    if (location.state?.fromLogout) {
      toast.success('You have been logged out.');
      window.history.replaceState({}, document.title); // clears the state so it doesn't re-show on refresh
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: formData.username });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Login form */}
      <div className="w-1/2 bg-cyan-50 dark:bg-gray-900 text-cyan-600 dark:text-white flex items-center justify-center px-8">
        <div className="w-full max-w-xl bg-cyan-100 dark:bg-gray-900 rounded-2xl shadow-lg p-10"> {/* CHANGED: bg-gray-900 */}
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={darkMode ? "https://static.vecteezy.com/system/resources/previews/015/974/454/non_2x/flash-card-icon-free-vector.jpg" : "/logo.jpg"}
              alt="FlashMind App Logo"
              className="w-24 h-24 mb-2 rounded-full shadow-md"
            />
            <h1 className="text-5xl font-semibold text-cyan-700 dark:text-cyan-200 tracking-wide drop-shadow-md mt-4 font-mono">
              FlashMind
            </h1>
          </div>

          <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-cyan-50 dark:bg-gray-800 text-black dark:text-cyan-100 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-cyan-50 dark:bg-gray-800 text-black dark:text-cyan-100 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <div className="text-sm text-right">
              <a href="#" className="text-cyan-800 dark:text-cyan-200 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit" 
              className="block w-1/3 mx-auto py-3 border border-cyan-800 dark:hover:border-cyan-200 text-cyan-700 dark:hover:text-cyan-200 bg-cyan-100 hover:bg-cyan-700 hover:text-white rounded-full font-semibold transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
            >
              Login {/* OPTIONAL: w-1/4 */}
            </button> 
          </form>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-cyan-900 dark:text-cyan-200 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      {/* <div
        className="w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZI3_P5Kmro3tJ4tUiXHHGr--7KDskoMlAtmEmwW93v2VFbmS68uJvFtnsgj0UWViPVQ&usqp=CAU)' }} 
        
        // REMOVE BACKGROUND
        // blue- https://png.pngtree.com/png-clipart/20220401/ourlarge/pngtree-blue-theme-sticky-notes-pack-png-image_4521733.png
        //https://img.freepik.com/premium-vector/blue-background-with-books-blue-background_1217673-317401.jpg
        //https://st.depositphotos.com/60573950/54776/v/1600/depositphotos_547761992-stock-illustration-cute-note-sticker-for-diary.jpg
        //IMAGE: /main.flash.png
        // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZWbgd7TpYuzhXH_rKhXc_oouG9cJzWH9uGcq5aE5SVioMf9LBy8BOZvPM2g9Zm58HcZ4&usqp=CAU
        // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BRe_M2XB8ZLQUUYDkRDgDhX8ALR6uV7g2g&s
        // https://cdn-icons-png.freepik.com/512/9099/9099970.png
        //small img https://cdn.creazilla.com/cliparts/7794451/flashcards-clipart-lg.png
        //https://thumbs.dreamstime.com/b/work-notes-background-studying-creative-lifestyle-planning-seamless-pattern-black-white-line-illustration-elegant-studies-job-119071717.jpg
       ></div>*/}

      <div className="w-1/2 relative bg-cyan-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        <img
          src="https://www.pixelstalk.net/wp-content/uploads/2025/06/A-quiet-space-captured-with-book-wallpaper-with-quotes-written-on-book-spines-and-sticky-notes-in-pastel-hues.webp"
          alt="FlashMind Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-md bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 p-8 rounded-2xl shadow-xl text-center">
          <img
            src="https://t4.ftcdn.net/jpg/13/20/63/55/360_F_1320635531_Sx41VgTBQivBIQgmJnd2aeLLHHFDU63m.jpg "
            alt="Welcome Illustration"
            className="w-32 h-32 mx-auto mb-4 rounded-lg shadow-lg object-cover bg-black"
          />
          <h2 className="text-3xl font-bold text-cyan-800 dark:text-cyan-200 mb-2">Welcome to FlashMind</h2>
          <p className="text-cyan-700 dark:text-gray-300 text-sm">
            Enhance your memory and boost learning through interactive flashcards. Designed for students, lifelong learners, and curious minds.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
