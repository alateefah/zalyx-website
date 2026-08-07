import type { Metadata } from 'next';
import { LegalPage } from '@/src/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zalyx Technologies',
  alternates: { canonical: '/privacy' },
};

const EMAIL = 'support@zalyx.io';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="November 11, 2025"
      intro={
        <>
          Zalyx Innovations &amp; Technologies Ltd. (&ldquo;Zalyx&rdquo;, &ldquo;we&rdquo;,
          &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a private limited company registered in
          Nigeria with operations managed from Canada. We build digital tools that help artisans
          and small businesses manage their customers, orders, and finances through our product,{' '}
          <strong className="text-white light:text-[#0A0C14]">Zalyx Ledger</strong>. You can contact us at{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#26C7C3] hover:underline">
            {EMAIL}
          </a>
          .
        </>
      }
      sections={[
        {
          title: '1. Information we collect',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Account information: name, phone number, business name, and email.</li>
              <li>Verification data: phone number used for OTP via Twilio Verify.</li>
              <li>
                Business data: customer lists, orders, transactions, and other information you
                record in the app.
              </li>
              <li>Usage data: device type, app version, and analytics on how you use the app.</li>
            </ul>
          ),
        },
        {
          title: '2. How we use your information',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Create and manage your account</li>
              <li>Send one-time passwords and verify identity</li>
              <li>Store and display your business data securely</li>
              <li>Improve app performance and add new features</li>
              <li>Communicate updates or support</li>
              <li>Comply with applicable laws</li>
            </ul>
          ),
        },
        {
          title: '3. Sharing of information',
          body: 'We may share data with service providers (e.g., Twilio for OTP) and authorities if required by law. We never sell or rent your data.',
        },
        {
          title: '4. Data retention & security',
          body: 'We retain your data as long as necessary to provide the service or as required by law. Data is protected using encryption, secure hosting, and restricted access.',
        },
        {
          title: '5. Your rights',
          body: (
            <>
              You may access, update, or delete your information, or withdraw consent by
              contacting{' '}
              <a href={`mailto:${EMAIL}`} className="text-[#26C7C3] hover:underline">
                {EMAIL}
              </a>
              .
            </>
          ),
        },
        {
          title: '6. Account deletion',
          id: 'account-deletion',
          body: (
            <>
              <p>
                You may delete your <strong className="text-white light:text-[#0A0C14]">Zalyx Ledger account</strong>{' '}
                and all associated personal and business data at any time directly within the
                app.
              </p>
              <p className="mt-3">
                To delete your account, go to <strong className="text-white light:text-[#0A0C14]">More → Delete Account</strong>{' '}
                and follow the on-screen instructions.
              </p>
              <p className="mt-3">
                Once confirmed, your account and associated data are permanently deleted and
                cannot be recovered, except where retention is required by law.
              </p>
              <p className="mt-3">
                If you experience issues deleting your account in-app, you may contact us at{' '}
                <a href={`mailto:${EMAIL}`} className="text-[#26C7C3] hover:underline">
                  {EMAIL}
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: '7. Changes',
          body: (
            <>
              We may update this policy periodically. The latest version will always be available
              at <strong className="text-white light:text-[#0A0C14]">zalyx.io/privacy</strong>.
            </>
          ),
        },
      ]}
      contactNote={
        <>
          Questions about how we handle your data? Write to{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#26C7C3] hover:underline">
            {EMAIL}
          </a>
          .
        </>
      }
    />
  );
}
