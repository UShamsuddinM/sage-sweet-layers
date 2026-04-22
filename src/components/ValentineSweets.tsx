

const ValentineSweets = () => {
  return (
    <section className="bg-[#FFF5F5] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Visual */}
          <div className="aspect-[4/3] rounded-none shimmer-placeholder bg-gradient-to-br from-[hsl(350,60%,88%)] to-[hsl(350,50%,80%)]" />

          {/* Text */}
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-[hsl(350,40%,50%)] mb-3">
              Limited Edition
            </p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide mb-4">
              Valentine's Sweets
            </h2>
            <p className="font-manrope text-sm text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Limited edition flavors crafted for love. Rose-petal macarons, heart-shaped truffles, and decadent chocolate layers — only available this season.
            </p>
            <a
              href="https://cash.app/$sweetlayersus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-primary bg-primary hover:bg-[hsl(var(--sl-gold-hover))] text-primary-foreground font-manrope font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-none transition-colors"
            >
              Shop the Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValentineSweets;
