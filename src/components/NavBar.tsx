export default function Navbar() {
  return (
    <nav
      className="
        w-full max-w-7xl mx-auto flex items-center justify-between
        px-10 py-[45px] rounded-[32px] bg-[#0e111a]/60 backdrop-blur-md
      "
      style={{
        background:
          "linear-gradient(#0e111a,#0e111a) padding-box, linear-gradient(214.5deg,#26C7C3 10%,#8354AA 90%) border-box",
        border: "1px solid transparent",
      }}
    >
      <div className="flex items-center gap-3">
        <img src="/zalyx-logo.png" alt="Zalyx Logo" className="h-10 w-auto" />
      </div>

      <div className="hidden md:flex items-center gap-16 text-xl text-[#E3F6FF]">
        <a href="/">Home</a>
        <a href="/#products">Products</a>
        <a href="/#faq">FAQs</a>
        <a href="mailto:support@zalyx.io">Support</a>
      </div>

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
    </nav>
  );
}
