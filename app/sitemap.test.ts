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
    // "Everything changed just now" on every fetch tells a crawler nothing
    // about what is worth re-reading.
    const entry = (await sitemap()).find((u) => u.url.endsWith('/help/record-a-sale'));
    expect(entry?.lastModified).toEqual(new Date('2026-08-05'));
  });

  it('never lists /download or /update', async () => {
    // They are 302s to app stores, not pages. Submitting them wastes crawl
    // budget on URLs that can never rank.
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls.some((u) => u.includes('/download'))).toBe(false);
    expect(urls.some((u) => u.includes('/update'))).toBe(false);
  });

  it('falls back to the static routes when content cannot be read', async () => {
    // A broken content file must not take the whole sitemap down with it.
    content.listHelpPages.mockRejectedValue(new Error('boom'));
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).toContain('https://zalyx.io');
    expect(urls.some((u) => u.includes('/help/'))).toBe(false);
  });
});
