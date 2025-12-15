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
        <title>Zalyx Ledger — Simple Digital Ledger for Small Businesses</title>
        <meta
          name="description"
          content="Zalyx Ledger helps small businesses track sales, customers, and cash flow with a simple offline-first digital ledger."
        />
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
