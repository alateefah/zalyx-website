import { useEffect, useRef, useState } from "react";
import { SOCIAL_LINKS } from "../utils/constants";

export function JoinFam() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      name: "Instagram",
      href: SOCIAL_LINKS.INSTAGRAM,
      color: "#E4405F",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: SOCIAL_LINKS.TWITTER,
      color: "#1DA1F2",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: SOCIAL_LINKS.LINKEDIN,
      color: "#0A66C2",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204s1.75.79 1.75 1.764S7.466 6.732 6.5 6.732zM19 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C13.396 7.179 19 6.988 19 12.241V19z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0b0d13] text-white py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#8354AA]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#26C7C3]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="wrapper max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm text-gray-400">Join our community</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-xl">
              Join the{" "}
              <span className="bg-gradient-to-r from-[#26C7C3] to-[#8354AA] bg-clip-text text-transparent">
                Zalyx Fam
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-3 max-w-sm lg:text-right">
            <div className="flex items-center gap-2 lg:justify-end">
              <span className="w-2 h-2 rounded-full bg-[#0FE082] animate-pulse" />
              <span className="text-sm text-gray-400">Live updates</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Follow us for the latest updates, tips, and success stories from African entrepreneurs
              using Zalyx.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left Image */}
          <div
            className={`relative lg:col-span-1 h-[350px] md:h-[450px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <img
              src="/womanImage.png"
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt="Happy woman holding phone"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-transparent to-transparent" />

            {/* Floating testimonial */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0f121c]/90 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#26C7C3] to-[#8354AA] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="font-medium text-sm">Amara O.</p>
                  <p className="text-xs text-gray-400">Fashion Designer, Lagos</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                "Zalyx Ledger has changed how I track my orders. No more lost payments!"
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div
            className={`lg:col-span-2 relative bg-[#0f121c] rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Background effects */}
            <img
              src="/backgrounds/join-glow.png"
              alt=""
              className="absolute right-0 bottom-0 opacity-50 pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            />
            <img
              src="/backgrounds/join-wave.png"
              alt=""
              className="absolute right-0 bottom-0 opacity-30 pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col justify-between min-h-[500px]">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#26C7C3]/20 to-[#8354AA]/20 border border-white/10 flex items-center justify-center mb-8">
                <svg
                  className="w-6 h-6 text-[#26C7C3]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Connect With Us</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Don't miss out on the latest features, success stories, and exclusive insights.
                  Join thousands of entrepreneurs growing with Zalyx.
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <span style={{ color: social.color }}>{social.icon}</span>
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Primary CTA */}
                <a
                  href={SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(270deg, #E4405F 0%, #8354AA 100%)" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Follow @zalyx.io
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
