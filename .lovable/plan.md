

# Wedding Concierge AI Chatbot

## What We're Building

An AI-powered "Wedding Concierge" chatbot embedded directly into the Custom Inquiry page (`/custom`). Instead of filling out a long form and waiting for a callback, customers can have an interactive conversation with an AI assistant that helps them:

- Choose cake flavors and designs from your catalog
- Build a full wedding sweets catering package (macarons, cookies, baklava to match)
- Get instant pricing estimates based on guest count
- Generate a complete wedding order summary they can submit or add to cart

## How It Works

The chatbot appears as a luxury panel alongside (or replacing) the current inquiry form. The AI knows your full product catalog -- cakes, sweets, flavors, designs, and pricing -- and guides the customer through building their dream wedding package conversationally.

```text
+----------------------------------------------------+
|  /custom Page                                       |
|                                                     |
|  +-------------------+  +------------------------+ |
|  |                   |  |  INQUIRY FORM (top)     | |
|  |  LEFT PANEL       |  |  Contact + Event fields | |
|  |  (visual/sticky)  |  |                         | |
|  |                   |  +------------------------+ |
|  |  "Let's create    |  |  WEDDING CONCIERGE     | |
|  |   something       |  |  AI CHAT (below form)  | |
|  |   unforgettable"  |  |                         | |
|  |                   |  |  [AI messages + user    | |
|  |                   |  |   selections appear     | |
|  |                   |  |   here in a scrollable  | |
|  |                   |  |   chat window]          | |
|  |                   |  |                         | |
|  |                   |  |  [Type your message...] | |
|  +-------------------+  +------------------------+ |
+----------------------------------------------------+
```

## The AI Personality

The concierge is trained as a luxury wedding cake consultant with knowledge of:
- All Sweet Layers cake flavors (vanilla bean, midnight chocolate, rose pistachio, lemon elderflower, etc.)
- Design styles (modern tier, classic white, naked/rustic Jubilee line)
- Complementary sweets packages (custom macarons, cookies, baklava, truffles)
- Pricing by guest count and tier complexity
- Delivery logistics and lead times

## Technical Architecture

### Backend: Supabase Edge Function

A new `wedding-concierge` edge function will use **Lovable AI** (Gemini Flash) with a detailed system prompt containing your full product catalog and pricing. This keeps all product knowledge and prompt logic server-side.

### Frontend: Streaming Chat Component

A new `WeddingConcierge.tsx` component with:
- Sage-and-gold styled chat bubbles (matching your design system)
- Real-time token streaming for a responsive feel
- Markdown rendering for formatted responses (flavor lists, pricing tables)
- A persistent message history within the session

### Integration into Custom Page

The chat panel will be added below the existing inquiry form on the right side of the `/custom` page. Customers fill in their basic contact/event info first, then use the AI concierge to design their package.

## Implementation Steps

1. **Enable Lovable Cloud** (required for edge functions)
2. **Create `supabase/functions/wedding-concierge/index.ts`** -- Edge function with:
   - A rich system prompt defining the AI as a luxury wedding cake consultant
   - Full product catalog embedded (flavors, designs, sweets, prices)
   - Streaming SSE response using Lovable AI gateway
   - Rate limit (429) and payment (402) error handling
3. **Create `src/components/WeddingConcierge.tsx`** -- Chat UI with:
   - Sage header bar with gold "Wedding Concierge" title
   - Scrollable message area with cream background + noise texture
   - User messages (right-aligned, sage bubble) and AI messages (left-aligned, cream bubble)
   - Sharp-cornered input bar with gold border and send button
   - Loading indicator while AI is responding
   - Markdown rendering via `react-markdown` (new dependency)
4. **Update `src/pages/CustomPage.tsx`** -- Add the concierge chat section below the inquiry form
5. **Update `supabase/config.toml`** -- Register the new edge function

## Visual Design (Jade and Gold)

- Chat container: `bg-sl-cream` with `cream-grain` texture, `border border-sl-gold/30`
- AI bubbles: `bg-white border border-sl-gold/20` with Manrope body text
- User bubbles: `bg-sl-sage` with deep emerald text
- Input field: Sharp corners (`rounded-none`), gold border on focus
- Send button: `bg-sl-emerald text-sl-gold` with uppercase tracking
- Header: `bg-sl-sage` with Cormorant Garamond title

