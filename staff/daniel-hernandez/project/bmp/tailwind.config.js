/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'media',
   content: ['./main.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './global.css'],
   presets: [require('nativewind/preset')],
   theme: {
      extend: {
         colors: {
            palette: {
               10: '#5C5972',
               20: '#A94A1E',
               30: '#E36526',
               40: '#ECE3DC',
               50: '#FFFFFF',
               60: '#A0908A',
               70: '#817A7A',
               80: '#242222',
               90: '#1B1A1A',
               100: '#000000',
               gradient: 'linear-gradient(#1B1A1A, #817A7A)'
            },
            extras: {
               10: '#E36500',
               20: '#B62140',
               30: '#E92224',
               40: '#80BDA9',
               50: '#C792EA',
               60: '#E7C664'
            }
         },
         fontFamily: {
            'poppins-light': ['Poppins-Light'],
            poppins: ['Poppins-Regular'],
            'poppins-medium': ['Poppins-Medium'],
            'poppins-semibold': ['Poppins-SemiBold'],
            'poppins-bold': ['Poppins-Bold'],
            spacemono: ['SpaceMono-Regular'],
            'spacemono-bold': ['SpaceMono-Bold'],
            monaspace: ['MonaspaceNeon-Regular']
         }
      }
   },
   plugins: []
};
