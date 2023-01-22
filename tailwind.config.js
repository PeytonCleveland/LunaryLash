const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--unbounded-font)", ...fontFamily.sans],
        secondary: ["var(--alegreya-sans-font)", ...fontFamily.sans],
        "secondary-bold": [
          "var(--alegreya-sans-font-bold)",
          ...fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
