import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Only the sections matter here, not the site chrome around them.
vi.mock('@/src/components/LegalPage', () => ({ LegalPage: () => null }));

import PrivacyPage from './page';

type Section = { title: string; id?: string; body: ReactNode };
const page = () =>
  (PrivacyPage() as unknown as { props: { sections: Section[]; effectiveDate: string } }).props;
const text = (node: ReactNode) => renderToStaticMarkup(<>{node}</>).replace(/<[^>]+>/g, ' ');

describe('privacy page', () => {
  it('has a children’s privacy section that says users must be 18 or older', () => {
    const section = page().sections.find((s) => /children/i.test(s.title));

    expect(section).toBeDefined();
    const body = text(section!.body);
    expect(body).toContain('at least 18 years old');
    expect(body).toMatch(/do not knowingly collect/i);
  });

  it('keeps the account-deletion anchor that other pages and store listings link to', () => {
    expect(page().sections.some((s) => s.id === 'account-deletion')).toBe(true);
  });

  it('numbers its sections 1 to N with no gaps or repeats', () => {
    const numbers = page().sections.map((s) => Number(s.title.split('.')[0]));
    expect(numbers).toEqual(numbers.map((_, i) => i + 1));
  });
});
