/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        champagne: {
          DEFAULT: '#c8a96e',
          light: '#d4bc8a',
          dark: '#a88840',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FDF8D8',
          200: '#F9EDA5',
          300: '#F3DF70',
          400: '#E6C887', // Champagne Gold
          500: '#D4AF37', // Primary Luxury Gold
          600: '#B8860B', // Dark Goldenrod
          700: '#946B05',
          800: '#6E4E03',
          900: '#483301',
        },
        obsidian: {
          950: '#070709',
          900: '#0d0d10', // Deep Ultra Clean Black
          850: '#121216', // Card Base
          800: '#18181d',
          750: '#202026',
          700: '#282830',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3DF70 0%, #D4AF37 50%, #B8860B 100%)',
        'gold-radial': 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(13,13,16,0) 70%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(18,18,22,0.7) 0%, rgba(13,13,16,0.98) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.12)',
        'gold-md': '0 4px 24px rgba(212, 175, 55, 0.22)',
        'gold-lg': '0 8px 36px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};
