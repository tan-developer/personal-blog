/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { "main-blue": "#86e7d4" },
      fontFamily : {
        'base' : ['Sorts Mill Goudy']
      },
      margin : {
        '1/12' : "8.333333333%",
        '1/6' : "16.6666666666666%",
        '1/10' : "10%"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
