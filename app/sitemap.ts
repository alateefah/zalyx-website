import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteUrl';
import { listHelpPages, listPosts } from '@/lib/content';

// Generated from the content module, so a new page or post appears here on
// deploy with no second list to maintain.
//
// /download and /update are deliberately absent: they are 302s to app stores,
// not pages, and submitting them spends crawl budget on URLs that can never
// rank.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now },
    { url: `${SITE_URL}/ledger`, lastModified: now },
    { url: `${SITE_URL}/marketplace`, lastModified: now },
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
        // Each page's own date, not "now" — that is the difference between a
        // signal and noise.
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
