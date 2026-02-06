import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValentinesSweets from "@/components/ValentinesSweets";
import JubileeCollection from "@/components/JubileeCollection";
import BirthdayCakes from "@/components/BirthdayCakes";
import WeddingBanner from "@/components/WeddingBanner";
import AtelierSection from "@/components/AtelierSection";
import PatisserieGrid from "@/components/PatisserieGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ValentinesSweets />
        <JubileeCollection />
        <BirthdayCakes />
        <WeddingBanner />
        <AtelierSection />
        <PatisserieGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
