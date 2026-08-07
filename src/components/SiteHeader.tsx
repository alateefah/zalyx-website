'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/src/components/ThemeToggle';
import { SmartAppLink } from '@/src/components/SmartAppLink';

/**
 * Sticky nav across every page. Dark ground with a blurred backdrop, matching
 * the design system's Nocturne nav pattern with Zalyx's own mark and gradient.
 * `light:` variants (see tailwind.config.js) give it the design's light
 * ground when ThemeToggle's `.light` class is on <html>.
 *
 * Client component (needs usePathname for the active-link state) — ThemeToggle
 * already forced part of the tree client-side, so this doesn't cost more.
 */
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/ledger', label: 'Ledger' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/help', label: 'Help' },
  { href: '/blog', label: 'Blog' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Route changes should close an open mobile menu instead of leaving it
  // hanging over the new page's content.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0d13]/90 backdrop-blur-md light:border-black/10 light:bg-white/90">
      <nav className="mx-auto flex w-full items-center gap-5 px-6 py-3.5 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <Link href="/" className="mr-auto flex items-center gap-2">
          <Image src="/zalyx-mark.png" alt="" width={26} height={30} className="h-[26px] w-auto" />
          <span className="font-nohemi text-lg font-bold tracking-tight text-white light:text-[#0A0C14]">Zalyx</span>
        </Link>

        {/* Hidden below md rather than wrapped: a wrapped nav row pushes the
            page down unpredictably. Below md, the hamburger button opens the
            same links in a dropdown instead. */}
        {NAV_LINKS.map((link) => {
          // "/" only matches the home page itself; every other link also
          // covers its own subpages (e.g. /help/[slug] still highlights Help).
          const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={
                'hidden text-sm md:inline ' +
                (active
                  ? 'font-medium text-[#26C7C3]'
                  : 'text-white/80 hover:text-white light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]')
              }
            >
              {link.label}
            </Link>
          );
        })}

        <ThemeToggle />

        <SmartAppLink className="hidden flex-none items-center gap-1.5 rounded-lg border border-[#26C7C3] px-3.5 py-1.5 text-sm font-medium text-[#26C7C3] transition-colors hover:bg-[#26C7C3]/10 sm:inline-flex">
          Get the app
        </SmartAppLink>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex flex-none items-center justify-center rounded-lg border border-white/15 p-2 text-white/80 hover:text-white md:hidden light:border-black/15 light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 px-6 py-3 md:hidden light:border-black/10">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    'rounded-md px-2 py-2.5 text-[15px] ' +
                    (active
                      ? 'font-medium text-[#26C7C3]'
                      : 'text-white/80 hover:text-white light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]')
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <SmartAppLink className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-[#26C7C3] px-3.5 py-2.5 text-sm font-medium text-[#26C7C3] transition-colors hover:bg-[#26C7C3]/10 sm:hidden">
            Get the app
          </SmartAppLink>
        </div>
      )}
    </header>
  );
}
