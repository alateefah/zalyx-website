/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // next/font sets --font-nohemi; the family name stays `nohemi` so no
        // existing className has to change.
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
