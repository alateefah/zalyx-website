import type { Metadata } from 'next';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';
import { TradingDay } from '@/src/components/ledger/TradingDay';
import { BuiltForYourTrade } from '@/src/components/ledger/BuiltForYourTrade';
import { LedgerFAQ } from '@/src/components/ledger/LedgerFAQ';
import { STORE_LINKS } from '@/src/utils/constants';

export const metadata: Metadata = {
  title: 'Zalyx Ledger — your whole trading day, written down',
  description:
    'Record sales in three taps, track debts and part payments, watch expenses, and close the day with a report. Offline. Free.',
  alternates: { canonical: '/ledger' },
};

export default function LedgerPage() {
  return (
    <>
      <SiteHeader />

      <section className="px-6 pt-11 pb-8 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <span className="inline-flex rounded-full border border-[#26C7C3] px-3 py-1 text-xs font-medium text-[#26C7C3]">
          Zalyx Ledger
        </span>
        <h1 className="font-nohemi mt-4 max-w-[22ch] text-4xl font-medium leading-[1.08] tracking-tight text-white [text-wrap:balance] sm:text-5xl light:text-[#0A0C14]">
          Your whole trading day, written down.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[17px] text-white/70 light:text-[#0A0C14]/70">
          Follow one day in a shop: the first sale, the walk-in, the customer who pays
          half, and closing up.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={STORE_LINKS.GOOGLE_PLAY}
            target="_blank"
            rel="noopener noreferrer"
            className="font-nohemi inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }}
          >
            Get the app
          </a>
          <span className="flex flex-wrap items-center gap-3.5 text-[13px] text-white/60 light:text-[#0A0C14]/60">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
              Works offline
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.25L4 3a1 1 0 0 0-1 1l.25 5.59a2 2 0 0 0 .58 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83Z" />
                <circle cx="8" cy="8" r="1.5" />
              </svg>
              Free
            </span>
          </span>
        </div>
      </section>

      <TradingDay />
      <BuiltForYourTrade />
      <LedgerFAQ />

      <Footer />
    </>
  );
}
