const jubileeCakes = [
  { name: "The Rustic Berry", price: 45, description: "Wild berries cascading over exposed vanilla layers." },
  { name: "The Jubilee Vanilla", price: 48, description: "Madagascar vanilla with delicate dried florals." },
  { name: "The Garden Rose", price: 52, description: "Rosewater sponge with pistachio cream and edible petals." },
];

const JubileeCollection = () => {
  return (
    <section className="bg-sl-sage py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            Semi-Naked &amp; Rustic
          </p>
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-foreground tracking-wide">
            The Jubilee Collection
          </h2>
          <p className="text-sm font-manrope text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            Effortless elegance. Exposed layers and fresh florals for your intimate gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jubileeCakes.map((cake) => (
            <div key={cake.name} className="group cursor-pointer">
              <div className="aspect-[3/4] shimmer-placeholder mb-5 border border-primary/20 group-hover:shadow-lg transition-shadow" />
              <h3 className="font-cormorant text-lg md:text-xl font-semibold text-foreground tracking-wide group-hover:text-primary transition-colors">
                {cake.name}
              </h3>
              <p className="text-xs font-manrope text-muted-foreground mt-1 leading-relaxed">
                {cake.description}
              </p>
              <p className="text-xs font-manrope text-muted-foreground mt-2">
                From ${cake.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JubileeCollection;
