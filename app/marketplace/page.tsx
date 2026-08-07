import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';
import { StorefrontDemo } from '@/src/components/marketplace/StorefrontDemo';
import { MARKETPLACE_URL } from '@/src/utils/constants';

export const metadata: Metadata = {
  title: 'Zalyx Marketplace — get found by customers nearby',
  description:
    'Turn on your storefront and customers nearby can find your business and message you on WhatsApp. Built into Zalyx Ledger.',
  alternates: { canonical: '/marketplace' },
};

const FEATURES = [
  {
    icon: (
      <path d="M20.5 10.5c0 6-8.5 11.5-8.5 11.5S3.5 16.5 3.5 10.5a8.5 8.5 0 0 1 17 0Z M12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    ),
    title: 'Nearby first',
    body: 'Shoppers see businesses in their own city before anything else.',
  },
  {
    icon: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m21 21-4.3-4.3" /></>,
    title: 'By what you sell',
    body: 'Your products and services are what people search. Add them once.',
  },
  {
    icon: (
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 1 1 12 20Z" />
    ),
    title: 'One tap to WhatsApp',
    body: 'No new inbox to learn. Customers message you where you already reply.',
  },
];

export default function MarketplacePage() {
  return (
    <>
      <SiteHeader />

      <section className="relative overflow-hidden px-6 pt-11 pb-8 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-100px] top-[-140px] h-[420px] w-[420px] rounded-full opacity-60 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #8354AA, transparent 72%)' }}
        />
        <div className="relative">
          <span className="inline-flex rounded-full border border-[#26C7C3] px-3 py-1 text-xs font-medium text-[#26C7C3]">
            Zalyx Marketplace
          </span>
          <h1 className="font-nohemi mt-4 max-w-[20ch] text-4xl font-medium leading-[1.08] tracking-tight text-white [text-wrap:balance] sm:text-5xl light:text-[#0A0C14]">
            Customers nearby, looking for what you sell.
          </h1>
          <p className="mt-4 max-w-[52ch] text-[17px] text-white/70 light:text-[#0A0C14]/70">
            Set up a storefront, list what you sell, and let shoppers in your city find you. They
            message you on WhatsApp — no new inbox to learn.
          </p>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#26C7C3] hover:underline"
          >
            Browse Zalyx Marketplace
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </section>

      <StorefrontDemo />

      <section className="px-6 pt-4 pb-16 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <div className="border-t border-white/10 pt-8 light:border-black/10">
          <h3 className="font-nohemi mb-5 text-lg font-semibold text-white light:text-[#0A0C14]">
            How customers find you
          </h3>
          <div className="flex flex-wrap gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="min-w-0 flex-1 basis-56 rounded-xl bg-[#111524] p-5 light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#26C7C3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {f.icon}
                </svg>
                <h4 className="font-nohemi mt-2.5 text-base font-semibold text-white light:text-[#0A0C14]">{f.title}</h4>
                <p className="mt-1 text-[13.5px] text-white/65 light:text-[#0A0C14]/65">{f.body}</p>
              </div>
            ))}
          </div>

          <Link
            href="/help/turn-on-your-storefront"
            className="font-nohemi mt-6 inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 9.5 12 3l9 6.5M5 8v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V8" />
            </svg>
            How to turn on your storefront
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
