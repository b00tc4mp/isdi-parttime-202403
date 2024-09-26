/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Esto cubre todos los archivos dentro de src
    './staff/agustin-birman/app/src/components/**/*.{js,jsx,ts,tsx}', // Para todos los archivos en components
    './staff/agustin-birman/app/src/views/**/*.{js,jsx,ts,tsx}', // Para todos los archivos en views
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '3px 3px 10px rgba(0, 0, 0, 0.3)', // Añadir la sombra personalizada
      },
    },
  },
  plugins: [],
};

