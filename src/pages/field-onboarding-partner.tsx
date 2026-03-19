import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export default function FieldOnboardingPartner() {
  return (
    <>
      <Helmet>
        <title>Field Onboarding Partner (Commission-Based) – Lagos | Zalyx</title>
        <meta
          name="description"
          content="Join Zalyx as a commission-based Field Onboarding Partner in Lagos. Help small business owners onboard and earn per activated merchant."
        />
        <link rel="canonical" href="https://zalyx.io/careers/field-onboarding-partner" />
      </Helmet>

      <div className="min-h-screen bg-[#0b0d13] text-white flex flex-col">
        {/* Background orbs */}
        <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#26C7C3]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#8354AA]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

        {/* Nav */}
        <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 flex items-center justify-between relative z-10">
          <Link to="/">
            <img src="/zalyx-logo.png" alt="Zalyx Logo" className="h-8 w-auto" />
          </Link>
          <Link
            to="/careers"
            className="text-sm text-gray-400 hover:text-[#26C7C3] transition-colors duration-300 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            All roles
          </Link>
        </nav>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24 relative z-10 flex-1">
          {/* Header */}
          <div className="max-w-3xl pt-10 pb-16 border-b border-white/10 mb-16">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10">
                Closed
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                Commission-Based
              </span>
              <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Lagos
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Field Onboarding{" "}
              <span className="bg-gradient-to-r from-[#26C7C3] via-[#5368C1] to-[#8354AA] bg-clip-text text-transparent">
                Partner
              </span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed">
              Zalyx Ledger is a mobile app that helps small business owners track customers and
              debts. We're looking for <strong className="text-white">field partners</strong> to
              help onboard artisans such as tailors, mechanics, shop owners, and dispatch riders
              across Lagos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">
              {/* What you'll do */}
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#26C7C3]">What you'll do</h2>
                <ul className="space-y-3">
                  {[
                    "Visit markets and shops around Lagos",
                    "Help merchants install the Zalyx app",
                    "Guide them to add their first customer and first order",
                    "Ensure the merchant understands how to track money owed",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#26C7C3] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What success looks like */}
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#26C7C3]">
                  What success looks like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "The merchant has the app installed",
                    "They've added at least one customer",
                    "They've created at least one order",
                    "A balance owed is recorded in the app",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl p-5"
                      style={{
                        background:
                          "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                        border: "1px solid transparent",
                      }}
                    >
                      <p className="text-sm text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-4">
                  This role includes a short daily activity update (2–3 minutes) to help track
                  progress and support your success.
                </p>
              </div>

              {/* Commission */}
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#26C7C3]">
                  Commission & incentives
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "Per activation", value: "₦2,000" },
                    { label: "Weekly bonus (25+ activations)", value: "₦10,000" },
                    { label: "Payout schedule", value: "Weekly" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl px-6 py-4"
                      style={{
                        background:
                          "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                        border: "1px solid transparent",
                      }}
                    >
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Closed notice */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                }}
              >
                <h3 className="font-semibold mb-2">Applications</h3>
                <p className="text-gray-500 text-sm italic">
                  Applications for this role are currently closed.
                </p>
              </div>

              {/* Who it's for */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                }}
              >
                <h3 className="font-semibold mb-4">Who this role is for</h3>
                <ul className="space-y-3">
                  {[
                    "Based in Lagos or able to move around Lagos",
                    "Comfortable talking to business owners",
                    "Speaks English and Yoruba or Pidgin",
                    "Has a smartphone and mobile data",
                    "Field sales experience is a plus (not required)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8354AA] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What we provide */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                }}
              >
                <h3 className="font-semibold mb-4">What we provide</h3>
                <ul className="space-y-3">
                  {[
                    "Short training and onboarding session",
                    "Clear activation checklist",
                    "Demo guidance and support",
                    "WhatsApp support channel",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0FE082] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
