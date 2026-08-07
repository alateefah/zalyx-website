'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { HelpMeta } from '@/lib/content';

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#26C7C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="flex-none">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function HelpSearch({
  topics,
  pages,
}: {
  topics: readonly { id: string; label: string }[];
  pages: HelpMeta[];
}) {
  const [q, setQ] = useState('');

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    return topics
      .map((topic) => ({
        ...topic,
        items: pages
          .filter((p) => p.topic === topic.id)
          .filter((p) => !query || p.title.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query)),
      }))
      .filter((g) => g.items.length > 0);
  }, [q, topics, pages]);

  return (
    <>
      <div className="mt-6 mb-8 max-w-[360px]">
        <label htmlFor="help-search" className="mb-1 block text-xs text-white/55 light:text-[#0A0C14]/55">
          Search guides
        </label>
        <input
          id="help-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="record a walk-in sale"
          className="w-full rounded-md border border-white/10 bg-[#111524] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#26C7C3] light:border-black/10 light:bg-white light:text-[#0A0C14] light:placeholder:text-[#0A0C14]/35 light:shadow-[0_0_0_1px_rgba(10,12,20,0.05)]"
        />
      </div>

      {groups.length === 0 ? (
        <p className="py-6 text-sm text-white/50 light:text-[#0A0C14]/50">
          No guide matches that. Try &ldquo;sale&rdquo;, &ldquo;debt&rdquo;, &ldquo;storefront&rdquo;.
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.id} className="border-t border-white/10 py-6 light:border-black/10">
            <h6 className="font-nohemi mb-3.5 text-xs font-semibold uppercase tracking-widest text-[#26C7C3]">
              {g.label}
            </h6>
            <div className="flex max-w-[70ch] flex-col gap-0.5">
              {g.items.map((page) => (
                <Link
                  key={page.slug}
                  href={`/help/${page.slug}`}
                  className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-white hover:bg-white/[0.06] light:text-[#0A0C14] light:hover:bg-black/[0.04]"
                >
                  <span className="text-[14.5px]">{page.title}</span>
                  <ArrowRight />
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
