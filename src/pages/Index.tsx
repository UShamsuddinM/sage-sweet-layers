import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCakes from "@/components/FeaturedCakes";
import ShopByOccasion from "@/components/ShopByOccasion";
import Personalize from "@/components/Personalize";
import Reviews from "@/components/Reviews";
import VisitShop from "@/components/VisitShop";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCakes />
        <ShopByOccasion />
        <Personalize />
        <Reviews />
        <VisitShop />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
