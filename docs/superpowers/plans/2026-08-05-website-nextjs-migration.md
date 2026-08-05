# Website Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `zalyx-website` from a Vite React SPA to Next.js 16 App Router with **zero visible change**, so the content work (Plan 2) has a server-rendered foundation.

**Architecture:** Next 16 App Router replaces `react-router`. Every existing route becomes a file route. `react-helmet-async` is replaced by Next's Metadata API. The two user-agent redirects (`/download`, `/update`) become server route handlers. The referral deep-link fallback stays a client component because it needs `navigator`. Existing Tailwind classes and the `src/components/*` files are reused as-is wherever possible.

**Tech Stack:** Next 16.2.11 · React 19.2.4 · TypeScript · Tailwind CSS **v3** (deliberately not v4) · Vitest 4 + @testing-library/react · Vercel

## Global Constraints

- **Next 16.2.11 and React 19.2.4** — exact versions, matching `zalyx-marketplace`. Next 16 requires React 19; the current React 18.3.1 must be upgraded.
- **Tailwind stays on v3.** Do not upgrade to v4. `tailwind.config.js` keeps `fontFamily.nohemi`.
- **Zero visible change.** Same URLs, same copy, same layout. Any redesign belongs to Plan 2.
- **These URLs must keep working:** `/`, `/coming-soon`, `/privacy`, `/terms`, `/careers`, `/careers/field-onboarding-partner`, `/careers/growth-marketing-officer`, `/download`, `/update`.
- **`public/.well-known/apple-app-site-association` and `public/.well-known/assetlinks.json` must be served with `Content-Type: application/json`.** Breaking this silently kills universal links, and therefore referral installs.
- **`public/google5602ed81b953cb66.html` must remain reachable** (Google Search Console verification).
- **Referral URL contract:** `/?referralCode=ZLX-XXX-XXXX&env=staging|production`. Code pattern is exactly `/^ZLX-[A-Z0-9]{3}-[A-Z0-9]{4}$/`. `env` defaults to `production`.
- **Store links live in `src/utils/constants.ts`** (`STORE_LINKS`, `openStore`, `SOCIAL_LINKS`, `CONTACT`). Do not duplicate URLs.
- Package manager is **yarn**.

---

## File Structure

**Created:**
- `app/layout.tsx` — root layout: html/body, fonts, global CSS, default metadata
- `app/fonts.ts` — Nohemi via `next/font/local`
- `app/globals.css` — Tailwind directives (moved from `src/index.css` + `src/App.css`)
- `app/page.tsx` — home; renders referral fallback when `referralCode` is present
- `app/coming-soon/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`
- `app/careers/page.tsx`, `app/careers/field-onboarding-partner/page.tsx`, `app/careers/growth-marketing-officer/page.tsx`
- `app/download/route.ts`, `app/update/route.ts` — UA-based 302s
- `lib/storeRedirect.ts` — pure UA → destination logic (the only thing worth unit-testing here)
- `lib/storeRedirect.test.ts`
- `next.config.ts`, `next-env.d.ts`, `vitest.config.ts`, `vitest.setup.ts`
- `app/fonts/Nohemi-*.woff2` — moved from `public/fonts/nohemi/`

**Modified:**
- `package.json` — deps and scripts
- `tsconfig.json` — Next's compiler options and `@/*` path alias
- `tailwind.config.js` — content globs now include `app/**`
- `vercel.json` — rewrites deleted; headers move to `next.config.ts`
- `src/components/*.tsx` — `"use client"` where they use hooks/handlers; `<a href>` → `next/link` only where they currently use react-router `Link`

