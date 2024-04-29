/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customDeepBlue: "#5DA2D5",
        customLightBlue: "#90CCF4",
        customRed: "#F78888",
        customYellow: "#F3D250",
        customWhite: "#ECECEC",
      },
    },
  },
  plugins: [],
};
