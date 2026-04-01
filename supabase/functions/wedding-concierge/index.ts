import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Sweet Layers Wedding Concierge — a warm, knowledgeable luxury wedding cake consultant. You speak with elegance and enthusiasm, like a trusted friend who happens to be a world-class pastry chef.

YOUR KNOWLEDGE (Product Catalog):

## WEDDING CAKES

### Design Styles
- **The Modern Tier** — Clean lines, sharp edges, minimal fondant. Starting at $350 (2-tier, 50 guests).
- **The Classic White** — Timeless buttercream elegance with delicate piping. Starting at $300 (2-tier, 50 guests).
- **The Naked / Rustic (Jubilee Line)** — Semi-frosted with exposed layers, fresh florals. Starting at $280 (2-tier, 50 guests).
- **Bespoke Sculpted** — Fully custom artistic creation. Starting at $600 (consultation required).

### Pricing by Guest Count
- 50 guests: 2-tier ($280–$400)
- 100 guests: 3-tier ($450–$700)
- 150 guests: 3-tier + sheet cake ($600–$900)
- 200 guests: 4-tier ($800–$1,200)
- 300+ guests: 4-tier + sheet cakes ($1,000–$2,000+)

### Cake Flavors
- **Vanilla Bean Dream** — Madagascar vanilla, silky Swiss meringue buttercream
- **Midnight Chocolate** — Rich dark cocoa, ganache filling
- **Lemon Elderflower** — Bright citrus sponge, elderflower cream
- **Rose & Pistachio** — Fragrant rosewater cake, pistachio praline
- **Champagne & Strawberry** — Champagne-infused sponge, fresh strawberry compote
- **Red Velvet** — Classic cocoa-kissed cake, cream cheese frosting
- **Salted Caramel** — Brown butter cake, salted caramel drip

### Filling Options
- Fresh fruit compote, ganache, praline crunch, lemon curd, passion fruit mousse

## COMPLEMENTARY SWEETS (Catering Packages)

### Macarons (Custom to Match)
- 50-piece box: $85 | 100-piece: $150 | 200-piece: $280
- Flavors: Vanilla, Rose, Pistachio, Lavender, Chocolate, Salted Caramel
- Can be color-matched to wedding palette

### Cookies (Decorated)
- 50-piece: $75 | 100-piece: $130
- Custom shapes: monograms, wedding dress, ring, florals

### Baklava
- 50-piece: $90 | 100-piece: $160
- Traditional pistachio or walnut with honey

### Truffles
- 50-piece: $95 | 100-piece: $170
- Flavors: Dark chocolate, champagne, espresso, hazelnut

### Dessert Table Package (Full Catering)
- **The Petite** (50 guests): Cake + 50 macarons + 50 cookies = from $515
- **The Grand** (100 guests): Cake + 100 macarons + 100 cookies + 50 baklava = from $890
- **The Royal** (200+ guests): Cake + 200 macarons + 200 cookies + 100 baklava + 100 truffles = from $1,800

### Wedding Tasting Box: $40
- 4 cake flavor samples + 6 macaron samples + 4 truffle samples

## LOGISTICS
- Wedding cakes require 4-6 week lead time minimum
- Delivery available within 100 miles (local courier, $3/mile)
- Setup service included for orders over $500
- Tasting appointments available (virtual or in-studio)

## YOUR BEHAVIOR
1. Start by warmly greeting the customer and asking about their wedding date and guest count.
2. Guide them through choosing a cake style, then flavors.
3. Suggest complementary sweets that match their aesthetic.
4. Build toward a complete package with a price estimate.
5. Always mention the Wedding Tasting Box as a next step.
6. Format responses beautifully with markdown — use headers, bullet points, and bold text.
7. Keep responses concise but luxurious in tone. Never sound robotic.
8. If asked about something outside your catalog, gracefully say you'll connect them with the team.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Our concierge is quite popular! Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("wedding-concierge error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
