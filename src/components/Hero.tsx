import Navbar from "./NavBar";

export default function Hero() { 
    return (
        <section className="w-full bg-[#0b0d13] text-white pt-10 md:pt-20 relative overflow-hidden min-h-screen">
            <Navbar />
            
            {/* HERO TEXT */}
            <div className="max-w-5xl mx-auto text-center mt-20 md:mt-40">
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight">
                Digital tools that help your{" "}
                <span className="bg-gradient-to-r from-[#5368C1] via-[#3F5FA3] to-[#14C7C3] bg-clip-text text-transparent">
                    business grow
                </span>
                </h1>

                <p className="text-gray-300 mt-6 mx-auto max-w-[750px] text-xl leading-relaxed">
                    Zalyx Technologies creates powerful, easy-to-use software solutions
                    that simplify business operations, financial management, and everyday workflows.
                </p>

                <button
                className="mt-10 px-10 py-8 rounded-xl text-white font-semibold text-xl"
                style={{
                    background:
                    "linear-gradient(270deg,#26C7C3 0%,#8354AA 100%)"
                }}
                >
                Explore Our Products →
                </button>
            </div>

            {/* TRUSTED BY */}
            <div className="flex items-center justify-center gap-3 mt-16 text-gray-300 text-xl mb-32">
                <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-[#0b0d13]" src="https://i.pravatar.cc/50?img=11" />
                    <img className="w-10 h-10 rounded-full border-2 border-[#0b0d13]" src="https://i.pravatar.cc/50?img=22" />
                    <img className="w-10 h-10 rounded-full border-2 border-[#0b0d13]" src="https://i.pravatar.cc/50?img=33" />
                </div>

                <p className="text-gray-300">Trusted by African business owners</p>
            </div>

            

            <div className="absolute bottom-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/30 to-teal-400/30 rounded-full blur-[140px]"></div>
        </section>
    );
}