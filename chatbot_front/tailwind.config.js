/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#aaffff",
        secondary: "#7dc240",
      },
    },
    theme: {},
  },
  plugins: [],
});
