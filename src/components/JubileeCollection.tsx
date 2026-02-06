const jubileeCakes = [
  { name: "The Sage Wreath", price: 45, desc: "Semi-naked layers with rosemary & thyme" },
  { name: "Honey & Fig", price: 52, desc: "Rustic naked cake with caramelized figs" },
  { name: "The Wildflower", price: 48, desc: "Buttercream blooms on exposed sponge" },
];

const JubileeCollection = () => {
  return (
    <section className="bg-sl-sage py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            The Rustic Line
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            The Jubilee Collection
          </h2>
          <p className="font-manrope text-sm text-muted-foreground mt-3">Starting at $45</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {jubileeCakes.map((cake) => (
            <div key={cake.name} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-none mb-4 shimmer-placeholder group-hover:shadow-lg transition-shadow border border-[hsl(var(--sl-gold)/0.2)]" />
              <h3 className="font-cormorant text-lg font-semibold text-foreground group-hover:text-primary transition-colors tracking-wide">
                {cake.name}
              </h3>
              <p className="font-manrope text-xs text-muted-foreground mt-1">{cake.desc}</p>
              <p className="font-manrope text-xs text-muted-foreground mt-1">From ${cake.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JubileeCollection;
