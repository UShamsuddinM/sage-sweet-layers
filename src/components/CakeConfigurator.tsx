import { useState, useMemo } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRODUCT_DATA = {
  name: "The Minimalist",
  basePrice: 65,
  leadTime: "(minimum 7 days' notice)",
  description:
    "A modern classic. Clean lines, refined flavors, and a quiet elegance that speaks for itself. This is our love letter to simplicity — proof that restraint is the ultimate form of sophistication.",
  whatAndWhy:
    "Three layers of hand-torched Italian meringue buttercream over a pillowy sponge, finished with a single pressed flower. Because sometimes, less really is everything.",
  availability:
    "Available for pickup or delivery. We recommend placing orders early as this design sells out quickly.",
  sizes: [
    { label: "6-inch (12 serv)", price: 65 },
    { label: "8-inch (24 serv)", price: 95 },
    { label: "Two-Tier (45 serv)", price: 185 },
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
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("0");
  const [selectedFlavor, setSelectedFlavor] = useState(PRODUCT_DATA.flavors[0]);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [inscriptionMode, setInscriptionMode] = useState<InscriptionMode>("none");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [customText, setCustomText] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date>();

  const currentPrice = useMemo(() => PRODUCT_DATA.sizes[Number(selectedSize)].price, [selectedSize]);
  const afterpayPrice = useMemo(() => (currentPrice / 4).toFixed(2), [currentPrice]);

  return (
    <section className="min-h-screen pt-28 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Breadcrumb */}
        <nav className="font-manrope text-xs text-muted-foreground mb-10 tracking-wide">
          <a href="/" className="underline hover:text-foreground transition-colors">Home</a>
          <span className="mx-2">/</span>
          <span className="underline">Products</span>
          <span className="mx-2">/</span>
          <span>{PRODUCT_DATA.name}</span>
        </nav>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT COL (Span 3): Controls */}
          <div className="order-2 lg:order-1 lg:col-span-3 space-y-6">

            {/* Title & Price */}
            <div className="space-y-2">
              <h1 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
                {PRODUCT_DATA.name}
              </h1>
              <p className="font-manrope text-[11px] text-muted-foreground tracking-wide">
                {PRODUCT_DATA.leadTime}
              </p>
              <p className="font-manrope text-[11px] text-muted-foreground">
                Make 4 interest-free payments of <span className="font-semibold text-foreground">${afterpayPrice}</span> with Afterpay
              </p>
              <p className="font-manrope text-base font-medium text-foreground">
                ${currentPrice}.00
              </p>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="font-manrope text-xs text-foreground tracking-wide">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="rounded-none border-[1px] border-[#C5A059]/50 bg-transparent font-manrope text-sm h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[#C5A059]/50 bg-background">
                  {PRODUCT_DATA.sizes.map((s, i) => (
                    <SelectItem key={s.label} value={String(i)} className="font-manrope text-sm">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Flavor */}
            <div className="space-y-2">
              <label className="font-manrope text-xs text-foreground tracking-wide">Flavor</label>
              <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                <SelectTrigger className="rounded-none border-[1px] border-[#C5A059]/50 bg-transparent font-manrope text-sm h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[#C5A059]/50 bg-background">
                  {PRODUCT_DATA.flavors.map((f) => (
                    <SelectItem key={f} value={f} className="font-manrope text-sm">
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Inscription */}
            <div className="space-y-2">
              <label className="font-manrope text-xs text-foreground tracking-wide">Script</label>
              <Select
                value={inscriptionMode}
                onValueChange={(v: InscriptionMode) => {
                  setInscriptionMode(v);
                  if (v === "none") { setSelectedPreset(""); setCustomText(""); }
                }}
              >
                <SelectTrigger className="rounded-none border-[1px] border-[#C5A059]/50 bg-transparent font-manrope text-sm h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[#C5A059]/50 bg-background">
                  <SelectItem value="none" className="font-manrope text-sm">None</SelectItem>
                  <SelectItem value="standard" className="font-manrope text-sm">Standard Message</SelectItem>
                  <SelectItem value="custom" className="font-manrope text-sm">Custom (30 chars)</SelectItem>
                </SelectContent>
              </Select>

              {inscriptionMode === "standard" && (
                <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                   <SelectTrigger className="rounded-none border-[1px] border-[#C5A059]/50 bg-transparent font-manrope text-sm h-11">
                    <SelectValue placeholder="Choose message..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-[#C5A059]/50 bg-background">
                    {PRODUCT_DATA.presetInscriptions.map((text) => (
                      <SelectItem key={text} value={text} className="font-manrope text-sm">
                        {text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {inscriptionMode === "custom" && (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.slice(0, 30))}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2.5 rounded-none border-[1px] border-[#C5A059]/50 bg-transparent text-sm font-manrope text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                  <p className="text-[10px] font-manrope text-muted-foreground">
                    {customText.length}/30
                  </p>
                </div>
              )}
            </div>

            {/* Color Palette */}
            <div className="space-y-2">
              <label className="font-manrope text-xs text-foreground tracking-wide">Cake Type</label>
              <div className="flex gap-2">
                {PRODUCT_DATA.palettes.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPalette(i)}
                    className={cn(
                      "px-5 py-2.5 rounded-none border-[1px] border-[#C5A059]/50 font-manrope text-xs transition-colors",
                      selectedPalette === i
                        ? "bg-[#C5A059] text-white border-[#C5A059]"
                        : "bg-transparent text-foreground hover:bg-[#C5A059]/10"
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker - moved from Right Column */}
            <div className="space-y-2">
              <label className="font-manrope text-xs text-foreground tracking-wide">Get it by</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-2 w-full px-4 py-2.5 rounded-none border-[1px] border-[#C5A059]/50 bg-transparent text-left font-manrope text-sm transition-colors hover:bg-[#C5A059]/10",
                      !deliveryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon size={14} className="text-[#C5A059]" />
                    {deliveryDate ? format(deliveryDate, "MMM d, yyyy") : "Select date"}
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

            {/* Add to Cart */}
            <button
              onClick={() => {
                const sizeData = PRODUCT_DATA.sizes[Number(selectedSize)];
                const inscription = inscriptionMode === "standard" ? selectedPreset : inscriptionMode === "custom" ? customText : undefined;
                addItem({
                  id: `${Date.now()}`,
                  name: PRODUCT_DATA.name,
                  size: sizeData.label,
                  flavor: selectedFlavor,
                  price: sizeData.price,
                  image: "/placeholder.svg",
                  inscription,
                });
              }}
              className="w-full py-3.5 rounded-none bg-foreground text-background font-manrope font-semibold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[#C5A059]"
            >
              Add to Cart — ${currentPrice}.00
            </button>
          </div>

          {/* CENTER COL (Span 6): The Stage */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex items-start justify-center px-0 lg:px-8">
            <img
              src="/placeholder.svg"
              alt="The Minimalist cake"
              className="w-full aspect-square object-cover border border-[#C5A059]/20 shimmer-placeholder"
            />
          </div>

          {/* RIGHT COL (Span 3): The Story */}
          <div className="order-3 lg:col-span-3 space-y-6 pt-2">
            <p className="font-manrope text-sm text-foreground leading-relaxed">
              {PRODUCT_DATA.description}
            </p>
            <p className="font-manrope text-sm text-muted-foreground leading-relaxed italic">
              {PRODUCT_DATA.whatAndWhy}
            </p>
            <p className="font-manrope text-sm text-muted-foreground leading-relaxed">
              {PRODUCT_DATA.availability}
            </p>

            <p className="font-manrope text-xs text-muted-foreground">
              // Check out our{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">
                size guide
              </a>.
            </p>
            <p className="font-manrope text-xs text-muted-foreground">
              // Check out our{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">
                flavor guide
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeConfigurator;
