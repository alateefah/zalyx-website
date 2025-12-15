export function JoinFam() {
  return (
    <section className="w-full bg-[#0b0d13] text-white py-32 relative">
      <div className="wrapper max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-xl">
            Stay in the Loop with Zalyx Technologies
          </h2>

          <div className="flex flex-col gap-3 max-w-sm">
            <img src="/icons/updates.png" className="w-[45px] h-[21px]" />
            <p className="text-gray-400 text-md leading-relaxed">
              Get the latest updates, insights, and announcements—delivered straight to you.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* Left Image */}
          <div className="relative lg:col-span-1 h-[350px] md:h-[450px] lg:h-[600px] rounded-[16px] overflow-hidden">
            <img
              src="/womanImage.png"
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt="Happy woman holding phone"
            />
          </div>

          {/* Right Card */}
          <div className="lg:col-span-2 relative bg-[#121626] rounded-[16px] border border-[#1e2334] overflow-hidden p-8 md:p-16">
            {/* BG WAVE IMAGE INSIDE CARD */}
            <img
              src="/backgrounds/join-glow.png"
              alt=""
              className="absolute right-0 bottom-0"
              // className="absolute right-[-180px] bottom-[-220px] w-[620px] opacity-[0.35] blur-[20px] pointer-events-none select-none"
              style={{ mixBlendMode: "screen" }}
            />

            {/* WAVE BG IMAGE */}
            <img
              src="/backgrounds/join-wave.png"
              alt=""
              className="absolute right-0 bottom-0"
              // className="absolute right-[-120px] bottom-[-130px] w-[500px] opacity-[0.85] pointer-events-none select-none"
              style={{ mixBlendMode: "screen" }}
            />

            {/* ICON AT TOP LEFT */}
            <img
              src="/icons/join.png"
              alt=""
              className="h-10 w-10 absolute top-8 md:top-10 left-8 md:left-16"
            />

            {/* TEXT + BUTTON */}
            <div className="relative z-10 pt-20 md:pt-24">
              <h3 className="text-3xl md:text-4xl font-bold mb-5">Join the Zalyx Fam</h3>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                Don’t miss out on all the fun, updates and freebies. Keep up with us on social
                media.
              </p>

              <button className="px-8 py-4 border border-gray-600 text-white rounded-lg w-fit hover:bg-gray-500/10 transition">
                Join Zalyx Family
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
