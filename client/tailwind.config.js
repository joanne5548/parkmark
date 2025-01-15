/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.tsx",
    "./src/components/**/*.tsx"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sriracha': ['sriracha', 'ui-sans-serif']
    }
  },
  plugins: [],
}

