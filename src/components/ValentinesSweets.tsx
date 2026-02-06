import { useNavigate } from "react-router-dom";

const ValentinesSweets = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[hsl(0,100%,98%)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Visual */}
          <div className="aspect-[4/5] shimmer-placeholder bg-[hsl(0,60%,92%)]" />

          {/* Right — Copy */}
          <div className="flex flex-col items-start gap-6">
            <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground">
              Limited Edition
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-foreground tracking-wide leading-tight">
              Valentine's Sweets
            </h2>
            <p className="text-sm font-manrope text-muted-foreground max-w-sm leading-relaxed">
              Limited edition flavors for the season of love.
            </p>
            <button
              onClick={() => navigate("/product/valentines")}
              className="inline-flex items-center justify-center border border-primary bg-primary hover:bg-primary/90 text-primary-foreground font-manrope font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-none transition-colors"
            >
              Shop the Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValentinesSweets;
