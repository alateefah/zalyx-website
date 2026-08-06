# Zalyx website — design brief

For designing zalyx.io. Everything here is fact unless marked **Open**.

---

## 1. What this site is for

Three audiences, in priority order:

1. **Merchants deciding whether to install the app** — market traders, tailors,
   mechanics, food vendors, pharmacies in Nigeria and The Gambia. Mostly on
   mid-range Android, often on slow or intermittent data.
2. **Merchants who already have the app and need help** — "how do I record a
   walk-in sale?" They arrive from Google or from the app.
3. **Job applicants** — the careers pages, already designed and working.

The site is **not** the marketplace. `marketplace.zalyx.io` is a separate,
customer-facing site where shoppers find merchants. This site sells the app.

## 2. The product, in one line

**Zalyx Ledger: keep your books, and get found.**

One product, two halves:

- **Ledger** — record sales, know who owes you, manage products and services,
  track expenses, reports, staff. Works offline. Free.
- **Marketplace** — turn on a storefront and customers nearby find you and
  message you on WhatsApp. Built into the same app, not a separate product.

Not two products. There is no separate account, data or business model, and the
roadmap (Payments next, then lending) is built on the ledger.

## 3. Brand as it exists today

Taken from the current site, not invented.

| | value | where it is used now |
|---|---|---|
| Brand gradient | `#26C7C3` → `#8354AA` (teal → purple) | 77 uses; buttons, headings, accents |
| Teal | `#26C7C3` | links and highlights on dark |
| Purple | `#8354AA` | links and highlights on light |
| Ink | `#0B0D13` | careers page background |
| Panel (dark) | `#111524`, `#0E111A` | cards on the careers page |
| Money green | `#00C853`, `#0FE082` | positive figures, "free" badges |
| Warning / danger | `#FFBC00`, `#FF3A44` | rare |

**Typeface:** Nohemi — geometric, wide, distinctive. Loaded in five weights
(400/500/600/700/900) via `next/font`. It is the only web font loaded; adding
another costs load time on the phones our merchants use.

**Existing look:** the home page is light (white) with gradient accents. The
careers pages are dark (`#0B0D13`) with gradient orbs blurred behind content.
Both already exist and work — the careers pages are the better-designed of the
two.

## 4. Pages

### Live and designed (leave alone unless you want to)
- `/careers`, `/careers/field-onboarding-partner`,
  `/careers/growth-marketing-officer` — dark, orbs, role cards
- `/privacy`, `/terms` — plain documents
- `/coming-soon` — email capture

### Live, needs design
- `/` — **home**. Currently: Hero → product section (broken, see §6) →
  "Join our community" → Footer.
- `/ledger` — **needs a real design**. Currently a grid of grey bordered boxes,
  which is what prompted this brief.
- `/marketplace` — same problem.

### Built, plain, probably fine as documents
- `/help` — index of guides, grouped into five topics
- `/help/[slug]` — one guide: title, numbered steps, related links
- `/blog` — post list
- `/blog/[slug]` — one post: title, byline, date, body
- `/whats-new` — changelog by version

These three are content pages. They need to be readable and on-brand, not
art-directed. Body text around 60–70 characters per line is the main thing.

## 5. Content per page

### `/` home
- **Hero** (exists): headline, subhead, app store buttons, "Now available on iOS
  & Android"
- **Our product**: the two halves side by side. Ledger rows: *Record sales ·
  Never forget who owes you · Manage products and services · Track expenses*.
  Marketplace rows: *Get discovered · Message on WhatsApp · Share your
  storefront*. Each half links to its page.
- **Proof**: stats exist in the current build — Active Users, Transactions
  Tracked, App Store Rating, Free Forever. **Open:** are these numbers real and
  current? They should not ship if not.
- **Community**: currently "Join our community" with a testimonial from *Amara
  O., Fashion Designer, Lagos* plus social icons. The icons duplicate the
  footer. **Recommendation:** keep the testimonial, drop the icon row.
- **Footer** (exists): navigation, legal, store buttons, socials, contact.

### `/ledger`
The fuller of the two product pages. Must cover: recording a sale (including
walk-ins, where there are no customer details), knowing who owes you, taking
part payments, tracking expenses, reports and statements, staff. Works offline.
Free. Each feature should link to its guide in `/help`.

Existing sections that belong here rather than on home: `ProductShowcase`
(phone mockups, "Works offline", "Payment Reminders") and `WhyZalyx`
(Reliability, Customer-Centered, Simplicity), and the FAQ.

### `/marketplace`
Shorter. Must cover: what the storefront is, how customers find you (nearby
first, by what you sell), WhatsApp as the contact channel, and **what a merchant
needs before they appear**:

- storefront turned on
- a WhatsApp number
- their city
- a description, or at least one product

Those four are not marketing copy — they are the exact conditions the server
uses to decide whether a business is discoverable, and the same four the app's
in-app checklist shows. If they change, three places change together.

## 6. What is broken right now

The product section on `/` renders white-on-white: the dark half's background is
not applying, so the marketplace headings and labels are invisible. It is
committed and deployed to the staging preview. Either fix or revert before
anyone sees it.

## 7. Constraints

- **Next.js 16 App Router**, React 19, **Tailwind v3** (not v4), TypeScript.
- **Nohemi is the only web font.** Adding another is a real cost on slow
  connections — justify it if you want one.
- Everything must work at 360px wide. That is the common phone width here.
- Keyboard focus must stay visible; motion should respect
  `prefers-reduced-motion`.
- **These URLs cannot change**: `/`, `/download`, `/update`, `/privacy`,
  `/terms`, `/careers`, `/careers/*`, `/coming-soon`. `/download` and `/update`
  redirect by device to the right app store, and `/?referralCode=…` opens the
  app on iOS.

## 8. Open questions for you

1. Are the home-page stats (users, transactions, rating) real and current?
2. Keep "Join our community", or is a merchant testimonial enough?
3. Should `/ledger` and `/marketplace` share the light home look, or is one dark
   and one light a direction worth trying?
4. Do you want screenshots of the app on these pages? There are mockups in
   `public/mockups/` already.
