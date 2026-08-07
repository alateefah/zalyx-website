import Image from "next/image";
import { SOCIAL_LINKS, CONTACT, STORE_LINKS, MARKETPLACE_URL } from "../utils/constants";

/**
 * Matches the design source's actual footer (Zalyx Site.dc.html): one flex
 * row, a brand block plus Products / Support / Legal columns at a flat
 * 150px basis, on the site's #0A0C14 ground — not the old four-column
 * grid with Navigation/Legal/Contact labels this replaced, which predates
 * the redesign and never matched the design file.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Ledger", href: "/ledger" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "What's new", href: "/whats-new" },
  ];

  const supportLinks = [
    { label: "Help centre", href: "/help" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: CONTACT.EMAIL_LINK },
  ];

  const legalLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Careers", href: "/careers" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: SOCIAL_LINKS.LINKEDIN,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204s1.75.79 1.75 1.764S7.466 6.732 6.5 6.732zM19 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C13.396 7.179 19 6.988 19 12.241V19z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: SOCIAL_LINKS.TWITTER,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: SOCIAL_LINKS.INSTAGRAM,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  const linkColumns = [
    { title: "Products", links: productLinks },
    { title: "Support", links: supportLinks },
    { title: "Legal", links: legalLinks },
  ];

  return (
    <footer className="bg-[#0A0C14] text-[#F1FDFF] light:bg-white light:text-[#0A0C14] light:shadow-[0_-1px_0_0_rgba(10,12,20,0.1)]">
      <div className="mx-auto w-full px-6 pt-11 pb-12 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <div className="flex flex-wrap gap-8">
          {/* Brand */}
          <div className="min-w-0 flex-1 basis-[220px]">
            <div className="flex items-center gap-2">
              <Image src="/zalyx-mark.png" alt="" width={30} height={34} className="h-[30px] w-auto" />
              <span className="font-nohemi text-lg font-bold tracking-tight text-white light:text-[#0A0C14]">Zalyx</span>
            </div>
            <p className="mt-3 max-w-[36ch] text-[13px] text-white/55 light:text-[#0A0C14]/55">
              Zalyx Technologies builds digital tools that help African entrepreneurs stay
              organized, understand their numbers, and grow with confidence.
            </p>
            <p className="mt-2 max-w-[36ch] text-[13px] text-white/55 light:text-[#0A0C14]/55">
              Live in Nigeria 🇳🇬 and The Gambia 🇬🇲
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={STORE_LINKS.GOOGLE_PLAY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-white/20 light:border-black/10 light:bg-black/[0.03] light:text-[#0A0C14]/80 light:hover:border-black/20"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="playGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00C3FF" />
                      <stop offset="35%" stopColor="#00F076" />
                      <stop offset="70%" stopColor="#FFBC00" />
                      <stop offset="100%" stopColor="#FF3A44" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#playGradientFooter)"
                    d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"
                  />
                </svg>
                Play Store
              </a>
              <a
                href={STORE_LINKS.APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-white/20 light:border-black/10 light:bg-black/[0.03] light:text-[#0A0C14]/80 light:hover:border-black/20"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-white/20 light:border-black/10 light:bg-black/[0.03] light:text-[#0A0C14]/80 light:hover:border-black/20"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Marketplace
              </a>
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <div key={col.title} className="min-w-0 flex-none basis-[150px]">
              <h6 className="font-nohemi text-xs font-semibold uppercase tracking-widest text-white/45 light:text-[#0A0C14]/45">
                {col.title}
              </h6>
              <div className="mt-2.5 flex flex-col gap-2">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13.5px] text-white/85 hover:text-[#26C7C3] light:text-[#0A0C14]/85"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row light:border-black/10">
          <p className="text-xs text-white/45 light:text-[#0A0C14]/45">
            © {currentYear} Zalyx Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white light:bg-black/5 light:text-[#0A0C14]/60 light:hover:bg-black/10 light:hover:text-[#0A0C14]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
