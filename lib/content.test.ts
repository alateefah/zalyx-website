import { describe, it, expect } from 'vitest';
import path from 'node:path';
import {
  listHelpPages, getHelpPage, listPosts, getPost, listChangelog,
} from './content';

const FIXTURES = path.join(process.cwd(), 'tests/fixtures/content');

describe('listHelpPages', () => {
  it('orders by topic, then by order within the topic', async () => {
    // Getting-started comes before sales because HELP_TOPICS says so — not
    // because of filenames, which would sort alphabetically and put
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
    // list, and the sitemap keeps it out for the same reason.
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
