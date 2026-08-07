import type { Metadata } from 'next';
import ReferralRedirect, { AppEnv } from '@/src/components/ReferralRedirect';
import { organizationJsonLd, jsonLdString } from '@/lib/seo';
import { SiteHeader } from '@/src/components/SiteHeader';
import { HomeHero } from '@/src/components/HomeHero';
import { OurProduct } from '@/src/components/OurProduct';
import { HomeProof } from '@/src/components/HomeProof';
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
      <SiteHeader />
      <HomeHero />
      <OurProduct />
      <HomeProof />
      <Footer />
    </>
  );
}