**Deleted:**
- `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `src/pages/*` (their content moves into `app/`), `src/components/DownloadRedirect.tsx`

---

### Task 1: Next.js scaffolding that builds and serves the layout

**Files:**
- Create: `app/layout.tsx`, `app/fonts.ts`, `app/globals.css`, `app/page.tsx` (temporary stub), `next.config.ts`, `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json`, `tsconfig.json`, `tailwind.config.js`
- Move: `public/fonts/nohemi/*.woff2` → `app/fonts/`
- Delete: `index.html`, `src/main.tsx`, `src/App.tsx`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `src/index.css`, `src/App.css`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `app/layout.tsx` root layout applying `nohemi.variable` to `<body>`; `app/fonts.ts` exporting `nohemi` (a `next/font/local` object with `.variable` and `.className`); `app/globals.css` holding the Tailwind directives; `vitest.config.ts` with the `@/*` alias resolving to the repo root

- [ ] **Step 1: Install the new dependencies and drop the Vite ones**

```bash
cd ~/Documents/repos/zalyx-website
yarn add next@16.2.11 react@19.2.4 react-dom@19.2.4
yarn add -D @types/react@^19 @types/react-dom@^19 vitest@^4.1.10 jsdom \
  @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
yarn remove vite react-helmet-async react-router-dom
```

`@vitejs/plugin-react` stays as a **dev** dependency — Vitest uses it to compile JSX for tests, even though Vite no longer builds the site.

- [ ] **Step 2: Replace the scripts in `package.json`**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "format": "prettier --write ."
  }
}
```

- [ ] **Step 3: Replace `tsconfig.json` and delete the Vite variants**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

```bash
rm tsconfig.app.json tsconfig.node.json tsconfig.app.tsbuildinfo tsconfig.node.tsbuildinfo
```

- [ ] **Step 4: Move the fonts and create `app/fonts.ts`**

```bash
mkdir -p app/fonts
git mv public/fonts/nohemi/Nohemi-Regular.woff2 app/fonts/
git mv public/fonts/nohemi/Nohemi-Medium.woff2 app/fonts/
git mv public/fonts/nohemi/Nohemi-SemiBold.woff2 app/fonts/
git mv public/fonts/nohemi/Nohemi-Bold.woff2 app/fonts/
git mv public/fonts/nohemi/Nohemi-Black.woff2 app/fonts/
```

`app/fonts.ts`:

```ts
import localFont from 'next/font/local';

// Nohemi is the Zalyx brand typeface. Served by next/font so the CSS is inlined
// and the files are fingerprinted — no @font-face to maintain by hand.
export const nohemi = localFont({
  src: [
    { path: './fonts/Nohemi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Nohemi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Nohemi-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Nohemi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Nohemi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-nohemi',
  display: 'swap',
});
```

- [ ] **Step 5: Create `app/globals.css`**

Copy the Tailwind directives from `src/index.css`, then append everything that was in `src/App.css` **except** any `#root` selectors (there is no `#root` in Next):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Carried over from src/App.css (45 lines). Copy all of it EXCEPT any rule
   targeting #root — Next renders into <body>, so those selectors match nothing
   and would silently drop whatever layout they applied. If #root carried layout
   (height, display, max-width), move those declarations onto body here. */
```

Check before deleting:

```bash
grep -n "#root" src/App.css
```

If that prints anything, those declarations need a home on `body` — do not
discard them.

Then: `rm src/index.css src/App.css`

- [ ] **Step 6: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { nohemi } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  // Verbatim from the old index.html <title> and the home page's Helmet tags.
  title: 'Zalyx Technologies',
  description:
    'Zalyx Technologies builds simple, powerful digital tools that help African entrepreneurs manage operations, customers, and records. Download Zalyx Ledger — free forever.',
  icons: { icon: '/zalyx.png' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nohemi.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Point Tailwind at `app/` and keep the Nohemi family**

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // next/font sets --font-nohemi; the family name stays `nohemi` so no
        // existing className has to change.
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 8: Create `next.config.ts` with the `.well-known` headers**

These replace the `headers` block in `vercel.json`. Do not delete `vercel.json` yet — that happens in Task 4 along with the redirect work.

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    // Universal-link association files must be served as JSON. Without the
    // explicit content type iOS and Android refuse them, which silently breaks
    // deep links — and therefore referral installs.
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
      {
        source: '/.well-known/assetlinks.json',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 9: Create the Vitest config, mirroring `zalyx-marketplace`**

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

`vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 10: Create a temporary home stub so the build has a root route**

