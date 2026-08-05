import type { Metadata } from 'next';
import Link from 'next/link';
import { listPosts } from '@/lib/content';
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
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">Blog</h1>

        {posts.length === 0 ? (
          // Renders before the first post exists rather than 500ing.
          <p className="text-gray-500">Nothing published yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#8354AA]">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-gray-600">{post.summary}</p>
                  <p className="mt-1 text-sm text-gray-400">{post.published}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
