import type { Metadata } from 'next';
import { nohemi, satoshi } from './fonts';
import { SITE_URL } from '@/lib/siteUrl';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  // Without this, the relative canonical and openGraph.url values that
  // lib/seo.ts produces resolve against localhost in a production build.
  metadataBase: new URL(SITE_URL),
  // Verbatim from the old index.html <title> and the landing page's Helmet tags.
  title: 'Zalyx Technologies',
  description:
    'Zalyx Technologies builds simple, powerful digital tools that help African entrepreneurs manage operations, customers, and records. Download Zalyx Ledger — free forever.',
  icons: { icon: '/zalyx.png' },
};

// Runs before paint (blocking, inline) so the light theme never flashes dark
// first. Reads localStorage directly rather than through React — a
// useEffect-based toggle would only add the class after hydration, which is
// exactly the flash this exists to prevent. Defaults to dark (the site's one
// theme until now) when no preference is stored, so nobody's current
// experience changes unless they actively pick light.
const THEME_INIT_SCRIPT = `
  try {
    if (localStorage.getItem('zx-theme') === 'light') {
      document.documentElement.classList.add('light');
    }
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nohemi.variable} ${satoshi.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
        {/* Sets no cookie, so it needs no consent banner — and it answers the
            only question that matters after publishing: did anyone read it. */}
        <Analytics />
      </body>
    </html>
  );
}
