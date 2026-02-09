import { Helmet } from "react-helmet-async";

export default function FieldOnboardingPartner() {
  return (
    <>
      <Helmet>
        <title>Field Onboarding Partner (Commission-Based) – Lagos | Zalyx</title>
        <meta
          name="description"
          content="Join Zalyx as a commission-based Field Onboarding Partner in Lagos. Help small business owners onboard and earn per activated merchant."
        />
        <link rel="canonical" href="https://zalyx.io/field-onboarding-partner" />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            Field Onboarding Partner – Lagos (Commission-Based)
          </h1>

          <p className="mb-6">
            Zalyx Ledger is a mobile app that helps small business owners track customers and debts.
            We’re looking for <strong>field partners</strong> to help onboard artisans such as
            tailors, mechanics, shop owners, and dispatch riders across Lagos.
          </p>

          <p className="mb-8">
            This is a <strong>commission-based field role</strong>. You earn when merchants
            successfully start using the app, not just when they install it.
          </p>

          <h2 className="text-xl font-semibold mb-4">What you’ll do</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Visit markets and shops around Lagos</li>
            <li>Help merchants install the Zalyx app</li>
            <li>Guide them to add their first customer and first order</li>
            <li>Ensure the merchant understands how to track money owed</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">What success looks like</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>The merchant has the app installed</li>
            <li>They’ve added at least one customer</li>
            <li>They’ve created at least one order</li>
            <li>A balance owed is recorded in the app</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Commission & incentives</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>₦2,000 per activated merchant</li>
            <li>₦10,000 bonus for 25+ activations in a week</li>
            <li>Weekly payouts based on verified activations</li>
          </ul>

          <p className="mb-8 font-medium">Payouts are made weekly based on verified activations.</p>

          <h2 className="text-xl font-semibold mb-4">Who this role is for</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Based in Lagos or able to move around Lagos</li>
            <li>Comfortable approaching and talking to business owners</li>
            <li>Speaks English and Yoruba or Pidgin</li>
            <li>Has a smartphone and mobile data</li>
            <li>Field sales or onboarding experience is a plus (not required)</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">What we provide</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Short training and onboarding session</li>
            <li>Clear activation checklist</li>
            <li>Demo guidance and support</li>
            <li>WhatsApp support channel</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">How to apply</h2>
          <p className="mb-6">Fill out the short application form below. No long essays.</p>

          <div className="w-full mb-6">
            <iframe
              title="Field Onboarding Partner Application"
              src="https://docs.google.com/forms/d/e/1FAIpQLSclcuCYJ5qC0BaJXIZ0iPWgV8r5SGvSoq7k5xXzmRYleKldGQ/viewform?embedded=true"
              className="w-full min-h-[1200px] border border-gray-200 rounded"
            />
          </div>

          {/* Fallback link (important for some mobile browsers) */}
          <p className="mb-10 text-sm">
            Having trouble viewing the form?{" "}
            <a
              href="https://forms.gle/RiPumRhV69KFph2E6"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium"
            >
              Open it in a new tab
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
