import CakeFinder from "./CakeFinder";

const Hero = () => {
  return (
    <section className="relative bg-sl-sage">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0 min-h-[600px] md:min-h-[700px]">
          {/* Left — Text */}
          <div className="flex flex-col justify-center py-16 md:py-24 md:pr-12">
            <p className="text-sm tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-4">
              Artisan Bakery · Est. 2018
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              We bake time,
              <br />
              so you don't have to.
            </h1>
            <p className="text-base md:text-lg font-manrope text-muted-foreground max-w-md mb-8 leading-relaxed">
              From signature layer cakes to handcrafted sweets, every creation is made with intention, care, and the finest ingredients.
            </p>
            <a
              href="#featured"
              className="inline-flex items-center justify-center bg-primary hover:bg-sl-gold-hover text-primary-foreground font-manrope font-semibold text-sm tracking-[0.1em] uppercase px-8 py-4 rounded-sm transition-colors w-fit"
            >
              Explore Our Cakes
            </a>
          </div>

          {/* Right — Image placeholder */}
          <div className="hidden md:flex items-stretch">
            <div className="w-full bg-gradient-to-br from-[hsl(152,17%,35%)] via-[hsl(155,20%,50%)] to-[hsl(144,30%,70%)] rounded-bl-[80px] flex items-center justify-center">
              <span className="font-playfair text-xl text-primary-foreground/40 italic">Hero Image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cake Finder overlapping bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10 px-6">
        <CakeFinder />
      </div>

      {/* Spacer so next section doesn't overlap */}
      <div className="h-12 md:h-0" />
    </section>
  );
};

export default Hero;
