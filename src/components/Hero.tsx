import { useState } from "react";

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#0b0d13] text-white z-20 flex flex-col items-center px-6 pt-10 md:pt-20 relative overflow-hidden">
      <img
        src="/backgrounds/gradient-orb.png"
        alt=""
        className="
          pointer-events-none select-none 
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[1200px] md:w-[1600px] lg:w-[2000px]
          opacity-100
          
          -z-10
        "
      />

      {/* NAV */}
      <nav
        className="w-full max-w-7xl mx-auto flex items-center justify-between
                   px-10 py-[45px] rounded-[32px] bg-[#0e111a]/60 backdrop-blur-md relative"
        style={{
          borderRadius: "32px",
          padding: "45px 40px",
          background:
            "linear-gradient(#0e111a,#0e111a) padding-box, linear-gradient(214.5deg,#26C7C3 10%,#8354AA 90%) border-box",
          border: "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/zalyx-logo.png" alt="Zalyx Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-16 text-xl text-[#E3F6FF]">
          <a href="/">Home</a>
          <a href="/#products">Products</a>
          <a href="/#faq">FAQs</a>
          <a href="mailto:support@zalyx.io">Support</a>
        </div>

        {/* Desktop CTA */}
        <a
          href="/coming-soon"
          className="hidden md:flex px-6 py-3 rounded-xl text-[#E3F6FF] font-semibold"
          style={{
            background:
              "linear-gradient(#0e111a,#0e111a) padding-box, linear-gradient(214deg,#26C7C3,#8354AA) border-box",
            border: "2px solid transparent",
          }}
        >
          Use Zalyx
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden flex flex-col gap-[4px] h-10 w-10 justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-6 h-[3px] rounded"
              style={{
                background:
                  "linear-gradient(270.15deg, #26C7C3 -9.95%, #26C7C3 9.35%, #8354AA 99.89%)",
              }}
            ></span>
          ))}
        </button>

        {/* MOBILE DROPDOWN MENU */}
        {isOpen && (
          <div
            className="absolute top-full mt-4 right-0 w-48 rounded-2xl 
                       bg-[#0f121c] border border-white/10 shadow-xl p-4 flex flex-col gap-3 md:hidden"
          >
            <a href="/" className="text-gray-200 py-2" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="/#products" className="text-gray-200 py-2" onClick={() => setIsOpen(false)}>
              Products
            </a>
            <a href="/#faq" className="text-gray-200 py-2" onClick={() => setIsOpen(false)}>
              FAQs
            </a>
            <a
              href="mailto:support@zalyx.io"
              className="text-gray-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Support
            </a>

            <a
              href="/coming-soon"
              className="mt-2 text-center py-2 rounded-xl font-semibold text-[#E3F6FF]"
              style={{
                background:
                  "linear-gradient(#0e111a,#0e111a) padding-box, linear-gradient(214deg,#26C7C3,#8354AA) border-box",
                border: "2px solid transparent",
              }}
              onClick={() => setIsOpen(false)}
            >
              Use Zalyx
            </a>
          </div>
        )}
      </nav>

      {/* HERO CONTENT */}
      <div className="max-w-5xl mx-auto text-center mt-20 md:mt-40">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight">
          Digital tools that help your{" "}
          <span className="bg-gradient-to-r from-[#5368C1] via-[#3F5FA3] to-[#14C7C3] bg-clip-text text-transparent">
            business grow
          </span>
        </h1>

        <p className="text-gray-300 mt-6 mx-auto max-w-[750px] text-xl leading-relaxed">
          Zalyx Technologies builds modern digital and financial tools that help businesses stay
          organized, understand their numbers, and grow with confidence.
        </p>

        <button
          className="mt-10 px-10 py-8 rounded-xl text-white font-semibold text-xl"
          style={{
            background: "linear-gradient(270deg,#26C7C3 0%,#8354AA 100%)",
          }}
          onClick={() => (window.location.href = "/#products")}
        >
          Explore Our Product →
        </button>
      </div>

      {/* TRUSTED BY */}
      <div className="flex items-center justify-center gap-3 mt-16 text-gray-300 text-lg md:text-xl mb-20">
        <div className="flex -space-x-2 md:-space-x-3">
          <img
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#0b0d13]"
            src="https://i.pravatar.cc/50?img=11"
          />
          <img
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#0b0d13]"
            src="https://i.pravatar.cc/50?img=22"
          />
          <img
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#0b0d13]"
            src="https://i.pravatar.cc/50?img=33"
          />
        </div>

        <p className="text-gray-300">Built with African business owners in mind</p>
      </div>
    </section>
  );
}
