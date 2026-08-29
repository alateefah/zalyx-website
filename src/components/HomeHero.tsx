import Image from 'next/image';
import { SmartAppLink } from '@/src/components/SmartAppLink';

/**
 * Home page hero, on the dark ground the careers pages already established as
 * the company's look. One gradient glow behind the headline is the whole
 * accent moment — the brand gradient is used 77 times across the pre-migration
 * site, almost always as decoration; here it is a single deliberate wash.
 *
 * Stacked by default, row from md up — explicit rather than relying on
 * flex-wrap to decide. `flex-none` + `basis-*` together set flex-basis twice;
 * which one wins depends on Tailwind's stylesheet order, not class order in
 * the markup, and it lost silently here, letting the phone image's intrinsic
 * width push the row wider than the viewport on mobile.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-[30px] pb-11">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-60px] top-[40px] h-[420px] w-[420px] rounded-full opacity-70 blur-[80px]"
        style={{ background: 'radial-gradient(circle, #26C7C3, transparent 72%)' }}
      />

      <div className="relative mx-auto flex w-full flex-col items-start gap-10 px-6 sm:px-10 md:flex-row md:px-16 lg:px-24 2xl:px-[200px]">
        {/* Same full-width container as every other section (nav, products,
            footer) — no hero-only max-width. flex-1 previously stretched
            this column's box to fill all remaining row width while its
            content stayed left-aligned and narrow, dumping the leftover
            space as a canyon between the text and the phone image on wide
            screens. Fixed here at the column level instead: text and image
            are both flex-none with a fixed gap, so on very wide screens the
            unused width becomes trailing margin after the image — not a
            gap wedged between the two. */}
        <div className="w-full min-w-0 md:max-w-[600px] md:flex-none">
          {/* Flags only, no pill. Native title= was unreliable (~1s delay,
              often nothing at all), so the country name is a CSS tooltip that
              shows instantly on hover and on keyboard focus. */}
          <span className="inline-flex items-center gap-2 mb-8 mt-4 text-3xl leading-none">
            {[
              { flag: '🇳🇬', name: 'Nigeria' },
              { flag: '🇬🇲', name: 'The Gambia' },
            ].map(({ flag, name }) => (
              <span
                key={name}
                tabIndex={0}
                role="img"
                aria-label={name}
                className="group relative inline-flex cursor-default rounded outline-none focus-visible:ring-2 focus-visible:ring-[#26C7C3]"
              >
                {flag}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-medium text-[#0A0C14] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 light:bg-[#0A0C14] light:text-white"
                >
                  {name}
                </span>
              </span>
            ))}
          </span>

          <h1 className="font-nohemi mt-5 max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight text-white [text-wrap:balance] sm:text-6xl light:text-[#0A0C14]">
            Digital tools that help
            <br />
            your <span className="zx-grad-text">business grow</span>
          </h1>

          <p className="mt-8 max-w-md text-[17px] text-white/70 light:text-[#0A0C14]/70">
            Zalyx Technologies builds software that simplifies how African businesses
            operate, track their growth and get found.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href="/ledger"
              className="font-nohemi inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }}
            >
              Explore our products
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <SmartAppLink className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/5 light:border-black/15 light:text-[#0A0C14] light:hover:bg-black/5">
              Get Zalyx Ledger
            </SmartAppLink>
          </div>

          <div className="mt-9 flex items-center gap-2.5 text-[13px] text-white/60 light:text-[#0A0C14]/60">
            <span className="flex" aria-hidden>
              <span className="h-6 w-6 rounded-full bg-[#125654] ring-2 ring-[#0b0d13] light:ring-[#f1fdff]" />
              <span className="-ml-2 h-6 w-6 rounded-full bg-[#3b2652] ring-2 ring-[#0b0d13] light:ring-[#f1fdff]" />
              <span className="-ml-2 h-6 w-6 rounded-full bg-[#167a78] ring-2 ring-[#0b0d13] light:ring-[#f1fdff]" />
            </span>
            Trusted by African business owners
          </div>
        </div>

        {/* Real asset is 1066x2203 — a full phone screenshot, not the
            256KiB-truncated stub this pointed at earlier. width/height must
            match the actual file: Next/Image reserves its box from these
            props, not from the file on disk, so a stale value here silently
            clips the image to whatever fraction of it the old box covered. */}
        <div className="flex w-full justify-center md:w-auto md:flex-1 md:justify-end md:mr-10">
          <Image
            src="/ledger-app-new.png"
            alt="Zalyx Ledger app screen"
            width={1066}
            height={2203}
            priority
            className="h-auto w-full max-w-[260px] object-contain object-top sm:max-w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
