import { Link } from "react-router-dom";

const weddingProducts = [
  { name: "The Modern Tier", desc: "Pre-selected minimal style", price: null },
  { name: "The Classic White", desc: "Pre-selected traditional elegance", price: null },
  { name: "Wedding Tasting Box", desc: "Sample our top wedding flavors", price: 40 },
];

const WeddingSuite = () => {
  return (
    <section>
      {/* Part A: The "Alive" Banner */}
      <div className="relative overflow-hidden bg-[hsl(152,17%,15%)] py-24 md:py-32 group cursor-pointer">
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(152,20%,25%) 0%, transparent 70%)",
          }}
        />
        {/* Subtle scale on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(152,17%,18%)] to-[hsl(152,17%,12%)] group-hover:scale-105 transition-transform duration-700 ease-out" />
        {/* Glow border effect */}
        <div className="absolute inset-0 border border-[hsl(var(--sl-gold)/0)] group-hover:border-[hsl(var(--sl-gold)/0.3)] transition-all duration-500 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-manrope font-medium text-[hsl(var(--sl-gold))] mb-4">
            Bespoke Celebrations
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(48,50%,98%)] tracking-wide mb-6">
            Wedding Cakes & Bespoke Events
          </h2>
          <p className="font-manrope text-sm text-[hsl(48,50%,90%)] max-w-lg mx-auto mb-10 leading-relaxed">
            From intimate elopements to grand receptions, every tier is sculpted to your vision.
          </p>
          <Link
            to="/custom"
            className="inline-flex items-center justify-center border border-[hsl(var(--sl-gold))] bg-transparent hover:bg-[hsl(var(--sl-gold))] text-[hsl(48,50%,98%)] hover:text-foreground font-manrope font-semibold text-xs tracking-[0.15em] uppercase px-10 py-4 rounded-none transition-colors duration-300"
          >
            Inquire Now
          </Link>
        </div>
      </div>

      {/* Part B: Retail Grid */}
      <div className="bg-sl-cream cream-grain py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {weddingProducts.map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-none mb-4 shimmer-placeholder group-hover:shadow-lg transition-shadow border border-[hsl(var(--sl-gold)/0.2)]" />
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
