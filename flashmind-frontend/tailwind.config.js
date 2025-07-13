module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {pattern: /^gap-/,},
    'gap-6',
    'space-x-6',
    'bg-purple-200',
    'text-purple-900',
    'bg-white',
    'dark:bg-black',
    'dark:text-white',
    'dark:bg-gray-700',
    'dark:border-white',
    'dark:hover:bg-gray-800',

  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      backgroundImage: {
        "radial-gradient-orange":
          "radial-gradient(circle, rgba(255,217,184,1) 0%, rgba(255,159,82,1) 100%)",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        inria: ['"Inria Serif"', "serif"],
        rambla: ['"Rambla"', "sans-serif"],
        kalnia: ['"Kalnia"', "sans-serif"],
        custom: ['Quantico', 'sans-serif'],
        custom2: ['Michroma', 'sans-serif'],
        custom3: ['Roboto Mono', 'sans-serif'],
      },
      colors: {
        "custom-blue": "#070a0f",
        "custom-orange": "#DB6332",
        "custom-white": "#F2F3D9",
        dark: {
          DEFAULT: "#1a202c",
        },
      },
      container: {
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1280px",
        },
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        growshrink: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        spinYoyo: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseBorder: {
          '0%, 100%': { boxShadow: '0 0 0px#67e8f9' },
          '50%': { boxShadow: '0 0 10px#67e8f9' },
        },
        
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        slowspin: 'spin 10s linear infinite',
        growshrink: 'growshrink 2s ease-in-out infinite',
        sway: 'sway 4s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
        spinYoyo: 'spinYoyo 10s ease-in-out infinite',
        fadeIn: 'fadeIn 0.4s ease-out both',
        pulseBorder: 'pulseBorder 2s infinite ease-in-out',
       
      }
    },
  },
  plugins: [],
};