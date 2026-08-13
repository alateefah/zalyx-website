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
    <ul className="mb-4 space-y-2 text-white/75 light:text-[#0A0C14]/75" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 flex flex-col gap-3 pl-0 text-[15px] leading-[1.6] text-white/85 light:text-[#0A0C14]/85" {...props} />
  ),
  a: ({ href, children, ...props }: React.ComponentProps<'a'>) => {
    // Any link leaving the site opens in a new tab; internal links (relative
    // hrefs) stay in-tab. Markdown links only ever produce plain `<a>` tags
    // here, so this is the one place to decide that, not per-post frontmatter.
    const isExternal = /^https?:\/\//.test(href ?? '');
    return (
      <a
        href={href}
        className="text-[#26C7C3] underline hover:no-underline"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
        {isExternal && (
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="ml-1 inline-block -translate-y-px"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        )}
      </a>
    );
  },
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
