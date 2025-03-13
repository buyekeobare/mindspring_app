/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first-color': '#f5e1da',
        'second-color': '#f1f1f1',
        'third-color': '#40a798',
        'fourth-color': '#476268',
      },
    },
  },
  plugins: [],
};
