import { useState, useEffect, useRef } from "react";
import { STORE_LINKS } from "../utils/constants";

export function Hero() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<"ios" | "android" | "unknown">(
    "unknown",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Detect user's platform
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setDetectedPlatform("ios");
    } else if (/android/i.test(userAgent)) {
      setDetectedPlatform("android");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  // Smart redirect based on platform
  const handleSmartDownload = () => {
    if (detectedPlatform === "ios") {
      window.open(STORE_LINKS.APP_STORE, "_blank");
    } else if (detectedPlatform === "android") {
      window.open(STORE_LINKS.GOOGLE_PLAY, "_blank");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "FAQs", href: "/#faq" },
    { label: "Support", href: "mailto:support@zalyx.io" },
  ];

  return (
    <section className="w-full min-h-screen bg-[#0b0d13] text-white z-20 flex flex-col items-center px-4 sm:px-6 pt-6 sm:pt-10 md:pt-20 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-[#26C7C3]/20 to-transparent rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-[#8354AA]/20 to-transparent rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <img
        src="/backgrounds/gradient-orb.png"
        alt=""
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] md:w-[1600px] lg:w-[2000px] opacity-100 -z-10"
      />

      {/* NAV */}
      <nav
        ref={navRef}
        className="w-full max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 md:px-10 py-4 sm:py-5 md:py-[45px] rounded-2xl sm:rounded-[24px] md:rounded-[32px] bg-[#0e111a]/60 backdrop-blur-md relative z-50"
        style={{
          background:
            "linear-gradient(#0e111a,#0e111a) padding-box, linear-gradient(214.5deg,#26C7C3 10%,#8354AA 90%) border-box",
          border: "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/zalyx-logo.png" alt="Zalyx Logo" className="h-7 sm:h-8 md:h-10 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12 text-lg text-[#E3F6FF]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#26C7C3] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA - Smart Download Button with Dropdown */}
        <div className="hidden lg:block relative" ref={dropdownRef}>
          <button
            onClick={handleSmartDownload}
            className="group px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)",
            }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Get Zalyx Ledger
            {detectedPlatform === "unknown" && (
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && detectedPlatform === "unknown" && (
            <div className="absolute top-full mt-3 right-0 w-56 rounded-2xl bg-[#0f121c]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden animate-slideDown">
              <div className="p-2">
                <a
                  href={STORE_LINKS.GOOGLE_PLAY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C853]/20 to-[#00C853]/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#00C853]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Download on</p>
                    <p className="font-semibold text-white">Google Play</p>
                  </div>
                </a>
                <a
                  href={STORE_LINKS.APP_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Download on</p>
                    <p className="font-semibold text-white">App Store</p>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden flex flex-col gap-[5px] h-10 w-10 justify-center items-center relative z-50"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-[2px] rounded transition-all duration-300 origin-center ${
              isNavOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
            style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
          />
          <span
            className={`w-6 h-[2px] rounded transition-all duration-300 ${
              isNavOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
            style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
          />
          <span
            className={`w-6 h-[2px] rounded transition-all duration-300 origin-center ${
              isNavOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
            style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
          />
        </button>
      </nav>

      {/* MOBILE SLIDE-DOWN MENU */}
      <div
        className={`fixed inset-x-0 top-0 z-40 lg:hidden transition-all duration-500 ease-out ${
          isNavOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isNavOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsNavOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`relative mx-4 mt-[88px] sm:mt-[100px] rounded-2xl bg-[#0e111a]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ease-out transform ${
            isNavOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          {/* Nav Links */}
          <div className="p-4">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={`block py-4 px-4 text-lg text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 transform ${
                  isNavOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isNavOpen ? `${100 + index * 50}ms` : "0ms",
                }}
                onClick={() => setIsNavOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Download Buttons */}
          <div
            className={`p-4 space-y-3 transition-all duration-500 transform ${
              isNavOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isNavOpen ? "300ms" : "0ms",
            }}
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2">
              Download the app
            </p>
            <a
              href={STORE_LINKS.GOOGLE_PLAY}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C853]/20 to-[#00C853]/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00C853]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Get it on</p>
                <p className="font-semibold text-white">Google Play</p>
              </div>
            </a>
            <a
              href={STORE_LINKS.APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Download on the</p>
                <p className="font-semibold text-white">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="max-w-5xl mx-auto text-center mt-12 sm:mt-16 md:mt-32 lg:mt-40 px-2 sm:px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#26C7C3]/10 to-[#8354AA]/10 border border-white/10 mb-6 sm:mb-8 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#0FE082] animate-pulse" />
          <span className="text-xs sm:text-sm text-gray-300">Now available on iOS & Android</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.15] sm:leading-[1.1] animate-fadeInUp">
          Digital tools that help your{" "}
          <span className="bg-gradient-to-r from-[#26C7C3] via-[#5368C1] to-[#8354AA] bg-clip-text text-transparent">
            business grow
          </span>
        </h1>

        <p
          className="text-gray-300 mt-5 sm:mt-8 mx-auto max-w-[700px] text-base sm:text-lg md:text-xl leading-relaxed animate-fadeInUp px-2"
          style={{ animationDelay: "0.1s" }}
        >
          Zalyx Technologies builds modern digital and financial tools that help businesses stay
          organized, understand their numbers, and grow with confidence.
        </p>

        <div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fadeInUp px-2"
          style={{ animationDelay: "0.2s" }}
        >
          <button
            className="w-full sm:w-auto group px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#26C7C3]/20"
            style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
            onClick={() => (window.location.href = "/#products")}
          >
            Explore Our Product
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          </button>

          <a
            href="/#faq"
            className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 border border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* TRUSTED BY */}
      <div
        className="flex flex-col sm:flex-col items-center justify-center gap-4 mt-12 sm:mt-16 md:mt-24 mb-12 sm:mb-20 animate-fadeInUp px-4"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex -space-x-2 sm:-space-x-3">
          {/* Pexels artisan work images - Black/African artisans at work */}
          {[
            "https://images.pexels.com/photos/4358405/pexels-photo-4358405.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop", // Black tailor threading sewing machine - Jake Ryan
            "https://images.pexels.com/photos/3342364/pexels-photo-3342364.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop", // Black hands threading sewing machine needle - nappy
            "https://images.pexels.com/photos/4358405/pexels-photo-4358405.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop", // Black tailor threading sewing machine - Jake Ryan
          ].map((src, i) => (
            <img
              key={i}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0b0d13] object-cover"
              src={src}
              alt="Artisan at work"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-col items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🇳🇬</span>
            <p className="text-gray-400 text-xs sm:text-sm text-center">
              Built for African business owners
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
