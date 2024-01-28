/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      borderRadius: {
        sm: '.3rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
