/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'var(--neon-blue)',
        'dark-blue': 'var(--dark-blue)',
        'darker-blue': 'var(--darker-blue)',
      },
      boxShadow: {
        'neon': '0 0 10px var(--neon-blue)',
        'neon-dim': '0 0 10px rgba(0, 240, 255, 0.1)',
      },
    },
  },
  plugins: [],
};