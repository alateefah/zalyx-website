import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, listPosts } from '@/lib/content';
import { postMetadata, postArticleJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { Mdx } from '@/components/Mdx';
import { SiteHeader } from '@/src/components/SiteHeader';
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

      <SiteHeader />
      <main className="mx-auto w-full max-w-[860px] px-6 pt-9 pb-16 sm:px-10 md:px-16">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white light:text-[#0A0C14]/70 light:hover:text-[#0A0C14]">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All posts
        </Link>

        <h1 className="font-nohemi mt-6 mb-2.5 text-3xl font-medium leading-tight tracking-tight text-white [text-wrap:balance] sm:text-[34px] light:text-[#0A0C14] max-w-[75ch]">
          {doc.meta.title}
        </h1>
        <p className="mb-8 text-[13px] text-white/50 light:text-[#0A0C14]/50">
          {doc.meta.published} · {doc.meta.author}
        </p>

        <Image
          src={doc.meta.image ?? '/backgrounds/gradient-orb.png'}
          alt=""
          width={860}
          height={430}
          priority
          className="mb-8 h-[280px] w-full rounded-xl object-cover shadow-[0_0_0_1px_rgba(241,253,255,0.1)] sm:h-[380px] light:shadow-[0_0_0_1px_rgba(10,12,20,0.1)]"
        />

        <div className="max-w-[68ch]">
          <Mdx source={doc.source} />
        </div>

        <div className="mt-4 flex max-w-[68ch] flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 px-6 py-5 light:border-black/10">
          <p className="text-[15px] text-white/75 light:text-[#0A0C14]/75">
            <span className="font-nohemi font-semibold text-white light:text-[#0A0C14]">Download Zalyx Ledger</span>
            {' '}It's free, and it works offline.
          </p>
          <Link
            href="/download"
            className="shrink-0 rounded-full bg-[#26C7C3] px-5 py-2.5 text-sm font-medium text-[#0A0C14] no-underline hover:bg-[#26C7C3]/90"
          >
            Download
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
