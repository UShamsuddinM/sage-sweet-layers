const occasions = [
  { name: "Birthdays", size: "large", color: "hsl(340, 25%, 55%)" },
  { name: "Weddings", size: "large", color: "hsl(152, 17%, 40%)" },
  { name: "Casual", size: "small", color: "hsl(40, 40%, 60%)" },
  { name: "Kids", size: "small", color: "hsl(200, 35%, 55%)" },
];

const ShopByOccasion = () => {
  return (
    <section className="bg-sl-sage py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Find Your Perfect Cake</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">Shop by Occasion</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
          {occasions.map((occ, i) => (
            <a
              href="#"
              key={occ.name}
              className={`relative rounded-lg overflow-hidden group ${
                occ.size === "large" ? "row-span-2" : ""
              }`}
              style={{ backgroundColor: occ.color }}
            >
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-primary-foreground">{occ.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
