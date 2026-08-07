'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * The design's "Record a sale" widget is a real interactive prototype (walk-in
 * toggle, amount/paid inputs, live balance) — reproduced with the same
 * arithmetic (owed = max(amount - paid, 0)) rather than a static screenshot,
 * so a visitor can feel the product's core loop before downloading it.
 */

const DAY = [
  {
    time: '8a',
    title: 'Open up',
    body: 'Yesterday closed itself. The report is waiting, and so is the list of who still owes you.',
    guideLabel: 'Guide: read your daily report',
    guideHref: '/help/read-your-daily-report',
  },
  {
    time: '11a',
    title: 'A walk-in buys two metres',
    body: 'No name, no phone number, no problem. Amount in, sale recorded, next customer.',
    guideLabel: 'Guide: record a walk-in sale',
    guideHref: '/help/walk-in-sale',
  },
  {
    time: '2p',
    title: 'Mrs Bello pays half',
    body: 'Take ₦2,000 now and the ledger carries the rest as a balance in her name.',
    guideLabel: 'Guide: take a part payment',
    guideHref: '/help/take-a-part-payment',
  },
  {
    time: '6p',
    title: 'Close up',
    body: 'Sales, expenses and profit for the day — and a reminder you can send to the people still owing.',
    guideLabel: 'Guide: send a payment reminder',
    guideHref: '/help/send-a-payment-reminder',
  },
];

function fmt(v: number) {
  return '₦' + v.toLocaleString('en-NG');
}

export function TradingDay() {
  const [walkin, setWalkin] = useState(true);
  const [amount, setAmount] = useState(4500);
  const [paid, setPaid] = useState(2000);

  const owed = Math.max(amount - paid, 0);
  const custLabel = walkin ? 'Walk-in' : 'Mrs Bello';
  const statusLabel = owed === 0 ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid';

  return (
    <section className="mx-auto w-full px-6 pt-2 pb-10 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
      <div className="flex flex-wrap gap-9">
        {/* Timeline */}
        <div className="min-w-0 flex-1 basis-80">
          <h6 className="font-nohemi mb-6 text-xs font-semibold uppercase tracking-widest text-white/55 light:text-[#0A0C14]/55">
            One trading day
          </h6>
          <div className="flex flex-col">
            {DAY.map((d, i) => (
              <div key={d.time} className="flex gap-4 pb-7">
                <div className="flex flex-none flex-col items-center gap-1.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0e3534] text-[11px] text-[#9ee8e5] shadow-[0_0_0_1px_rgba(38,199,195,0.3)] light:bg-[#eafaf9] light:text-[#178482]">
                    {d.time}
                  </span>
                  {i < DAY.length - 1 && <span className="w-px flex-1 bg-white/10 light:bg-black/10" />}
                </div>
                <div className="min-w-0 pt-0.5">
                  <h4 className="font-nohemi text-[15px] font-semibold text-white light:text-[#0A0C14]">{d.title}</h4>
                  <p className="mt-1.5 max-w-[44ch] text-sm text-white/70 light:text-[#0A0C14]/70">{d.body}</p>
                  <Link href={d.guideHref} className="mt-1.5 inline-block text-[12.5px] text-[#26C7C3] hover:underline">
                    {d.guideLabel} ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive demo */}
        <div className="min-w-0 flex-1 basis-80">
          <div className="sticky top-24 rounded-2xl bg-[#111524] p-5 shadow-[0_0_0_1px_rgba(241,253,255,0.08)] light:bg-white light:shadow-[0_0_0_1px_rgba(10,12,20,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="font-nohemi text-[15px] font-semibold text-white light:text-[#0A0C14]">Record a sale</h5>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white/70 light:bg-black/5 light:text-[#0A0C14]/70">try it</span>
            </div>

            <label className="mb-3 flex cursor-pointer items-center gap-2.5 text-sm text-white/80 light:text-[#0A0C14]/80">
              <input
                type="checkbox"
                checked={walkin}
                onChange={() => setWalkin((v) => !v)}
                className="h-4 w-4 accent-[#26C7C3]"
              />
              Walk-in customer (no details)
            </label>

            <div className="mb-2.5">
              <label className="mb-1 block text-xs text-white/55 light:text-[#0A0C14]/55">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 py-2 text-sm text-white outline-none focus:border-[#26C7C3] light:border-black/10 light:bg-[#f1fdff] light:text-[#0A0C14]"
              />
            </div>
            <div className="mb-3.5">
              <label className="mb-1 block text-xs text-white/55 light:text-[#0A0C14]/55">Paid now</label>
              <input
                type="number"
                value={paid}
                onChange={(e) => setPaid(Number(e.target.value) || 0)}
                className="w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 py-2 text-sm text-white outline-none focus:border-[#26C7C3] light:border-black/10 light:bg-[#f1fdff] light:text-[#0A0C14]"
              />
            </div>

            <div className="rounded-lg bg-[#0b0d13] p-3.5 shadow-[0_0_0_1px_rgba(241,253,255,0.06)] light:bg-[#f1fdff] light:shadow-[0_0_0_1px_rgba(10,12,20,0.06)]">
              <div className="mb-1.5 flex justify-between text-[13px]">
                <span className="text-white/55 light:text-[#0A0C14]/55">Customer</span>
                <span className="text-white/85 light:text-[#0A0C14]/85">{custLabel}</span>
              </div>
              <div className="mb-1.5 flex justify-between text-[13px]">
                <span className="text-white/55 light:text-[#0A0C14]/55">Balance owed</span>
                <span className={owed > 0 ? 'text-[#26C7C3]' : 'text-white/85 light:text-[#0A0C14]/85'}>{fmt(owed)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/55 light:text-[#0A0C14]/55">Status</span>
                <span className="text-white/85 light:text-[#0A0C14]/85">{statusLabel}</span>
              </div>
            </div>

            <p className="mt-3 text-[11.5px] text-white/45 light:text-[#0A0C14]/45">
              Saved on the phone first; syncs when data returns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
