/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blanchedalmond: '#ffebcd',
        'custom-orange': 'hsl(27, 84%, 37%)',
        "first-color": "var(--first-color)",
        "second-color": "var(--second-color)",

      },
      boxShadow: {
        'custom-shadow': '0px 5px 10px 5px rgba(0, 0, 0, 0.35)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      letterSpacing: {
        '1': '0.05em',
        '2': '0.1em',
        '3': '0.15em',
        '4': '0.2em',
      },

      keyframes: {
        'custom-transform': {
          '0%': { transform: 'translate3d(-50%, -50%, 0) scale3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)' },
        },

      },
    },
    plugins: [],
  }
}