module.exports = {
  darkMode: 'class',
  content: [
    './apps/frontend/pages/**/*.{js,ts,jsx,tsx}',
    './apps/frontend/components/**/*.{js,ts,jsx,tsx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'hedgr-start': '#00bfa6',
        'hedgr-middle': '#00897b',
        'hedgr-end': '#00695c'
      }
    }
  },
}