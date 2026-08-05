import { MDXRemote } from 'next-mdx-remote/rsc';

// Tailwind v3 without the typography plugin, so MDX output needs explicit
// styling. Kept in one map rather than a `prose` class to avoid adding a plugin
// during a content migration — and because these are the only element types the
// content actually uses.
const components = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="mt-10 mb-3 text-xl font-semibold text-gray-900" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 mb-2 text-lg font-semibold text-gray-900" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed text-gray-700" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-gray-700" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-[#8354AA] underline hover:no-underline" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  img: (props: React.ComponentProps<'img'>) => (
    // Plain <img>: screenshots come from MDX with unknown dimensions, and
    // next/image needs width and height up front.
    <img
      className="my-6 rounded-xl border border-gray-200"
      alt={props.alt ?? ''}
      {...props}
    />
  ),
};

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
