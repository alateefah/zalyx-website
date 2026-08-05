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
