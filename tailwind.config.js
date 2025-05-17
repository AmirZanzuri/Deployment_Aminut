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
        'neon-glow': '0 0 20px var(--neon-blue)',
        'lg': '0 10px 15px -3px rgba(0, 240, 255, 0.05), 0 4px 6px -2px rgba(0, 240, 255, 0.025)',
      },
    },
  },
  plugins: [],
};