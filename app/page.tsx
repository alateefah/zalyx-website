import type { Metadata } from 'next';
import ReferralRedirect, { AppEnv } from '@/src/components/ReferralRedirect';
import { organizationJsonLd, jsonLdString } from '@/lib/seo';
import Link from 'next/link';
import { Hero } from '@/src/components/Hero';
import { JoinFam } from '@/src/components/JoinFam';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Zalyx Technologies – Digital Tools for African Entrepreneurs',
  description:
    'Zalyx Technologies builds simple, powerful digital tools that help African entrepreneurs manage operations, customers, and records. Download Zalyx Ledger — free forever.',
};

// Exactly the pattern the old landing page validated against. A link that does
// not match is treated as no referral at all, so a malformed code never sends
// anyone into the deep-link flow.
const REFERRAL_CODE = /^ZLX-[A-Z0-9]{3}-[A-Z0-9]{4}$/;

/**
 * The referral check happens HERE, on the server, rather than inside a client
 * component wrapped in Suspense.
 *
 * The obvious version — a client gate reading useSearchParams — prerenders the
 * Suspense fallback for the whole subtree, so the marketing sections never reach
 * the HTML and only appear after hydration. That is invisible to crawlers, which
 * is the one thing this migration exists to fix.
 *
 * Reading searchParams makes the route dynamic. That is the right trade: every
 * request gets fully rendered HTML.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ referralCode?: string; env?: string }>;
}) {
  const { referralCode, env } = await searchParams;

  const raw = referralCode?.trim().toUpperCase();
  const code = raw && REFERRAL_CODE.test(raw) ? raw : null;

  if (code) {
    const appEnv: AppEnv = env?.trim().toLowerCase() === 'staging' ? 'staging' : 'production';
    return <ReferralRedirect referralCode={code} appEnv={appEnv} />;
  }

  return (
    <>
      {/* Only on the home page: Organization describes the company itself, so
          repeating it per route would assert it many times over. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd()) }}
      />
      <Hero />

      {/* Home routes rather than explains. The long product scroll moved to
          /ledger, where it gets its own title and description instead of
          competing with everything else for the home page's. */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/ledger"
            className="group rounded-2xl border border-gray-200 p-6 transition-colors hover:border-[#8354AA]"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-[#8354AA]">
              Keep your books
            </h2>
            <p className="text-gray-600">
              Record sales, know who owes you, track what you spend. Works offline.
            </p>
            <span className="mt-3 inline-block text-sm text-[#8354AA]">
              Zalyx Ledger →
            </span>
          </Link>

          <Link
            href="/marketplace"
            className="group rounded-2xl border border-gray-200 p-6 transition-colors hover:border-[#8354AA]"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-[#8354AA]">
              Get found
            </h2>
            <p className="text-gray-600">
              Turn on your storefront and customers nearby can find you and message
              you on WhatsApp.
            </p>
            <span className="mt-3 inline-block text-sm text-[#8354AA]">
              Zalyx Marketplace →
            </span>
          </Link>
        </div>
      </section>

      <JoinFam />
      <Footer />
    </>
  );
}
