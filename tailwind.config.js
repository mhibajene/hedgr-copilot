
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/frontend/pages/**/*.{js,jsx,ts,tsx}',
    './apps/frontend/components/**/*.{js,jsx,ts,tsx}',
    './packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
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
}