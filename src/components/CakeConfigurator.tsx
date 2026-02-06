import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id title description handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 5) { edges { node { url altText } } }
      variants(first: 10) {
        edges {
          node {
            id title
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

const CakeConfigurator = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState("0");
  const [deliveryDate, setDeliveryDate] = useState<Date>();

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then(data => {
        const p = data?.data?.productByHandle;
        if (p) setProduct({ node: p });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [handle]);

  const variants = product?.node.variants.edges ?? [];
  const selectedVariant = variants[Number(selectedVariantIdx)]?.node;
  const currentPrice = useMemo(
    () => selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : "0.00",
    [selectedVariant]
  );
  const afterpayPrice = useMemo(() => (parseFloat(currentPrice) / 4).toFixed(2), [currentPrice]);
  const imgUrl = product?.node.images.edges[0]?.node?.url;
  const hasMultipleVariants = variants.length > 1;

  if (loading) {
    return (
      <section className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </section>
    );
  }

  if (!product) {
    return (
      <section className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <p className="font-cormorant text-xl text-foreground/50">Product not found.</p>
      </section>
    );
  }

  const p = product.node;

  const handleAddToCart = async () => {
    if (!selectedVariant || !product) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  return (
    <section className="min-h-screen pt-28 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Breadcrumb */}
        <nav className="font-manrope text-xs text-muted-foreground mb-10 tracking-wide">
          <a href="/" className="underline hover:text-foreground transition-colors">Home</a>
          <span className="mx-2">/</span>
          <span className="underline">Products</span>
          <span className="mx-2">/</span>
          <span>{p.title}</span>
        </nav>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT COL: Controls */}
          <div className="order-2 lg:order-1 lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <h1 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
                {p.title}
              </h1>
              <p className="font-manrope text-[11px] text-muted-foreground tracking-wide">
                (minimum 7 days' notice)
              </p>
              <p className="font-manrope text-[11px] text-muted-foreground">
                Make 4 interest-free payments of <span className="font-semibold text-foreground">${afterpayPrice}</span> with Afterpay
              </p>
              <p className="font-manrope text-base font-medium text-foreground">
                ${currentPrice}
              </p>
            </div>

            {/* Variant selector */}
            {hasMultipleVariants && (
              <div className="space-y-2">
                <label className="font-manrope text-xs text-foreground tracking-wide">
                  {p.options[0]?.name || "Option"}
                </label>
                <Select value={selectedVariantIdx} onValueChange={setSelectedVariantIdx}>
                  <SelectTrigger className="rounded-none border-[1px] border-[#C5A059]/50 bg-transparent font-manrope text-sm h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-[#C5A059]/50 bg-background">
                    {variants.map((v, i) => (
                      <SelectItem key={v.node.id} value={String(i)} className="font-manrope text-sm">
                        {v.node.title} — ${parseFloat(v.node.price.amount).toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Picker */}
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
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant}
              className="w-full py-3.5 rounded-none bg-foreground text-background font-manrope font-semibold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[#C5A059] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              Add to Cart — ${currentPrice}
            </button>
          </div>

          {/* CENTER COL: Image */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex items-start justify-center px-0 lg:px-8">
            {imgUrl ? (
              <img src={imgUrl} alt={p.title} className="w-full aspect-square object-cover border border-[#C5A059]/20" />
            ) : (
              <div className="w-full aspect-square border border-[#C5A059]/20 shimmer-placeholder" />
            )}
          </div>

          {/* RIGHT COL: Story */}
          <div className="order-3 lg:col-span-3 space-y-6 pt-2">
            <p className="font-manrope text-sm text-foreground leading-relaxed">
              {p.description}
            </p>
            <p className="font-manrope text-xs text-muted-foreground">
              // Check out our{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">size guide</a>.
            </p>
            <p className="font-manrope text-xs text-muted-foreground">
              // Check out our{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">flavor guide</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeConfigurator;
