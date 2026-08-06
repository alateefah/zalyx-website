import type { Metadata } from 'next';
import { SiteHeader } from '@/src/components/SiteHeader';
import { Footer } from '@/src/components/Footer';
import { RoleCard } from '@/src/components/careers/RoleCard';
import { ROLES } from '@/src/components/careers/roles-data';

export const metadata: Metadata = {
  title: 'Careers – Zalyx Technologies',
  description:
    'Join Zalyx and help small businesses across Nigeria grow digitally. View open roles.',
  alternates: { canonical: '/careers' },
};

export default function Careers() {
  return (
    <>
      <SiteHeader />

      <section className="relative overflow-hidden px-6 pt-16 pb-14 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-80px] top-[-160px] h-[460px] w-[460px] rounded-full opacity-60 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #26C7C3, transparent 72%)' }}
        />
        <div className="relative max-w-[64ch]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#26C7C3]/15 px-3.5 py-1.5 text-xs font-medium text-[#9ee8e5] light:text-[#178482]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0FE082]" />
            We&apos;re hiring
          </span>

          <h1 className="font-nohemi mt-5 text-4xl font-medium leading-[1.06] tracking-tight text-white [text-wrap:balance] sm:text-5xl light:text-[#0A0C14]">
            Build the future of
            <br />
            <span className="zx-grad-text">African business</span>
          </h1>

          <p className="mt-5 max-w-lg text-[17px] text-white/70 light:text-[#0A0C14]/70">
            We&apos;re a small team solving real problems for millions of small business owners
            across Nigeria. Come work with us.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px]">
        <div className="flex flex-col gap-4">
          {ROLES.map((role) => (
            <RoleCard key={role.title} role={role} />
          ))}
        </div>

        <p className="mt-6 max-w-[64ch] text-[13px] text-white/50 light:text-[#0A0C14]/50">
          Don&apos;t see your role? Write to us at{' '}
          <a href="mailto:careers@zalyx.io" className="text-[#26C7C3] hover:underline">
            careers@zalyx.io
          </a>{' '}
          — we&apos;re always glad to hear from people who want to build this with us.
        </p>
      </section>

      <Footer />
    </>
  );
}
