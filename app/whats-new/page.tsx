import type { Metadata } from 'next';
import Link from 'next/link';
import { listChangelog, listHelpPages } from '@/lib/content';
import { Mdx } from '@/components/Mdx';
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
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">What&apos;s new</h1>

        {releases.map((release) => {
          // Naming help pages in a release is what stops the docs drifting: a
          // feature ships with the page that explains it, or the gap is obvious.
          const linked = release.meta.helpPages
            .map((slug) => helpPages.find((p) => p.slug === slug))
            .filter((p): p is (typeof helpPages)[number] => Boolean(p));

          return (
            <section key={release.meta.version} className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900">
                Version {release.meta.version}
              </h2>
              <p className="mb-4 text-sm text-gray-400">{release.meta.released}</p>

              <Mdx source={release.source} />

              {linked.length > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                  How to use it:{' '}
                  {linked.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && ', '}
                      <Link href={`/help/${p.slug}`} className="text-[#8354AA] hover:underline">
                        {p.title}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
