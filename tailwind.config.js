/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        lg: '24px',
      },
    },
    extend: {},
  },
  plugins: [],
};
