// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3faf7",
          100: "#d3f5e7",
          200: "#a6eccf",
          300: "#79e3b7",
          400: "#4bdb9f",
          500: "#21c486",
          600: "#1a9d6a",
          700: "#14774f",
          800: "#0d5233",
          900: "#062e17",
        },
      },
    },
  },
  darkMode: 'class', // Enables class-based dark mode
  plugins: [require('flowbite/plugin')],
};
