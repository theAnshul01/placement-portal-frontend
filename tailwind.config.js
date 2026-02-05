/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["Fraunces", "serif"],
        inter: ["Inter", "serif"],
        merriweather: ["Merriweather", "serif"]
      }
    },
  },
  plugins: [],
}

