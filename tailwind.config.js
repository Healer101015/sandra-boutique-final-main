/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#FF5A9B',
          purple: '#8A3FFC',
          orange: '#FF8A00',
          yellow: '#FFD200',
          gold: '#CBA14B',
          gray: '#7A7A7A',
        }
      },
      fontFamily: {
        // Usaremos a família de fontes sans-serif padrão, que é limpa e moderna.
        // Se desejar uma fonte específica como a "Inter" ou "Manrope" (similar à da Apple),
        // adicione-a no seu index.html via Google Fonts e depois aqui.
        sans: ['"Inter"', 'sans-serif'],
      },
      // Efeito para o degradê vibrante
      backgroundImage: {
        'vibrant-gradient': 'linear-gradient(to right, #FF5A9B, #8A3FFC, #FF8A00, #FFD200)',
      }
    },
  },
  plugins: [],
}