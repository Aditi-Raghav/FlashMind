import React, { useState } from 'react';

function Signup({ setUser }) {
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
      {/* Left Side: Form */}
      <div className="w-1/2 bg-black text-white flex items-center justify-center px-8">
        <div className="w-full max-w-xl bg-gray-900 rounded-2xl shadow-lg p-10">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/logo.jpg"
              alt="FlashMind Logo"
              className="w-24 h-24 mb-2 rounded-full shadow-md"
            />
            <h1 className="text-5xl font-extrabold text-cyan-500 tracking-wide drop-shadow-md font-mono">
              FlashMind
            </h1>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Gmail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            />

            <button
              type="submit"
              className="w-full py-3 border border-cyan-700 text-cyan-700 bg-cyan-100 hover:bg-cyan-700 hover:text-white rounded-full font-semibold transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-cyan-400 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div
        className="w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/main.flash.png)' }}
      ></div>
    </div>
  );
}

export default Signup;
