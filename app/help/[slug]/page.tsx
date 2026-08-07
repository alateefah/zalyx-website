import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHelpPage, listHelpPages, HELP_TOPICS } from '@/lib/content';
import { helpMetadata, helpArticleJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { Mdx } from '@/components/Mdx';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';

type Props = { params: Promise<{ slug: string }> };

// Every help page is known at build time, so they are all static HTML.
export async function generateStaticParams() {
  return (await listHelpPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getHelpPage(slug);
  if (!doc) return {};
  return helpMetadata(doc.meta);
}

export default async function HelpPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getHelpPage(slug);
  if (!doc) notFound();

  const all = await listHelpPages();
  const related = doc.meta.related
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is (typeof all)[number] => Boolean(p));

  const trail = [
    { name: 'Help', path: '/help' },
    { name: doc.meta.title, path: `/help/${doc.meta.slug}` },
  ];

  const topicLabel = HELP_TOPICS.find((t) => t.id === doc.meta.topic)?.label ?? 'Guide';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(helpArticleJsonLd(doc.meta)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(trail)) }}
      />

      <SiteHeader />
      <main className="mx-auto w-full max-w-[720px] px-6 pt-9 pb-16 sm:px-10 md:px-16">
        <Link href="/help" className="inline-flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All guides
        </Link>

        <h6 className="font-nohemi mt-6 mb-2 text-[13px] font-semibold uppercase tracking-widest text-[#26C7C3]">
          {topicLabel}
        </h6>
        <h1 className="font-nohemi text-3xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-[34px] light:text-[#0A0C14]">
          {doc.meta.title}
        </h1>
        <p className="mt-3 max-w-[64ch] text-base text-white/70 light:text-[#0A0C14]/70">{doc.meta.summary}</p>

        <div className="mt-8">
          <Mdx source={doc.source} />
        </div>

        {related.length > 0 && (
          <section className="mt-10 border-t border-white/10 pt-6 light:border-black/10">
            <h6 className="font-nohemi mb-3 text-xs font-semibold uppercase tracking-widest text-white/55 light:text-[#0A0C14]/55">
              Related
            </h6>
            <div className="flex flex-col gap-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/help/${p.slug}`} className="text-sm text-[#26C7C3] hover:underline">
                  {p.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {doc.meta.updated && (
          <p className="mt-10 text-sm text-white/40 light:text-[#0A0C14]/40">Last updated {doc.meta.updated}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
