import { useState, useMemo } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const PRODUCT_DATA = {
  name: "The Minimalist",
  basePrice: 65,
  description:
    "A modern classic. Clean lines, refined flavors, and a quiet elegance that speaks for itself. This is our love letter to simplicity — proof that restraint is the ultimate form of sophistication.",
  whatAndWhy:
    "Three layers of hand-torched Italian meringue buttercream over a pillowy sponge, finished with a single pressed flower. Because sometimes, less really is everything.",
  sizes: [
    { label: '6-inch (12 serv)', price: 65 },
    { label: '8-inch (24 serv)', price: 95 },
    { label: 'Two-Tier (45 serv)', price: 185 },
  ],
  flavors: ["Vanilla Bean", "Dark Chocolate", "Lemon Elderflower", "Red Velvet"],
  palettes: [
    { name: "Sage", hex: "#E8F3EE" },
    { name: "Cream", hex: "#FDFCF8" },
    { name: "Terra", hex: "#E07A5F" },
  ],
  presetInscriptions: ["Happy Birthday", "Congrats", "With Love", "Cheers"],
};

type InscriptionMode = "none" | "standard" | "custom";

const CakeConfigurator = () => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(PRODUCT_DATA.flavors[0]);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [inscriptionMode, setInscriptionMode] = useState<InscriptionMode>("none");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [customText, setCustomText] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date>();

  const currentPrice = useMemo(() => PRODUCT_DATA.sizes[selectedSize].price, [selectedSize]);

  const inscriptionText = useMemo(() => {
    if (inscriptionMode === "standard") return selectedPreset;
    if (inscriptionMode === "custom") return customText;
    return "";
  }, [inscriptionMode, selectedPreset, customText]);

  return (
    <section className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ZONE A: The Romance */}
        <div className="space-y-4 text-center">
          <p className="font-manrope text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Signature Collection
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-foreground">
            {PRODUCT_DATA.name}
          </h1>
          <p className="font-cormorant text-2xl md:text-3xl text-primary font-semibold">
            ${currentPrice}
          </p>
          <p className="font-manrope text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {PRODUCT_DATA.description}
          </p>
          <p className="font-manrope text-xs text-muted-foreground leading-relaxed max-w-lg mx-auto italic">
            {PRODUCT_DATA.whatAndWhy}
          </p>
        </div>

        {/* Product Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-2xl aspect-[4/3] shimmer-placeholder rounded-none border border-[#C5A059]/30" />
          <div className="flex gap-3">
            {PRODUCT_DATA.palettes.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setSelectedPalette(i)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all",
                    selectedPalette === i
                      ? "border-[#C5A059] ring-2 ring-[#C5A059] ring-offset-2"
                      : "border-border group-hover:border-[#C5A059]"
                  )}
                  style={{ backgroundColor: p.hex }}
                />
                <span className="font-manrope text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-[#C5A059]/20" />

        {/* ZONE B: The Builder */}
        <div className="space-y-10 max-w-xl mx-auto">

          {/* Size Selector */}
          <div className="space-y-3">
            <label className="font-manrope text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
              Size
            </label>
            <div className="flex flex-wrap gap-3">
              {PRODUCT_DATA.sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(i)}
                  className={cn(
                    "px-6 py-3.5 rounded-none text-xs font-manrope font-semibold tracking-wider uppercase border-[1px] border-[#C5A059] transition-colors",
                    selectedSize === i
                      ? "bg-[#C5A059] text-white"
                      : "bg-transparent text-foreground hover:bg-[#C5A059]/10"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Selector */}
          <div className="space-y-3">
            <label className="font-manrope text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
              Flavor
            </label>
            <div className="space-y-2">
              {PRODUCT_DATA.flavors.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFlavor(f)}
                  className={cn(
                    "flex items-center gap-3 w-full px-5 py-3.5 rounded-none border-[1px] border-[#C5A059] text-left font-manrope text-sm transition-colors",
                    selectedFlavor === f
                      ? "bg-[#C5A059] text-white"
                      : "bg-transparent text-foreground hover:bg-[#C5A059]/10"
                  )}
                >
                  <span className={cn(
                    "w-3 h-3 rounded-full border-2 transition-colors",
                    selectedFlavor === f ? "border-white bg-white" : "border-[#C5A059]"
                  )} />
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-[#C5A059]/20" />

        {/* ZONE C: Inscription Toggle */}
        <div className="space-y-4 max-w-xl mx-auto">
          <label className="font-manrope text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
            Writing on the cake?
          </label>
          <div className="flex gap-3">
            {(["none", "standard", "custom"] as InscriptionMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setInscriptionMode(mode);
                  if (mode === "none") { setSelectedPreset(""); setCustomText(""); }
                }}
                className={cn(
                  "px-5 py-3 rounded-none text-xs font-manrope font-semibold uppercase tracking-wider border-[1px] border-[#C5A059] transition-colors",
                  inscriptionMode === mode
                    ? "bg-[#C5A059] text-white"
                    : "bg-transparent text-foreground hover:bg-[#C5A059]/10"
                )}
              >
                {mode === "none" ? "No Writing" : mode === "standard" ? "Standard" : "Custom"}
              </button>
            ))}
          </div>

          {inscriptionMode === "standard" && (
            <div className="flex flex-wrap gap-2 pt-2">
              {PRODUCT_DATA.presetInscriptions.map((text) => (
                <button
                  key={text}
                  onClick={() => setSelectedPreset(text)}
                  className={cn(
                    "px-5 py-3 rounded-none text-xs font-manrope border-[1px] border-[#C5A059] transition-colors",
                    selectedPreset === text
                      ? "bg-[#C5A059] text-white"
                      : "bg-transparent text-muted-foreground hover:bg-[#C5A059]/10"
                  )}
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          {inscriptionMode === "custom" && (
            <div className="pt-2 space-y-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value.slice(0, 30))}
                placeholder="Type your message..."
                className="w-full px-5 py-3.5 rounded-none border-[1px] border-[#C5A059] bg-background text-sm font-manrope text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-colors"
              />
              <p className="text-[10px] font-manrope text-muted-foreground tracking-wide">
                {customText.length}/30 characters
              </p>
            </div>
          )}
        </div>

        <hr className="border-[#C5A059]/20" />

        {/* ZONE D: Logistics */}
        <div className="space-y-4 max-w-xl mx-auto">
          <label className="font-manrope text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
            Get it by
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-3 w-full px-5 py-3.5 rounded-none border-[1px] border-[#C5A059] bg-background text-left font-manrope text-sm transition-colors hover:bg-[#C5A059]/10",
                  !deliveryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon size={16} className="text-[#C5A059]" />
                {deliveryDate ? format(deliveryDate, "EEEE, MMMM d, yyyy") : "Select delivery date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background z-50 rounded-none border-[#C5A059]" align="start">
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={setDeliveryDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Summary line */}
        {inscriptionText && (
          <div className="bg-secondary/50 px-5 py-3.5 rounded-none border-[1px] border-[#C5A059]/30 max-w-xl mx-auto">
            <p className="font-manrope text-xs text-muted-foreground">
              Inscription: <span className="text-foreground font-semibold">"{inscriptionText}"</span>
            </p>
          </div>
        )}

        {/* Add to Cart */}
        <div className="max-w-xl mx-auto sticky bottom-0 bg-sl-sage/95 backdrop-blur-sm py-4 md:relative md:bg-transparent md:backdrop-blur-none md:py-0">
          <button className="w-full py-4 rounded-none border-[1px] border-[#C5A059] bg-transparent hover:bg-[#C5A059] text-[#C5A059] hover:text-white font-manrope font-semibold text-sm tracking-[0.2em] uppercase transition-colors">
            Add to Cart — ${currentPrice}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CakeConfigurator;
