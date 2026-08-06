import type { Metadata } from 'next';
import Link from 'next/link';
import { listPosts } from '@/lib/content';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Blog — Zalyx',
  description:
    'Practical writing on running a small business: money, customers and getting paid.',
  alternates: { canonical: '/blog' },
};

export default async function BlogIndex() {
  const posts = await listPosts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[860px] px-6 pt-11 pb-16 sm:px-10 md:px-16">
        <h1 className="font-nohemi text-4xl font-medium tracking-tight text-white light:text-[#0A0C14]">Blog</h1>
        <p className="mt-2.5 max-w-[60ch] text-base text-white/70 light:text-[#0A0C14]/70">
          Notes from the team on bookkeeping, being found, and what we are building next.
        </p>

        {posts.length === 0 ? (
          // Renders before the first post exists rather than 500ing.
          <p className="mt-10 text-white/50 light:text-[#0A0C14]/50">Nothing published yet.</p>
        ) : (
          <div className="mt-7 flex max-w-[72ch] flex-col">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border-t border-white/10 py-6 text-white no-underline light:border-black/10 light:text-[#0A0C14]"
              >
                <div className="mb-1.5 text-[13px] text-white/50 light:text-[#0A0C14]/50">
                  {post.published} · {post.author}
                </div>
                <h2 className="font-nohemi text-lg font-semibold text-white light:text-[#0A0C14]">{post.title}</h2>
                <p className="mt-1.5 max-w-[60ch] text-sm text-white/65 light:text-[#0A0C14]/65">{post.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
