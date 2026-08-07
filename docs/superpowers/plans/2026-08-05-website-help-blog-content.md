# Help Centre, Blog and Changelog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give `zalyx.io` an MDX-backed help centre, blog and changelog that search engines can actually index, with one module as the only thing that knows where content comes from.

**Architecture:** Content lives as MDX files under `content/`. A single module, `lib/content.ts`, reads and validates them; every page, the sitemap and the structured data go through it. Frontmatter is parsed with `gray-matter`; bodies are compiled by `next-mdx-remote/rsc` inside server components. Swapping MDX for Keystatic changes nothing (same files); swapping for the backoffice API rewrites that one module.

**Tech Stack:** Next 16.2.11 App Router · React 19.2.4 · Tailwind CSS v3 · `gray-matter` 4.0.3 · `next-mdx-remote` 6.0.0 (`/rsc` entry) · `@vercel/analytics` 2.0.1 · Vitest 4

## Global Constraints

- **Plan 1 must be merged first.** This plan assumes the Next App Router migration is on `main` and production builds as Next.
- **Route is `/help`, not `/wiki`.** A merchant searches "help"; "wiki" implies communal editing.
- **`lib/content.ts` is the only module that touches the filesystem.** Pages, sitemap and SEO helpers call it and never read files themselves.
- **A post without a `published` date is a draft** — excluded from lists, from `getPost`, and from the sitemap. Never rendered.
- **Help pages are ordered by `topic` then `order`**, using the topic order defined in `HELP_TOPICS`.
- **Structured data:** `Article` for posts, `TechArticle` for help pages, `BreadcrumbList` on both, `Organization` + `WebSite` on home. **Do not use `HowTo`** — Google removed HowTo rich results in 2023, so it earns nothing.
- **`robots.txt` allows everything.** `zalyx.io` is already public; unlike the marketplace there is no environment gate.
- **Tailwind stays on v3.** No v4 upgrade in this plan.
- **No Keystatic**, no backoffice content API, no localisation, no per-post generated OG images.
- Package manager is **yarn**. Site URL is `https://zalyx.io`.

---

## File Structure

**Created:**
- `lib/siteUrl.ts` — the canonical origin, one constant
- `lib/content.ts` — reads and validates MDX; the only filesystem seam
- `lib/content.test.ts`
- `lib/seo.ts` — metadata builders + JSON-LD, mirroring `zalyx-marketplace/lib/seo.ts`
- `lib/seo.test.ts`
- `components/Mdx.tsx` — the MDX component map (headings, links, lists, code)
- `components/Breadcrumbs.tsx`
- `app/help/page.tsx`, `app/help/[slug]/page.tsx`
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- `app/whats-new/page.tsx`
- `app/sitemap.ts`, `app/robots.ts`
- `content/help/record-a-sale.mdx` — the exemplar help page
- `content/blog/who-owes-you-money.mdx` — the first post
- `content/changelog/1.6.0.mdx` — the first release entry
- `tests/fixtures/content/**` — fixture MDX for the content tests

**Modified:**
- `app/layout.tsx` — Vercel Analytics, `metadataBase`
- `src/components/Footer.tsx` — Help / Blog / What's new links
- `src/components/FAQs.tsx` — answers now covered in `/help` link there
- `package.json`

---

### Task 1: The content module

**Files:**
- Create: `lib/siteUrl.ts`, `lib/content.ts`, `lib/content.test.ts`, `tests/fixtures/content/help/*.mdx`, `tests/fixtures/content/blog/*.mdx`, `tests/fixtures/content/changelog/*.mdx`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing
- Produces:
  ```ts
  export const HELP_TOPICS: readonly { id: string; label: string }[]
  export type HelpMeta = { slug: string; title: string; summary: string; topic: string;
                           order: number; updated: string; appVersion: string; related: string[] }
  export type PostMeta = { slug: string; title: string; summary: string;
                           published: string; author: string }
  export type ReleaseMeta = { version: string; released: string; helpPages: string[] }
  export type Doc<M> = { meta: M; source: string }
  listHelpPages(root?: string): Promise<HelpMeta[]>          // topic order, then `order`
  getHelpPage(slug: string, root?: string): Promise<Doc<HelpMeta> | null>
  listPosts(root?: string): Promise<PostMeta[]>              // published only, newest first
  getPost(slug: string, root?: string): Promise<Doc<PostMeta> | null>
  listChangelog(root?: string): Promise<Doc<ReleaseMeta>[]>  // newest release first
  ```
  `root` defaults to `<cwd>/content` and exists so tests can point at fixtures.

- [ ] **Step 1: Install the dependencies**

```bash
cd ~/Documents/repos/zalyx-website
yarn add gray-matter@4.0.3 next-mdx-remote@6.0.0
```

- [ ] **Step 2: Create `lib/siteUrl.ts`**

```ts
// The canonical origin. Used for canonical URLs, OpenGraph and the sitemap, so
// it must be absolute and must not carry a trailing slash.
export const SITE_URL = 'https://zalyx.io';
```

- [ ] **Step 3: Write the fixture content**

`tests/fixtures/content/help/record-a-sale.mdx`:

```mdx
---
title: Record a sale
summary: How to record a sale, with or without a customer.
topic: sales
order: 1
updated: 2026-08-05
appVersion: 1.6.0
related: [walk-in-sale]
---

Tap **Create Order** on the home screen.
```

`tests/fixtures/content/help/walk-in-sale.mdx`:

```mdx
---
title: Walk-in sale
summary: Record a sale when you have no customer details.
topic: sales
order: 2
updated: 2026-08-05
appVersion: 1.6.0
---

Leave the customer blank.
```

`tests/fixtures/content/help/create-your-business.mdx`:

```mdx
---
title: Create your business
summary: Set up your business on Zalyx.
topic: getting-started
order: 1
updated: 2026-08-05
appVersion: 1.6.0
---

Enter your business name and type.
```

`tests/fixtures/content/blog/published-post.mdx`:

```mdx
---
title: A published post
summary: This one is live.
published: 2026-08-01
author: Lateefah Abdulkareem
---

Body text.
```

`tests/fixtures/content/blog/older-post.mdx`:

```mdx
---
title: An older post
summary: Published earlier.
published: 2026-07-01
author: Lateefah Abdulkareem
---

Body text.
```

`tests/fixtures/content/blog/draft-post.mdx` — **no `published` key**, which is what makes it a draft:

```mdx
---
title: A draft
summary: Not finished.
author: Lateefah Abdulkareem
---

Unfinished body.
```

`tests/fixtures/content/changelog/1.5.0.mdx`:

```mdx
---
version: 1.5.0
released: 2026-07-01
helpPages: [create-your-business]
---

Earlier release.
```

