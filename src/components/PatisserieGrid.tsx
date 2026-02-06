import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const sweetItems = [
  { name: "Tahini Cookies", price: 12, description: "Salted tahini with dark chocolate chunks." },
  { name: "Pistachio Baklava", price: 18, description: "Layers of phyllo, butter, and crushed pistachios." },
  { name: "Rose Macarons", price: 14, description: "Delicate rosewater shells with white chocolate ganache." },
  { name: "Lemon Madeleines", price: 10, description: "Butter-rich French tea cakes with bright citrus zest." },
];

const PatisserieGrid = () => {
  const handleQuickAdd = (itemName: string) => {
    toast.success(`${itemName} — coming soon!`, {
      description: "This product will be available for purchase shortly.",
    });
  };

  return (
    <section className="bg-sl-sage py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            Petits Fours &amp; Treats
          </p>
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-foreground tracking-wide">
            The Patisserie
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sweetItems.map((item) => (
            <div key={item.name} className="group">
              <div className="aspect-square shimmer-placeholder mb-4 border border-primary/20 group-hover:shadow-lg transition-shadow" />
              <h3 className="font-cormorant text-base md:text-lg font-semibold text-foreground tracking-wide">
                {item.name}
              </h3>
              <p className="text-xs font-manrope text-muted-foreground mt-1 leading-relaxed">
                {item.description}
              </p>
              <p className="text-xs font-manrope text-muted-foreground mt-1">${item.price}</p>
              <button
                onClick={() => handleQuickAdd(item.name)}
                className="mt-3 w-full border border-primary/50 bg-transparent hover:bg-primary hover:text-primary-foreground text-foreground font-manrope font-semibold text-xs tracking-[0.1em] uppercase px-4 py-3 rounded-none transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatisserieGrid;
