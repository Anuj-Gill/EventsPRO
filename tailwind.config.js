/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fira-mono': ['Fira Mono'],
        'dyna-puff':['DynaPuff']
      }
    },
  },
  plugins: [],
}