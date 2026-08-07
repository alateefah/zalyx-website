/**
 * Stats band + "Why Zalyx" cards + the one merchant testimonial the design
 * carries. Active users and transactions tracked are real, pulled from
 * production on 2026-08-06 (886 businesses with an active owner; ₦370.4m
 * across 1,426 non-cancelled NGN orders — Order.price is stored in kobo).
 * App store rating is still the design's placeholder value — unverified,
 * update once there's a real one.
 */

const REASONS = [
  {
    icon: 'shield',
    title: 'Reliability',
    body: 'Our products are stable, dependable and built for long-term use.',
  },
  {
    icon: 'trend',
    title: 'Growth',
    body: 'Every product we build is designed to help businesses grow.',
  },
  {
    icon: 'users',
    title: 'Customer-centered',
    body: 'We design around what real African businesses need.',
  },
  {
    icon: 'circles',
    title: 'Simplicity',
    body: 'The best technology removes complexity, it does not add to it.',
  },
];

const ICONS: Record<string, React.ReactNode> = {
  shield: <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Zm-1.5 10.5 4-4M14.5 8.5l-4 4" />,
  trend: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="18" cy="9" r="2.8" /><path d="M15.5 20a5 5 0 0 1 6-5" /></>,
  circles: <><circle cx="8" cy="8" r="4" /><circle cx="16" cy="8" r="4" /><circle cx="12" cy="15" r="4" /></>,
};

function ReasonIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#26C7C3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}


const STATS: { prefix?: string; value: string; suffix?: string; label: string }[] = [
  { value: '880+', label: 'Active users' },
  { prefix: '₦', value: '370.4m', label: 'Transactions tracked' },
  { value: '4.9', suffix: '★', label: 'App store rating' },
  { value: 'Free', label: 'Forever, for the ledger' },
];

export function HomeProof() {
  return (
    <>
      <section className="mx-auto w-full px-6 pt-9 pb-2 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <div className="border-t border-white/10 pt-9 light:border-black/10">
          <div className="flex flex-wrap gap-7">
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-0 flex-1 basis-40">
                <div className="zx-grad-text text-[34px] leading-none tracking-tight">
                  {stat.prefix && <span className="font-sans">{stat.prefix}</span>}
                  <span className="font-nohemi">{stat.value}</span>
                  {stat.suffix && <span className="font-sans">{stat.suffix}</span>}
                </div>
                <div className="mt-1.5 text-xs text-white/55 light:text-[#0A0C14]/55">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full px-6 pt-11 pb-5 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <h2 className="font-nohemi text-2xl font-medium tracking-tight text-white light:text-[#0A0C14]">
          Why Zalyx Technologies?
        </h2>
        <p className="mt-2 max-w-xl text-[15px] text-white/65 light:text-[#0A0C14]/65">
          We turn complexity into confidence — tools that are simple to use, dependable
          on any connection, and built for how African businesses actually trade.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="min-w-0 flex-1 basis-56 rounded-xl bg-[#111524] p-5 shadow-[0_0_0_1px_rgba(241,253,255,0.06)] light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]"
            >
              <ReasonIcon name={r.icon} />
              <h4 className="font-nohemi mt-3 text-base font-semibold text-white light:text-[#0A0C14]">{r.title}</h4>
              <p className="mt-1.5 text-[13.5px] text-white/65 light:text-[#0A0C14]/65">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full px-6 pt-[34px] pb-14 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <blockquote className="max-w-2xl rounded-2xl bg-[#111524] p-7 shadow-[0_0_0_1px_rgba(241,253,255,0.06)] light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#26C7C3" aria-hidden>
            <path d="M7 9c-2 0-3.5 1.6-3.5 4S5 17 7 17c0 2.2-1.6 3.5-3.5 3.5v1.5c3.3 0 5.5-2.3 5.5-5.5v-3c0-2.5-1-4.5-2-4.5Zm10 0c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4c0 2.2-1.6 3.5-3.5 3.5v1.5c3.3 0 5.5-2.3 5.5-5.5v-3c0-2.5-1-4.5-2-4.5Z" />
          </svg>
          <p className="mt-3 text-lg leading-relaxed text-white/90 light:text-[#0A0C14]/90">
            &ldquo;I used to keep a notebook and I would forget who paid. Now I check my
            phone and I know.&rdquo;
          </p>
          <footer className="mt-4 text-[13px] text-white/55 light:text-[#0A0C14]/55">
            Amara O. · Fashion Designer · Lagos
          </footer>
        </blockquote>
      </section>
    </>
  );
}
