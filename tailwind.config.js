/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./public/**/*.html",
  ],
  theme: {
    fontFamily: {
      primary: 'Open Sans',
      secondary: "Lato"
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0'
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1170px',
    },
    extend: {
      colors: {
        primary: '#212353',
        secondary: '#4B5D68',
        accent: {
          primary: '#9C69E2',
          primary_hover: '#9059DB',
          secondary: '#F063B8',
          secondary_hover: '#E350A9',
          tertiary: '#68C9BA'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
