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

      // brief success message then clear
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong — try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#05060A] via-[#0b0f13] to-[#0a0410] px-6">
      {/* subtle animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -bottom-32 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl bg-gradient-to-tr from-purple-600 via-teal-400 to-cyan-300 animate-blob"></div>
        <div className="absolute -right-40 -top-40 w-[420px] h-[420px] rounded-full opacity-20 blur-2xl bg-gradient-to-tr from-pink-500 via-indigo-600 to-blue-500 animate-blob animation-delay-2000"></div>
      </div>

      <main className="relative z-10 w-full max-w-3xl">
        <section className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-6">
            <img
              src="/zalyx-logo.png"
              alt="Zalyx Technologies"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Coming Soon
              </h1>
              <p className="mt-1 text-gray-300 max-w-xl">
                We're building something useful. Enter your email and we'll let
                you know when we launch.
              </p>
            </div>
          </div>

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
              className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-white/6 border border-white/8 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-black font-semibold hover:scale-[1.02] transition-transform"
            >
              Notify Me
            </button>
          </form>

          {status && (
            <p className="mt-4 text-sm text-green-300">{status}</p>
          )}

          <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
            <span>Privacy: we won't spam you.</span>
            <span>© {new Date().getFullYear()} Zalyx Technologies</span>
          </div>
        </section>

        <footer className="mt-6 text-center text-xs text-gray-500">
          Built with ❤️ — refined design for launch.
        </footer>
      </main>

      {/* Tailwind animation utilities (add to your global css if not present) */}
      <style>{`
        @keyframes blob {
          0% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-15px) scale(1.05); }
          66% { transform: translateY(10px) scale(0.98); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default ComingSoon;
