import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, Menu } from "lucide-react";

const cakesMegaMenu = {
  "By Time": ["Same Day", "Next Day", "2-3 Days", "Weekly Specials"],
  "By Occasion": ["Birthday", "Wedding", "Anniversary", "Baby Shower", "Graduation"],
  "By Style": ["Classic", "Modern", "Minimalist", "Floral", "Custom"],
};

const sweetsGrid = [
  { name: "Cookies", emoji: "🍪" },
  { name: "Baklava", emoji: "🧁" },
  { name: "Brownies", emoji: "🍫" },
  { name: "Macarons", emoji: "🎀" },
  { name: "Truffles", emoji: "🍬" },
  { name: "Cupcakes", emoji: "🧁" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [cakesOpen, setCakesOpen] = useState(false);
  const [sweetsOpen, setSweetsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setCakesOpen(false);
    setSweetsOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-sl-emerald text-sl-cream text-center py-2 text-xs tracking-[0.2em] font-manrope uppercase">
        Free delivery on orders over $75 · Same-day pickup available
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-sl-cream border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              className="text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground hover:text-primary transition-colors"
              onClick={() => { closeAll(); navigate("/product/demo-cake"); }}
            >
              Cakes
            </button>
            <button
              className="text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground hover:text-primary transition-colors"
              onClick={() => { setCakesOpen(false); setSweetsOpen(!sweetsOpen); }}
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
            <a href="#custom" className="text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground hover:text-primary transition-colors">
              Custom
            </a>
            <button className="text-foreground hover:text-primary transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-manrope">0</span>
            </button>
          </div>

          {/* Mobile cart */}
          <button className="md:hidden text-foreground hover:text-primary transition-colors relative">
            <ShoppingBag size={20} />
          </button>
        </div>

        {/* Cakes Mega Menu */}
        {cakesOpen && (
          <div className="absolute left-0 right-0 bg-sl-cream border-b border-border shadow-lg z-50" onMouseLeave={closeAll}>
            <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-12">
              {Object.entries(cakesMegaMenu).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-cormorant text-lg text-foreground mb-4 tracking-wide">{category}</h4>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item}>
                        <a href="#" className="text-xs font-manrope text-muted-foreground hover:text-primary transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sweets Visual Grid */}
        {sweetsOpen && (
          <div className="absolute left-0 right-0 bg-sl-cream border-b border-border shadow-lg z-50" onMouseLeave={closeAll}>
            <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 md:grid-cols-6 gap-6">
              {sweetsGrid.map((sweet) => (
                <a href="#" key={sweet.name} className="flex flex-col items-center gap-2 group">
                  <div className="w-20 h-20 rounded-none bg-secondary flex items-center justify-center text-3xl group-hover:ring-2 group-hover:ring-primary transition-all">
                    {sweet.emoji}
                  </div>
                  <span className="text-xs font-manrope font-medium text-foreground tracking-wide uppercase">{sweet.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-sl-cream border-b border-border px-6 py-6 space-y-4 z-50">
            <button onClick={() => { setMobileOpen(false); navigate("/product/demo-cake"); }} className="block text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground">Cakes</button>
            <a href="#" className="block text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground">Sweets</a>
            <a href="#custom" className="block text-xs tracking-[0.15em] uppercase font-manrope font-semibold text-foreground">Custom</a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
