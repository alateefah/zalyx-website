import Hero from "../components/Hero";
import { JoinFam } from "../components/JoinFam";
import { ProductShowcase } from "../components/ProductShowcase";
import { WhyZalyx } from "../components/WhyZalyx";
import Footer from "../components/footer";

export default function LandingPage() {
  return (
    
    <div className="bg-[#0b0d13] text-white">
        <Hero />
        <WhyZalyx />
        <ProductShowcase />
        <JoinFam />
        <Footer />
    </div>

  );
}
