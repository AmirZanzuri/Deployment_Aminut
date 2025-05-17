// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'var(--neon-blue)',
        'dark-blue': 'var(--dark-blue)',
        'darker-blue': 'var(--darker-blue)',
      },
      boxShadow: {
        'neon': '0 0 15px var(--neon-blue)',
        'neon-lg': '0 0 30px var(--neon-blue)',
      },
    },
  },
  plugins: [],
};