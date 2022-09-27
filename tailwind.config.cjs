
const config = {
  content: [
    "./src/views/layouts/main.{hbs,html,js}",
    "./src/**/**/*.{hbs,html,js}",
    "./src/**/*.{hbs,html,js}",
    "./*.{hbs,html,js}",
    "./public/*.{hbs,html,js}",
    "./static/*.{hbs,html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
module.exports = config
