const cakes = [
  { name: "Midnight Chocolate", price: 65 },
  { name: "Vanilla Bean Dream", price: 58 },
  { name: "Rose & Pistachio", price: 72 },
  { name: "Lemon Elderflower", price: 68 },
];

const FeaturedCakes = () => {
  return (
    <section id="featured" className="bg-sl-cream cream-grain py-24 md:py-32">
      {/* Extra top padding for Cake Finder overlap */}
      <div className="pt-12 md:pt-16" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Our Collection</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">Signature Cakes</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cakes.map((cake) => (
            <a href="#" key={cake.name} className="group">
              <div className="aspect-[3/4] rounded-lg shimmer-placeholder mb-4 overflow-hidden group-hover:shadow-lg transition-shadow" />
              <h3 className="font-playfair text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">{cake.name}</h3>
              <p className="text-sm font-manrope text-muted-foreground mt-1">From ${cake.price}.00</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
