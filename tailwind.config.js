/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        slateGray: 'SlateGray',
        grey: 'gray',
      },
    },
  },
  plugins: [],
}