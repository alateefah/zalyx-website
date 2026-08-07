import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * The only module that knows content lives on disk.
 *
 * Pages, the sitemap and the SEO helpers all call these functions and never read
 * files themselves. That is what makes the source swappable: Keystatic writes
 * the same MDX files, and moving to the backoffice API later rewrites this file
 * alone.
 */

/** Topic order on /help. Sections appear in this order, not alphabetically. */
export const HELP_TOPICS = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'sales', label: 'Sales & payments' },
  { id: 'customers', label: 'Customers' },
  { id: 'catalogue', label: 'Your catalogue' },
  { id: 'money', label: 'Money' },
  { id: 'reports-staff', label: 'Reports & staff' },
  { id: 'marketplace', label: 'Marketplace' },
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

/**
 * Normalise a frontmatter date to `YYYY-MM-DD`.
 *
 * YAML parses an unquoted `2026-08-01` into a Date, so String() would produce
 * "Sat Aug 01 2026 …" — and sorting those compares weekday names, which put the
 * oldest post first. Everything downstream (sorting, display, sitemap
 * lastModified) wants the plain ISO day.
 */
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value ? String(value) : '';
}

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

async function readDoc(
  file: string,
): Promise<{ data: Record<string, unknown>; content: string }> {
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
    updated: toDateString(data.updated),
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
    published: toDateString(data.published),
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
          released: toDateString(data.released),
          helpPages: Array.isArray(data.helpPages) ? data.helpPages.map(String) : [],
        },
        source: content,
      };
    }),
  );

  return releases.sort((a, b) => b.meta.released.localeCompare(a.meta.released));
}
