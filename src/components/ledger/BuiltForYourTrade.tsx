/**
 * Tailors, mechanics and dispatch riders get extra fields built for their
 * trade specifically, on top of the standard order — verified against the
 * actual mobile app source (schemas/businessSchema.ts, quick-add-mechanic.tsx,
 * quick-add-dispatch.tsx), not invented copy. Zalyx supports 11 business
 * types in total; these three are the ones with dedicated extra fields today.
 */

const TRADES = [
  {
    icon: 'scissors',
    title: 'Fashion designers & tailors',
    body: "Save a customer's full measurements once — chest, sleeve, waist, and everything else you'd normally re-measure. Pick them up again on the next order without asking twice.",
  },
  {
    icon: 'car',
    title: 'Mechanics',
    body: "Track a customer's vehicle by plate number, log the services performed on each visit, and set a reminder for the next one — so a service date doesn't quietly become a missed one.",
  },
  {
    icon: 'bicycle',
    title: 'Dispatch riders',
    body: 'Record sender and recipient details, pickup address, and package size and weight on one order — everything you need for a delivery, not just a sale.',
  },
];

const ICONS: Record<string, React.ReactNode> = {
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" /></>,
  car: <><path d="M5 17H3v-6l2-5h12l3 5v6h-2" /><path d="M9 17h6" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></>,
  bicycle: <><circle cx="6" cy="17" r="3.5" /><circle cx="18" cy="17" r="3.5" /><path d="M6 17 10 8h4l3 5m-9-5h6M14 8l4 9" /></>,
};

function TradeIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#26C7C3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

export function BuiltForYourTrade() {
  return (
    <section className="mx-auto w-full px-6 pt-2 pb-11 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
      <div className="border-t border-white/10 pt-9 light:border-black/10">
        <h6 className="font-nohemi mb-1.5 text-xs font-semibold uppercase tracking-widest text-white/55 light:text-[#0A0C14]/55">
          Built for your trade
        </h6>
        <p className="mb-6 max-w-[52ch] text-[15px] text-white/70 light:text-[#0A0C14]/70">
          The order form adapts to what you actually do — a few trades get extra fields
          built for them specifically.
        </p>

        <div className="flex flex-wrap gap-4">
          {TRADES.map((t) => (
            <div
              key={t.title}
              className="min-w-0 flex-1 basis-64 rounded-xl bg-[#111524] p-5 light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]"
            >
              <TradeIcon name={t.icon} />
              <h4 className="font-nohemi mt-3 text-base font-semibold text-white light:text-[#0A0C14]">
                {t.title}
              </h4>
              <p className="mt-1.5 text-[13.5px] text-white/65 light:text-[#0A0C14]/65">{t.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/50 light:text-[#0A0C14]/50">
          Every other trade gets the same core ledger — sales, debts, expenses and reports —
          without the extra fields getting in the way.
        </p>
      </div>
    </section>
  );
}
