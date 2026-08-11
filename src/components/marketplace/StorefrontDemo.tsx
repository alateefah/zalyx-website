'use client';

import { useState } from 'react';

/**
 * Reproduces the design's interactive checklist + live storefront preview
 * (mktIsB) — same four conditions the service checks server-side to decide
 * discoverability (VISIBLE_WHERE in zalyx-ledger-service) and the same four
 * the in-app checklist shows, so this page and the app never disagree.
 */

type Key = 'storefront' | 'whatsapp' | 'city' | 'desc';

const CONDS: { key: Key; label: string; note: string }[] = [
  { key: 'storefront', label: 'Storefront turned on', note: 'Turn your storefront on in Zalyx Marketplace.' },
  { key: 'whatsapp', label: 'A WhatsApp number', note: 'How customers reach you.' },
  { key: 'city', label: 'Your city', note: 'So nearby shoppers see you first.' },
  { key: 'desc', label: 'Add your first menu item', note: 'Something to tell people what you sell.' },
];

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function DashedCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" aria-hidden>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 1 1 12 20Z" />
    </svg>
  );
}

export function StorefrontDemo() {
  const [state, setState] = useState<Record<Key, boolean>>({
    storefront: true,
    whatsapp: false,
    city: true,
    desc: false,
  });

  const n = Object.values(state).filter(Boolean).length;
  const ok = n === 4;

  return (
    <section className="mx-auto w-full px-6 pt-2 pb-11 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
      <div className="flex flex-wrap gap-9">
        {/* Checklist */}
        <div className="min-w-0 flex-1 basis-80">
          <h3 className="font-nohemi mb-1.5 text-lg font-semibold text-white light:text-[#0A0C14]">
            What you need to appear
          </h3>
          <p className="max-w-[46ch] text-sm text-white/65 light:text-[#0A0C14]/65">
            Tick these and watch your listing come to life. Zalyx Marketplace shows the same
            checklist.
          </p>

          <div className="mt-5 flex flex-col gap-2">
            {CONDS.map((c) => {
              const on = state[c.key];
              return (
                <label
                  key={c.key}
                  className={
                    'flex cursor-pointer items-start gap-3 rounded-md p-3 shadow-[0_0_0_1px_rgba(241,253,255,0.1)] light:shadow-[0_0_0_1px_rgba(10,12,20,0.1)] ' +
                    (on ? 'bg-[#0e3534] light:bg-[#eafaf9]' : 'bg-[#111524] light:bg-white')
                  }
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setState((s) => ({ ...s, [c.key]: !s[c.key] }))}
                    className="mt-0.5 h-4 w-4 flex-none accent-[#26C7C3]"
                  />
                  <span>
                    <span className="font-nohemi block text-[14.5px] text-white light:text-[#0A0C14]">{c.label}</span>
                    <span className="text-[12.5px] text-white/55 light:text-[#0A0C14]/55">{c.note}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2.5 rounded-md bg-[#111524] px-3.5 py-3 light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]">
            <span className={ok ? 'text-[#26C7C3]' : 'text-white/45 light:text-[#0A0C14]/40'}>
              {ok ? <CheckCircleIcon /> : <DashedCircleIcon />}
            </span>
            <span className="text-[13.5px] text-white/85 light:text-[#0A0C14]/85">
              {ok
                ? 'You are discoverable. Shoppers in your city can find and message you.'
                : `${n} of 4 done — ${4 - n} left before your storefront appears.`}
            </span>
          </div>
        </div>

        {/* Live preview */}
        <div className="min-w-0 flex-1 basis-72">
          <div className="w-full max-w-[330px] rounded-2xl bg-[#111524] p-4.5 shadow-[0_0_0_1px_rgba(241,253,255,0.08)] light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-white/45 light:text-[#0A0C14]/45">
                marketplace.zalyx.io
              </span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-white/45 light:text-[#0A0C14]/45">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <div
              className="overflow-hidden rounded-lg bg-[#0b0d13] shadow-[0_0_0_1px_rgba(241,253,255,0.06)] light:bg-[#f1fdff] light:shadow-[0_0_0_1px_rgba(10,12,20,0.06)]"
              style={{ opacity: ok ? 1 : 0.45 + 0.1 * n }}
            >
              <div className="h-[100px] bg-gradient-to-br from-[#26C7C3]/25 to-[#8354AA]/25" />
              <div className="p-3.5">
                <div className="flex items-center gap-2">
                  <h5 className="font-nohemi text-[15px] font-semibold text-white light:text-[#0A0C14]">Bisi Tailoring</h5>
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[10.5px] font-medium ' +
                      (ok
                        ? 'bg-[#26C7C3]/15 text-[#9ee8e5] light:text-[#178482]'
                        : 'bg-white/10 text-white/60 light:bg-black/5 light:text-[#0A0C14]/55')
                    }
                  >
                    {ok ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-white/60 light:text-[#0A0C14]/60">
                  {state.city ? 'Ikeja, Lagos' : 'City not set'} ·{' '}
                  {state.desc ? 'Tailoring & alterations' : 'No description yet'}
                </div>
                <button
                  type="button"
                  disabled={!state.whatsapp}
                  className="font-nohemi mt-3 flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }}
                >
                  <WhatsAppIcon />
                  {state.whatsapp ? 'Message on WhatsApp' : 'No WhatsApp number'}
                </button>
              </div>
            </div>

            <p className="mt-3.5 text-[11.5px] text-white/45 light:text-[#0A0C14]/40">
              Preview only — the marketplace itself lives on a separate site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
