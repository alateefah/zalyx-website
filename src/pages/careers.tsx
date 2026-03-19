import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

const roles = [
  {
    title: "Growth Marketing & Partnerships Officer",
    type: "Full-Time",
    locations: ["Lagos", "Rivers", "Kano", "Abuja"],
    description:
      "Drive merchant adoption across Nigeria through field marketing, community partnerships, and onboarding. Work directly with business associations and communities.",
    href: "/careers/growth-marketing-officer",
    gradient: "from-[#26C7C3] to-[#1a9e9b]",
    open: true,
  },
  {
    title: "Field Onboarding Partner",
    type: "Commission-Based",
    locations: ["Lagos"],
    description:
      "Help small business owners install and activate Zalyx Ledger across Lagos markets and shops. Earn per verified activation.",
    href: "/careers/field-onboarding-partner",
    gradient: "from-[#8354AA] to-[#6a4388]",
    open: false,
  },
];

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers – Zalyx Technologies</title>
        <meta
          name="description"
          content="Join Zalyx and help small businesses across Nigeria grow digitally. View open roles."
        />
        <link rel="canonical" href="https://zalyx.io/careers" />
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
            to="/"
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
            Back to home
          </Link>
        </nav>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-24 relative z-10 flex-1">
          <div className="max-w-2xl mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#26C7C3]/10 to-[#8354AA]/10 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#0FE082] animate-pulse" />
              <span className="text-sm text-gray-300">We're hiring</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build the future of{" "}
              <span className="bg-gradient-to-r from-[#26C7C3] via-[#5368C1] to-[#8354AA] bg-clip-text text-transparent">
                African business
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              We're a small team solving real problems for millions of small business owners across
              Nigeria. Come work with us.
            </p>
          </div>

          {/* Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div
                key={role.href}
                className="group relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                  border: "1px solid transparent",
                  opacity: role.open ? 1 : 0.6,
                }}
              >
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Status badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      role.open
                        ? "bg-[#0FE082]/10 text-[#0FE082] border border-[#0FE082]/20"
                        : "bg-white/5 text-gray-500 border border-white/10"
                    }`}
                  >
                    {role.open ? "Open" : "Closed"}
                  </span>
                  <span className="text-xs text-gray-500">{role.type}</span>
                </div>

                <h2 className="text-xl font-semibold mb-3 group-hover:text-[#26C7C3] transition-colors duration-300">
                  {role.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{role.description}</p>

                {/* Locations */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {role.locations.map((loc) => (
                    <span
                      key={loc}
                      className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {loc}
                    </span>
                  ))}
                </div>

                {role.open ? (
                  <Link
                    to={role.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:gap-3"
                    style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
                  >
                    View role
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
                  </Link>
                ) : (
                  <span className="text-sm text-gray-600">Applications closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
