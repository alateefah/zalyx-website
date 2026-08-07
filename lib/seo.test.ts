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
    // Next's OpenGraph type is a union and only some members carry `type`, so
    // the narrow cast is the honest way to assert on it.
    expect((meta.openGraph as { type?: string } | undefined)?.type).toBe('article');
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
    expect((ld.sameAs as string[]).length).toBeGreaterThan(0);
  });
});
