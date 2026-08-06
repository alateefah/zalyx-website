/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // next/font sets --font-nohemi; the family name stays `nohemi` so no
        // existing className has to change.
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
        // Body face — also next/font-backed. `font-sans` is left at Tailwind's
        // default so a stray unstyled element never falls back to Nohemi.
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
      },
    },
  },
  plugins: [
    // The whole site is dark by default (every hardcoded color is already the
    // dark-theme value) — a conventional `dark:` variant would mean inverting
    // every class in every component. `light:` instead lets the existing
    // unprefixed classes stay the dark default, and only the (fewer) light-mode
    // overrides need adding, activated by a `.light` class on <html>.
    plugin(({ addVariant }) => {
      addVariant('light', '.light &');
    }),
  ],
};
