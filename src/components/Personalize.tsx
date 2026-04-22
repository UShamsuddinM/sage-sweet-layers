const Personalize = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image placeholder */}
          <div className="aspect-[4/5] rounded-none bg-gradient-to-br from-[hsl(144,20%,70%)] to-[hsl(152,17%,50%)] flex items-center justify-center">
            <span className="font-cormorant text-xl text-primary-foreground/30 italic">Personalize Image</span>
          </div>

          {/* Text card offset */}
          <div className="md:-ml-16 bg-background rounded-none shadow-lg p-10 md:p-14 relative z-10">
            <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Make It Yours</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-wide">Personalize Your Design</h2>
            <p className="font-manrope text-sm text-muted-foreground leading-relaxed mb-8">
              Choose your layers, flavors, and frosting. Add a message, pick your colors, and create something uniquely yours. Every cake tells a story — let's write yours together.
            </p>
            <a href="https://cash.app/$sweetlayersus" target="_blank" rel="noopener noreferrer" className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-primary border-b-2 border-primary hover:text-sl-gold-hover hover:border-sl-gold-hover transition-colors pb-1">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personalize;
