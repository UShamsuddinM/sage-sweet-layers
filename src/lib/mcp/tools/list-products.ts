import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STOREFRONT_URL = "https://iyeyb5-2r.myshopify.com/api/2024-10/graphql.json";
const STOREFRONT_TOKEN_FALLBACK = "e9c7c1f8e6a4d8b5c2f1a3e7b9d4c6f2";

const QUERY = /* GraphQL */ `
  query ListProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

export default defineTool({
  name: "list_products",
  title: "List cakes and sweets",
  description: "Browse the Sweet Layers product catalog (handle, title, description, price).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(10).describe("Max products to return (1–50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const token = (globalThis as any).process?.env?.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? STOREFRONT_TOKEN_FALLBACK;
    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: QUERY, variables: { first: limit } }),
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Shopify error: ${res.status}` }], isError: true };
    }
    const json = await res.json();
    const products = (json.data?.products?.edges ?? []).map((e: any) => ({
      handle: e.node.handle,
      title: e.node.title,
      description: e.node.description,
      price: `${e.node.priceRange.minVariantPrice.amount} ${e.node.priceRange.minVariantPrice.currencyCode}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
      structuredContent: { products },
    };
  },
});