`app/page.tsx`:

```tsx
// Temporary: replaced by the real home page in Task 5.
export default function Home() {
  return <main className="p-8 font-nohemi">Zalyx</main>;
}
```

- [ ] **Step 11: Delete the Vite entry points**

```bash
rm index.html src/main.tsx src/App.tsx vite.config.ts
```

- [ ] **Step 12: Verify the build and the dev server**

```bash
yarn build
```

Expected: build succeeds and lists `/` as a static route. Then:

```bash
yarn dev
```

Expected: `http://localhost:3000` shows "Zalyx" in the Nohemi typeface. Confirm the font by checking the computed `font-family` in devtools — it must resolve through `var(--font-nohemi)`.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "build: replace Vite with Next.js 16 App Router scaffolding

Next 16 requires React 19, so React moves 18.3.1 -> 19.2.4. Tailwind stays
on v3 deliberately: porting components to v4 during a framework migration
would be two migrations at once.

Nohemi moves to next/font/local so the @font-face rules and cache headers
stop being hand-maintained. The .well-known content-type headers move from
vercel.json into next.config.ts, where they will keep working once the SPA
catch-all rewrite is deleted."
```

---

### Task 2: Port the three standalone pages

**Files:**
- Create: `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/coming-soon/page.tsx`
- Delete: `src/pages/privacy.tsx`, `src/pages/terms.tsx`, `src/components/ComingSoon.tsx`

**Interfaces:**
- Consumes: `app/layout.tsx` from Task 1
- Produces: nothing later tasks depend on

- [ ] **Step 1: Port `/privacy`**

Copy the JSX from `src/pages/privacy.tsx` verbatim, minus the `Helmet` import and element. The title moves into `metadata`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zalyx Technologies',
};

export default function PrivacyPolicy() {
  return (
    // Copy src/pages/privacy.tsx lines 9-102 verbatim: the outer <div> through
    // its closing tag. Lines 1-8 are the Helmet block (replaced by the metadata
    // export above) plus the old function signature.
    <div className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
      ...
    </div>
  );
}
```

No `"use client"` — this page has no hooks or handlers.

Verify nothing was dropped — both counts must match:

```bash
grep -c "<p" src/pages/privacy.tsx && grep -c "<p" app/privacy/page.tsx
```

- [ ] **Step 2: Port `/terms` the same way**

`metadata.title` comes from that file's existing `<Helmet><title>`. Keep the effective-date line and all copy byte-identical.

- [ ] **Step 3: Port `/coming-soon`**

`src/components/ComingSoon.tsx` becomes `app/coming-soon/page.tsx`. If it uses `useState`, `useEffect` or an `onClick`, add `"use client"` as the first line. If it uses react-router's `Link`, swap to `next/link` — the props are the same except `to` becomes `href`.

- [ ] **Step 4: Verify all three render**

```bash
yarn dev
```

Visit `/privacy`, `/terms`, `/coming-soon`. Compare each against production (`https://zalyx.io/privacy` etc.) side by side — same headings, same dates, same spacing. Check each browser tab title matches the old Helmet title.

- [ ] **Step 5: Delete the old files and commit**

```bash
git rm src/pages/privacy.tsx src/pages/terms.tsx src/components/ComingSoon.tsx
git add app/privacy app/terms app/coming-soon
git commit -m "feat: port privacy, terms and coming-soon to the App Router

Helmet titles become Next metadata exports. Copy is unchanged — this
migration is meant to be invisible."
```

---

### Task 3: Port the careers pages

