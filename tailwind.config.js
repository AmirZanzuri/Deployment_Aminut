/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'rgb(var(--neon-blue-rgb) / <alpha-value>)',
        'dark-blue': 'var(--dark-blue)',
        'darker-blue': 'var(--darker-blue)',
      },
      boxShadow: {
        'neon': '0 0 15px rgb(var(--neon-blue-rgb) / 0.3)',
        'neon-lg': '0 0 30px rgb(var(--neon-blue-rgb) / 0.3)',
      },
    },
  },
  plugins: [],
}