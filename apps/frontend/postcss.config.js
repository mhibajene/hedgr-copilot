// apps/frontend/postcss.config.js
const path = require('path')

module.exports = {
  plugins: {
    // points Tailwind to the monorepo root config
    tailwindcss: {
      config: path.resolve(__dirname, '../..', 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
}