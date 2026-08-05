# zalyx-website

The marketing site at [zalyx.io](https://zalyx.io) — Next.js 16 App Router,
Tailwind CSS v3, deployed on Vercel.

## Development

```bash
yarn dev      # http://localhost:3000
yarn build
yarn test     # vitest
yarn lint
```

## Layout

```
app/                 routes (App Router)
  fonts.ts           Nohemi via next/font/local
  globals.css        Tailwind directives + the body rule
  download/route.ts  302 to the right app store, by user agent
  update/route.ts    same, kept as a separate path
lib/                 pure logic, unit-tested
src/components/      page sections, shared with no router involved
src/utils/           STORE_LINKS, SOCIAL_LINKS, CONTACT, openStore
public/              images, plus the files below
```

## Two things not to break

**`public/.well-known/apple-app-site-association` and `assetlinks.json`** must be
served as `application/json`. The header lives in `next.config.ts`. Without it
iOS and Android reject the files, universal links stop resolving, and referral
installs fail silently — nothing errors, they just stop working.

**`public/google5602ed81b953cb66.html`** is the Google Search Console
verification file. Deleting it un-verifies the domain.

## Referral links

`/?referralCode=ZLX-XXX-XXXX&env=staging|production`

The code is validated on the server against `/^ZLX-[A-Z0-9]{3}-[A-Z0-9]{4}$/`; a
malformed code renders the normal marketing page. A valid one renders the
deep-link handoff, which tries `zalyxledger://` and falls back to the store.

## Notes

- There is no `vercel.json`. Vercel detects Next automatically, and the old file's
  `/(.*)` → `/` rewrite would swallow every route.
- Tailwind is v3 here and v4 in `zalyx-marketplace`. Deliberate: upgrading during
  the framework migration would have been two migrations at once.
