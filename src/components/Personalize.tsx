import personalizeImage from "@/assets/cake-custom-pink.jpg";

const Personalize = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="aspect-[4/5] rounded-none overflow-hidden border border-[hsl(var(--sl-gold)/0.2)]">
            <img
              src={personalizeImage}
              alt="Pink birthday cake with gold leaf detailing"
              loading="lazy"
              className="w-full h-full object-cover"
            />
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
