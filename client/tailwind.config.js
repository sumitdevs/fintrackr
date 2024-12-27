/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/*.jsx',
    './src/pages/*.jsx',
    './src/forms/*.jsx',
    './src/*.jsx',
    './src/cards/*.jsx',
    './src/pages/Dashboard/*.jsx',
    './src/Layout/*.jsx',
    './src/pages/Dashboard/subpages/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily:{
        ff_primary:["Nunito", "sans-serif"],
        ff_heading:["Montserrat", "sans-serif"],
        ff_body:["Open Sans", "sans-serif"]
      },
      colors: {
        clr_primary_300:"#13629F",
        clr_primary_200:"#1674BB",
        clr_primary_100:"#1A85D7",
        clr_accent_200:"#4CAF50",
        clr_accent_100:"#58CD5C",
        clr_neutral_800:"#232323",
        clr_neutral_700:"#414141",
        clr_neutral_200:"#B4B4B4",
        clr_neutral_100:"#D2D2D2",
      }
    },
  },
  plugins: [],
}

