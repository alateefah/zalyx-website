import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductShowcase } from '@/src/components/ProductShowcase';
import { WhyZalyx } from '@/src/components/WhyZalyx';
import { FAQ } from '@/src/components/FAQs';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Zalyx Ledger — know who owes you, and what you made',
  description:
    'Record sales in seconds, track who owes you money, log expenses and see what your business made. Works offline. Free.',
  alternates: { canonical: '/ledger' },
};

// What the ledger actually does, in the order a merchant meets it. Each links to
// the guide for that job — the product page says why, /help says how.
const CAPABILITIES = [
  {
    title: 'Record a sale in seconds',
    body: 'Pick from your catalogue or type it in. No customer details needed for a walk-in — a market sale is two taps.',
    href: '/help/record-a-sale',
    linkLabel: 'How to record a sale',
  },
  {
    title: 'Know who owes you',
    body: 'Every credit sale carries what was paid and when the rest is due, so the outstanding total is a fact rather than a guess.',
    href: '/blog/who-owes-you-money',
    linkLabel: 'Why this matters',
  },
  {
    title: 'Take payments as they come',
    body: 'Full, part payment or nothing yet. Record what was actually handed over and the balance keeps itself up to date.',
  },
  {
    title: 'Track what you spend',
    body: 'Log expenses alongside sales, so what you made is the real number and not just what came in.',
  },
  {
    title: 'See the month at a glance',
    body: 'Reports and customer statements you can share — what came in, what went out, who is still owing.',
  },
  {
    title: 'Work with your staff',
    body: 'Invite the people who help you run the shop, and see what was recorded without handing over your phone.',
  },
];

export default function LedgerPage() {
  return (
    <>
      <main>
        <section className="mx-auto max-w-5xl px-6 pt-16 md:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#8354AA]">
            Zalyx Ledger
          </p>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-[2.5rem] sm:leading-[1.15]">
            Know who owes you, and what you made
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            A record of every sale, payment and expense — kept on your phone, working
            with or without network, and free to use.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gray-200 p-5">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">{c.title}</h2>
                <p className="text-gray-600">{c.body}</p>
                {c.href && (
                  <Link
                    href={c.href}
                    className="mt-3 inline-block text-sm text-[#8354AA] underline hover:no-underline"
                  >
                    {c.linkLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="mt-10 text-gray-600">
            Selling to customers who have not found you yet?{' '}
            <Link href="/marketplace" className="text-[#8354AA] underline hover:no-underline">
              Your storefront on the Zalyx marketplace
            </Link>{' '}
            comes with the same app.
          </p>
        </section>

        {/* These were written about the ledger and lived on the home page, where
            they competed with everything else for one title and description. */}
        <ProductShowcase />
        <WhyZalyx />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
