import React, { useState, FormEvent } from "react";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOqz-1i6PwVuc9Y8b4s4kCkNE8OFpTCjDohMASg9Oth0PQfA/formResponse";
const ENTRY_FIELD_NAME = "entry.1039783932";

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    const formData = new FormData();
    formData.append(ENTRY_FIELD_NAME, email);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setStatus("Thanks — you’re on the list!");
      setEmail("");

      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong — try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0C14] text-[#F1FDFF] px-6">
      <main className="relative z-10 w-full max-w-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#26C7C3]/10 via-transparent to-[#8354AA]/10 blur-3xl pointer-events-none"></div>

        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
          {/* Header */}

          <div className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src="/zalyx-logo.png"
              alt="Zalyx Technologies"
              className="w-40 md:w-56 h-auto object-contain mx-auto sm:mx-0"
            />
            <h1 className="text-4xl md:text-4xl  text-white leading-tight">
              Zalyx Ledger Web is Coming Soon
            </h1>
            <p className="mt-1 text-gray-300 max-w-xl">
              We're putting the final touches on a simple, powerful app for African business owners.
              Get notified when it launches
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 items-center"
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-[#F1FDFF] focus:outline-none focus:ring-2 focus:ring-[#26C7C3]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-[#0A0C14] bg-gradient-to-r from-[#8354AA] to-[#26C7C3] hover:opacity-90 transition"
            >
              Notify Me
            </button>
          </form>

          {status && (
            <p className="mt-4 text-sm text-[#0FE082] text-center sm:text-left">{status}</p>
          )}

          {/* Footer */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-400 text-center sm:text-left">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
            <span>© {new Date().getFullYear()} Zalyx Technologies</span>
          </div>
          <div className="mt-4 text-center sm:text-left">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
            >
              <span>←</span>
              <span>Back to Home</span>
            </a>
          </div>
        </section>

        <footer className="mt-6 text-center text-xs text-gray-500">
          Built with ❤️ — refined design for launch.
        </footer>
      </main>
    </div>
  );
};

export default ComingSoon;
