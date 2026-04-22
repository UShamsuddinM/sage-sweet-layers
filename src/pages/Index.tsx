import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MoreComingSoon from "@/components/MoreComingSoon";
import FeaturedCakes from "@/components/FeaturedCakes";
import WeddingSuite from "@/components/WeddingSuite";
import Atelier from "@/components/Atelier";
import ShopByOccasionBanner from "@/components/ShopByOccasionBanner";
import Patisserie from "@/components/Patisserie";
import Reviews from "@/components/Reviews";
import Personalize from "@/components/Personalize";
import VisitShop from "@/components/VisitShop";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <MoreComingSoon />
        <FeaturedCakes />
        <WeddingSuite />
        <Atelier />
        <ShopByOccasionBanner />
        <Patisserie />
        <Reviews />
        <Personalize />
        <VisitShop />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
