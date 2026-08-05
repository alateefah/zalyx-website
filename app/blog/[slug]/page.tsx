import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, listPosts } from '@/lib/content';
import { postMetadata, postArticleJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { Mdx } from '@/components/Mdx';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Footer } from '@/src/components/Footer';

type Props = { params: Promise<{ slug: string }> };

// Drafts are absent from listPosts, so they get no static params and no page.
export async function generateStaticParams() {
  return (await listPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPost(slug);
  if (!doc) return {};
  return postMetadata(doc.meta);
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const doc = await getPost(slug);
  if (!doc) notFound();

  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: doc.meta.title, path: `/blog/${doc.meta.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(postArticleJsonLd(doc.meta)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(trail)) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <Breadcrumbs trail={trail} />
        <h1 className="mb-2 text-3xl font-semibold leading-tight text-gray-900">
          {doc.meta.title}
        </h1>
        <p className="mb-10 text-sm text-gray-400">
          {doc.meta.author} · {doc.meta.published}
        </p>

        <Mdx source={doc.source} />
      </main>
      <Footer />
    </>
  );
}
