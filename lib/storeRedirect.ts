import { STORE_LINKS } from '@/src/utils/constants';

/**
 * Where /download and /update should send a visitor.
 *
 * This used to be a client component that read `navigator.userAgent` after
 * hydration. As a server route handler it is a single 302 — faster, and it works
 * with JavaScript disabled or blocked, which matters for links opened inside
 * other apps' in-app browsers, where a lot of these are opened.
 */
export function storeDestination(userAgent: string | null): string {
  const ua = (userAgent ?? '').toLowerCase();

  if (ua.includes('iphone') || ua.includes('ipad')) return STORE_LINKS.APP_STORE;
  if (ua.includes('android')) return STORE_LINKS.GOOGLE_PLAY;

  // Desktop or unknown: nothing to install, so show what the app is.
  return '/#products';
}
