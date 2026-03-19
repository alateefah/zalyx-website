import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

const responsibilities = [
  {
    title: "Merchant Acquisition",
    body: "Identify and engage business communities and associations including market groups, trade unions, mechanics associations, and small business clusters. Build relationships with association leaders and organize group onboarding sessions.",
  },
  {
    title: "Partnerships & Community Growth",
    body: "Develop partnerships with trade associations, cooperative groups, and business clusters. Host Zalyx demo sessions and onboarding events to drive merchant signups.",
  },
  {
    title: "Merchant Onboarding",
    body: "Guide new merchants through installing the app, setting up their profile, adding their first customers, and recording their first transactions. Ensure merchants reach activation milestones quickly.",
  },
  {
    title: "Merchant Activation",
    body: "An activated merchant has signed up, added at least one customer, recorded their first transaction, and shared their referral code. You are responsible for getting signups to activation fast.",
  },
  {
    title: "Retention & Engagement",
    body: "Follow up with inactive merchants, understand friction points, and help them unlock value from the platform. Document feedback for the product team.",
  },
  {
    title: "Field Demos & Events",
    body: "Organize and attend live demos and onboarding sessions at markets, association meetings, and community events. This includes representing Zalyx at business and tech events in your state.",
  },
  {
    title: "Merchant Feedback Loop",
    body: "Act as the bridge between users and the product team. Gather feedback on friction, feature requests, and usage patterns to help shape product improvements.",
  },
];

export default function GrowthMarketingOfficer() {
  return (
    <>
      <Helmet>
        <title>Growth Marketing & Partnerships Officer – Nigeria | Zalyx</title>
        <meta
          name="description"
          content="Join Zalyx as a Growth Marketing & Partnerships Officer. Drive merchant adoption across Nigeria through field marketing, community partnerships, and onboarding."
        />
        <link rel="canonical" href="https://zalyx.io/careers/growth-marketing-officer" />
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
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#0FE082]/10 text-[#0FE082] border border-[#0FE082]/20">
                Open
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                Full-Time
              </span>
              {["Lagos", "Rivers", "Kano", "Abuja"].map((loc) => (
                <span
                  key={loc}
                  className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                >
                  {loc}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Growth Marketing &{" "}
              <span className="bg-gradient-to-r from-[#26C7C3] via-[#5368C1] to-[#8354AA] bg-clip-text text-transparent">
                Partnerships Officer
              </span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed">
              Zalyx is building tools that help small businesses manage customers, record sales,
              track payments, and grow digitally. We recently launched{" "}
              <strong className="text-white">Zalyx Ledger</strong> and are expanding our team to
              drive adoption across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Role overview */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#26C7C3]">Role overview</h2>
                <p className="text-gray-400 leading-relaxed">
                  This role combines field marketing, community partnerships, merchant onboarding,
                  and retention. You'll work directly with business communities to introduce Zalyx,
                  run demos, onboard merchants, and ensure they become active users.
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#26C7C3]">Key responsibilities</h2>
                <div className="space-y-4">
                  {responsibilities.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl p-6"
                      style={{
                        background:
                          "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                        border: "1px solid transparent",
                      }}
                    >
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#26C7C3]">Success metrics</h2>
                <ul className="space-y-3">
                  {[
                    "Number of merchant signups",
                    "Merchant activation rate",
                    "Weekly active merchants",
                    "Merchant retention rate",
                    "Partnerships secured with associations",
                  ].map((m) => (
                    <li key={m} className="flex items-center gap-3 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#26C7C3] shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                }}
              >
                <h3 className="font-semibold mb-2">Ready to apply?</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Fill out the short form. Takes less than 3 minutes.
                </p>
                <a
                  href="https://forms.gle/1WSxarrz2LAZpYxW9"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-white px-5 py-3 rounded-xl transition-all duration-300 hover:opacity-90"
                  style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
                >
                  Apply now
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
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
                    "Comfortable speaking with business owners",
                    "Experience in marketing, sales, or community roles",
                    "Proactive and independent in the field",
                    "Able to build relationships with community leaders",
                    "Passionate about helping small businesses",
                    "Fintech or startup experience is a plus",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8354AA] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compensation */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                }}
              >
                <h3 className="font-semibold mb-4">Compensation</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Monthly base</span>
                    <span className="font-semibold text-white">₦100,000</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Performance bonus</span>
                    <span className="font-semibold text-[#0FE082]">+ targets</span>
                  </div>
                </div>
              </div>

              {/* Why Zalyx */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                }}
              >
                <h3 className="font-semibold mb-4">Why join Zalyx</h3>
                <ul className="space-y-3">
                  {[
                    "Early-stage startup solving a real problem",
                    "Work directly with business owners",
                    "Performance bonus for hitting targets",
                    "Make a real impact on how businesses operate",
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
