/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        raleway: "'Raleway', sans-serif"
      },
      colors:{
        danger: "#ef4444"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  
}