**Files:**
- Create: `app/careers/page.tsx`, `app/careers/field-onboarding-partner/page.tsx`, `app/careers/growth-marketing-officer/page.tsx`
- Delete: `src/pages/careers.tsx`, `src/pages/field-onboarding-partner.tsx`, `src/pages/growth-marketing-officer.tsx`

**Interfaces:**
- Consumes: `app/layout.tsx` from Task 1
- Produces: nothing later tasks depend on

- [ ] **Step 1: Port `/careers`**

Copy the JSX from `src/pages/careers.tsx`. Two changes only:

1. `Helmet` → `export const metadata: Metadata = { title: '...' }` using the existing title
2. Any react-router `<Link to="/careers/field-onboarding-partner">` → `<Link href="/careers/field-onboarding-partner">` from `next/link`

- [ ] **Step 2: Port both job pages**

`src/pages/field-onboarding-partner.tsx` → `app/careers/field-onboarding-partner/page.tsx`, and `growth-marketing-officer.tsx` → `app/careers/growth-marketing-officer/page.tsx`. Same two changes. Job descriptions must stay byte-identical — people are applying from these.

- [ ] **Step 3: Verify the URLs and the links**

```bash
yarn dev
```

- `/careers` renders and lists both roles
- Clicking each role navigates to the exact old path (`/careers/field-onboarding-partner`, `/careers/growth-marketing-officer`)
- Both job pages render in full, including any apply link or mailto

- [ ] **Step 4: Delete the old files and commit**

```bash
git rm src/pages/careers.tsx src/pages/field-onboarding-partner.tsx src/pages/growth-marketing-officer.tsx
git add app/careers
git commit -m "feat: port careers and both job pages to the App Router

Paths are unchanged — these URLs are in circulation with applicants."
```

---

### Task 4: The risky bits — store redirects, and deleting the SPA rewrite

This is the task most likely to break something invisible. It is deliberately separate so it can be reviewed on its own.

**Files:**
- Create: `lib/storeRedirect.ts`, `lib/storeRedirect.test.ts`, `app/download/route.ts`, `app/update/route.ts`
- Modify: `vercel.json` (rewrites deleted)
- Delete: `src/components/DownloadRedirect.tsx`

**Interfaces:**
- Consumes: `STORE_LINKS` from `src/utils/constants.ts`; `vitest.config.ts` from Task 1
- Produces: `storeDestination(userAgent: string | null): string` — returns an absolute store URL for iOS/Android, or the relative path `/#products` otherwise

- [ ] **Step 1: Write the failing test**

`lib/storeRedirect.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { storeDestination } from './storeRedirect';
import { STORE_LINKS } from '@/src/utils/constants';

// Real user-agent strings, because that is what this function actually sees.
const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const IPAD =
  'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const ANDROID =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const MAC =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('storeDestination', () => {
  it('sends iPhone and iPad to the App Store', () => {
    expect(storeDestination(IPHONE)).toBe(STORE_LINKS.APP_STORE);
    expect(storeDestination(IPAD)).toBe(STORE_LINKS.APP_STORE);
  });

  it('sends Android to Google Play', () => {
    expect(storeDestination(ANDROID)).toBe(STORE_LINKS.GOOGLE_PLAY);
  });

  it('sends desktop to the products section of the home page', () => {
    // Nothing to install on a laptop; show them what the app is instead.
    expect(storeDestination(MAC)).toBe('/#products');
  });

  it('falls back to the products section when there is no user agent', () => {
    // curl, link checkers, and anything that strips the header.
    expect(storeDestination(null)).toBe('/#products');
    expect(storeDestination('')).toBe('/#products');
  });

  it('is case insensitive', () => {
    expect(storeDestination(IPHONE.toUpperCase())).toBe(STORE_LINKS.APP_STORE);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

```bash
yarn test lib/storeRedirect.test.ts
```

Expected: FAIL — `Failed to resolve import "./storeRedirect"`.

- [ ] **Step 3: Write `lib/storeRedirect.ts`**

```ts
import { STORE_LINKS } from '@/src/utils/constants';

