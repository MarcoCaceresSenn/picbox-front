module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'yellow': '#F2BC1B',
      'brown': '#403103',
      'tblue': '#2E4E7A',
      'celes': '#C1D4D9',
      'brownest': '#261501',
      'orange': '#D96B0B',
      'bggray': '#E9E9E9',
      'tdark': '#343A40',
      'chartBlue': '#00B7FE',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}