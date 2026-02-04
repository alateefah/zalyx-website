import { useState, useEffect, useRef } from "react";
import { STORE_LINKS, CONTACT } from "../utils/constants";

const faqs = [
  {
    question: "What is Zalyx Ledger?",
    answer:
      "Zalyx Ledger helps you track customer orders, payments, and debts without pen and paper. Know exactly who owes you money, when payments are due, and get automatic reminders—all for free.",
  },
  {
    question: "Is Zalyx Ledger really free?",
    answer:
      "Yes! Zalyx Ledger is completely free. Track unlimited customers, orders, and payments at no cost. No hidden fees, no credit card required, no tricks.",
  },
  {
    question: "Will it always be free?",
    answer:
      "Core features will always be free. We may add optional premium features in the future (like inventory management or team accounts), but basic order and payment tracking will never cost anything.",
  },
  {
    question: "How does Zalyx make money then?",
    answer:
      "We're building additional business services for merchants who want to grow. For now, our focus is making the best free ledger app in Africa.",
  },
  {
    question: "Can I use it without internet?",
    answer:
      "Yes! Record transactions offline and everything syncs automatically when you're back online. Your data is always available, even with poor network.",
  },
  {
    question: "What businesses is this for?",
    answer:
      "Any business that serves customers and tracks money: tailors, fashion designers, hair stylists, shop owners, bakers, food vendors, mechanics, pharmacists—if you have customers who owe you money, Zalyx Ledger is for you.",
  },
  {
    question: "How does payment tracking work?",
    answer:
      "Record what a customer ordered, the total price, and how much they've paid. Zalyx Ledger automatically calculates the balance and reminds you when payment is due. You can even send WhatsApp reminders to customers with one tap.",
  },
  {
    question: "Can I track partial payments?",
    answer:
      "Yes! Record when customers pay in installments. Zalyx Ledger shows you how much they've paid, how much is left, and when the balance is due.",
  },
  {
    question: "Does it send payment reminders?",
    answer:
      "Yes! You get daily reminders about overdue payments. You can also send WhatsApp reminders directly to customers with a pre-written message you can customize.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted and stored securely. Only you can access your account. We use the same security standards as banks to protect your business information.",
  },
  {
    question: "Can I add custom fields for my business?",
    answer:
      "Yes! Tailors can add measurements, shops can add product details, stylists can add hair type—customize it for your business needs.",
  },
  {
    question: "How do I get started?",
    answer: "download-link",
  },
  {
    question: "Do I need to watch a tutorial?",
    answer:
      "No! Zalyx Ledger is designed to be simple. If you know how to use WhatsApp, you can use Zalyx Ledger. But we do have quick video guides if you want them.",
  },
  {
    question: "What if I need help?",
    answer: "contact-link",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const renderAnswer = (answer: string) => {
    if (answer === "download-link") {
      return (
        <>
          Download Zalyx Ledger from the{" "}
          <a href={STORE_LINKS.GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" className="text-[#26C7C3] hover:underline font-medium">
            Google Play Store
          </a>{" "}
          or{" "}
          <a href={STORE_LINKS.APP_STORE} target="_blank" rel="noopener noreferrer" className="text-[#26C7C3] hover:underline font-medium">
            Apple App Store
          </a>
          . Sign up in less than a minute and start tracking your first customer.
        </>
      );
    }
    if (answer === "contact-link") {
      return (
        <>
          Email us at{" "}
          <a href={CONTACT.EMAIL_LINK} className="text-[#26C7C3] hover:underline font-medium">
            {CONTACT.EMAIL}
          </a>{" "}
          or use the in-app chat. Our team responds quickly to help you get the most out of Zalyx Ledger.
        </>
      );
    }
    return answer;
  };

  return (
    <section ref={sectionRef} id="faq" className="w-full bg-[#0b0d13] text-white py-24 md:py-30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#26C7C3]/5 via-transparent to-[#8354AA]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-sm text-gray-400">Got questions?</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#26C7C3] to-[#8354AA] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about Zalyx Ledger. Can't find what you're looking for?{" "}
            <a href="mailto:support@zalyx.io" className="text-[#26C7C3] hover:underline">
              Contact our team
            </a>
            .
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border border-white/10 bg-[#0e111a]/60 backdrop-blur-md overflow-hidden transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${isOpen ? "border-[#26C7C3]/30" : "hover:border-white/20"}`}
                style={{ transitionDelay: `${Math.min(index * 50, 400)}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-left group"
                >
                  <span className={`text-base md:text-lg font-medium pr-4 transition-colors duration-300 ${isOpen ? "text-[#26C7C3]" : "text-white group-hover:text-[#26C7C3]"}`}>
                    {faq.question}
                  </span>

                  {/* Animated icon */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-[#26C7C3]/20 text-[#26C7C3]" : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                      {renderAnswer(faq.answer)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-[#26C7C3]/10 to-[#8354AA]/10 border border-white/10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Our team is here to help you get started</p>
          <a
            href="mailto:support@zalyx.io"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}