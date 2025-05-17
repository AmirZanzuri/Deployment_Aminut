// tailwind.config.js
const plugin = require('tailwindcss/plugin');

function withOpacityValue(variable) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;
}

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': withOpacityValue('--neon-blue-rgb'),
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
};
