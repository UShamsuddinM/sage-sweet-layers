

# Sweet Layers 2.0 — Phase 1: Home Page Implementation

## What We're Building
The complete Sweet Layers 2.0 home page with all 8 sections, using the "Sage & Gold Luxury" visual identity and alternating sage/cream block strategy.

---

## Section 1: Sticky Split Navigation
- Top announcement bar (emerald `#2C3E36` background, cream text)
- Center-aligned "SWEET LAYERS" logo in gold Playfair Display
- Left: "CAKES" link (opens Mega-Matrix dropdown with 3 columns: By Time / By Occasion / By Style) and "SWEETS" link (opens visual pop-up grid with Cookies, Baklava, etc.)
- Right: "CUSTOM" link and Cart icon
- Sticky on scroll with clean sage/cream background
- Dropdowns have solid backgrounds (not transparent), high z-index

## Section 2: Hero Section (Sage Block — `#E8F3EE`)
- Full-width sage background, 50/50 split on desktop
- Left: Large Playfair heading "We bake time, so you don't have to." + subtitle + gold CTA button
- Right: Tall placeholder image area styled with jade marble tones
- **Cake Finder Widget** — horizontal bar overlapping the hero bottom edge (negative margin/absolute positioning) with: Date picker, Pickup/Delivery toggle, Flavor selector, and gold "Find Your Cake" button

## Section 3: Featured Collection (Cream Block — `#FDFCF8`)
- "Signature Cakes" Playfair heading
- Horizontal scrollable row of 4 product cards with placeholder images, cake names, and "From $XX" prices
- Clean card styling, gold hover accents

## Section 4: Shop by Occasion (Sage Block — `#E8F3EE`)
- "Shop by Occasion" Playfair heading
- Asymmetric grid: 2 large tiles (Birthdays, Weddings) + 2 smaller tiles (Casual, Kids)
- Placeholder colored divs with white text overlay labels

## Section 5: Personalize Your Design (Cream Block — `#FDFCF8`)
- Offset layout: text card overlapping a large image placeholder
- Playfair heading + description + "SHOP NOW" underlined gold link

## Section 6: Customer Reviews (Sage Block — `#E8F3EE`)
- "Customer Reviews" Playfair heading
- Three testimonial cards with large gold quotation marks, review text, reviewer name

## Section 7: Visit Our Shop (Cream Block — `#FDFCF8`)
- Offset layout with location info card overlapping a shop photo placeholder
- Address, hours, description text

## Section 8: Footer (Sage Block — `#E8F3EE`)
- Multi-column layout: Shop links, About, Contact
- Social media icons, copyright line
- Gold accent hover states

## Technical Approach
- Google Fonts: Playfair Display + Manrope loaded in `index.html`
- All mock data hardcoded (no backend)
- Responsive: stacked layouts on mobile
- Custom color variables added to Tailwind config
- Components organized under `src/components/` (Navbar, Hero, CakeFinder, FeaturedCakes, ShopByOccasion, Personalize, Reviews, VisitShop, Footer)

