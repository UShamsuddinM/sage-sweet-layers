import { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, subtotal } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-[70] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-[80] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-sl-sage px-6 py-5 flex items-center justify-between flex-shrink-0">
          <h2 className="font-cormorant text-xl tracking-wide text-foreground">
            Your Selection
          </h2>
          <button onClick={closeCart} className="text-foreground hover:text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-sl-cream px-6 py-6 noise-texture">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="font-cormorant text-xl text-foreground/50 italic">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-sl-gold/20 pb-6">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 flex-shrink-0 bg-sl-sage border border-sl-gold/20 rounded-none overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-manrope text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="font-manrope text-[11px] text-foreground/60 mt-0.5">
                      {item.size} · {item.flavor}
                    </p>
                    {item.inscription && (
                      <p className="font-manrope text-[10px] text-foreground/40 italic mt-0.5">
                        "{item.inscription}"
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-manrope text-sm font-medium text-foreground">
                        ${item.price}.00
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="font-manrope text-[11px] text-sl-gold hover:text-primary transition-colors tracking-wide"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-white px-6 py-5 border-t border-sl-gold/20 flex-shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-manrope text-xs uppercase tracking-[0.15em] text-foreground/60">
                Subtotal
              </span>
              <span className="font-manrope text-base font-semibold text-foreground">
                ${subtotal}.00
              </span>
            </div>
            <button className="w-full py-3.5 rounded-none bg-sl-emerald text-sl-gold font-manrope font-bold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-foreground">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