/**
 * Where /download and /update should send a visitor.
 *
 * This used to be a client component that read `navigator.userAgent` after
 * hydration. As a server route handler it is a single 302 — faster, and it
 * works with JavaScript disabled or blocked, which matters for links opened
 * inside other apps' in-app browsers.
 */
export function storeDestination(userAgent: string | null): string {
  const ua = (userAgent ?? '').toLowerCase();

  if (ua.includes('iphone') || ua.includes('ipad')) return STORE_LINKS.APP_STORE;
  if (ua.includes('android')) return STORE_LINKS.GOOGLE_PLAY;

  // Desktop or unknown: nothing to install, so show what the app is.
  return '/#products';
}
```

- [ ] **Step 4: Run the test again**

```bash
yarn test lib/storeRedirect.test.ts
```

Expected: PASS, 5 tests.

- [ ] **Step 5: Create both route handlers**

`app/download/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { storeDestination } from '@/lib/storeRedirect';

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const destination = storeDestination(request.headers.get('user-agent'));
  return NextResponse.redirect(new URL(destination, request.url), 302);
}
```

`app/update/route.ts` is the same file with the same body — `/update` has always behaved identically to `/download`, and duplicating four lines is clearer than a shared re-export.

`dynamic = 'force-dynamic'` is required: the response depends on a request header, so it must never be cached at build time.

- [ ] **Step 6: Delete the SPA catch-all from `vercel.json`**

The whole `rewrites` array goes. It rewrote `/(.*)` → `/`, which under Next would swallow every route. The `headers` block also goes — Task 1 moved it into `next.config.ts`. The file ends up with nothing useful in it, so delete it:

```bash
git rm vercel.json
```

Vercel detects Next.js automatically; no config is needed.

- [ ] **Step 7: Verify the redirects by hand**

```bash
yarn build && yarn start
```

```bash
curl -sI -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)" \
  http://localhost:3000/download | head -3
curl -sI -A "Mozilla/5.0 (Linux; Android 14; Pixel 8)" \
  http://localhost:3000/update | head -3
curl -sI http://localhost:3000/download | head -3
```

Expected: `302` with `location:` pointing at the App Store, Google Play, and `/#products` respectively.

- [ ] **Step 8: Verify the `.well-known` files and the Google verification file**

```bash
curl -sI http://localhost:3000/.well-known/apple-app-site-association | grep -i content-type
curl -sI http://localhost:3000/.well-known/assetlinks.json | grep -i content-type
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/google5602ed81b953cb66.html
```

Expected: `content-type: application/json` for both, and `200` for the verification file. **If either content type is wrong, stop** — universal links will break in production.

- [ ] **Step 9: Commit**

```bash
git rm src/components/DownloadRedirect.tsx
git add lib app/download app/update
git commit -m "feat: serve /download and /update as server redirects

They were client components reading navigator.userAgent after hydration.
As route handlers they are a single 302: faster, and they work when
JavaScript is blocked — which happens in other apps' in-app browsers,
where a lot of these links get opened.

Deletes vercel.json: its rewrites sent /(.*) to /, the SPA catch-all,
which would swallow every Next route. Its .well-known content-type
headers already moved to next.config.ts in the scaffolding commit."
```

---

### Task 5: Port the home page and the referral fallback

**Files:**
- Create: `app/ReferralGate.tsx`
- Modify: `app/page.tsx` (replaces the Task 1 stub), `src/components/Hero.tsx`, `src/components/WhyZalyx.tsx`, `src/components/ProductShowcase.tsx`, `src/components/FAQs.tsx`, `src/components/JoinFam.tsx`, `src/components/Footer.tsx`, `src/components/ReferralRedirect.tsx` (add `"use client"` where needed)
- Delete: `src/pages/index.tsx`

