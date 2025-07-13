import React, { useState } from 'react';

function Login({ setUser }) {
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
      <div className="w-1/2 bg-black text-white flex items-center justify-center px-8">
        <div className="w-full max-w-xl bg-gray-900 rounded-2xl shadow-lg p-10">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/logo.jpg"
              alt="FlashMind App Logo"
              className="w-24 h-24 mb-2 rounded-full shadow-md"
            />
            <h1 className="text-5xl font-extrabold text-cyan-500 tracking-wide drop-shadow-md font-mono">
              FlashMind
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />
            <div className="text-sm text-right">
              <a href="#" className="text-cyan-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 border border-cyan-700 text-cyan-700 bg-cyan-100 hover:bg-cyan-700 hover:text-white rounded-full font-semibold transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-400 text-center">
            Don’t have an account?{' '}
            <a href="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div
        className="w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/main.flash.png)' }}
      ></div>
    </div>
  );
}

export default Login;
