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
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
      },
      borderColor: {
        'neon-blue': {
          '20': 'rgba(0, 243, 255, 0.2)',
          '40': 'rgba(0, 243, 255, 0.4)'
        }
      },
      boxShadow: {
        'neon': '0 0 15px var(--neon-blue)',
        'neon-lg': '0 0 30px var(--neon-blue)',
      },
    },
  },
  plugins: [],
}