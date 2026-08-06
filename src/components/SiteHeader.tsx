import Link from 'next/link';
import Image from 'next/image';
import { STORE_LINKS } from '@/src/utils/constants';
import { ThemeToggle } from '@/src/components/ThemeToggle';

/**
 * Sticky nav across every page. Dark ground with a blurred backdrop, matching
 * the design system's Nocturne nav pattern with Zalyx's own mark and gradient.
 * `light:` variants (see tailwind.config.js) give it the design's light
 * ground when ThemeToggle's `.light` class is on <html>.
 *
 * Stays a server component — ThemeToggle is the one piece that needs
 * client-side state, and composing it in here doesn't require the whole nav
 * to become a client component.
 */
export function SiteHeader() {
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
        <Link href="/" className="hidden text-sm text-white/80 hover:text-white md:inline light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]">
          Home
        </Link>
        <Link href="/ledger" className="hidden text-sm text-white/80 hover:text-white md:inline light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]">
          Ledger
        </Link>
        <Link
          href="/marketplace"
          className="hidden text-sm text-white/80 hover:text-white md:inline light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]"
        >
          Marketplace
        </Link>
        <Link href="/help" className="hidden text-sm text-white/80 hover:text-white md:inline light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]">
          Help
        </Link>
        <Link href="/blog" className="hidden text-sm text-white/80 hover:text-white md:inline light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]">
          Blog
        </Link>

        <ThemeToggle />

        <a
          href={STORE_LINKS.GOOGLE_PLAY}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-none items-center gap-1.5 rounded-lg border border-[#26C7C3] px-3.5 py-1.5 text-sm font-medium text-[#26C7C3] transition-colors hover:bg-[#26C7C3]/10"
        >
          Get the app
        </a>
      </nav>
    </header>
  );
}
