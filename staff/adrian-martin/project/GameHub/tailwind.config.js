/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first-color': 'var(--first-color)',
        'second-color': 'var(--second-color)',
        'third-color': 'var(--third-color)',
        'fourth-color': 'var(--fourth-color)',
        'fifth-color': 'var(--fifth-color)',
        'sixth-color': 'var(--sixth-color)',
        'seventh-color': 'var(--seventh-color)',
      }
    },
  },
  plugins: [],
}

