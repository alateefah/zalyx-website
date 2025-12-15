import { useState } from "react";

const faqs = [
  {
    question: "What is Zalyx Ledger?",
    answer:
      "Zalyx Ledger is a simple, smart digital ledger that helps small businesses record sales, track customers, manage debts, and understand their cash flow — all in one place. It’s built for everyday merchants who want clarity and control without complex accounting tools.",
  },
  {
    question: "How does Zalyx Ledger work?",
    answer:
      "Zalyx Ledger lets you record transactions as they happen — sales, payments, and outstanding balances. Your data is organized automatically, giving you real-time insights into who owes you, how much you’ve made, and how your business is performing over time.",
  },
  {
    question: "Can I use Zalyx Ledger without internet access?",
    answer:
      "Yes. Zalyx Ledger is built with an offline-first design. You can record transactions even without internet access, and everything will sync securely once you’re back online.",
  },
  {
    question: "What kind of businesses can use Zalyx Ledger?",
    answer:
      "Zalyx Ledger is designed for small and growing businesses such as tailors and fashion designers, hair stylists and barbers, retail shop owners, bakers and food vendors, POS agents, and other service providers. If you sell products or services and track customers, Zalyx Ledger is for you.",
  },
  {
    question: "How do I track sales and customer balances?",
    answer:
      "Each sale or service is linked to a customer. Zalyx Ledger automatically keeps track of total sales, payments received, outstanding balances, and customer history — no manual calculations required.",
  },
  {
    question: "Is my business data safe?",
    answer:
      "Yes. Your data is encrypted and stored securely. Only you can access your account, and we follow best practices to protect your information both on your device and in the cloud.",
  },
  {
    question: "When is Zalyx Ledger launching?",
    answer:
      "Zalyx Ledger is launching soon. We’re currently onboarding early users to help us refine the product before a wider release.",
  },
  {
    question: "How can I get early access?",
    answer:
      "You can join our early access list through the website or follow Zalyx on social media to get notified when we launch.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full bg-[#0b0d13] text-white py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Answers to some of the most common questions about Zalyx Ledger.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10
                           bg-[#0e111a]/60 backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between
                             px-6 md:px-8 py-6 text-left
                             text-lg md:text-xl font-medium"
                >
                  <span>{faq.question}</span>

                  {/* Plus icon */}
                  <span
                    className={`ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
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
                  <div className="overflow-hidden px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
