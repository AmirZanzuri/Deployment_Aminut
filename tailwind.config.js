/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'var(--neon-blue)',
        'dark-blue': 'var(--dark-blue)',
        'darker-blue': 'var(--darker-blue)',
      },
    },
  },
  plugins: [],
}