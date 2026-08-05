import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Zalyx Marketplace — get found by customers nearby',
  description:
    'Turn on your storefront and customers nearby can find your business and message you on WhatsApp. Built into Zalyx Ledger.',
  alternates: { canonical: '/marketplace' },
};

/**
 * What a business needs before it appears in the marketplace.
 *
 * These are the same four conditions the service uses to decide
 * discoverability (VISIBLE_WHERE in zalyx-ledger-service) and the same four the
 * in-app checklist shows. If that gate changes, all three change together — a
 * merchant reading this page and a merchant reading the checklist must not be
 * told different things.
 */
const REQUIREMENTS = [
  'Your storefront turned on',
  'A WhatsApp number customers can message',
  'Your city',
  'A description, or at least one product',
];

export default function MarketplacePage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#8354AA]">
          Zalyx Marketplace
        </p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-[2.5rem] sm:leading-[1.15]">
          Get found by customers nearby
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your storefront is part of Zalyx Ledger, not another app to manage. The
          products you already record become a page customers can find — and message
          you about on WhatsApp.
        </p>

        <h2 className="mb-3 mt-12 text-xl font-semibold text-gray-900">
          How customers find you
        </h2>
        <p className="mb-4 text-gray-700">
          People searching the marketplace see businesses near them first, with what
          you sell and your starting prices. Tapping through gets them your storefront;
          tapping again opens WhatsApp with a message to you. No account, no checkout,
          no commission — the conversation happens where your customers already are.
        </p>

        <h2 className="mb-3 mt-10 text-xl font-semibold text-gray-900">
          What you need to appear
        </h2>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
          {REQUIREMENTS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="mb-8 text-gray-600">
          Until those are in place your storefront stays private — an empty page that
          customers bounce off does you more harm than not appearing at all. The app
          shows you exactly what is left.
        </p>

        <Link
          href="/help/set-up-your-storefront"
          className="text-[#8354AA] underline hover:no-underline"
        >
          How to set up your storefront
        </Link>

        <p className="mt-10 text-gray-600">
          Not selling online yet?{' '}
          <Link href="/ledger" className="text-[#8354AA] underline hover:no-underline">
            Zalyx Ledger
          </Link>{' '}
          keeps your books whether or not you ever turn this on.
        </p>
      </main>
      <Footer />
    </>
  );
}
