# Zalyx website revamp, help centre and blog — design

**Date:** 2026-08-05
**Repo:** `zalyx-website`
**Status:** approved, ready for an implementation plan

## Why

Three problems, one project.

1. **The site describes a 2025 product.** It sells "record customers and orders, works offline" and never mentions expenses, staff, mechanic/dispatch flows, reports, Gambia, or the marketplace.
2. **There is nowhere to tell a merchant how to do anything.** Field marketers have no page to hand out, and the app has nowhere to link to. Some help-shaped content is trapped in a homepage FAQ accordion.
3. **There is nothing for search engines to find.** Marketplace launch depends on being discoverable, and storefronts are thin by nature. A blog is the only part of the domain that can carry substantial indexable text before merchants exist.

Success looks like: a merchant can find how to record a walk-in sale from Google or from inside the app; the marketing pages describe the product that actually shipped; and there is a published post targeting something a Nigerian trader would type into a search box.

## Decisions taken

| decision | choice | why |
|---|---|---|
| Stack | Migrate to **Next.js 16.2.11** App Router, replacing Vite | Content pages must be server-rendered to be indexed; matches the marketplace, so one pattern across both sites |
| Content source | **MDX files in the repo** | Dev-owned today; content stays in git with diffs and review |
| Editing UI | **None yet — Keystatic later** | Keystatic reads and writes the same MDX, so adding it is ~1 hour whenever a second writer appears. Not a migration. |
| Eventual home | **Own backoffice + service**, not a vendor CMS | Auth, roles and S3 already exist. What forces companies off git — images, scheduling, approvals, localisation — is already solved in-house. |
| Tailwind | **Stay on v3** | The marketplace is on v4, but porting components to v4 during a framework migration means two migrations at once |
| Wiki route | **`/help`** | A merchant searches "help"; "wiki" implies communal editing |
| Analytics | **Vercel Analytics** | Already on Vercel, no cookie banner, answers "did the post do anything?" |

## Architecture

One Next App Router project. Everything statically generated at build.

```
zalyx.io/
├── /                          marketing home (ported first, revamped last)
├── /download  /update         route handlers, 302 by user agent
├── /privacy  /terms           ported as-is
├── /careers                   + /careers/field-onboarding-partner
│                              + /careers/growth-marketing-officer
├── /coming-soon               ported as-is
├── /help                      index, grouped by topic
│   └── /help/[slug]           one page per feature
├── /blog                      post list
│   └── /blog/[slug]           one post
└── /whats-new                 changelog, newest first
```

Marketing pages stay React components — layout-heavy, rarely changed. Only the three content types go through MDX.

### The content module is the only seam

```ts
// lib/content.ts — the only place that knows content comes from disk
listHelpPages(): Promise<HelpPage[]>
getHelpPage(slug: string): Promise<HelpPage | null>
listPosts(): Promise<Post[]>            // published only, newest first
getPost(slug: string): Promise<Post | null>
listChangelog(): Promise<Release[]>
```

Every page, the sitemap and the RSS-shaped lists call these. Swapping MDX for Keystatic changes nothing (same files); swapping for the backoffice API rewrites this one file.

### Frontmatter

```yaml
# content/help/record-a-sale.mdx
title: Record a sale
summary: How to record a sale, with or without a customer.   # list text + meta description
topic: sales                  # groups it on /help
order: 1                      # position within the topic
updated: 2026-08-05
appVersion: 1.6.0             # the app version this describes
related: [walk-in-sale, record-a-payment]
```

```yaml
# content/blog/who-owes-you-money.mdx
title: How to know who owes you money — and actually get paid
summary: A simple way to track credit sales so nothing gets forgotten.
published: 2026-08-10         # absent = draft, never rendered, never in the sitemap
author: Lateefah Abdulkareem
```

```yaml
# content/changelog/1.6.0.mdx
version: 1.6.0
released: 2026-08-12
helpPages: [walk-in-sale, storefront]
```

### How feature tracking works

Two conventions, no tooling:

- **`appVersion` per help page** — a page describing 1.4 while the app ships 1.6 is visibly stale.
- **`helpPages` per changelog entry** — shipping a feature means writing or updating its help page and naming it in the release, so the changelog is the checklist that stops docs drifting.

If drift becomes a real problem, the natural next step is a build warning when `appVersion` falls more than one minor behind. Not building that yet.

## Content plan

