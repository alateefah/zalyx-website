import Link from 'next/link';

/**
 * One product, two halves — from the approved design. Both cards sit on the
 * same dark ground as the rest of the home page; the marketplace card gets a
 * tinted surface (--color-accent-900-equivalent) rather than a second ground,
 * which is what makes the pair read as one family instead of two different
 * products. Icons are a small, deliberate borrow from Phosphor, matching the
 * design file's icon choices per row.
 */

const LEDGER_ROWS = [
  { icon: 'receipt', label: 'Record sales' },
  { icon: 'coins', label: 'Never forget who owes you' },
  { icon: 'package', label: 'Manage products and services' },
  { icon: 'note', label: 'Track expenses' },
];

const MARKET_ROWS = [
  { icon: 'search', label: 'Get discovered' },
  { icon: 'whatsapp', label: 'Message on WhatsApp' },
  { icon: 'share', label: 'Share your storefront' },
];

const ICONS: Record<string, React.ReactNode> = {
  receipt: (
    <path d="M6 2h12a1 1 0 0 1 1 1v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3a1 1 0 0 1 1-1Zm2 5h8M8 10h8M8 13h5" />
  ),
  coins: <circle cx="9" cy="9" r="5" />,
  package: <path d="M3 8 12 3l9 5-9 5-9-5Zm0 0v9l9 5 9-5V8M12 13v9" />,
  note: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6" />,
  search: <><circle cx="10" cy="10" r="6" /><path d="m20 20-4.3-4.3" /></>,
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 1 1 12 20Z" />
  ),
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.3 10.8 7.4-4.1M8.3 13.2l7.4 4.1" /></>,
};

function RowIcon({ name, className }: { name: string; className: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {ICONS[name]}
    </svg>
  );
}

/**
 * Nohemi doesn't cover the → glyph, so the plain text arrow rendered as a
 * fallback notdef mark instead of an arrow. An inline SVG has no font
 * dependency, so it always renders.
 */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function OurProduct() {
  return (
    <section id="products" className="mx-auto w-full px-6 pt-5 pb-14 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="h-[3px] w-6 rounded" style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }} />
        <h6 className="font-nohemi text-xs font-semibold uppercase tracking-widest text-white/50 light:text-[#0A0C14]/50">
          Our products
        </h6>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Ledger */}
        <div className="min-w-0 flex-1 basis-80 rounded-2xl bg-[#111524] p-6 shadow-[0_0_0_1px_rgba(241,253,255,0.08)] sm:p-7 light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h3 className="font-nohemi text-2xl font-medium text-white light:text-[#0A0C14]">Zalyx Ledger</h3>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white/70 light:bg-black/5 light:text-[#0A0C14]/70">
              Flagship · Free
            </span>
          </div>
          <p className="mt-2 text-sm text-white/70 light:text-[#0A0C14]/70">
            Sales, debts, expenses and reports on your phone. Works with no network.
          </p>

          <ul className="my-4 flex flex-col gap-2.5">
            {LEDGER_ROWS.map((row) => (
              <li key={row.label} className="flex items-center gap-2.5 text-sm text-white/85 light:text-[#0A0C14]/85">
                <RowIcon name={row.icon} className="text-[#26C7C3]" />
                {row.label}
              </li>
            ))}
          </ul>

          <Link
            href="/ledger"
            className="font-nohemi inline-flex items-center gap-1.5 rounded-lg border border-[#26C7C3] px-4 py-2 text-sm font-semibold text-[#26C7C3] transition-colors hover:bg-[#26C7C3]/10"
          >
            Explore Zalyx Ledger
            <ArrowIcon />
          </Link>
        </div>

        {/* Marketplace */}
        <div className="min-w-0 flex-1 basis-80 rounded-2xl bg-[#0e3534] p-6 shadow-[0_0_0_1px_rgba(38,199,195,0.25)] sm:p-7 light:bg-[#eafaf9] light:shadow-[0_0_0_1px_rgba(38,199,195,0.35)]">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h3 className="font-nohemi text-2xl font-medium text-white light:text-[#0A0C14]">Zalyx Marketplace</h3>
            <span className="rounded-full bg-[#26C7C3]/15 px-2.5 py-0.5 text-[11px] text-[#9ee8e5] light:text-[#178482]">
              New
            </span>
          </div>
          <p className="mt-2 text-sm text-white/70 light:text-[#0A0C14]/70">
            Turn on a storefront and customers nearby find you, then talk on WhatsApp.
          </p>

          <ul className="my-4 flex flex-col gap-2.5">
            {MARKET_ROWS.map((row) => (
              <li key={row.label} className="flex items-center gap-2.5 text-sm text-white/85 light:text-[#0A0C14]/85">
                <RowIcon name={row.icon} className="text-[#9ee8e5] light:text-[#178482]" />
                {row.label}
              </li>
            ))}
          </ul>

          <Link
            href="/marketplace"
            className="font-nohemi inline-flex items-center gap-1.5 rounded-lg border border-[#26C7C3] px-4 py-2 text-sm font-semibold text-[#26C7C3] transition-colors hover:bg-[#26C7C3]/10"
          >
            Explore Zalyx Marketplace
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
