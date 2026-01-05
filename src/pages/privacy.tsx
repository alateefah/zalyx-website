import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Zalyx Technologies</title>
      </Helmet>
      <div className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-10">Effective Date: November 11, 2025</p>

          <p className="mb-6">
            Zalyx Innovations & Technologies Ltd. (“Zalyx”, “we”, “our”, or “us”) is a private
            limited company registered in Nigeria with operations managed from Canada. We build
            digital tools that help artisans and small businesses manage their customers, orders,
            and finances through our product, <strong>Zalyx Ledger</strong>.
          </p>

          <p className="mb-6">
            You can contact us at{" "}
            <a href="mailto:lateefah@zalyx.io" className="text-blue-600">
              lateefah@zalyx.io
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Account Information: name, phone number, business name, and email.</li>
            <li>Verification Data: phone number used for OTP via Twilio Verify.</li>
            <li>
              Business Data: customer lists, orders, transactions, and other information you record
              in the app.
            </li>
            <li>Usage Data: device type, app version, and analytics on how you use the app.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Create and manage your account</li>
            <li>Send one-time passwords and verify identity</li>
            <li>Store and display your business data securely</li>
            <li>Improve app performance and add new features</li>
            <li>Communicate updates or support</li>
            <li>Comply with applicable laws</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4">3. Sharing of Information</h2>
          <p className="mb-6">
            We may share data with service providers (e.g., Twilio for OTP) and authorities if
            required by law. We never sell or rent your data.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">4. Data Retention & Security</h2>
          <p className="mb-6">
            We retain your data as long as necessary to provide the service or as required by law.
            Data is protected using encryption, secure hosting, and restricted access.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">5. Your Rights</h2>
          <p className="mb-6">
            You may access, update, or delete your information, or withdraw consent by contacting{" "}
            <a href="mailto:lateefah@zalyx.io" className="text-blue-600">
              lateefah@zalyx.io
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4" id="account-deletion">6. Account Deletion</h2>
          <p className="mb-6">
            You may request deletion of your <strong>Zalyx Ledger account</strong> and all
            associated personal and business data at any time.
          </p>
          <p className="mb-6">
            To request account and data deletion, please email{" "}
            <a href="mailto:lateefah@zalyx.io" className="text-blue-600">
              lateefah@zalyx.io
            </a>{" "}
            using the email address or phone number associated with your account.
          </p>
          <p className="mb-6">
            Account deletion requests are processed within <strong>7 business days</strong>, unless
            a longer retention period is required by law.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">7. Changes</h2>
          <p>
            We may update this policy periodically. The latest version will always be available at{" "}
            <strong>zalyx.io/privacy</strong>.
          </p>
        </div>
      </div>
    </>
  );
}
