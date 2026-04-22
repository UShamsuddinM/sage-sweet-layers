

# Redirect All Purchase CTAs to Cash App

## Goal

Make every shopping/ordering/cart/checkout button on the site link to **`https://cash.app/$sweetlayersus`** and open in a **new tab** (`target="_blank"`, `rel="noopener noreferrer"`). Pure-navigation buttons (mega-menu links, "Custom" inquiry, hamburger menu) are left alone since they are not purchase CTAs.

## Buttons to Redirect

| # | File | Element | Current behavior |
|---|------|---------|------------------|
| 1 | `src/components/Hero.tsx` | "Explore Our Cakes" anchor | Scrolls to `#featured` |
| 2 | `src/components/CakeFinder.tsx` | "Find Your Cake" button | Navigates to `/product/demo-cake` |
| 3 | `src/components/ValentineSweets.tsx` | "Shop the Collection" Link | Goes to `/` |
| 4 | `src/components/Personalize.tsx` | "Shop Now" anchor | `href="#"` |
| 5 | `src/components/WeddingBanner.tsx` | "Inquire Now" button | Navigates to `/custom` *(included since it is a purchase/order intent CTA — confirm if you'd rather keep it on the custom form)* |
| 6 | `src/components/FeaturedCakes.tsx` | Each product card click | Navigates to `/product/{handle}` |
| 7 | `src/components/CakeConfigurator.tsx` (PDP) | "Add to Cart — $X" | Adds to Shopify cart |
| 8 | `src/components/CartDrawer.tsx` | "Checkout" button | Opens Shopify checkout URL |

## Implementation Pattern

Replace each handler with an external link that opens Cash App in a new tab. Examples:

**Anchor / Link CTAs** (Hero, Personalize, ValentineSweets):
```tsx
<a
  href="https://cash.app/$sweetlayersus"
  target="_blank"
  rel="noopener noreferrer"
  className="...existing classes..."
>
  Explore Our Cakes
</a>
```

**Button CTAs** (CakeFinder, WeddingBanner, Add to Cart, Checkout):
```tsx
<button
  onClick={() => window.open("https://cash.app/$sweetlayersus", "_blank", "noopener,noreferrer")}
  className="...existing classes..."
>
  Find Your Cake
</button>
```

**FeaturedCakes product cards:** replace the `navigate(...)` `onClick` on each card with the same `window.open(...)` call so clicking any product also routes to Cash App.

**CartDrawer Checkout:** replace the `handleCheckout` body with `window.open("https://cash.app/$sweetlayersus", "_blank", "noopener,noreferrer"); closeCart();` (keeps the drawer-close behavior). The `getCheckoutUrl`/`syncCart` Shopify wiring stays in place but is no longer triggered by the button.

**CakeConfigurator Add to Cart:** replace `handleAddToCart` with the `window.open(...)` call. Keep the existing button label/styling. Disabled state and loader can be removed since there's no async work.

## What Stays Unchanged

- Navbar links (Cakes, Sweets, Custom), mobile menu, mega-menu items — these are navigation, not purchase actions.
- Cart icon (still opens the drawer; only the Checkout button inside redirects).
- The Shopify integration code (`src/lib/shopify.ts`, cart store, product fetches) — left intact in case you re-enable it later. Product grid and PDP still display Shopify data; only the purchase action changes.
- Footer text-only links (placeholder `#` anchors).

## Notes / Decision Point

- **WeddingBanner "Inquire Now"** currently sends users to a custom-order form (`/custom`). Your request says "any other order or shop buttons," which is ambiguous for an inquiry CTA. Default in this plan: redirect it to Cash App. If you'd prefer to keep it pointing at `/custom`, say so and I'll exclude it.

