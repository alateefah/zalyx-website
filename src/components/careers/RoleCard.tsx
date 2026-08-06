'use client';

import { useState } from 'react';

type Bullet = { title?: string; body: string };
type Pair = { label: string; value: string };

export type Role = {
  title: string;
  type: string;
  locations: string[];
  summary: string;
  open: boolean;
  overview: string;
  responsibilities: Bullet[];
  responsibilitiesHeading: string;
  successCriteria?: string[];
  compensation: Pair[];
  compensationHeading: string;
  whoItsFor: string[];
  extra?: { heading: string; items: string[] };
  applyHref: string;
};

// The gradient-outline card treatment from the old /careers/[slug] pages —
// a transparent border painted by a second gradient layer via padding-box /
// border-box, rather than a flat shadow ring. The fill color still shifts
// for open roles (kept from the original card-list page) — the border
// gradient just replaces the plain fill everywhere else used.
function outlineStyle(fill: string) {
  return {
    background: `linear-gradient(${fill},${fill}) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box`,
    border: '1px solid transparent',
  } as const;
}

function ArrowIcon({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={direction === 'down' ? 'rotate-90 transition-transform' : 'transition-transform'}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#26C7C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 flex-none">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function RoleCard({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl p-6 sm:p-7" style={outlineStyle(role.open ? 'var(--zx-card-tint)' : 'var(--zx-card)')}>
      <div className="flex items-center justify-between gap-3">
        <span
          className={
            role.open
              ? 'rounded-full bg-[#26C7C3]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#9ee8e5] light:text-[#178482]'
              : 'rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/50 light:bg-black/5 light:text-[#0A0C14]/50'
          }
        >
          {role.open ? 'Open' : 'Closed'}
        </span>
        <span className="text-xs text-white/50 light:text-[#0A0C14]/50">{role.type}</span>
      </div>

      <h3 className="font-nohemi mt-4 text-2xl font-semibold text-white light:text-[#0A0C14]">{role.title}</h3>
      <p className="mt-2 max-w-[56ch] text-[14.5px] text-white/70 light:text-[#0A0C14]/70">{role.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {role.locations.map((loc) => (
          <span key={loc} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 shadow-[0_0_0_1px_rgba(241,253,255,0.1)] light:bg-black/[0.03] light:text-[#0A0C14]/70 light:shadow-[0_0_0_1px_rgba(10,12,20,0.1)]">
            {loc}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="font-nohemi mt-5 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
        style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }}
      >
        {expanded ? 'Hide details' : 'View role'}
        <ArrowIcon direction={expanded ? 'down' : 'right'} />
      </button>

      {expanded && (
        <div className="mt-7 grid grid-cols-1 gap-10 border-t border-white/10 pt-7 lg:grid-cols-3 light:border-black/10">
          {/* Main column — plain text and checkmark bullets, no boxes */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h4 className="font-nohemi text-[13px] font-semibold uppercase tracking-widest text-[#26C7C3]">
                Role overview
              </h4>
              <p className="mt-2 max-w-[64ch] text-[14.5px] leading-relaxed text-white/75 light:text-[#0A0C14]/75">
                {role.overview}
              </p>
            </div>

            <div>
              <h4 className="font-nohemi text-[13px] font-semibold uppercase tracking-widest text-[#26C7C3]">
                {role.responsibilitiesHeading}
              </h4>
              <div className="mt-3 flex flex-col gap-3">
                {role.responsibilities.map((r) => (
                  <div key={r.title ?? r.body} className="flex items-start gap-2.5 text-[14px] text-white/80 light:text-[#0A0C14]/80">
                    <CheckIcon />
                    <span>
                      {r.title && <span className="font-medium text-white light:text-[#0A0C14]">{r.title}: </span>}
                      {r.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {role.successCriteria && (
              <div>
                <h4 className="font-nohemi text-[13px] font-semibold uppercase tracking-widest text-[#26C7C3]">
                  What success looks like
                </h4>
                <div className="mt-3 flex flex-col gap-3">
                  {role.successCriteria.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-[14px] text-white/80 light:text-[#0A0C14]/80">
                      <CheckIcon />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-nohemi text-[13px] font-semibold uppercase tracking-widest text-[#26C7C3]">
                Who this role is for
              </h4>
              <div className="mt-3 flex flex-col gap-3">
                {role.whoItsFor.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-[14px] text-white/80 light:text-[#0A0C14]/80">
                    <CheckIcon />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {role.extra && (
              <div>
                <h4 className="font-nohemi text-[13px] font-semibold uppercase tracking-widest text-[#26C7C3]">
                  {role.extra.heading}
                </h4>
                <div className="mt-3 flex flex-col gap-3">
                  {role.extra.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-[14px] text-white/80 light:text-[#0A0C14]/80">
                      <CheckIcon />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — only Applications + Compensation stay boxed, per
              request, so the two "act on this" facts read as distinct from
              the descriptive sections on the left. */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-6" style={outlineStyle('var(--zx-card)')}>
              <h4 className="font-nohemi mb-2 text-base font-semibold text-white light:text-[#0A0C14]">
                {role.open ? 'Ready to apply?' : 'Applications'}
              </h4>
              {role.open ? (
                <>
                  <p className="mb-4 text-sm text-white/65 light:text-[#0A0C14]/65">Fill out the short form. Takes less than 3 minutes.</p>
                  <a
                    href={role.applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-nohemi inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(120deg, #26C7C3, #8354AA)' }}
                  >
                    Apply now
                    <ArrowIcon />
                  </a>
                </>
              ) : (
                <p className="text-sm italic text-white/45 light:text-[#0A0C14]/45">Applications for this role are currently closed.</p>
              )}
            </div>

            <div className="rounded-2xl p-6" style={outlineStyle('var(--zx-card)')}>
              <h4 className="font-nohemi mb-4 text-base font-semibold text-white light:text-[#0A0C14]">{role.compensationHeading}</h4>
              <div className="flex flex-col gap-3">
                {role.compensation.map((c, i) => (
                  <div key={c.label}>
                    {i > 0 && <div className="mb-3 h-px bg-white/10 light:bg-black/10" />}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/65 light:text-[#0A0C14]/65">{c.label}</span>
                      <span className="font-semibold text-white light:text-[#0A0C14]">{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
