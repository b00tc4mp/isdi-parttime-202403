/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            'darkest-transparent': 'rgba(var(--darkest-transparent), 0.8)',
            darkest: 'var(--darkest)',
            dark: 'var(--dark)',
            secondary: 'var(--secondary)',
            primary: 'var(--primary)',
            primary2: 'var(--primary2)',
            primary3: 'var(--primary3)',
            'text-primary': 'var(--text-primary)',
            'text-secondary': 'var(--text-secondary)',
            overlay: 'rgba(var(--overlay),  0.5)'
         },
         fontFamily: {
            ubuntu: ['Ubuntu', 'sans-serif']
         },
         boxShadow: {
            'custom-light': '0 2px 10px rgba(0, 0, 0, 0.1)'
         },
         keyframes: {
            shake: {
               '0%, 100%': { transform: 'translateX(0)' },
               '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
               '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
            }
         },
         animation: {
            shake: 'shake 0.3s'
         }
      }
   },
   plugins: [
      function ({ addUtilities }) {
         const newUtilities = {
            '.scrollbar-width-none': {
               'scrollbar-width': 'none',
               '&::-webkit-scrollbar': {
                  display: 'none'
               }
            }
         };
         addUtilities(newUtilities, ['responsive', 'hover']);
      }
   ]
};
