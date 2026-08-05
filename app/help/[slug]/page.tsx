import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHelpPage, listHelpPages } from '@/lib/content';
import { helpMetadata, helpArticleJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { Mdx } from '@/components/Mdx';
import { Breadcrumbs } from '@/components/Breadcrumbs';
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

      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <Breadcrumbs trail={trail} />
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">{doc.meta.title}</h1>

        <Mdx source={doc.source} />

        {related.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Related
            </h2>
            <ul className="space-y-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/help/${p.slug}`} className="text-[#8354AA] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {doc.meta.updated && (
          <p className="mt-10 text-sm text-gray-400">Last updated {doc.meta.updated}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
