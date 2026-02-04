import { STORE_LINKS } from "../utils/constants";

export function ProductShowcase() {
  const features = [
    { icon: "📱", text: "Works offline" },
    { icon: "🔒", text: "Bank-level security" },
    { icon: "⏰", text: "Payment Reminders" },
    { icon: "💰", text: "Free" },
  ];

  return (
    <section id="products" className="w-full bg-[#0b0d13] text-white relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#26C7C3]/20 to-[#8354AA]/20 blur-[160px] pointer-events-none" />
      <img
        src="/backgrounds/ledger-wave.png"
        alt=""
        className="absolute right-0 top-0 opacity-50 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="wrapper max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* LEFT TEXT */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="relative inline-flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#26C7C3]/10 to-[#8354AA]/10 border border-white/10">
                <span className="text-sm font-medium text-[#26C7C3]">Our Flagship Product</span>
              </div>
              <img
                src="/curved-arrow-pointing-down.png"
                className="absolute -bottom-8 left-48 w-16 hidden md:block opacity-60"
                alt=""
              />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Manage Your Business records with{" "}
              <span className="bg-gradient-to-r from-[#26C7C3] to-[#8354AA] bg-clip-text text-transparent">
                Zalyx Ledger
              </span>
            </h2>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
              Zalyx Ledger keeps your customer records, transaction history, and business data
              securely stored and accessible across devices.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <span>{feature.icon}</span>
                  <span className="text-sm text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Store Badges - Official Style */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Google Play Store Badge */}
              <a
                href={STORE_LINKS.GOOGLE_PLAY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00C3FF" />
                      <stop offset="35%" stopColor="#00F076" />
                      <stop offset="70%" stopColor="#FFBC00" />
                      <stop offset="100%" stopColor="#FF3A44" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#playGradient)" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Get it on</p>
                  <p className="text-lg font-semibold text-white -mt-0.5">Google Play</p>
                </div>
              </a>

              {/* Apple App Store Badge */}
              <a
                href={STORE_LINKS.APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Download on the</p>
                  <p className="text-lg font-semibold text-white -mt-0.5">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow effect behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#26C7C3]/30 to-[#8354AA]/30 rounded-full blur-[80px] pointer-events-none" />

            {/* Phone mockup */}
            <img
              src="/mockups/ledger-phone.png"
              alt="Zalyx Ledger App"
              className="w-[300px] md:w-[380px] lg:w-[450px] drop-shadow-2xl relative z-10"
            />
          </div>
        </div>

        {/* Stats section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-20 border-t border-white/10">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "₦50M+", label: "Transactions Tracked" },
            { value: "4.8★", label: "App Store Rating" },
            { value: "100%", label: "Free Forever" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#26C7C3] to-[#8354AA] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-400 mt-2 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Floating animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}