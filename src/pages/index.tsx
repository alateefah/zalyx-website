import Footer from "./footer";

export default function HeroSection() {
  return (
    <>
    <section className="w-full min-h-screen bg-[#0b0d13] text-white flex flex-col items-center px-6 pt-10 md:pt-20 relative overflow-hidden">
      {/* NAVBAR */}
      <nav
        className="
            w-full
            max-w-7xl
            mx-auto
            flex
            items-center
            justify-between
            px-10
            py-[45px]
            rounded-[32px]
            bg-[#0e111a]/60
            backdrop-blur-md
            relative
        "
        style={{
            borderRadius: "32px",
            padding: "45px 40px",
            background: 
            "linear-gradient(#0e111a, #0e111a) padding-box, linear-gradient(214.5deg, #26C7C3 10.95%, #8354AA 89.45%) border-box",
            border: "1px solid transparent",
        }}
      > 
        {/* Logo */}
        <div className="flex items-center gap-3">
            <img src="/zalyx-logo.png" alt="Zalyx Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-16 text-lg text-[#E3F6FF]">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">FAQs</a>
            <a href="#">Support</a>
        </div>

        {/* CTA */}
        <button
            className="
                hidden md:flex items-center justify-center
                px-6 py-3 rounded-xl text-[#E3F6FF] font-semibold hover:opacity-90 transition
            "
            style={{
                borderRadius: "10px",
                background:
                "linear-gradient(#0e111a, #0e111a) padding-box, linear-gradient(214.5deg, #26C7C3 10.95%, #8354AA 89.45%) border-box",
                border: "2px solid transparent",
            }}
            >
            Use Zalyx
        </button>


        {/* Mobile menu */}
        <button className="md:hidden flex flex-col gap-[4px] h-10 w-10 justify-center items-center">
            <span className="w-6 h-[3px] rounded" style={{background: "linear-gradient(270.15deg, #26C7C3 -9.95%, #26C7C3 9.35%, #8354AA 99.89%)"}}></span>
            <span className="w-6 h-[3px] rounded" style={{background: "linear-gradient(270.15deg, #26C7C3 -9.95%, #26C7C3 9.35%, #8354AA 99.89%)"}}></span>
            <span className="w-6 h-[3px] rounded" style={{background: "linear-gradient(270.15deg, #26C7C3 -9.95%, #26C7C3 9.35%, #8354AA 99.89%)"}}></span>
        </button>
      </nav>

      {/* HERO TEXT */}
      <div className="max-w-5xl text-center mt-20 md:mt-40">
        <h1 className="text-4xl md:text-8xl font-extrabold leading-tight text-[#E3F6FF]">
            Digital tools that help your{" "}
            <span className="bg-gradient-to-r from-[#5368C1] via-[#3F5FA3] to-[#14C7C3] bg-clip-text text-transparent">
                business grow
            </span>
        </h1>
        <p className="text-gray-300 mt-6 mx-auto text-[21px] leading-relaxed max-w-[725px]">
            Zalyx Technologies creates powerful, easy-to-use software solutions that
            simplify business operations, financial management, and everyday workflows.
        </p>
        <button
            className="mt-10 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
            style={{
                background: "linear-gradient(270.15deg, #26C7C3 -9.95%, #26C7C3 9.35%, #8354AA 99.89%)",
                height: 92,
                width: 316,
                borderRadius: 16,
                fontSize: 21,
            }}
        >
        Explore Our Products →
        </button>

      </div>

      {/* TRUSTED BY */}
      <div className="flex flex-col items-center mt-16 text-gray-300 text-sm mb-32">
        <div className="flex -space-x-3">
          <img className="w-10 h-10 rounded-full border-2 border-[#0b0d13]" src="https://i.pravatar.cc/50?img=11" />
          <img className="w-10 h-10 rounded-full border-2 border-[#0b0d13]" src="https://i.pravatar.cc/50?img=22" />
          <img className="w-10 h-10 rounded-full border-2 border-[#0b0d13]" src="https://i.pravatar.cc/50?img=33" />
        </div>
        <p className="mt-3">Trusted by African business owners</p>
      </div>

      {/* BG GRADIENT */}
      <div className="absolute bottom-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/30 to-teal-400/30 rounded-full blur-[140px]"></div>
    </section>

    <section className="w-full py-24 px-6 md:px-12 bg-[#0b0d13] text-white">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto pt-20 pb-8">
            <h2 className="text-4xl md:text-7xl font-extrabold">Why Zalyx Technologies?</h2>

            <p className="text-gray-300 mt-8 text-[21px] leading-relaxed max-w-[720px] mx-auto">
            Zalyx Technologies creates powerful, easy-to-use software solutions that
            simplify business operations, financial management, and everyday workflows.
            </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 md:px-80">

            {/* Reliability - highlighted */}
            <div
            className="rounded-2xl py-16 px-10 bg-[#dff9ff] text-[#0b0d13]"
            style={{
                border: "1px solid",
                borderColor: "#dff9ff",
            }}
            >
                <div className="mb-4">
                    <img src="/icons/reliability.png" className="h-10 w-10" />
                </div>

                <h3 className="text-2xl font-semibold">Reliability</h3>
                <p className="mt-2 text-[17px] text-[#0b0d13]/70">
                    Our products are stable, dependable, and built for long-term use.
                </p>
            </div>

            {/* Growth */}
            <div
            className="rounded-2xl py-16 px-10 bg-[#111524]"
            style={{
                border: "1px solid transparent",
                background:
                "linear-gradient(#111524, #111524) padding-box, linear-gradient(214deg, #26C7C3, #8354AA) border-box",
            }}
            >
            <div className="mb-4">
                <img src="/icons/growth.png" className="h-10 w-10" />
            </div>

            <h3 className="text-2xl font-semibold text-white">Growth</h3>
            <p className="mt-2 text-[17px] text-gray-300">
                Every product we build is designed to help businesses grow.
            </p>
            </div>

            {/* Customer-Centered */}
            <div
            className="rounded-2xl py-16 px-10 bg-[#111524]"
            style={{
                border: "1px solid transparent",
                background:
                "linear-gradient(#111524, #111524) padding-box, linear-gradient(214deg, #26C7C3, #8354AA) border-box",
            }}
            >
            <div className="mb-4">
                <img src="/icons/customer.png" className="h-10 w-10" />
            </div>

            <h3 className="text-2xl font-semibold text-white">Customer-Centered</h3>
            <p className="mt-2 text-[17px] text-gray-300">
                We design around what real African businesses need.
            </p>
            </div>

            {/* Simplicity */}
            <div
            className="rounded-2xl py-16 px-10 bg-[#111524]"
            style={{
                border: "1px solid transparent",
                background:
                "linear-gradient(#111524, #111524) padding-box, linear-gradient(214deg, #26C7C3, #8354AA) border-box",
            }}
            >
            <div className="mb-4">
                <img src="/icons/simplicity.png" className="h-10 w-10" />
            </div>

            <h3 className="text-2xl font-semibold text-white">Simplicity</h3>
            <p className="mt-2 text-[17px] text-gray-300">
                We believe the best technology removes complexity, not adds to it.
            </p>
            </div>

        </div>
    </section>

    

<section className="w-full py-32 px-6 md:px-16 bg-[#0b0d13] text-white relative overflow-hidden">

  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

    {/* LEFT TEXT BLOCK */}
    <div className="space-y-10">

      {/* Flagship Product With Curved Arrow */}
      <div className="relative inline-block">
        <span className="text-gray-300 text-[18px] font-light">
          Our Flagship Product
        </span>
         {/* Arrow Image Positioned Under Text */}
        <img
            src="/curved-arrow-pointing-down.png"
            alt="arrow pointing down"
            // className="absolute -bottom-8 left-48 w-20"
            className="absolute -bottom-6 left-48 w-22"

        />

      </div>

      {/* 3-LINE HEADING EXACTLY LIKE FIGMA */}
      <h2 className="font-extrabold leading-[1.1] text-[48px] md:text-[64px] lg:text-[64px] max-w-xl">
        Manage Your 
        Business records 
        with{" "}
        <span
          className="text-transparent bg-clip-text"
          style={{
            background:
              "linear-gradient(270.15deg, #26C7C3 -9.95%, #26C7C3 9.35%, #8354AA 99.89%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Zalyx Ledger
        </span>
      </h2>

      {/* CTA BUTTON */}
      <button
        className="px-12 py-4 rounded-xl text-white font-semibold text-[20px] hover:opacity-90 transition"
        style={{
          background:
            "linear-gradient(270.15deg, #8354AA 0%, #26C7C3 100%)",
        }}
      >
        Try Zalyx Ledger
      </button>
    </div>

    {/* RIGHT PHONE MOCKUP */}
    <div className="flex justify-center lg:justify-end relative">
      <img
        src="/mockups/ledger-phone.png"
        alt="Zalyx Ledger App"
        className="w-[360px] md:w-[420px] lg:w-[480px] drop-shadow-2xl"
      />
    </div>
  </div>

  {/* Background Glow */}
  <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-purple-600/20 blur-[160px] pointer-events-none"></div>
</section>

    <section className="w-full py-20 md:py-32 px-6 md:px-16 bg-[#0b0d13] text-white relative overflow-hidden">
       <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-lg">
            Stay in the Loop with Zalyx Technologies
          </h2>
          
          <div className="flex flex-col items-start gap-3 max-w-sm">
          <img src="/icons/updates.png"   className="w-[45px] h-[21px]"
        />

        <p className="text-muted-foreground text-sm leading-relaxed">
          Get the latest updates, insights, and announcements—delivered straight to you.
        </p>
      </div>

        </div>

        {/* Join The Fam Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch gap-5">
          {/* Woman Image - 40% */}
          <div className="relative lg:col-span-2 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[612px] rounded-[16px] overflow-hidden">
          <img
            src="/womanImage.png"
            alt="Happy woman with sunglasses holding phone"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>


        {/* Join Card - 60% */}
        <div className="bg-[#121626] lg:col-span-3 rounded-[16px] p-8 md:p-16 flex flex-col justify-center">
          <img src="/icons/join.png" className="h-10 w-10 mb-4" />

          <h3 className="text-3xl md:text-4xl font-bold mb-5">Join the Zalyx Fam</h3>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            Don't miss out on all the fun, updates and freebies. Keep up with us on social media.
          </p>

          <button className="w-fit px-8 py-4 rounded-lg border border-muted-foreground/40 text-foreground font-medium text-base hover:bg-muted/50 transition-colors duration-300">
            Join Zalyx Family
          </button>
        </div>
      </div>
      
      </div>
    </div>
    {/* Background Glow */}
      <div className="absolute top-40 right-20 w-[400px] h-[400px] glow-effect pointer-events-none" />
    </section>
    <Footer />
    </>
  );
}