`tests/fixtures/content/changelog/1.6.0.mdx`:

```mdx
---
version: 1.6.0
released: 2026-08-12
helpPages: [walk-in-sale]
---

Walk-in sales and marketplace storefronts.
```

- [ ] **Step 4: Write the failing tests**

`lib/content.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import path from 'node:path';
import {
  listHelpPages, getHelpPage, listPosts, getPost, listChangelog,
} from './content';

const FIXTURES = path.join(process.cwd(), 'tests/fixtures/content');

describe('listHelpPages', () => {
  it('orders by topic, then by order within the topic', async () => {
    // Getting-started comes before sales because HELP_TOPICS says so — not
    // because of filenames, which would order alphabetically and put
    // create-your-business after record-a-sale.
    const slugs = (await listHelpPages(FIXTURES)).map((p) => p.slug);
    expect(slugs).toEqual(['create-your-business', 'record-a-sale', 'walk-in-sale']);
  });

  it('exposes the fields a list and a meta description need', async () => {
    const page = (await listHelpPages(FIXTURES)).find((p) => p.slug === 'record-a-sale')!;
    expect(page.title).toBe('Record a sale');
    expect(page.summary).toBe('How to record a sale, with or without a customer.');
    expect(page.topic).toBe('sales');
    expect(page.appVersion).toBe('1.6.0');
  });

  it('defaults related to an empty array when absent', async () => {
    const page = (await listHelpPages(FIXTURES)).find((p) => p.slug === 'walk-in-sale')!;
    expect(page.related).toEqual([]);
  });
});

describe('getHelpPage', () => {
  it('returns frontmatter and the raw body', async () => {
    const doc = await getHelpPage('record-a-sale', FIXTURES);
    expect(doc?.meta.title).toBe('Record a sale');
    expect(doc?.source).toContain('Create Order');
  });

  it('returns null for a slug that does not exist', async () => {
    // The page turns this into a 404 rather than a 500.
    expect(await getHelpPage('no-such-page', FIXTURES)).toBeNull();
  });

  it('refuses a slug containing a path separator', async () => {
    // Slugs come from the URL. Without this, ../../ could read any file on disk.
    expect(await getHelpPage('../../package', FIXTURES)).toBeNull();
    expect(await getHelpPage('sales/record', FIXTURES)).toBeNull();
  });
});

describe('listPosts', () => {
  it('returns published posts newest first', async () => {
    const slugs = (await listPosts(FIXTURES)).map((p) => p.slug);
    expect(slugs).toEqual(['published-post', 'older-post']);
  });

  it('excludes drafts', async () => {
    // A post with no `published` date is unfinished. It must never appear in a
    // list, and Task 5 keeps it out of the sitemap for the same reason.
    const slugs = (await listPosts(FIXTURES)).map((p) => p.slug);
    expect(slugs).not.toContain('draft-post');
  });
});

describe('getPost', () => {
  it('returns a published post', async () => {
    const doc = await getPost('published-post', FIXTURES);
    expect(doc?.meta.title).toBe('A published post');
    expect(doc?.meta.author).toBe('Lateefah Abdulkareem');
  });

  it('returns null for a draft, so a leaked URL 404s', async () => {
    expect(await getPost('draft-post', FIXTURES)).toBeNull();
  });
});

describe('listChangelog', () => {
  it('returns releases newest first, with bodies', async () => {
    const releases = await listChangelog(FIXTURES);
    expect(releases.map((r) => r.meta.version)).toEqual(['1.6.0', '1.5.0']);
    expect(releases[0].source).toContain('Walk-in sales');
  });

  it('carries the help pages a release points at', async () => {
    const latest = (await listChangelog(FIXTURES))[0];
    expect(latest.meta.helpPages).toEqual(['walk-in-sale']);
  });
});
```

- [ ] **Step 5: Run the tests and watch them fail**

```bash
yarn test lib/content.test.ts
```

Expected: FAIL — `Failed to resolve import "./content"`.

- [ ] **Step 6: Write `lib/content.ts`**

```ts
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * The only module that knows content lives on disk.
 *
 * Pages, the sitemap and the SEO helpers all call these functions and never read
 * files themselves. That is what makes the source swappable: Keystatic writes the
 * same MDX files, and moving to the backoffice API later rewrites this file
 * alone.
 */

/** Topic order on /help. Sections appear in this order, not alphabetically. */
export const HELP_TOPICS = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'sales', label: 'Sales & payments' },
  { id: 'customers', label: 'Customers' },
  { id: 'catalogue', label: 'Your catalogue' },
  { id: 'money', label: 'Money' },
] as const;

export type HelpMeta = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  order: number;
  updated: string;
  /** The app version this page describes — a stale page is visible at a glance. */
  appVersion: string;
  related: string[];
};

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  /** Absent in the file means draft; such posts never reach these types. */
  published: string;
  author: string;
};

export type ReleaseMeta = {
  version: string;
  released: string;
  /** Help pages this release created or changed. */
  helpPages: string[];
};

export type Doc<M> = { meta: M; source: string };

const CONTENT_ROOT = path.join(process.cwd(), 'content');

/**
 * Slugs arrive from the URL, so they are untrusted. Anything other than
 * lowercase letters, digits and hyphens is rejected — without this, a slug of
 * `../../package` would read files outside the content directory.
 */
const SAFE_SLUG = /^[a-z0-9-]+$/;

async function readDir(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((f) => f.endsWith('.mdx'));
  } catch {
    // No directory yet is not an error: a site with no posts should render an
    // empty list, not a 500.
    return [];
  }
}

async function readDoc(file: string): Promise<{ data: Record<string, unknown>; content: string }> {
  const raw = await fs.readFile(file, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

function toHelpMeta(slug: string, data: Record<string, unknown>): HelpMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ''),
    topic: String(data.topic ?? 'getting-started'),
    order: Number(data.order ?? 0),
    updated: String(data.updated ?? ''),
    appVersion: String(data.appVersion ?? ''),
    related: Array.isArray(data.related) ? data.related.map(String) : [],
  };
}

export async function listHelpPages(root: string = CONTENT_ROOT): Promise<HelpMeta[]> {
  const dir = path.join(root, 'help');
  const files = await readDir(dir);
  const pages = await Promise.all(
    files.map(async (file) => {
      const { data } = await readDoc(path.join(dir, file));
      return toHelpMeta(file.replace(/\.mdx$/, ''), data);
    }),
  );

  const topicIndex = (topic: string) => {
    const i = HELP_TOPICS.findIndex((t) => t.id === topic);
    // Unknown topics sort last rather than crashing, so a typo in frontmatter
    // costs a misplaced page and not a broken build.
    return i === -1 ? HELP_TOPICS.length : i;
  };

  return pages.sort(
    (a, b) => topicIndex(a.topic) - topicIndex(b.topic) || a.order - b.order,
  );
}

export async function getHelpPage(
  slug: string,
  root: string = CONTENT_ROOT,
): Promise<Doc<HelpMeta> | null> {
  if (!SAFE_SLUG.test(slug)) return null;
  try {
    const { data, content } = await readDoc(path.join(root, 'help', `${slug}.mdx`));
    return { meta: toHelpMeta(slug, data), source: content };
  } catch {
    return null;
  }
}

function toPostMeta(slug: string, data: Record<string, unknown>): PostMeta | null {
  // No published date means draft. Returning null here is what keeps drafts out
  // of lists, out of getPost and out of the sitemap, from one rule.
  if (!data.published) return null;
  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ''),
    published: String(data.published),
    author: String(data.author ?? 'Zalyx'),
  };
}

export async function listPosts(root: string = CONTENT_ROOT): Promise<PostMeta[]> {
  const dir = path.join(root, 'blog');
  const files = await readDir(dir);
  const posts = await Promise.all(
    files.map(async (file) => {
      const { data } = await readDoc(path.join(dir, file));
      return toPostMeta(file.replace(/\.mdx$/, ''), data);
    }),
  );

  return posts
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.published.localeCompare(a.published));
}

export async function getPost(
  slug: string,
  root: string = CONTENT_ROOT,
): Promise<Doc<PostMeta> | null> {
  if (!SAFE_SLUG.test(slug)) return null;
  try {
    const { data, content } = await readDoc(path.join(root, 'blog', `${slug}.mdx`));
    const meta = toPostMeta(slug, data);
    return meta ? { meta, source: content } : null;
  } catch {
    return null;
  }
}

export async function listChangelog(
  root: string = CONTENT_ROOT,
): Promise<Doc<ReleaseMeta>[]> {
  const dir = path.join(root, 'changelog');
  const files = await readDir(dir);
  const releases = await Promise.all(
    files.map(async (file) => {
      const { data, content } = await readDoc(path.join(dir, file));
      return {
        meta: {
          version: String(data.version ?? file.replace(/\.mdx$/, '')),
          released: String(data.released ?? ''),
          helpPages: Array.isArray(data.helpPages) ? data.helpPages.map(String) : [],
        },
        source: content,
      };
    }),
  );

  return releases.sort((a, b) => b.meta.released.localeCompare(a.meta.released));
}
```

