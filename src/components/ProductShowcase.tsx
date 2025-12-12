import { useNavigate } from "react-router-dom";

export function ProductShowcase() {
    const navigate = useNavigate();
    return (
         <section id="products" className="w-full bg-[#0b0d13] text-white relative overflow-hidden">

            <div className="wrapper max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT TEXT */}
            <div className="space-y-10">
                <div className="relative inline-block">
                    <span className="text-gray-300 text-[18px] font-light">Our Flagship Product</span>
                    <img src="/curved-arrow-pointing-down.png" className="absolute -bottom-6 left-48 w-20" />
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-xl">
                Manage Your Business records with{" "}
                <span className="bg-gradient-to-r from-[#26C7C3] to-[#8354AA] bg-clip-text text-transparent">
                    Zalyx Ledger
                </span>
                </h2>

                <button className="px-14 py-8 rounded-xl text-white text-xl font-regular"
                    style={{
                        background: "linear-gradient(270deg,#8354AA 0%,#26C7C3 100%)"
                    }}
                    onClick={() => navigate("/coming-soon")}>
                Try Zalyx Ledger
                </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
                <img
                    src="/backgrounds/ledger-wave.png"
                    alt=""
                    className="absolute right-0"
                    style={{ mixBlendMode: "screen" }}
                />
                <img src="/mockups/ledger-phone.png" className="w-[360px] md:w-[420px] lg:w-[480px] drop-shadow-2xl" />
            </div>

            </div>

            <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-purple-600/20 blur-[160px]"></div>
        </section>
    );
}