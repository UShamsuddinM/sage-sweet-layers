import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CakeConfigurator from "@/components/CakeConfigurator";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-sl-sage">
      <Navbar />
      <main>
        <CakeConfigurator />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
