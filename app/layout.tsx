import type { Metadata } from 'next';
import { nohemi } from './fonts';
import { SITE_URL } from '@/lib/siteUrl';
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nohemi.variable}>
      <body>{children}</body>
    </html>
  );
}
