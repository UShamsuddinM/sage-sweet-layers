import { useState, useEffect } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const FeaturedCakes = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(8).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <section id="featured" className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="pt-12 md:pt-16" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Our Collection</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">Birthday Cakes</h2>
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
                <a
                  href="https://cash.app/$sweetlayersus"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={p.id}
                  className="group text-left cursor-pointer block"
                >
                  <div className="aspect-[3/4] rounded-none mb-4 overflow-hidden group-hover:shadow-lg transition-shadow border border-sl-gold/20">
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
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCakes;
