import type { Metadata } from 'next';
import { listHelpPages, HELP_TOPICS } from '@/lib/content';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';
import { HelpSearch } from '@/src/components/help/HelpSearch';

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
      <SiteHeader />
      <main className="mx-auto w-full max-w-[860px] px-6 pt-11 pb-16 sm:px-10 md:px-16">
        <h1 className="font-nohemi text-4xl font-medium tracking-tight text-white light:text-[#0A0C14]">Help</h1>
        <p className="mt-2.5 max-w-[60ch] text-base text-white/70 light:text-[#0A0C14]/70">
          Short guides for everything in the app. If you cannot find it, message us on WhatsApp.
        </p>

        <HelpSearch topics={HELP_TOPICS} pages={pages} />
      </main>
      <Footer />
    </>
  );
}
