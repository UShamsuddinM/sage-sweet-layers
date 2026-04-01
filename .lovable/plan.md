

# Update Shopify Store Credentials & Seed Products

## Summary

Your new Shopify store (`iyeyb5-2r.myshopify.com`) is connected but has **0 products**. I need to update the hardcoded credentials in the code and re-create your 5 signature products.

## Step 1: Update `src/lib/shopify.ts`

Replace the old store domain and token:
- `SHOPIFY_STORE_PERMANENT_DOMAIN` → `iyeyb5-2r.myshopify.com`
- `SHOPIFY_STOREFRONT_TOKEN` → `7d48519551ae0faa72f19556b0c11acf`

## Step 2: Re-create Products in New Store

Create all 5 products with size variants (6-inch, 8-inch, Two-Tier):

1. **The Minimalist** — $65.00 — "A modern classic. Clean lines, refined flavors, and a quiet elegance."
2. **Midnight Chocolate** — $65.00 — "Rich, dark, and decadent."
3. **Vanilla Cloud** — $60.00 — "Light, airy, and pure. A tender vanilla bean sponge with a silky crumb."
4. **Rose & Pistachio** — $72.00 — "A fragrant journey of floral notes and nutty crunch."
5. **Lemon Elderflower** — $68.00 — "Bright, zesty, and refreshing."

## Step 3: Verify

Confirm the homepage product grid and PDP fetch from the new store correctly.

