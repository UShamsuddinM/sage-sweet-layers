import { MapPin, Clock } from "lucide-react";

const VisitShop = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Info card offset */}
          <div className="bg-background rounded-none shadow-lg p-10 md:p-14 relative z-10 md:mr-[-4rem] order-2 md:order-1">
            <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Come Say Hello</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-wide">Visit Our Shop</h2>
            <p className="font-manrope text-sm text-muted-foreground leading-relaxed mb-8">
              Step into our bakery and experience the aroma of freshly baked cakes and pastries. Our team is ready to help you find the perfect treat.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <p className="font-manrope text-xs text-foreground">18020 Broadwell St<br />Lathrop, CA</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-primary mt-0.5 shrink-0" />
                <p className="font-manrope text-xs text-foreground">Mon – Fri: 9am – 6pm<br />Sat – Sun: 10am – 7pm</p>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="aspect-[4/3] rounded-none bg-gradient-to-br from-[hsl(40,30%,75%)] to-[hsl(152,15%,60%)] flex items-center justify-center order-1 md:order-2">
            <span className="font-cormorant text-xl text-primary-foreground/30 italic">Shop Photo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitShop;
