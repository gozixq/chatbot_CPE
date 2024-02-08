/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
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
};
