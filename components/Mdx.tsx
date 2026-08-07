import { MDXRemote } from 'next-mdx-remote/rsc';

// Tailwind v3 without the typography plugin, so MDX output needs explicit
// styling. Kept in one map rather than a `prose` class to avoid adding a plugin
// during a content migration — and because these are the only element types the
// content actually uses. `ol`/`li` get their numbered-circle look from
// app/globals.css (`.mdx-content ol`), not from classes here — CSS counters
// need the real list markup, not per-element overrides.
const components = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="font-nohemi mt-10 mb-3 text-xl font-semibold text-white light:text-[#0A0C14]" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="font-nohemi mt-8 mb-2 text-lg font-semibold text-white light:text-[#0A0C14]" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed text-white/75 light:text-[#0A0C14]/75" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-white/75 light:text-[#0A0C14]/75" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 flex flex-col gap-3 pl-0 text-[15px] leading-[1.6] text-white/85 light:text-[#0A0C14]/85" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-[#26C7C3] underline hover:no-underline" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-white light:text-[#0A0C14]" {...props} />
  ),
  img: (props: React.ComponentProps<'img'>) => (
    // Plain <img>: screenshots come from MDX with unknown dimensions, and
    // next/image needs width and height up front.
    <img
      className="my-6 rounded-xl shadow-[0_0_0_1px_rgba(241,253,255,0.1)] light:shadow-[0_0_0_1px_rgba(10,12,20,0.1)]"
      alt={props.alt ?? ''}
      {...props}
    />
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
