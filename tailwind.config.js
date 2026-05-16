/** @type {import('tailwindcss').Config} */
const hedgrBrandColors = {
  primary: '#1F2747',
  dark: '#1F2937',
  white: '#FFFFFF',
  800: '#171D35',
  700: '#1F2747',
  600: '#36447C',
  500: '#4658A0',
  400: '#5F71B9',
  300: '#8391C9',
  200: '#A6B0D8',
  100: '#CAD0E8',
}

export default {
  darkMode: 'class',
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hedgr: hedgrBrandColors,
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'Inter',
          'Geist',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
