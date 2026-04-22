import baklava from "@/assets/patisserie-baklava.png";
import cinnamonRoll from "@/assets/patisserie-cinnamon-roll.jpg";
import pistachioRoll from "@/assets/patisserie-pistachio-roll.png";

const treats = [
  { name: "Baklava", image: baklava },
  { name: "Cinnamon Rolls", image: cinnamonRoll },
  { name: "Cream Rolls", image: null },
  { name: "Pistachio Roll Cake", image: pistachioRoll },
];

const Patisserie = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            Small Indulgences
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            The Patisserie
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {treats.map((treat) => (
            <div key={treat.name} className="group">
              <div className="aspect-square rounded-none mb-4 overflow-hidden transition-shadow border border-[hsl(var(--sl-gold)/0.2)] bg-sl-cream">
                {treat.image ? (
                  <img
                    src={treat.image}
                    alt={treat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full shimmer-placeholder" />
                )}
              </div>
              <h3 className="font-cormorant text-base font-semibold text-foreground tracking-wide">
                {treat.name}
              </h3>
              <p className="font-manrope text-xs text-muted-foreground mt-1 italic">
                Available to order — visit our menu to place your order.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patisserie;
