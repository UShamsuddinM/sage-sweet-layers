import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";

const cakesMegaMenu = {
  "By Time": ["Same Day", "Next Day", "2-3 Days", "Weekly Specials"],
  "By Occasion": ["Birthday", "Wedding", "Anniversary", "Baby Shower", "Corporate Gifting"],
  "By Style": ["Classic", "Modern", "Minimalist", "Floral", "Custom"],
};

const sweetsGrid = [
  { name: "Cookies" },
  { name: "Baklava" },
  { name: "Brownies" },
  { name: "Macarons" },
  { name: "Truffles" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [cakesOpen, setCakesOpen] = useState(false);
  const [sweetsOpen, setSweetsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cakesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sweetsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCakes = useCallback(() => {
    if (sweetsTimeout.current) clearTimeout(sweetsTimeout.current);
    if (cakesTimeout.current) clearTimeout(cakesTimeout.current);
    setSweetsOpen(false);
    setCakesOpen(true);
  }, []);

  const closeCakes = useCallback(() => {
    cakesTimeout.current = setTimeout(() => setCakesOpen(false), 150);
  }, []);

  const keepCakes = useCallback(() => {
    if (cakesTimeout.current) clearTimeout(cakesTimeout.current);
  }, []);

  const openSweets = useCallback(() => {
    if (cakesTimeout.current) clearTimeout(cakesTimeout.current);
    if (sweetsTimeout.current) clearTimeout(sweetsTimeout.current);
    setCakesOpen(false);
    setSweetsOpen(true);
  }, []);

  const closeSweets = useCallback(() => {
    sweetsTimeout.current = setTimeout(() => setSweetsOpen(false), 150);
  }, []);

  const keepSweets = useCallback(() => {
    if (sweetsTimeout.current) clearTimeout(sweetsTimeout.current);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-sl-emerald text-sl-cream text-center py-2 text-xs tracking-[0.2em] font-manrope uppercase">
        Handcrafted to order · 1 day notice for sweets · 3 days for cakes · 2 weeks for wedding cakes
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-sl-cream border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              className="text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground hover:text-primary transition-colors"
              onMouseEnter={openCakes}
              onMouseLeave={closeCakes}
            >
              Cakes
            </button>
            <button
              className="text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground hover:text-primary transition-colors"
              onMouseEnter={openSweets}
              onMouseLeave={closeSweets}
            >
              Sweets
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2 font-cormorant text-2xl md:text-3xl font-bold tracking-widest text-primary">
            SWEET LAYERS
          </a>

          {/* Right Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/custom")}
              className="text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground hover:text-primary transition-colors"
            >
              Custom
            </button>
          </div>
        </div>

        {/* ─── CAKES MEGA MENU ─── */}
        <div
          className={`absolute left-0 right-0 bg-sl-sage border-b border-sl-gold/20 shadow-lg z-50 transition-all duration-200 ease-out origin-top ${
            cakesOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={keepCakes}
          onMouseLeave={closeCakes}
        >
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-3 gap-16">
            {Object.entries(cakesMegaMenu).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm font-manrope text-foreground/80 hover:text-primary transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#" className="text-sm font-manrope text-primary hover:text-primary/80 transition-colors">
                      See all
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SWEETS VISUAL MENU ─── */}
        <div
          className={`absolute left-0 right-0 bg-sl-cream border-b border-sl-gold/20 shadow-lg z-50 transition-all duration-200 ease-out origin-top ${
            sweetsOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={keepSweets}
          onMouseLeave={closeSweets}
        >
          <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-5 gap-8">
            {sweetsGrid.map((sweet) => (
              <a href="#" key={sweet.name} className="flex flex-col items-center gap-3 group">
                <div className="w-full aspect-square rounded-none bg-sl-sage border border-sl-gold/30 group-hover:border-sl-gold transition-colors" />
                <span className="text-[11px] font-manrope font-semibold tracking-[0.15em] uppercase text-sl-gold">
                  {sweet.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-sl-cream border-b border-border px-6 py-6 space-y-4 z-50">
            <button onClick={() => { setMobileOpen(false); navigate("/product/demo-cake"); }} className="block text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground">Cakes</button>
            <a href="#" className="block text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground">Sweets</a>
            <button onClick={() => { setMobileOpen(false); navigate("/custom"); }} className="block text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground">Custom</button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
