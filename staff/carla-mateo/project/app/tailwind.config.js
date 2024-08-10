/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first-color': 'rgb(4, 65, 34)',
      },
      fontFamily: {
        roboto: ['"Roboto Mono"', 'monospace'],
        jersey: ['"Jersey 10"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(#0D878B, #1FA191, #4CBB8E, #7FD385, #B9E779)',
      },
    },
  },
  plugins: [],
}


