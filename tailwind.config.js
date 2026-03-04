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
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    },
  },
  plugins: [],
}