- [ ] **Step 7: Run the tests**

```bash
yarn test lib/content.test.ts
```

Expected: PASS, 11 tests.

- [ ] **Step 8: Commit**

```bash
git add lib/siteUrl.ts lib/content.ts lib/content.test.ts tests/fixtures package.json yarn.lock
git commit -m "feat: content module for MDX help pages, posts and releases

One module reads content; pages, sitemap and SEO helpers go through it and
never touch the filesystem. That is the seam: Keystatic would write these
same files, and moving to the backoffice API later rewrites this file alone.

Two rules worth naming. A post with no published date is a draft, enforced
in one place so it stays out of lists, out of getPost and out of the
sitemap. And slugs are validated against [a-z0-9-] because they come from
the URL — ../../package would otherwise read files outside content/."
```

---

### Task 2: SEO helpers

**Files:**
- Create: `lib/seo.ts`, `lib/seo.test.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `SITE_URL` from `lib/siteUrl.ts`; `HelpMeta`, `PostMeta` from `lib/content.ts`
- Produces:
  ```ts
  jsonLdString(data: unknown): string
  helpMetadata(meta: HelpMeta): Metadata
  postMetadata(meta: PostMeta): Metadata
  helpArticleJsonLd(meta: HelpMeta): object      // TechArticle
  postArticleJsonLd(meta: PostMeta): object      // Article
  breadcrumbJsonLd(trail: { name: string; path: string }[]): object
  organizationJsonLd(): object
  ```

- [ ] **Step 1: Write the failing tests**

`lib/seo.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  jsonLdString, helpMetadata, postMetadata,
  helpArticleJsonLd, postArticleJsonLd, breadcrumbJsonLd, organizationJsonLd,
} from './seo';
import type { HelpMeta, PostMeta } from './content';

const help: HelpMeta = {
  slug: 'record-a-sale',
  title: 'Record a sale',
  summary: 'How to record a sale, with or without a customer.',
  topic: 'sales',
  order: 1,
  updated: '2026-08-05',
  appVersion: '1.6.0',
  related: [],
};

const post: PostMeta = {
  slug: 'who-owes-you-money',
  title: 'How to know who owes you money',
  summary: 'A simple way to track credit sales.',
  published: '2026-08-10',
  author: 'Lateefah Abdulkareem',
};

describe('jsonLdString', () => {
  it('escapes < so content cannot break out of the script tag', () => {
    // JSON.stringify does not escape '/', so a body containing </script> would
    // close the tag early — stored XSS from a content file.
    expect(jsonLdString({ t: '</script><img onerror=x>' })).not.toContain('</script>');
    expect(jsonLdString({ t: '<b>' })).toContain('\\u003c');
  });
});

describe('helpMetadata', () => {
  it('uses the summary as the description and sets a canonical', () => {
    const meta = helpMetadata(help);
    expect(meta.title).toBe('Record a sale');
    expect(meta.description).toBe(help.summary);
    expect(meta.alternates?.canonical).toBe('/help/record-a-sale');
  });
});

describe('postMetadata', () => {
  it('marks the OpenGraph type as an article and carries the date', () => {
    const meta = postMetadata(post);
    expect(meta.openGraph?.type).toBe('article');
    expect(meta.alternates?.canonical).toBe('/blog/who-owes-you-money');
  });
});

