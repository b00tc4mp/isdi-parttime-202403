/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'accent-color': 'var(--accent-color)',
        'text-color': 'var(--text-color)',
        'yellow-100': '#fef3c7',
        'red-100': '#fee2e2',
      },
      // gradientColorStops: {
      //   'primary': '#fef3c7',
      //   'secondary': '#fee2e2',
      // },
    },
  },
  variants: {},
  plugins: [],
}
