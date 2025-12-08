export function WhyZalyx() {
    return (
        <section className="w-full bg-[#0b0d13] text-white py-32">
            <div className="wrapper max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">

            {/* Heading */}
            <div className="text-center max-w-4xl mx-auto pb-12 pt-24">
                <h2 className="text-4xl md:text-6xl lg:text-6xl font-bold">Why Zalyx Technologies?</h2>

                <p className="text-gray-300 mt-12 text-xl max-w-[720px] mx-auto leading-relaxed">
                Zalyx Technologies creates powerful, easy-to-use software solutions
                that simplify business operations, financial management, and everyday workflows.
                </p>
            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card */}
                {[
                { 
                    title: "Reliability",
                    text: "Our products are stable, dependable, and built for long-term use.",
                    icon: "/icons/reliability.png",
                    highlight: false
                },
                {
                    title: "Growth",
                    text: "Every product we build is designed to help businesses grow.",
                    icon: "/icons/growth.png"
                },
                {
                    title: "Customer-Centered",
                    text: "We design around what real African businesses need.",
                    icon: "/icons/customer.png"
                },
                {
                    title: "Simplicity",
                    text: "The best technology removes complexity, not adds to it.",
                    icon: "/icons/simplicity.png"
                }
                ].map((card, i) => (
                <div
                    key={i}
                    className={`rounded-2xl py-16 px-10 ${
                    card.highlight
                        ? "bg-[#dff9ff] text-[#0b0d13]"
                        : "bg-[#111524] text-white"
                    }`}
                    style={
                    card.highlight
                        ? { border: "1px solid #dff9ff" }
                        : {
                            border: "1px solid transparent",
                            background:
                            "linear-gradient(#111524,#111524) padding-box,linear-gradient(214deg,#26C7C3,#8354AA) border-box"
                        }
                    }
                >
                    <img src={card.icon} className="h-10 w-10 mb-4" />
                    <h3 className="text-4xl font-medium">{card.title}</h3>
                    <p className="mt-2 text-xl text-gray-300">
                    {card.text}
                    </p>
                </div>
                ))}
            </div>

            </div>
        </section>
    );
}