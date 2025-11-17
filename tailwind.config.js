/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16a34a",
          light: "#4ade80",
          dark: "#166534",
        },
        accent: "#f97316",
      },
    },
  },
  plugins: [],
};