**Interfaces:**
- Consumes: `app/layout.tsx` (Task 1); existing components under `src/components/`
- Produces: the real `/` route. Nothing later depends on it.

- [ ] **Step 1: Mark the interactive components as client components**

Check each of `Hero`, `WhyZalyx`, `ProductShowcase`, `FAQs`, `JoinFam`, `Footer`, `ReferralRedirect` for `useState`, `useEffect`, `useRef`, `onClick`, `onSubmit` or `navigator`. Add `"use client"` as the **first line** of every file that has any of them.

`FAQs` (an accordion) and `ReferralRedirect` (uses `navigator` and timers) certainly need it. `Footer` and `Hero` probably do, because of `openStore` click handlers.

Anything without hooks or handlers stays a server component — leave those alone.

- [ ] **Step 2: Create the referral gate as a client component**

`app/ReferralGate.tsx`:

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import ReferralRedirect, { AppEnv } from '@/src/components/ReferralRedirect';

// Exactly the pattern the old landing page validated against. A referral link
// that does not match is treated as no referral at all, so a malformed code
// never sends anyone into the deep-link flow.
const REFERRAL_CODE = /^ZLX-[A-Z0-9]{3}-[A-Z0-9]{4}$/;

/**
 * Renders the deep-link handoff instead of the marketing page when the URL
 * carries a valid referral code.
 *
 * A client component on purpose: it attempts a `zalyxledger://` scheme open
 * and falls back to the store, which needs `navigator` and a timer. The rest
 * of the home page stays server-rendered.
 */
export function ReferralGate({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();

  const raw = params.get('referralCode')?.trim().toUpperCase();
  const code = raw && REFERRAL_CODE.test(raw) ? raw : null;
  const env: AppEnv =
    params.get('env')?.trim().toLowerCase() === 'staging' ? 'staging' : 'production';

  if (code) return <ReferralRedirect referralCode={code} appEnv={env} />;
  return <>{children}</>;
}
```

- [ ] **Step 3: Replace the stub `app/page.tsx`**

Section order must match `src/pages/index.tsx` exactly.

```tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ReferralGate } from './ReferralGate';
import { Hero } from '@/src/components/Hero';
import { WhyZalyx } from '@/src/components/WhyZalyx';
import { ProductShowcase } from '@/src/components/ProductShowcase';
import { FAQ } from '@/src/components/FAQs';
import { JoinFam } from '@/src/components/JoinFam';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Zalyx Technologies – Digital Tools for African Entrepreneurs',
  description:
    'Zalyx Technologies builds simple, powerful digital tools that help African entrepreneurs manage operations, customers, and records. Download Zalyx Ledger — free forever.',
};

export default function Home() {
  return (
    // useSearchParams needs a Suspense boundary during prerender; without it the
    // build fails on this route.
    <Suspense fallback={null}>
      <ReferralGate>
        <Hero />
        <WhyZalyx />
        <ProductShowcase />
        <FAQ />
        <JoinFam />
        <Footer />
      </ReferralGate>
    </Suspense>
  );
}
```

- [ ] **Step 4: Delete the old landing page**

```bash
git rm src/pages/index.tsx
rmdir src/pages 2>/dev/null || true
```

- [ ] **Step 5: Verify the home page against production**

```bash
yarn dev
```

Open `http://localhost:3000` beside `https://zalyx.io` and check: hero, section order, every image loads (they come from `public/`), the FAQ accordion opens, and store buttons open the right store.

- [ ] **Step 6: Verify the referral flow**

```
http://localhost:3000/?referralCode=ZLX-ABC-1234
http://localhost:3000/?referralCode=ZLX-ABC-1234&env=staging
http://localhost:3000/?referralCode=nonsense
```

Expected: the first two show the deep-link handoff (and the fallback UI after the attempt fails on desktop); the third shows the normal marketing page, because the pattern did not match.

