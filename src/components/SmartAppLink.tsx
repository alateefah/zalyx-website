'use client';

import { useEffect, useState } from 'react';
import { STORE_LINKS } from '@/src/utils/constants';

/**
 * Detects iOS vs Android from the user agent and points at the matching
 * store — same detection the old pre-redesign Hero.tsx used, just not
 * carried over when these buttons were rebuilt, so every "Get the app" CTA
 * silently defaulted to Google Play even on an iPhone. Falls back to Google
 * Play when the platform can't be determined (desktop, etc.) — there's no
 * dropdown here, just a sane default for a single link.
 */
function useStoreLink() {
  const [href, setHref] = useState<string>(STORE_LINKS.GOOGLE_PLAY);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(ua)) {
      setHref(STORE_LINKS.APP_STORE);
    }
  }, []);

  return href;
}

export function SmartAppLink({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const href = useStoreLink();

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  );
}
