/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 6px 8px rgba(0, 0, 0, 0.653)'
      },
      colors: {
        'first': 'rgba(36, 53, 71, 1)',
        'second': 'rgba(35, 81, 134, 1)',
        'third': 'rgba(132, 167, 204, 1)',
        'fourth': 'rgba(178, 199, 215, 1)',
        'fifth': 'rgba(223, 237, 241, 1)',
        'sixth': 'rgba(150, 112, 19, 1)',
        'seventh': '#f0f8ff',
      }
    },
  },
  plugins: [],
}

