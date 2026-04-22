import CakeFinder from "./CakeFinder";

const Hero = () => {
  return (
    <section className="relative" style={{ backgroundImage: "url('/images/green-marble.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0 min-h-[600px] md:min-h-[700px]">
          {/* Left — Text with dark overlay for readability */}
          <div className="relative flex flex-col justify-center py-16 md:py-24 md:pr-12">
            {/* Left-side dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(152,17%,21%,0.35)] via-[hsl(152,17%,21%,0.25)] to-transparent -left-[9999px] pl-[9999px] -z-0 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-primary-foreground/70 mb-4">
                Artisan Bakery · Est. 2018
              </p>
              <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 tracking-wide">
                Every Layer
                <br />
                Tells a Story.
              </h1>
              <p className="text-sm font-manrope text-primary-foreground/80 max-w-md mb-8 leading-relaxed">
                Handcrafted cakes and sweets made to sweeten your most cherished moments.
              </p>
              <a
                href="https://cash.app/$sweetlayersus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-primary bg-transparent hover:bg-primary text-primary-foreground font-manrope font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-none transition-colors w-fit"
              >
                Explore Our Cakes
              </a>
            </div>
          </div>

          {/* Right — transparent to show image through */}
          <div className="hidden md:flex items-stretch" />
        </div>
      </div>

      {/* Dark overlay covering left half only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[hsl(152,17%,15%)]/50 via-[hsl(152,17%,15%)]/30 to-transparent" />
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
