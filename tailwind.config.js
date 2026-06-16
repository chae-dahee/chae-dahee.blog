/** @type {import('tailwindcss').Config} */
const themeColors = require("./src/styles/colors");
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: themeColors,
      fontFamily: {
        sans: [
          "'Pretendard'",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "'Helvetica Neue'",
          "'Segoe UI'",
          "'Apple SD Gothic Neo'",
          "'Noto Sans KR'",
          "'Malgun Gothic'",
          "sans-serif",
        ],
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      animation: {
        typing: "fadeIn 1s forwards 1s , typing 4s steps(40, end) 1s forwards",
        typingSecond:
          "fadeIn 1s forwards 5s, typing 4s steps(40, end) 5s forwards",
        blink: "blink 0.75s step-end infinite",
      },
      keyframes: {
        typing: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        blink: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
