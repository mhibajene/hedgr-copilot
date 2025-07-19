// apps/frontend/postcss.config.js
const path = require('path')

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.js')
    },
    autoprefixer: {},
  },
}