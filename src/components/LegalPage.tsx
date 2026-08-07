import { SiteHeader } from './SiteHeader';
import { Footer } from './Footer';

export type LegalSection = { title: string; body: React.ReactNode; id?: string };

export function LegalPage({
  title,
  effectiveDate,
  intro,
  sections,
  contactNote,
}: {
  title: string;
  effectiveDate: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
  contactNote: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[760px] px-6 pt-11 pb-16 sm:px-10 md:px-16">
        <h1 className="font-nohemi text-4xl font-medium tracking-tight text-white light:text-[#0A0C14]">{title}</h1>
        <p className="mt-2 text-[13.5px] text-white/55 light:text-[#0A0C14]/55">Effective date: {effectiveDate}</p>

        {intro && <p className="mt-7 max-w-[66ch] text-[15px] leading-[1.7] text-white/75 light:text-[#0A0C14]/75">{intro}</p>}

        {sections.map((sec) => (
          <section key={sec.title} id={sec.id} className="border-t border-white/10 py-6 light:border-black/10">
            <h3 className="font-nohemi mb-2.5 text-lg font-semibold text-white light:text-[#0A0C14]">{sec.title}</h3>
            <div className="max-w-[66ch] text-[14.5px] leading-[1.7] text-white/70 light:text-[#0A0C14]/70">{sec.body}</div>
          </section>
        ))}

        <div className="mt-7 rounded-lg bg-[#111524] px-5 py-4 light:bg-black/[0.03]">
          <p className="text-[13.5px] text-white/65 light:text-[#0A0C14]/65">{contactNote}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
