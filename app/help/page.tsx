import type { Metadata } from 'next';
import Link from 'next/link';
import { listHelpPages, HELP_TOPICS } from '@/lib/content';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Help — Zalyx',
  description:
    'How to use Zalyx Ledger: record sales, track who owes you, and set up your storefront.',
  alternates: { canonical: '/help' },
};

export default async function HelpIndex() {
  const pages = await listHelpPages();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">Help</h1>
        <p className="mb-10 text-gray-600">
          Short guides for getting things done in Zalyx Ledger.
        </p>

        {HELP_TOPICS.map((topic) => {
          const inTopic = pages.filter((p) => p.topic === topic.id);
          // A topic with no pages yet renders nothing, so the index never shows
          // an empty heading while the content is still being written.
          if (inTopic.length === 0) return null;

          return (
            <section key={topic.id} className="mb-10">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                {topic.label}
              </h2>
              <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                {inTopic.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/help/${page.slug}`}
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{page.title}</span>
                      <span className="block text-sm text-gray-500">{page.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
