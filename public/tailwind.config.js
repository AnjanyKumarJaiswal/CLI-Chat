/** @type {import('tailwindcss').Config} */
export default {
  content: ["./../public/**/*.{html,js}",
    './../public/index.html'
  ], 
  theme: {
    extend: {
      colors: {
        matteblack: '#2F2F31',
        csblack:'#000000', 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          'scrollbar-width': 'none',
        },
      }, ['responsive', 'hover']);
    },
  ],
}
