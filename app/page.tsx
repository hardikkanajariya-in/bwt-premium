"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import FRPAdvantages from "@/components/FRPAdvantages";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProductOverview = dynamic(() => import("@/components/ProductOverview"), { ssr: false });
const KeyBenefits = dynamic(() => import("@/components/KeyBenefits"), { ssr: false });
const Applications = dynamic(() => import("@/components/Applications"), { ssr: false });
const PanelDesign = dynamic(() => import("@/components/PanelDesign"), { ssr: false });
const FeaturesAssembly = dynamic(() => import("@/components/FeaturesAssembly"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhoWeAre />
        <ProductOverview />
        <KeyBenefits />
        <Applications />
        <PanelDesign />
        <TechnicalSpecs />
        <FRPAdvantages />
        <FeaturesAssembly />
        <ContactUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
