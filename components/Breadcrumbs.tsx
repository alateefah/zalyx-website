import Link from 'next/link';

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      {trail.map((step, i) => (
        <span key={step.path}>
          {i > 0 && <span className="mx-2">/</span>}
          {i === trail.length - 1 ? (
            // The current page is not a link — it is where you already are.
            <span className="text-gray-700">{step.name}</span>
          ) : (
            <Link href={step.path} className="hover:text-[#8354AA]">
              {step.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
