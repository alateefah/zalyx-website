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
