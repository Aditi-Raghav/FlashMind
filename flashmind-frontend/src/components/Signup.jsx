import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Signup({ setUser, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: formData.name });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Form - BG BLACK and container cyan-100??*/}
      <div className="w-1/2 bg-cyan-50 dark:bg-gray-900 text-cyan-600 dark:text-white flex items-center justify-center px-8"> 
        <div className="w-full max-w-xl bg-cyan-200 dark:bg-gray-900 rounded-2xl shadow-lg p-10">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={darkMode ? "https://static.vecteezy.com/system/resources/previews/015/974/454/non_2x/flash-card-icon-free-vector.jpg" : "/logo.jpg"}
              alt="FlashMind Logo"
              className="w-24 h-24 mb-2 rounded-full shadow-md"
            />
            <h1 className="text-5xl font-semibold text-cyan-700 dark:text-cyan-200 tracking-wide drop-shadow-md mt-4 font-mono">
              FlashMind
            </h1>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded dark:bg-gray-800 bg-cyan-50 dark:text-cyan-100 text-black placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded dark:bg-gray-800 bg-cyan-50 dark:text-cyan-100 text-black placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded dark:bg-gray-800 bg-cyan-50 dark:text-cyan-100 text-black placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded dark:bg-gray-800 bg-cyan-50 dark:text-cyan-100 text-black placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Gmail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded dark:bg-gray-800 bg-cyan-50 dark:text-cyan-100 text-black placeholder-gray-500 dark:placeholder-gray-400"
            />

            <button
              type="submit"
              className="block w-1/3 mx-auto py-3 border border-cyan-800 dark:hover:border-cyan-200 dark:hover:text-cyan-200 text-cyan-700 bg-cyan-100 hover:bg-cyan-700 hover:text-white rounded-full font-semibold transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-900 dark:text-cyan-200 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div
        className="w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://png.pngtree.com/png-clipart/20220401/ourlarge/pngtree-blue-theme-sticky-notes-pack-png-image_4521733.png)' }}
      ></div>
    </div>
  );
}

export default Signup;
