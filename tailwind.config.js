/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customDeepBlue: "#5DA2D5",
        customLightBlue: "#90CCF4",
        customRed: "#F78888",
        customRedActive: "#bf6969",
        customYellow: "#F3D250",
        customYellowActive: "#c9ad3e",
        customWhite: "#ECECEC",
        customGreen: "#50f3a9",
        customGreenActive: "#48e09b",
      },
    },
  },
  plugins: [],
};
