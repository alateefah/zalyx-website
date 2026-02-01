import { Helmet } from "react-helmet-async";
import { FAQ } from "../components/FAQs";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { JoinFam } from "../components/JoinFam";
import { ProductShowcase } from "../components/ProductShowcase";
import { WhyZalyx } from "../components/WhyZalyx";
import { STORE_LINKS } from "../utils/constants";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      // save referral for later app signup
      localStorage.setItem("zalyx_referral_code", ref);

      const ua = navigator.userAgent.toLowerCase();

      if (ua.includes("android")) {
        window.location.href = STORE_LINKS.GOOGLE_PLAY;
      } else if (ua.includes("iphone") || ua.includes("ipad")) {
        window.location.href = STORE_LINKS.APP_STORE;
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Zalyx Technologies – Digital Tools for African Entrepreneurs</title>
        <meta
          name="description"
          content="Zalyx Technologies builds simple, powerful digital tools that help African entrepreneurs manage operations, customers, and records. Download Zalyx Ledger — free forever."
        />
        <link rel="canonical" href="https://zalyx.io/" />

        {/* Open Graph */}
        <meta property="og:title" content="Zalyx Technologies – Digital Tools for Entrepreneurs" />
        <meta
          property="og:description"
          content="Free digital tools for African entrepreneurs. Zalyx Ledger helps you track customers, orders, and payments offline and online."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zalyx.io/" />
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