import type { Metadata } from 'next';
import Link from 'next/link';
import { listChangelog, listHelpPages } from '@/lib/content';
import { Mdx } from '@/components/Mdx';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: "What's new — Zalyx",
  description: 'What changed in each release of Zalyx Ledger.',
  alternates: { canonical: '/whats-new' },
};

export default async function WhatsNew() {
  const [releases, helpPages] = await Promise.all([listChangelog(), listHelpPages()]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[860px] px-6 pt-11 pb-16 sm:px-10 md:px-16">
        <h1 className="font-nohemi text-4xl font-medium tracking-tight text-white light:text-[#0A0C14]">
          What&apos;s new
        </h1>
        <p className="mt-2.5 max-w-[60ch] text-base text-white/70 light:text-[#0A0C14]/70">
          Every release, newest first.
        </p>

        <div className="mt-7 max-w-[70ch]">
          {releases.map((release) => {
            // Naming help pages in a release is what stops the docs drifting: a
            // feature ships with the page that explains it, or the gap is obvious.
            const linked = release.meta.helpPages
              .map((slug) => helpPages.find((p) => p.slug === slug))
              .filter((p): p is (typeof helpPages)[number] => Boolean(p));

            return (
              <div
                key={release.meta.version}
                className="flex flex-wrap gap-6 border-t border-white/10 py-6 light:border-black/10"
              >
                <div className="w-[130px] flex-none">
                  <div className="font-nohemi text-[17px] text-white light:text-[#0A0C14]">
                    {release.meta.version}
                  </div>
                  <div className="mt-0.5 text-[13px] text-white/50 light:text-[#0A0C14]/50">
                    {release.meta.released}
                  </div>
                </div>

                <div className="min-w-0 flex-1 basis-64">
                  <Mdx source={release.source} />

                  {linked.length > 0 && (
                    <p className="mt-3 text-sm text-white/55 light:text-[#0A0C14]/55">
                      How to use it:{' '}
                      {linked.map((p, i) => (
                        <span key={p.slug}>
                          {i > 0 && ', '}
                          <Link href={`/help/${p.slug}`} className="text-[#26C7C3] hover:underline">
                            {p.title}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
