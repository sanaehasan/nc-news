/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
    colors: {
      blue: "#118AB2",
      dark_blue: "#073B4C",
      purple: "#7e5bef",
      pink: "#EF476F",
      orange: "#ff7849",
      green: "#06D6A0",
      yellow: "#FFD166",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
