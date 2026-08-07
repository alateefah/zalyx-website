'use client';

import Link from 'next/link';
import Image from 'next/image';
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

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0d13]/90 backdrop-blur-md light:border-black/10 light:bg-white/90">
      <nav className="mx-auto flex w-full items-center gap-5 px-6 py-3.5 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <Link href="/" className="mr-auto flex items-center gap-2">
          <Image src="/zalyx-mark.png" alt="" width={26} height={30} className="h-[26px] w-auto" />
          <span className="font-nohemi text-lg font-bold tracking-tight text-white light:text-[#0A0C14]">Zalyx</span>
        </Link>

        {/* Hidden below md rather than wrapped: a wrapped nav row pushes the
            page down unpredictably, and every one of these links already lives
            in the footer, which mobile visitors reach on the same screen. */}
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

        <SmartAppLink className="inline-flex flex-none items-center gap-1.5 rounded-lg border border-[#26C7C3] px-3.5 py-1.5 text-sm font-medium text-[#26C7C3] transition-colors hover:bg-[#26C7C3]/10">
          Get the app
        </SmartAppLink>
      </nav>
    </header>
  );
}
