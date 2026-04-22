import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sl-sage py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-cormorant text-2xl font-bold text-primary mb-4 tracking-widest">SWEET LAYERS</h3>
            <p className="font-manrope text-xs text-muted-foreground leading-relaxed">
              Artisan cakes & sweets made with love in the Bay Area, CA.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-manrope font-semibold text-xs uppercase tracking-[0.15em] text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              {["Cakes", "Sweets", "Custom Orders", "Gift Cards"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-manrope text-xs text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-manrope font-semibold text-xs uppercase tracking-[0.15em] text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              {["Our Story", "Ingredients", "Press", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-manrope text-xs text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-manrope font-semibold text-xs uppercase tracking-[0.15em] text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><span className="font-manrope text-xs text-muted-foreground">sweetlayersorder@gmail.com</span></li>
              <li>
                <div className="flex gap-3 mt-2">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="font-manrope text-[11px] text-muted-foreground">© 2025 Sweet Layers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
