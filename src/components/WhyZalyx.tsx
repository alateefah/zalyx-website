import { useEffect, useRef, useState } from "react";

export function WhyZalyx() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: "Reliability",
      text: "Our products are stable, dependable, and built for long-term use. We understand that your business can't afford downtime.",
      icon: "/icons/reliability.png",
      gradient: "from-[#26C7C3] to-[#1a9e9b]",
    },
    {
      title: "Growth",
      text: "Every product we build is designed to help businesses grow. From insights to automation, we're your growth partner.",
      icon: "/icons/growth.png",
      gradient: "from-[#8354AA] to-[#6a4388]",
    },
    {
      title: "Customer-Centered",
      text: "We design around what real African businesses need. Your feedback shapes our roadmap.",
      icon: "/icons/customer.png",
      gradient: "from-[#5368C1] to-[#4254a3]",
    },
    {
      title: "Simplicity",
      text: "The best technology removes complexity, not adds to it. If you can use WhatsApp, you can use Zalyx.",
      icon: "/icons/simplicity.png",
      gradient: "from-[#0FE082] to-[#0cc76d]",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#0b0d13] text-white py-24 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#26C7C3]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#8354AA]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="wrapper max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Why Zalyx Technologies?
          </h2>

          <p
            className={`text-gray-300 mt-8 text-lg md:text-xl max-w-[720px] mx-auto leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We turn complexity into confidence. Zalyx designs connected tools that simplify
            operations, improve financial visibility, and empower entrepreneurs to grow sustainably.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative rounded-3xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${150 + i * 100}ms`,
                background:
                  "linear-gradient(#111524,#111524) padding-box, linear-gradient(214deg,#26C7C3 0%,#8354AA 100%) border-box",
                border: "1px solid transparent",
              }}
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Icon with gradient background */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} p-0.5 mb-6`}>
                <div className="w-full h-full rounded-2xl bg-[#111524] flex items-center justify-center">
                  <img src={card.icon} className="h-7 w-7" alt="" />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-[#26C7C3] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {card.text}
              </p>

              {/* Decorative corner element */}
              <div className="absolute top-6 right-6 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" className="text-white" />
                  <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" className="text-white" />
                </svg>
              </div>
            </div>
          ))}
        </div>     
      </div>
    </section>
  );
}