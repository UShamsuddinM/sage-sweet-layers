const cakes = [
  { name: "Midnight Chocolate", price: 65 },
  { name: "Vanilla Bean Dream", price: 58 },
  { name: "Rose & Pistachio", price: 72 },
  { name: "Lemon Elderflower", price: 68 },
];

import { useNavigate } from "react-router-dom";

const FeaturedCakes = () => {
  const navigate = useNavigate();
  return (
    <section id="featured" className="bg-sl-cream cream-grain py-24 md:py-32">
      {/* Extra top padding for Cake Finder overlap */}
      <div className="pt-12 md:pt-16" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Our Collection</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">Signature Cakes</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cakes.map((cake) => (
            <button onClick={() => navigate("/product/demo-cake")} key={cake.name} className="group text-left cursor-pointer">
              <div className="aspect-[3/4] rounded-none shimmer-placeholder mb-4 overflow-hidden group-hover:shadow-lg transition-shadow" />
              <h3 className="font-cormorant text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors tracking-wide">{cake.name}</h3>
              <p className="text-xs font-manrope text-muted-foreground mt-1">From ${cake.price}.00</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
