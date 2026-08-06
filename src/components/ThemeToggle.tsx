'use client';

import { useEffect, useState } from 'react';

/**
 * Toggles the `.light` class the `light:` Tailwind variant reads (see
 * tailwind.config.js) and persists the choice. `mounted` guards against a
 * hydration mismatch: the server always renders the dark-icon state, but the
 * inline script in layout.tsx may have already added `.light` before React
 * hydrates, so the client's first real read has to happen post-mount.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !light;
    document.documentElement.classList.toggle('light', next);
    localStorage.setItem('zx-theme', next ? 'light' : 'dark');
    setLight(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted && light ? 'Switch to dark theme' : 'Switch to light theme'}
      className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white light:text-[#0A0C14]/70 light:hover:bg-black/5 light:hover:text-[#0A0C14]"
    >
      {mounted && light ? (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
