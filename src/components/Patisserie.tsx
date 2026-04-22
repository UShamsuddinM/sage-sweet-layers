const treats = [
  { name: "Baklava" },
  { name: "Cinnamon Rolls" },
  { name: "Cream Rolls" },
  { name: "Pistachio Roll Cake" },
];

const Patisserie = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            Small Indulgences
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            The Patisserie
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {treats.map((treat) => (
            <div key={treat.name} className="group">
              <div className="aspect-square rounded-none mb-4 shimmer-placeholder transition-shadow border border-[hsl(var(--sl-gold)/0.2)]" />
              <h3 className="font-cormorant text-base font-semibold text-foreground tracking-wide">
                {treat.name}
              </h3>
              <p className="font-manrope text-xs text-muted-foreground mt-1 italic">
                Available to order — visit our menu to place your order.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patisserie;
