import customCake from "@/assets/cake-custom-pink.jpg";
import pistachioCake from "@/assets/cake-pistachio.jpg";
import fondantCake from "@/assets/cake-fondant.jpg";

const cakes = [
  { name: "Custom Cake", price: 100, image: customCake },
  { name: "Pistachio Cake", price: 125, image: pistachioCake },
  { name: "Fondant Cake", price: 245, image: fondantCake },
];

const FeaturedCakes = () => {
  return (
    <section id="featured" className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="pt-12 md:pt-16" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Our Collection</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">Our Cakes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cakes.map((cake) => (
            <a
              href="https://cash.app/$sweetlayersus"
              target="_blank"
              rel="noopener noreferrer"
              key={cake.name}
              className="group text-left cursor-pointer block"
            >
              <div className="aspect-[3/4] rounded-none mb-4 overflow-hidden group-hover:shadow-lg transition-shadow border border-sl-gold/20">
                <img
                  src={cake.image}
                  alt={cake.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-cormorant text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors tracking-wide">
                {cake.name}
              </h3>
              <p className="text-xs font-manrope text-muted-foreground mt-1">Starting at ${cake.price}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
