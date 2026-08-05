import localFont from 'next/font/local';

// Nohemi is the Zalyx brand typeface. Loaded through next/font so the @font-face
// rules and cache headers stop being hand-maintained — the five declarations
// that used to live in src/App.css are generated from this.
export const nohemi = localFont({
  src: [
    { path: './fonts/Nohemi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Nohemi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Nohemi-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Nohemi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Nohemi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-nohemi',
  display: 'swap',
});
