/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../packages/ui/src/**/*.{js,jsx,ts,tsx}'
    ],
  darkMode: "class",
  theme: { 
    extend: {
      colors: {
        'hedgr-start': '#00bfa6',
        'hedgr-middle': '#00897b',
        'hedgr-end': '#00695c'
      }
    } 
  },
  plugins: [],
};
