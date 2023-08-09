/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        light:{
          text: 'var(--light-text)',
          accent:'var(--light-accent)',
          page: 'var(--light-page)',
          section: 'var(--light-section)',
          navbar: 'var(--light-navbar)',
          'navbar-item': 'var(--light-navbar-item)',
          'navbar-item-hover': 'var(--light-navbar-item-hover)',
          button: 'var(--light-button)',
          'button-text': 'var(--light-button-text)',
          'menu-item': 'var(--light-menu-item)',
          'menu-item-hover': 'var(--light-menu-item-hover)'
        },

        dark:{
          text: 'var(--dark-text)',
          accent:'var(--dark-accent)',
          page: 'var(--dark-page)',
          section: 'var(--dark-section)',
          navbar: 'var(--dark-navbar)',
          'navbar-item': 'var(--dark-navbar-item)',
          'navbar-item-hover': 'var(--dark-navbar-item-hover)',
          button: 'var(--dark-button)',
          'button-text': 'var(--dark-button-text)',
          'menu-item': 'var(--dark-menu-item)',
          'menu-item-hover': 'var(--dark-menu-item-hover)'
        }
      },
      boxShadow:{
        card: '1px 1px 5px 0px #000000a4',
        'inner-custom': 'inset 0px 0px 4px rgb(0 0 0 / 50%)'
      }
    },
  },
  plugins: [],
}
