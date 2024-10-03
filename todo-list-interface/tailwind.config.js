/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "blue-normal": "#3454FA",
        "blue-dark":  "#0026EC",
        "red-btn": "#FF0000"
      },
      fontFamily:{
        Inter:['Inter'],
        Jura:['Jura'],
        JetbrainsMono:['JetbrainsMono']
      }
    },
  },
  plugins: [],
}