describe('structured data', () => {
  it('describes a help page as a TechArticle, not a HowTo', () => {
    // Google removed HowTo rich results in 2023, so HowTo earns nothing.
    const ld = helpArticleJsonLd(help) as Record<string, unknown>;
    expect(ld['@type']).toBe('TechArticle');
    expect(ld.headline).toBe('Record a sale');
    expect(ld.dateModified).toBe('2026-08-05');
  });

  it('describes a post as an Article with an author', () => {
    const ld = postArticleJsonLd(post) as Record<string, unknown>;
    expect(ld['@type']).toBe('Article');
    expect(ld.datePublished).toBe('2026-08-10');
    expect((ld.author as Record<string, unknown>).name).toBe('Lateefah Abdulkareem');
  });

  it('builds an absolute breadcrumb trail', () => {
    const ld = breadcrumbJsonLd([
      { name: 'Help', path: '/help' },
      { name: 'Record a sale', path: '/help/record-a-sale' },
    ]) as { itemListElement: { position: number; item: string }[] };

    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[1].item).toBe('https://zalyx.io/help/record-a-sale');
  });

  it('names the organisation and its socials', () => {
    const ld = organizationJsonLd() as Record<string, unknown>;
    expect(ld['@type']).toBe('Organization');
    expect(Array.isArray(ld.sameAs)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests and watch them fail**

```bash
yarn test lib/seo.test.ts
```

Expected: FAIL — `Failed to resolve import "./seo"`.

- [ ] **Step 3: Write `lib/seo.ts`**

```ts
import type { Metadata } from 'next';
import { SITE_URL } from './siteUrl';
import { SOCIAL_LINKS } from '@/src/utils/constants';
import type { HelpMeta, PostMeta } from './content';

// One home for page metadata and JSON-LD, so every route describes itself the
// same way. Mirrors zalyx-marketplace/lib/seo.ts.

const DEFAULT_OG = '/zalyx-logo.png';

/**
 * Serialise JSON-LD for a <script> tag.
 *
 * Escapes '<' because JSON.stringify does not escape '/': a title or body
 * containing "</script>" would close the tag early and let content become
 * markup. Content is ours today, but it will not be forever.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function helpMetadata(meta: HelpMeta): Metadata {
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/help/${meta.slug}` },
    openGraph: {
      title: meta.title,
      description: meta.summary,
      url: `/help/${meta.slug}`,
      images: [DEFAULT_OG],
      type: 'website',
    },
  };
}

export function postMetadata(meta: PostMeta): Metadata {
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: {
      title: meta.title,
      description: meta.summary,
      url: `/blog/${meta.slug}`,
      images: [DEFAULT_OG],
      // 'article' is what gives a shared link a byline and date in previews.
      type: 'article',
      publishedTime: meta.published,
      authors: [meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.summary,
      images: [DEFAULT_OG],
    },
  };
}

export function helpArticleJsonLd(meta: HelpMeta) {
  return {
    '@context': 'https://schema.org',
    // TechArticle, not HowTo: Google removed HowTo rich results in 2023, so the
    // step-by-step shape earns nothing there.
    '@type': 'TechArticle',
    headline: meta.title,
    description: meta.summary,
    dateModified: meta.updated || undefined,
    url: `${SITE_URL}/help/${meta.slug}`,
    publisher: { '@type': 'Organization', name: 'Zalyx Technologies' },
  };
}

export function postArticleJsonLd(meta: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.published,
    url: `${SITE_URL}/blog/${meta.slug}`,
    author: { '@type': 'Person', name: meta.author },
    publisher: { '@type': 'Organization', name: 'Zalyx Technologies' },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zalyx Technologies',
    url: SITE_URL,
    logo: `${SITE_URL}/zalyx-logo.png`,
    sameAs: [SOCIAL_LINKS.INSTAGRAM, SOCIAL_LINKS.LINKEDIN, SOCIAL_LINKS.TWITTER],
  };
}
```

- [ ] **Step 4: Run the tests**

```bash
yarn test lib/seo.test.ts
```

Expected: PASS, 7 tests.

- [ ] **Step 5: Add `metadataBase` to the layout**

Without it, the relative `canonical` and `openGraph.url` values above resolve
against `localhost` in production builds. In `app/layout.tsx`, add to the
existing `metadata` export:

```ts
import { SITE_URL } from '@/lib/siteUrl';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Zalyx Technologies',
  // ...the rest unchanged
};
```

- [ ] **Step 6: Verify metadata resolves absolutely**

```bash
yarn build && yarn start -p 3020
curl -s http://localhost:3020/careers | grep -oE '<link rel="canonical"[^>]*>'
```

Expected: an absolute `https://zalyx.io/careers`, not a relative or localhost URL.

- [ ] **Step 7: Commit**

```bash
git add lib/seo.ts lib/seo.test.ts app/layout.tsx
git commit -m "feat: metadata and JSON-LD helpers

TechArticle for help pages rather than HowTo — Google removed HowTo rich
results in 2023, so the step-by-step shape earns nothing. Article for posts,
BreadcrumbList for both, Organization on the home page.

jsonLdString escapes '<' because JSON.stringify does not escape '/': a title
containing </script> would close the tag early and turn content into markup.

metadataBase is what makes the relative canonical and OG URLs resolve to
zalyx.io instead of localhost in a production build."
```

---

### Task 3: `/help`

**Files:**
- Create: `components/Mdx.tsx`, `components/Breadcrumbs.tsx`, `app/help/page.tsx`, `app/help/[slug]/page.tsx`, `content/help/record-a-sale.mdx`

**Interfaces:**
- Consumes: `listHelpPages`, `getHelpPage`, `HELP_TOPICS`, `HelpMeta` from `lib/content.ts`; `helpMetadata`, `helpArticleJsonLd`, `breadcrumbJsonLd`, `jsonLdString` from `lib/seo.ts`
- Produces: `Mdx` (renders an MDX source string) and `Breadcrumbs` for reuse by Task 4

- [ ] **Step 1: Write the MDX component map**

`components/Mdx.tsx`:

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

