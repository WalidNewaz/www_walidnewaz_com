/** This is where all the theme settings go. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}"],
  // Toggle dark-mode based on data-mode="dark"
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    screens: {
      xs: '320px',
      sm: '412px',
      md: '768px',
      lg: '976px',
      dt_small: '1200px',
      dt_mid: '1440px',
      dt_lg: '1590px',
      dt_xlg: '1920px',
    },
    fontFamily: {
      sans: ['Montserrat', 'Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'travvit-blue': {
          DEFAULT: '#35B5E8',
          '100': '#051217',
          '200': '#0b242e',
          '300': '#103646',
          '400': '#15485d',
          '500': '#1b5b74',
          '600': '#206d8b',
          '700': '#257fa2',
          '800': '#2a91ba',
          '900': '#30a3d1',
        },
        'travvit-orange': {
          DEFAULT: '#FE9600',
          '100': '#190f00',
          '200': '#331e00',
          '300': '#4c2d00',
          '400': '#663c00',
          '500': '#7f4b00',
          '600': '#985a00',
          '700': '#b26900',
          '800': '#cb7800',
          '900': '#e58700',
        },
        'travvit-onyx': {
          DEFAULT: '#353839',
          '100': '#040606',
          '200': '#070b0b',
          '300': '#0b1111',
          '400': '#0e1617',
          '500': '#121c1d',
          '600': '#152222',
          '700': '#192728',
          '800': '#1c2d2e',
          '900': '#203233',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  // plugins: [require('@tailwindcss/forms')],
};
