'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Is it really free?',
    a: 'Yes — completely. Track unlimited sales, customers and payments at no cost, no trial, no card required. Core features will always be free.',
  },
  {
    q: 'Does it work without data?',
    a: 'Yes. Record sales, debts and expenses offline and everything saves on your phone first — it syncs automatically once you’re back online, so your data is always there even on a weak network.',
  },
  {
    q: 'How does payment tracking work?',
    a: 'Record what a customer ordered, the total price, and how much they’ve paid. Zalyx works out the balance automatically and lets you send a WhatsApp reminder with one tap when it’s due.',
  },
  {
    q: 'Is Zalyx a free accounting app for small business?',
    a: 'Yes. Zalyx Ledger is a free accounting and bookkeeping app for small businesses in Nigeria and The Gambia. Record sales, expenses and payments, and see your profit at the end of the day.',
  },
  {
    q: 'Is it a bookkeeping app?',
    a: 'Yes. It replaces the notebook: every sale, expense, debt and part payment is written down on your phone and kept in a report you can export.',
  },
  {
    q: 'Can it remind customers who owe me?',
    a: 'Yes. Zalyx tracks every debt and part payment, and sends a business debt reminder to the customer on WhatsApp with one tap, so you stop chasing people by hand.',
  },
  {
    q: 'Does it do stock management?',
    a: 'Yes. Tell Zalyx how many of a product you have and it counts down with every sale, warns you when you are running low, and adds the stock back if you cancel a sale. Tracking is per product, so you only track what you want to.',
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