// Tailwind v3 without the typography plugin, so MDX output needs explicit
// styling. Kept in one map rather than a `prose` class to avoid adding a plugin
// during a content migration.
const components = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="mt-10 mb-3 text-xl font-semibold text-gray-900" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 mb-2 text-lg font-semibold text-gray-900" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed text-gray-700" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-gray-700" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-[#8354AA] underline hover:no-underline" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  img: (props: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-6 rounded-xl border border-gray-200" alt={props.alt ?? ''} {...props} />
  ),
};

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
```

- [ ] **Step 2: Write the breadcrumbs component**

`components/Breadcrumbs.tsx`:

```tsx
import Link from 'next/link';

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      {trail.map((step, i) => (
        <span key={step.path}>
          {i > 0 && <span className="mx-2">/</span>}
          {i === trail.length - 1 ? (
            <span className="text-gray-700">{step.name}</span>
          ) : (
            <Link href={step.path} className="hover:text-[#8354AA]">
              {step.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Write the first real help page**

`content/help/record-a-sale.mdx`:

```mdx
---
title: Record a sale
summary: How to record a sale in Zalyx Ledger, with or without customer details.
topic: sales
order: 1
updated: 2026-08-05
appVersion: 1.6.0
related: [walk-in-sale]
---

Every sale you record updates what you are owed, so the money side of your
business stays accurate without any adding up at the end of the day.

## Record a sale

1. Open the **Order** tab and tap **Create Order**.
2. Choose a customer, or leave it blank if you do not have their details.
3. Add what you sold. Tap **Add from catalog** for something you have saved, or
   **Add item** to type it in once.
4. Set how much was paid: **Full**, **Partial**, or **Unpaid**.
5. If anything is still owed, set a balance due date.
6. Tap **Create Order**.

## If the customer pays later

Open the order and tap **Record payment**. Zalyx keeps the balance and the due
date up to date, and the order moves to fully paid once nothing is outstanding.

## Selling without customer details

You do not need a name or a phone number. See
[walk-in sale](/help/walk-in-sale).
```

- [ ] **Step 4: Write the `/help` index**

`app/help/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { listHelpPages, HELP_TOPICS } from '@/lib/content';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Help — Zalyx',
  description: 'How to use Zalyx Ledger: record sales, track who owes you, and set up your storefront.',
  alternates: { canonical: '/help' },
};

export default async function HelpIndex() {
  const pages = await listHelpPages();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">Help</h1>
        <p className="mb-10 text-gray-600">
          Short guides for getting things done in Zalyx Ledger.
        </p>

        {HELP_TOPICS.map((topic) => {
          const inTopic = pages.filter((p) => p.topic === topic.id);
          // A topic with no pages yet renders nothing, so the index never shows
          // an empty heading while the content is still being written.
          if (inTopic.length === 0) return null;

          return (
            <section key={topic.id} className="mb-10">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                {topic.label}
              </h2>
              <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                {inTopic.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/help/${page.slug}`}
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{page.title}</span>
                      <span className="block text-sm text-gray-500">{page.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Write the help page route**

`app/help/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHelpPage, listHelpPages } from '@/lib/content';
import { helpMetadata, helpArticleJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { Mdx } from '@/components/Mdx';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Footer } from '@/src/components/Footer';

type Props = { params: Promise<{ slug: string }> };

// Every help page is known at build time, so they are all static HTML.
export async function generateStaticParams() {
  return (await listHelpPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getHelpPage(slug);
  if (!doc) return {};
  return helpMetadata(doc.meta);
}

export default async function HelpPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getHelpPage(slug);
  if (!doc) notFound();

  const all = await listHelpPages();
  const related = doc.meta.related
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is (typeof all)[number] => Boolean(p));

  const trail = [
    { name: 'Help', path: '/help' },
    { name: doc.meta.title, path: `/help/${doc.meta.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(helpArticleJsonLd(doc.meta)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(trail)) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <Breadcrumbs trail={trail} />
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">{doc.meta.title}</h1>

        <Mdx source={doc.source} />

        {related.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Related
            </h2>
            <ul className="space-y-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/help/${p.slug}`} className="text-[#8354AA] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {doc.meta.updated && (
          <p className="mt-10 text-sm text-gray-400">Last updated {doc.meta.updated}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Build and verify**

```bash
yarn build
```

Expected: `/help` and `/help/record-a-sale` both listed, both static (`○`).

```bash
yarn start -p 3021
curl -s http://localhost:3021/help | grep -c "Record a sale"          # 1 or more
curl -s http://localhost:3021/help/record-a-sale | grep -c "TechArticle"   # 1
curl -s http://localhost:3021/help/record-a-sale | grep -c "BreadcrumbList" # 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3021/help/nope   # 404
```

The 404 is the important one: an unknown slug must not render an empty shell.

- [ ] **Step 7: Commit**

```bash
git add components/Mdx.tsx components/Breadcrumbs.tsx app/help content/help
git commit -m "feat: /help, an MDX-backed help centre

Pages are grouped by the topic order in HELP_TOPICS rather than
alphabetically, and a topic with no pages renders nothing — so the index
never shows an empty heading while content is still being written.

An unknown slug 404s rather than rendering an empty page: thin pages are
what we keep crawlers away from.

The MDX component map styles output explicitly instead of pulling in the
typography plugin, to avoid a Tailwind change during a content migration."
```

---

### Task 4: `/blog` and `/whats-new`

**Files:**
- Create: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/whats-new/page.tsx`, `content/blog/who-owes-you-money.mdx`, `content/changelog/1.6.0.mdx`

**Interfaces:**
- Consumes: `listPosts`, `getPost`, `listChangelog` from `lib/content.ts`; `postMetadata`, `postArticleJsonLd`, `breadcrumbJsonLd`, `jsonLdString` from `lib/seo.ts`; `Mdx`, `Breadcrumbs` from Task 3
- Produces: nothing later tasks depend on

- [ ] **Step 1: Write the first post**

`content/blog/who-owes-you-money.mdx`:

```mdx
---
title: How to know who owes you money — and actually get paid
summary: A simple way to track credit sales so nothing gets forgotten.
published: 2026-08-10
author: Lateefah Abdulkareem
---

Most small businesses in Nigeria sell on credit. Not as a policy — it just
happens. A regular customer takes goods and promises to pay on Friday. Someone
pays half now and half "next week". By the end of the month, the money is spread
across a dozen half-remembered conversations.

The problem is rarely that customers refuse to pay. It is that nobody can say,
precisely, who owes what.

## Why the notebook stops working

A notebook records that a sale happened. What it does not do is tell you the
total outstanding, who is overdue today, or whether that ₦5,000 last Tuesday was
payment in full or a deposit. To answer those, you re-read every page and add up
in your head — so most people simply do not, and the balance quietly becomes a
guess.

## What to record instead

Three things per sale, and only three:

1. **What was sold, and for how much.**
2. **How much was actually paid** — none, some, or all.
3. **When the rest is due.**

That third one is what turns a list of sales into something useful. Without a
date, "he will pay soon" never becomes "he is four days late".

## Getting paid without the awkward conversation

Being specific is what makes chasing easy. "You owe ₦12,500 from the 3rd, due
last Friday" is a fact both of you can check. "I think you still owe me
something" is an argument.

A short, factual reminder on the due date collects most of it. People forget far
more often than they refuse.

## Doing it in Zalyx

Zalyx Ledger records the sale, the payment and the due date together, then shows
you the outstanding total without any adding up. You can record a sale in a few
seconds — even without the customer's details, for a walk-in.

- [Record a sale](/help/record-a-sale)
- [Download Zalyx Ledger](/download) — free, and it works offline

You do not need to change how you sell. You need to be able to answer who owes
you what, on any given morning.
```

- [ ] **Step 2: Write the first changelog entry**

`content/changelog/1.6.0.mdx`:

```mdx
---
version: 1.6.0
released: 2026-08-12
helpPages: [record-a-sale]
---

- **Walk-in sales.** Record a sale without any customer details — for drive-by
  and market-stall trade where there is no phone number to take.
- **Marketplace storefronts.** Turn on your storefront and customers nearby can
  find you and message you on WhatsApp.
- **Delete a customer** without losing their past orders.
- **Clearer order screens.** The balance is now the first thing you see, and
  typed-in items sit alongside catalogue items in one list.
```

- [ ] **Step 3: Write the blog index**

`app/blog/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { listPosts } from '@/lib/content';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Blog — Zalyx',
  description: 'Practical writing on running a small business: money, customers and getting paid.',
  alternates: { canonical: '/blog' },
};

export default async function BlogIndex() {
  const posts = await listPosts();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-gray-500">Nothing published yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#8354AA]">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-gray-600">{post.summary}</p>
                  <p className="mt-1 text-sm text-gray-400">{post.published}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Write the post route**

`app/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, listPosts } from '@/lib/content';
import { postMetadata, postArticleJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { Mdx } from '@/components/Mdx';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Footer } from '@/src/components/Footer';

type Props = { params: Promise<{ slug: string }> };

// Drafts are absent from listPosts, so they get no static params and no page.
export async function generateStaticParams() {
  return (await listPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPost(slug);
  if (!doc) return {};
  return postMetadata(doc.meta);
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const doc = await getPost(slug);
  if (!doc) notFound();

  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: doc.meta.title, path: `/blog/${doc.meta.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(postArticleJsonLd(doc.meta)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(trail)) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <Breadcrumbs trail={trail} />
        <h1 className="mb-2 text-3xl font-semibold leading-tight text-gray-900">
          {doc.meta.title}
        </h1>
        <p className="mb-10 text-sm text-gray-400">
          {doc.meta.author} · {doc.meta.published}
        </p>

        <Mdx source={doc.source} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Write the changelog page**

`app/whats-new/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { listChangelog, listHelpPages } from '@/lib/content';
import { Mdx } from '@/components/Mdx';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: "What's new — Zalyx",
  description: 'What changed in each release of Zalyx Ledger.',
  alternates: { canonical: '/whats-new' },
};

export default async function WhatsNew() {
  const [releases, helpPages] = await Promise.all([listChangelog(), listHelpPages()]);

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">What&apos;s new</h1>

        {releases.map((release) => {
          // Naming help pages in a release is what stops the docs drifting: a
          // feature ships with the page that explains it, or the gap is obvious.
          const linked = release.meta.helpPages
            .map((slug) => helpPages.find((p) => p.slug === slug))
            .filter((p): p is (typeof helpPages)[number] => Boolean(p));

          return (
            <section key={release.meta.version} className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900">
                Version {release.meta.version}
              </h2>
              <p className="mb-4 text-sm text-gray-400">{release.meta.released}</p>

              <Mdx source={release.source} />

              {linked.length > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                  How to use it:{' '}
                  {linked.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && ', '}
                      <Link href={`/help/${p.slug}`} className="text-[#8354AA] hover:underline">
                        {p.title}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Build and verify**

```bash
yarn build && yarn start -p 3022
curl -s http://localhost:3022/blog | grep -c "who owes you money"        # 1+
curl -s http://localhost:3022/blog/who-owes-you-money | grep -c '"Article"'  # 1
curl -s http://localhost:3022/whats-new | grep -c "1.6.0"                # 1+
curl -s http://localhost:3022/whats-new | grep -c "Record a sale"         # 1, the help link
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3022/blog/nope  # 404
```

- [ ] **Step 7: Commit**

```bash
git add app/blog app/whats-new content/blog content/changelog
git commit -m "feat: /blog and /whats-new

The first post targets a real search intent — how to track who owes you
money — rather than announcing the marketplace. Nobody searches for a
product name they have never heard; they search for the problem.

Drafts get no static params, so an unpublished post has no page at all
rather than one that 404s inconsistently.

Each release names the help pages it affects, which is the mechanism that
keeps documentation from drifting: a feature ships with its page, or the
gap shows up on this list."
```

---

### Task 5: Sitemap, robots and home-page structured data

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/sitemap.test.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `listHelpPages`, `listPosts` from `lib/content.ts`; `SITE_URL`; `organizationJsonLd`, `jsonLdString` from `lib/seo.ts`
- Produces: nothing later tasks depend on

- [ ] **Step 1: Write the failing sitemap test**

`app/sitemap.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

const content = vi.hoisted(() => ({
  listHelpPages: vi.fn(),
  listPosts: vi.fn(),
}));
vi.mock('@/lib/content', () => content);

import sitemap from './sitemap';

beforeEach(() => {
  vi.clearAllMocks();
  content.listHelpPages.mockResolvedValue([
    { slug: 'record-a-sale', updated: '2026-08-05' },
  ]);
  content.listPosts.mockResolvedValue([
    { slug: 'who-owes-you-money', published: '2026-08-10' },
  ]);
});

describe('sitemap', () => {
  it('includes the static routes', async () => {
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).toContain('https://zalyx.io');
    expect(urls).toContain('https://zalyx.io/help');
    expect(urls).toContain('https://zalyx.io/blog');
    expect(urls).toContain('https://zalyx.io/whats-new');
  });

  it('includes every help page and post', async () => {
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).toContain('https://zalyx.io/help/record-a-sale');
    expect(urls).toContain('https://zalyx.io/blog/who-owes-you-money');
  });

  it('uses the content dates as lastModified', async () => {
    // "Everything changed just now" on every fetch tells a crawler nothing about
    // what is worth re-reading.
    const entry = (await sitemap()).find((u) => u.url.endsWith('/help/record-a-sale'));
    expect(entry?.lastModified).toEqual(new Date('2026-08-05'));
  });

  it('never lists /download or /update', async () => {
    // They are 302s to app stores; submitting them wastes crawl budget and they
    // are not pages.
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls.some((u) => u.includes('/download'))).toBe(false);
    expect(urls.some((u) => u.includes('/update'))).toBe(false);
  });

  it('falls back to the static routes when content cannot be read', async () => {
    content.listHelpPages.mockRejectedValue(new Error('boom'));
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).toContain('https://zalyx.io');
    expect(urls.some((u) => u.includes('/help/'))).toBe(false);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

```bash
yarn test app/sitemap.test.ts
```

Expected: FAIL — `Failed to resolve import "./sitemap"`.

- [ ] **Step 3: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteUrl';
import { listHelpPages, listPosts } from '@/lib/content';

// Generated from the content module, so a new page or post appears here on
// deploy with no second list to maintain. /download and /update are deliberately
// absent: they are 302s to app stores, not pages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now },
    { url: `${SITE_URL}/help`, lastModified: now },
    { url: `${SITE_URL}/blog`, lastModified: now },
    { url: `${SITE_URL}/whats-new`, lastModified: now },
    { url: `${SITE_URL}/careers`, lastModified: now },
    { url: `${SITE_URL}/privacy`, lastModified: now },
    { url: `${SITE_URL}/terms`, lastModified: now },
  ];

  try {
    const [help, posts] = await Promise.all([listHelpPages(), listPosts()]);

    return [
      ...staticUrls,
      ...help.map((p) => ({
        url: `${SITE_URL}/help/${p.slug}`,
        lastModified: p.updated ? new Date(p.updated) : now,
      })),
      ...posts.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.published),
      })),
    ];
  } catch {
    // A content problem must not take the sitemap down with it.
    return staticUrls;
  }
}
```

- [ ] **Step 4: Run the tests**

```bash
yarn test app/sitemap.test.ts
```

Expected: PASS, 5 tests.

- [ ] **Step 5: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteUrl';

// zalyx.io is a public marketing site, so everything is allowed — unlike the
// marketplace, which gates indexing on the environment because staging serves
// the same pages from a different host.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 6: Add `Organization` and `WebSite` structured data to the home page**

In `app/page.tsx`, inside the non-referral return, above `<Hero />`:

```tsx
import { organizationJsonLd, jsonLdString } from '@/lib/seo';

// ...
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd()) }}
      />
```

- [ ] **Step 7: Verify**

```bash
yarn build && yarn start -p 3023
curl -s http://localhost:3023/sitemap.xml | grep -c "help/record-a-sale"   # 1
curl -s http://localhost:3023/sitemap.xml | grep -c "blog/who-owes"        # 1
curl -s http://localhost:3023/sitemap.xml | grep -c "download"             # 0
curl -s http://localhost:3023/robots.txt
curl -s http://localhost:3023/ | grep -c "Organization"                    # 1
```

- [ ] **Step 8: Commit**

```bash
git add app/sitemap.ts app/sitemap.test.ts app/robots.ts app/page.tsx
git commit -m "feat: sitemap, robots and Organization data

Both are generated from the content module, so a new page or post is
submitted on deploy with no second list to keep in step. lastModified comes
from each page's own date rather than 'now', which is the difference between
a signal and noise.

/download and /update are excluded on purpose: they are 302s to app stores,
not pages, and submitting them wastes crawl budget."
```

---

### Task 6: Vercel Analytics

**Files:**
- Modify: `app/layout.tsx`, `package.json`

**Interfaces:**
- Consumes: nothing
- Produces: nothing

- [ ] **Step 1: Install**

```bash
yarn add @vercel/analytics@2.0.1
```

- [ ] **Step 2: Add the component to the layout**

In `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/next';

// ...inside <body>, after {children}
        {children}
        <Analytics />
```

- [ ] **Step 3: Verify it does not break the build, and ships no cookie**

```bash
yarn build && yarn start -p 3024
curl -sI http://localhost:3024/ | grep -ci "set-cookie"
```

Expected: build passes; `0` cookies — this is why it needs no consent banner.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx package.json yarn.lock
git commit -m "feat: Vercel Analytics

Sets no cookie, so it needs no consent banner, and answers the only
question that matters after publishing: did anyone read it."
```

---

### Task 7: Wire the marketing site to the new content

**Files:**
- Modify: `src/components/Footer.tsx`, `src/components/FAQs.tsx`

**Interfaces:**
- Consumes: the `/help`, `/blog`, `/whats-new` routes from Tasks 3–4
- Produces: nothing

- [ ] **Step 1: Add the links to the footer**

In `src/components/Footer.tsx`, alongside the existing links, add three entries
using `next/link`:

```tsx
import Link from 'next/link';

// ...within the existing link list markup
<Link href="/help" className="hover:text-white">Help</Link>
<Link href="/blog" className="hover:text-white">Blog</Link>
<Link href="/whats-new" className="hover:text-white">What&apos;s new</Link>
```

Match the surrounding markup and classes rather than the snippet above — the
point is three links in the footer's existing style.

- [ ] **Step 2: Point the FAQ at the help centre**

At the end of the FAQ list in `src/components/FAQs.tsx`, add one line beneath the
accordion:

```tsx
<p className="mt-8 text-center text-gray-600">
  More questions?{' '}
  <Link href="/help" className="text-[#8354AA] underline hover:no-underline">
    Read the help guides
  </Link>
  .
</p>
```

`FAQs.tsx` is already a client component, so importing `next/link` there is fine.

Leave the existing questions in place. They answer commercial questions ("is it
free?", "how does Zalyx make money?") that belong on a marketing page — the help
centre covers *how to do things*, which is a different job.

- [ ] **Step 3: Verify the links resolve**

```bash
yarn build && yarn start -p 3025
curl -s http://localhost:3025/ | grep -oE 'href="/(help|blog|whats-new)"' | sort -u
```

Expected: all three present.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/components/FAQs.tsx
git commit -m "feat: link the marketing pages to help, blog and what's new

Internal links are how crawlers find content, and how a visitor who reads
the FAQ gets to the guides. The FAQ keeps its commercial questions — is it
free, how does Zalyx make money — because those belong on a marketing page;
/help answers how to do things, which is a different job."
```

---

### Task 8: The remaining eleven help pages

This is content authoring, not engineering. The machinery is finished; each page
is a file. Write them **while looking at the app**, because the value is in the
steps being right — a guide that names a button that no longer exists is worse
than no guide.

**Files:** eleven new files under `content/help/`

- [ ] **Step 1: Write each page with this exact frontmatter**

| file | topic | order | title |
|---|---|---|---|
| `create-your-business.mdx` | `getting-started` | 1 | Create your business |
| `set-up-your-storefront.mdx` | `getting-started` | 2 | Set up your storefront |
| `walk-in-sale.mdx` | `sales` | 2 | Record a walk-in sale |
| `snap-a-sale.mdx` | `sales` | 3 | Record several sales at once |
| `record-a-payment.mdx` | `sales` | 4 | Record a payment |
| `add-a-customer.mdx` | `customers` | 1 | Add a customer |
| `remove-a-customer.mdx` | `customers` | 2 | Remove a customer |
| `add-products.mdx` | `catalogue` | 1 | Add products or services |
| `add-a-product-photo.mdx` | `catalogue` | 2 | Add a product photo |
| `log-an-expense.mdx` | `money` | 1 | Log an expense |
| `reports-and-statements.mdx` | `money` | 2 | Reports and statements |

Every file needs `title`, `summary`, `topic`, `order`, `updated`, `appVersion`,
and `related` where another page is genuinely relevant. `record-a-sale.mdx` from
Task 3 is the template: a sentence on why it matters, numbered steps naming the
actual buttons, then related links.

- [ ] **Step 2: Check the index renders every topic**

```bash
yarn build && yarn start -p 3026
curl -s http://localhost:3026/help | grep -oE "Getting started|Sales & payments|Customers|Your catalogue|Money" | sort -u
```

Expected: all five topic headings.

- [ ] **Step 3: Check every page is in the sitemap**

```bash
curl -s http://localhost:3026/sitemap.xml | grep -c "/help/"
```

Expected: 12.

- [ ] **Step 4: Commit**

```bash
git add content/help
git commit -m "docs: the remaining eleven help pages"
```

---

## Verification before merging

```bash
yarn test          # content 11, seo 7, sitemap 5, storeRedirect 5 = 28
yarn build
npx tsc --noEmit
yarn lint
```

Then on a Vercel preview:

- `/help` lists five topics and twelve pages
- `/help/record-a-sale` renders MDX, breadcrumbs and both JSON-LD blocks
- `/blog/who-owes-you-money` renders, and its link preview in WhatsApp shows a title and image
- `/whats-new` shows 1.6.0 and links into `/help`
- `/sitemap.xml` lists twelve help pages and one post, and no `/download`
- `/robots.txt` allows all and names the sitemap
- Rich Results Test on the post and a help page reports no errors

---

### Task 9: `/ledger` and `/marketplace`

Positioning is **one product, two halves** — Zalyx Ledger keeps your books and gets you
found. Do not present the marketplace as a second product: it has no separate account,
data or business model, and the roadmap says Payments is next.

**Files:**
- Create: `app/ledger/page.tsx`, `app/marketplace/page.tsx`
- Modify: `app/page.tsx`, `src/components/Footer.tsx`

**Interfaces:**
- Consumes: existing `src/components/*` sections; `/help` routes from Task 3
- Produces: nothing later tasks depend on

- [ ] **Step 1: Build `/ledger` from the sections that already exist**

`ProductShowcase`, `WhyZalyx` and the FAQ were written about the ledger, so this page
mostly rehouses them rather than inventing copy.

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductShowcase } from '@/src/components/ProductShowcase';
import { WhyZalyx } from '@/src/components/WhyZalyx';
import { FAQ } from '@/src/components/FAQs';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Zalyx Ledger — know who owes you, and what you made',
  description:
    'Record sales in seconds, track who owes you money, log expenses and see what your business made. Works offline. Free.',
  alternates: { canonical: '/ledger' },
};

export default function LedgerPage() {
  return (
    <>
      <main>
        {/* Sections in the order a merchant meets them: record a sale, chase the
            balance, then everything the records make possible. */}
        <ProductShowcase />
        <WhyZalyx />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
```

Add a short intro above `ProductShowcase` covering the six things this page must name:
recording sales including walk-ins, who owes you, payments, expenses, reports, staff.
Each mention of a feature links to its help page — `/help/record-a-sale`,
`/help/log-an-expense`, `/help/reports-and-statements`.

- [ ] **Step 2: Build `/marketplace`**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Zalyx Marketplace — get found by customers nearby',
  description:
    'Turn on your storefront and customers nearby can find your business and message you on WhatsApp. Built into Zalyx Ledger.',
  alternates: { canonical: '/marketplace' },
};

export default function MarketplacePage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-4 text-3xl font-semibold text-gray-900">
          Get found by customers nearby
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Your storefront is part of Zalyx Ledger, not a separate app. The products you
          already record become a page customers can find — and message you about on
          WhatsApp.
        </p>

        {/* What it takes to appear, stated plainly. These are the same four
            conditions the service uses to decide discoverability, so a merchant
            reading this page and a merchant reading the in-app checklist are
            told the same thing. */}
        <h2 className="mb-3 mt-10 text-xl font-semibold text-gray-900">
          What you need
        </h2>
        <ul className="mb-8 list-disc space-y-2 pl-6 text-gray-700">
          <li>Your storefront turned on</li>
          <li>A WhatsApp number customers can message</li>
          <li>Your city</li>
          <li>A description, or at least one product</li>
        </ul>

        <Link
          href="/help/set-up-your-storefront"
          className="text-[#8354AA] underline hover:no-underline"
        >
          How to set up your storefront
        </Link>
      </main>
      <Footer />
    </>
  );
}
```

The four conditions must stay in step with `VISIBLE_WHERE` in
`zalyx-ledger-service/src/marketplace/marketplace.service.ts`. If that gate changes, this
page and the in-app checklist both change with it.

- [ ] **Step 3: Shorten the home page to a router**

`app/page.tsx` keeps `Hero` and `JoinFam`, and replaces the long product scroll with two
short cards linking to `/ledger` and `/marketplace`. `ProductShowcase`, `WhyZalyx` and
`FAQ` move off the home page — they now live on `/ledger`.

Keep the `ReferralGate` and `Suspense` wrapper exactly as they are.

- [ ] **Step 4: Add both to the footer and the sitemap**

In `src/components/Footer.tsx`, add `Ledger` and `Marketplace` beside the Help/Blog/What's
new links from Task 7. In `app/sitemap.ts`, add both to `staticUrls`:

```ts
    { url: `${SITE_URL}/ledger`, lastModified: now },
    { url: `${SITE_URL}/marketplace`, lastModified: now },
```

- [ ] **Step 5: Verify**

```bash
yarn build && yarn start -p 3027
curl -s http://localhost:3027/ledger | grep -oE '<title>[^<]*' | cut -c8-
curl -s http://localhost:3027/marketplace | grep -oE '<title>[^<]*' | cut -c8-
curl -s http://localhost:3027/sitemap.xml | grep -cE "/(ledger|marketplace)"   # 2
curl -s http://localhost:3027/ | grep -oE 'href="/(ledger|marketplace)"' | sort -u
```

Expected: two distinct titles — the point of splitting the pages — both in the sitemap,
both linked from home.

- [ ] **Step 6: Commit**

```bash
git add app/ledger app/marketplace app/page.tsx app/sitemap.ts src/components/Footer.tsx
git commit -m "feat: /ledger and /marketplace product pages

One page could carry one title and one description, so every feature
competed for the same metadata and the site ranked for nothing specific.
Splitting them gives each half its own.

Framed as one product with two halves, not two products: the marketplace
has no separate account, data or business model, and the roadmap says
Payments is next. The ledger gets the bigger page — Payments and Capital
both depend on merchants recording sales.

Home becomes a short router rather than a long scroll. ProductShowcase,
WhyZalyx and the FAQ move to /ledger, where they were always about."
```

---

## Follow-ups, deliberately not in this plan

- **A Help row in the mobile app's More tab**, linking to `zalyx.io/help`. One line in `zalyx-ledger-mobile`, and the highest-value inbound link there is — but a different repo.
- **A purpose-made OG image.** `/zalyx-logo.png` is the placeholder; a 1200×630 image would make shared links look deliberate. Design work, not code.
- **Per-feature and business-type pages** — `/ledger/expenses`, `/for/tailors`. The route
  structure allows them; the content has to earn them first.
- **Keystatic**, the backoffice content API, localisation, per-post generated OG images.
