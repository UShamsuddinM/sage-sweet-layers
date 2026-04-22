import WeddingBanner from "./WeddingBanner";

const weddingProducts = [
  {
    name: "The Modern Tier",
    desc: "Pre-selected minimal style",
    price: null,
    gradient: "linear-gradient(160deg, #FDFCF8 0%, #F0EBDF 60%, #E8F3EE 100%)",
  },
  {
    name: "The Classic White",
    desc: "Pre-selected traditional elegance",
    price: null,
    gradient: "linear-gradient(160deg, #FFFFFF 0%, #F4EFE3 50%, #E8DFC9 100%)",
  },
  {
    name: "Wedding Tasting Box",
    desc: "Sample our top wedding flavors",
    price: 40,
    gradient: "linear-gradient(160deg, #E8F3EE 0%, #C9DDD0 60%, #2C3E36 100%)",
  },
];

const WeddingSuite = () => {
  return (
    <section>
      {/* Part A: The Cinematic Banner */}
      <WeddingBanner />

      {/* Part B: Retail Grid */}
      <div className="bg-sl-cream cream-grain py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {weddingProducts.map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div
                  className="aspect-[3/4] rounded-none mb-4 group-hover:shadow-lg transition-shadow border border-[hsl(var(--sl-gold)/0.2)] flex items-center justify-center relative overflow-hidden"
                  style={{ background: item.gradient }}
                >
                  <span className="font-cormorant italic text-base tracking-wide text-[#2C3E36]/50">
                    {item.name}
                  </span>
                  <div className="absolute inset-x-6 bottom-6 h-px bg-[#C5A059]/40" />
                </div>
                <h3 className="font-cormorant text-lg font-semibold text-foreground group-hover:text-primary transition-colors tracking-wide">
                  {item.name}
                </h3>
                <p className="font-manrope text-xs text-muted-foreground mt-1">{item.desc}</p>
                {item.price && (
                  <p className="font-manrope text-xs text-muted-foreground mt-1">${item.price}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingSuite;
