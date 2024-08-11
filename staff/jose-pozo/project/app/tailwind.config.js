export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fast-velvet': '#8892C6',
        'white-mist': '#fafafa', //Blanco casi puro, ligeramente más cálido.
        'soft-gray': '#f0f0f0', //Blanco grisáceo más oscuro, puede utilizarse para crear sombras suaves.
        'off-white': '#f5f5f5', //Blanco grisáceo, ideal para fondos.
        'pale-sage': '#baba94', //Tono claro de verde grisáceo.
        'light-pale-sage': '#e8e8da', //Tono claro de verde grisáceo.
      },
    },
  },
  plugins: [],
}
