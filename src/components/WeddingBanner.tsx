const WeddingBanner = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background shimmer */}
      <div className="absolute inset-0 shimmer-placeholder" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[hsl(152,17%,15%)]/60" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-primary-foreground/70 mb-4">
          Bespoke &amp; Extraordinary
        </p>
        <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-primary-foreground tracking-wide leading-tight mb-6">
          Wedding Cakes &amp; Bespoke Events
        </h2>
        <p className="text-sm font-manrope text-primary-foreground/80 mb-10 leading-relaxed">
          Let us sculpt your love story in sugar.
        </p>
        <a
          href="https://cash.app/$sweetlayersus"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-primary bg-transparent hover:bg-primary text-primary-foreground font-manrope font-semibold text-xs tracking-[0.15em] uppercase px-10 py-4 rounded-none transition-colors"
        >
          Inquire Now
        </a>
      </div>
    </section>
  );
};

export default WeddingBanner;
