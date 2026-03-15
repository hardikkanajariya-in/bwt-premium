import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ProductOverview from "@/components/ProductOverview";
import KeyBenefits from "@/components/KeyBenefits";
import Applications from "@/components/Applications";
import PanelDesign from "@/components/PanelDesign";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import FRPAdvantages from "@/components/FRPAdvantages";
import FeaturesAssembly from "@/components/FeaturesAssembly";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
