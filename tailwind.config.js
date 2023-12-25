/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        c_E4E5E6: '#E4E5E6',
        c_CCD0D6: '#CCD0D6',
        c_19A7D8: '#19A7D8'
      }
    },
  },
  plugins: [],
}