/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgba(175, 222, 238, 0.959)',
        customLightBlue: 'lightblue',
      },
    },
  },
  plugins: [],
}

