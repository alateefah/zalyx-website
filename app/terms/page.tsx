import type { Metadata } from 'next';
import { LegalPage } from '@/src/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Zalyx Technologies',
  alternates: { canonical: '/terms' },
};

const EMAIL = 'support@zalyx.io';

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      effectiveDate="November 11, 2025"
      sections={[
        {
          title: '1. Acceptance of terms',
          body: (
            <>
              By downloading or using <strong className="text-white light:text-[#0A0C14]">Zalyx Ledger</strong>, you
              agree to these Terms &amp; Conditions (&ldquo;Terms&rdquo;). If you do not agree, do
              not use the app.
            </>
          ),
        },
        {
          title: '2. About the service',
          body: 'Zalyx Ledger helps artisans and small businesses manage customers, orders, and business records. Future updates may include payment features.',
        },
        {
          title: '3. Eligibility',
          body: 'You must be at least 18 years old and legally capable of entering into this agreement under Nigerian law.',
        },
        {
          title: '4. Account responsibilities',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Keep your login and OTP verification secure.</li>
              <li>Provide accurate and truthful information.</li>
              <li>You&rsquo;re responsible for all actions under your account.</li>
            </ul>
          ),
        },
        {
          title: '5. Acceptable use',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>No unlawful, fraudulent, or abusive activity.</li>
              <li>No interference or disruption of systems.</li>
              <li>No reverse engineering, copying, or resale.</li>
            </ul>
          ),
        },
        {
          title: '6. Intellectual property',
          body: 'All app content, design, and software belong to Zalyx Innovations & Technologies Ltd. You’re granted a limited, non-exclusive license to use the app.',
        },
        {
          title: '7. Payments (future feature)',
          body: 'When payment features are added, additional terms will apply and will be clearly communicated.',
        },
        {
          title: '8. Termination',
          body: 'We may suspend or terminate your account if you violate these Terms or misuse the service. You may stop using the app anytime.',
        },
        {
          title: '9. Limitation of liability',
          body: 'Zalyx is not responsible for any indirect, incidental, or consequential damages resulting from your use of the app.',
        },
        {
          title: '10. Governing law',
          body: 'These Terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall be resolved under Nigerian jurisdiction.',
        },
        {
          title: '11. Changes to these terms',
          body: (
            <>
              We may update these Terms periodically. Continued use of the app means you accept
              the latest version, available at{' '}
              <strong className="text-white light:text-[#0A0C14]">zalyx.io/terms</strong>.
            </>
          ),
        },
      ]}
      contactNote={
        <>
          Questions about these terms? Write to{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#26C7C3] hover:underline">
            {EMAIL}
          </a>
          .
        </>
      }
    />
  );
}
