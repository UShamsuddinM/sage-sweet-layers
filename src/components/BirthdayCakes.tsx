import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const BirthdayCakes = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(4)
      .then((p) => { setProducts(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-sl-cream cream-grain py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            Celebration Classics
          </p>
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-foreground tracking-wide">
            Birthday Cakes
          </h2>
          <p className="text-sm font-manrope text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            The centerpiece of your celebration.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center font-manrope text-muted-foreground py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => {
              const p = product.node;
              const imgUrl = p.images.edges[0]?.node?.url;
              const price = parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2);
              return (
                <button
                  onClick={() => navigate(`/product/${p.handle}`)}
                  key={p.id}
                  className="group text-left cursor-pointer"
                >
                  <div className="aspect-[3/4] rounded-none mb-4 overflow-hidden group-hover:shadow-lg transition-shadow border border-primary/20">
                    {imgUrl ? (
                      <img src={imgUrl} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full shimmer-placeholder" />
                    )}
                  </div>
                  <h3 className="font-cormorant text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors tracking-wide">
                    {p.title}
                  </h3>
                  <p className="text-xs font-manrope text-muted-foreground mt-1">From ${price}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BirthdayCakes;
