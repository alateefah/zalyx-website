import { Helmet } from "react-helmet-async";
import { FAQ } from "../components/FAQs";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { JoinFam } from "../components/JoinFam";
import { ProductShowcase } from "../components/ProductShowcase";
import { WhyZalyx } from "../components/WhyZalyx";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Zalyx Technologies — Digital Tools for Small Businesses</title>
        <meta
          name="description"
          content="Zalyx Technologies builds simple, powerful digital tools that help small businesses manage operations, customers, and records — including Zalyx Ledger, an offline-first digital ledger."
        />
        <link rel="canonical" href="https://zalyx.io/" />

        {/* Open Graph */}
        <meta property="og:title" content="Zalyx Technologies" />
        <meta
          property="og:description"
          content="Digital tools that help small businesses grow — including Zalyx Ledger."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-[#0b0d13] text-white">
        <Hero />
        <WhyZalyx />
        <ProductShowcase />
        <JoinFam />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
