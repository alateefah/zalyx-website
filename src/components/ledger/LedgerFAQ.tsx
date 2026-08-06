'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Is it really free?',
    a: 'Zalyx Ledger is free to use — no trial, no card, and no limit on how many sales you record.',
  },
  {
    q: 'Does it work without data?',
    a: 'Yes. Sales, debts and expenses save on your phone and sync when you have a connection again.',
  },
  {
    q: 'Can my staff use it?',
    a: 'Add staff accounts and choose what each person can see and do.',
  },
  {
    q: 'What is a walk-in sale?',
    a: 'A sale to a customer whose details you do not keep. You record the amount and move on.',
  },
];

export function LedgerFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full px-6 pt-6 pb-16 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
      <h3 className="font-nohemi mb-3 text-2xl font-semibold text-white light:text-[#0A0C14]">Questions</h3>
      <div className="flex flex-col">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-t border-white/10 light:border-black/10">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="font-nohemi flex w-full items-center justify-between gap-3 py-4 text-left text-[15px] text-white light:text-[#0A0C14]"
              >
                <span>{item.q}</span>
                <span className="text-lg text-[#26C7C3]">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <p className="max-w-[60ch] pb-4 text-sm text-white/70 light:text-[#0A0C14]/70">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
