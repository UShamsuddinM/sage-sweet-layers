const AtelierSection = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-6">
          Our Philosophy
        </p>
        <h2 className="font-cormorant text-2xl md:text-4xl font-bold text-foreground tracking-wide leading-relaxed">
          Organic Ingredients. French Technique.
        </h2>
        <p className="font-cormorant text-lg md:text-2xl text-foreground/80 mt-6 leading-relaxed italic">
          The Atelier approach ensures every crumb is as purposeful as it is beautiful.
        </p>
        <div className="mt-10 w-16 h-px bg-primary mx-auto" />
      </div>
    </section>
  );
};

export default AtelierSection;
