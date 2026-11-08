/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F0F9F4',
          100: '#E6F4EC',
          200: '#CBE8D7',
          300: '#A1D4B8',
          400: '#6EBA93',
          500: '#439D72',
          600: '#2F805B',
          700: '#00553A',
          800: '#064E3B',
          900: '#033729',
          950: '#011F17',
        },
        surface: {
          bg: '#F5F8F6',
          card: '#FFFFFF',
          border: '#E5EAE7',
          input: '#F6F3F2',
          subtle: '#F9FAF9',
        }
      }
    },
  },
  plugins: [],
}
