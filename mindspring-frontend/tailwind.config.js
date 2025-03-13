/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first-color': '#f5e1da !important',
        'second-color': '#f1f1f1 !important',
        'third-color': '#40a798 !important',
        'fourth-color': '#476268 !important',
      },
    },
  },
  plugins: [],
};
