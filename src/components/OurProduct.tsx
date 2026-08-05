import Link from "next/link";

/**
 * One product, two halves — and the two halves sit on two different grounds.
 *
 * Books are paper, so the ledger side is paper white with ruled lines, the way a
 * merchant's notebook already looks. Discovery happens out in the world, so the
 * marketplace side is the same ink the careers page uses, with the brand
 * gradient as light rather than decoration.
 *
 * Features are entries on hairline rules, not cards in boxes. A ledger is a list
 * of lines; that is the whole idea of the product and it costs nothing to say it
 * in the layout.
 */

const LEDGER = [
  { label: "Record sales", note: "In seconds, with or without customer details" },
  { label: "Never forget who owes you", note: "Every balance, and when it is due" },
  { label: "Manage products and services", note: "Your catalogue, priced once" },
  { label: "Track expenses", note: "So what you made is the real number" },
];

const MARKETPLACE = [
  { label: "Get discovered", note: "Customers nearby find you by what you sell" },
  { label: "Message on WhatsApp", note: "Where the conversation already happens" },
  { label: "Share your storefront", note: "One link, your products, always current" },
];

export function OurProduct() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        Our product
      </p>
      <h2 className="font-nohemi max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#0B0D13] sm:text-4xl">
        Keep your books, and get found
      </h2>

      <div className="mt-10 grid overflow-hidden rounded-3xl border border-[#E3E7EE] md:grid-cols-2">
        {/* Paper half */}
        <div className="bg-white p-7 sm:p-9">
          <h3 className="font-nohemi text-xl font-bold text-[#0B0D13]">Zalyx Ledger</h3>
          <p className="mt-1 text-sm text-gray-500">Free, and works offline</p>

          <ul className="mt-7">
            {LEDGER.map((row) => (
              <li
                key={row.label}
                className="border-t border-[#E3E7EE] py-4 first:border-t-0 first:pt-0"
              >
                <span className="block font-medium text-[#0B0D13]">{row.label}</span>
                <span className="mt-0.5 block text-sm text-gray-500">{row.note}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/ledger"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8354AA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8354AA]"
          >
            See what it does
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Ink half */}
        <div className="relative overflow-hidden bg-[#0B0D13] p-7 sm:p-9">
          {/* The gradient appears once, as light rather than as a border. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-[90px]"
            style={{
              background:
                "linear-gradient(214deg, #26C7C3 0%, #8354AA 100%)",
            }}
          />

          <h3 className="font-nohemi relative text-xl font-bold text-white">
            Zalyx Marketplace
          </h3>
          <p className="relative mt-1 text-sm text-gray-400">Built into the same app</p>

          <ul className="relative mt-7">
            {MARKETPLACE.map((row) => (
              <li
                key={row.label}
                className="border-t border-white/10 py-4 first:border-t-0 first:pt-0"
              >
                <span className="block font-medium text-white">{row.label}</span>
                <span className="mt-0.5 block text-sm text-gray-400">{row.note}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/marketplace"
            className="group relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#26C7C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#26C7C3]"
          >
            See how customers find you
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