- [ ] **Step 7: Build, and confirm the route types**

```bash
yarn build
```

Expected: build succeeds. `/` should be listed as a **dynamic** route (`ƒ`) — `useSearchParams` makes it request-time. That is correct and expected; do not try to force it static.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: port the home page and referral handoff to the App Router

The referral gate stays a client component: it attempts a zalyxledger://
open and falls back to the store, which needs navigator and a timer. Only
that gate is client-side; the marketing sections below it are unchanged.

Section order is identical to the old landing page — this commit is meant
to produce the same page, not a better one."
```

---

### Task 6: Parity check and cleanup

**Files:**
- Modify: `package.json` (drop anything now unused), `README.md`
- Delete: any leftover Vite artefacts

**Interfaces:**
- Consumes: everything above
- Produces: a deployable branch

- [ ] **Step 1: Confirm no Vite or router references survive**

```bash
grep -rn "react-router\|react-helmet\|import.meta.env\|vite" \
  --include="*.ts" --include="*.tsx" --include="*.json" \
  app src lib package.json | grep -v node_modules
```

Expected: no output. `@vitejs/plugin-react` in `package.json` devDependencies is the one legitimate exception — it compiles JSX for Vitest.

- [ ] **Step 2: Full verification run**

```bash
yarn test
yarn build
npx tsc --noEmit
yarn lint
```

Expected: tests pass (5), build succeeds, no type errors, lint no worse than before the migration.

- [ ] **Step 3: Walk the parity checklist against production**

Every one of these must behave as it does on `https://zalyx.io` today:

| URL | expected |
|---|---|
| `/` | full marketing page, correct tab title |
| `/?referralCode=ZLX-ABC-1234` | deep-link handoff |
| `/coming-soon` | renders |
| `/privacy` | renders, correct effective date |
| `/terms` | renders |
| `/careers` | lists both roles, both links work |
| `/careers/field-onboarding-partner` | full job description |
| `/careers/growth-marketing-officer` | full job description |
| `/download` (iPhone UA) | 302 → App Store |
| `/download` (Android UA) | 302 → Google Play |
| `/download` (desktop) | 302 → `/#products` |
| `/update` | same three behaviours |
| `/.well-known/apple-app-site-association` | 200, `content-type: application/json` |
| `/.well-known/assetlinks.json` | 200, `content-type: application/json` |
| `/google5602ed81b953cb66.html` | 200 |

- [ ] **Step 4: Update the README**

Replace any Vite instructions with:

```markdown
## Development

    yarn dev      # http://localhost:3000
    yarn build
    yarn test     # vitest
    yarn lint

Next.js 16 App Router. Tailwind v3. Deployed on Vercel — no vercel.json;
`.well-known` content-type headers live in `next.config.ts`.
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: finish the Next.js migration and document the new commands"
```

- [ ] **Step 6: Deploy a Vercel preview and verify on a real phone**

Push the branch and open the preview URL. Beyond re-walking the table above:

1. Open a real referral link (`<preview>/?referralCode=<a valid code>`) **on a phone with the app installed** — it must open the app, not the store.
2. Open `<preview>/download` on an iPhone and an Android device — each must land on the right store listing.

**Do not promote to production until both pass.** Universal links are the one thing here that cannot be verified from a laptop, and breaking them costs referral installs silently.

---

## What this plan deliberately does not do

- No redesign. The hero, sections and copy are ported unchanged. The revamp is Plan 2.
- No `/help`, `/blog` or `/whats-new`. No `lib/content.ts`, no MDX dependency. Plan 2.
- No sitemap, robots or structured data. Plan 2 adds them from the content module, so building them now would mean building them twice.
- No Tailwind v4, no Keystatic, no analytics. Analytics is a one-line addition in Plan 2.
- No change to the mobile app. The Help row is a follow-up once `/help` exists.