### Marketing revamp

- Hero reframed on the two things being sold: **keep your books, and get found**
- One section per pillar: record sales (incl. walk-ins) · track who owes you · your storefront on the marketplace · expenses and reports · staff
- FAQ kept, but answers now covered properly in `/help` link there instead
- Footer gains **Help**, **Blog**, **What's new**

### `/help` — 12 pages, five topics

| topic | pages |
|---|---|
| Getting started | create your business · set up your storefront |
| Sales & payments | record a sale · walk-in sale (no customer) · snap a sale · record a payment, full or partial |
| Customers | add a customer · remove a customer |
| Your catalogue | add products or services · add a product photo |
| Money | log an expense · reports and statements |

Each page: what it's for, numbered steps, one screenshot, related links. Written for a merchant on a phone.

### First blog post

**"How to know who owes you money — and actually get paid."**

Deliberately not the marketplace announcement: nobody searches "Zalyx marketplace". This targets real search intent, is the pain the app was built for, and links naturally into `/help` and `/download`. The marketplace announcement is post #2, timed with launch when there are storefronts to link to.

## Being found

- **Static generation** for every content page via `generateStaticParams` from the content module
- **Per page:** title and description from frontmatter, canonical, OpenGraph + Twitter. Default OG image, overridable per post — this is what makes a shared link look like something in WhatsApp
- **Structured data:** `Article` (posts), `TechArticle` (help), `BreadcrumbList` (both), `Organization` + `WebSite` + `sameAs` (home)
- **Not using `HowTo`** despite the step-by-step shape: Google removed HowTo rich results in 2023, so it earns nothing
- **Sitemap and robots** generated from the same content module, so a new post needs no second list. `robots.txt` allows all — `zalyx.io` is already public, so no environment gate
- **Internal linking:** posts → `/help`, help → help via `related`, marketing → both.
  A **Help row in the app's More tab** pointing at `/help` is the highest-value inbound
  link and the support-deflection payoff — but it lives in `zalyx-ledger-mobile`, so it
  is a separate one-line change tracked as a follow-up, not part of this plan.

## Migration risks

Found while exploring the repo. These matter more than the page ports.

1. **Deep-link association files.** `public/.well-known/apple-app-site-association` and `assetlinks.json`, served with `Content-Type: application/json` via `vercel.json`. Breaking these silently kills universal links, and therefore referral links. Files move unchanged; headers move to `next.config.ts`.
2. **`vercel.json` rewrites `/(.*)` → `/`.** The SPA catch-all. It must be deleted or Next never serves a route.
3. **Live acquisition paths.** The home page reads a referral code from the query string and attempts a `zalyxledger://` deep link before falling back to the store; `/download` and `/update` sniff the user agent client-side.
   - Referral fallback stays a **client component** — it needs `navigator` and the scheme attempt is inherently client-side.
   - `/download` and `/update` become **route handlers** reading the `user-agent` header and issuing a 302 — faster, and works with JS disabled.

## Rollout

Parity before anything new, so the migration is verifiable on its own.

1. Next shell: layout, Tailwind v3, fonts, header/footer
2. Boring pages: `/privacy`, `/terms`, `/careers` + both job posts, `/coming-soon`
3. Risky bits: `.well-known` + headers, `/download`, `/update`, referral fallback
4. Home page ported as-is — **no redesign**
5. Vercel preview: verify every old URL, both `.well-known` files, a real deep link on a phone
6. Promote

Then, and only then: `lib/content.ts`, `/help`, `/blog`, `/whats-new`, and the home revamp.

Follow-up in another repo, once `/help` is live: a Help row in the mobile app's More tab.

## Testing

Vitest, following the marketplace's setup.

- **`lib/content.ts`** — frontmatter parsed; drafts (no `published`) excluded from lists and from `getPost`; help pages ordered by `topic` then `order`; unknown slug returns `null`
- **Sitemap** — includes a published post and every help page; excludes drafts
- **Route handlers** — iOS UA → App Store, Android UA → Play, desktop → `/#products`
- **Manual before promoting:** every pre-existing URL resolves; both `.well-known` files return JSON with the right content type; a referral link opens the app on a real device

## Out of scope

Keystatic; the backoffice content module; localisation; per-post OG image generation;
the marketplace announcement post; anything about `marketplace.zalyx.io`; and the mobile
app's Help row (different repo, tracked as a follow-up).
