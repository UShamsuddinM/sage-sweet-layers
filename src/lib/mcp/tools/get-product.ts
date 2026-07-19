import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STOREFRONT_URL = "https://iyeyb5-2r.myshopify.com/api/2024-10/graphql.json";
const STOREFRONT_TOKEN_FALLBACK = "e9c7c1f8e6a4d8b5c2f1a3e7b9d4c6f2";

const QUERY = /* GraphQL */ `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 20) {
        edges { node { id title availableForSale price { amount currencyCode } } }
      }
    }
  }
`;

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description: "Fetch a single product by its Shopify handle, including variants and pricing.",
  inputSchema: {
    handle: z.string().min(1).describe("The Shopify product handle, e.g. 'the-minimalist'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ handle }) => {
    const token = (globalThis as any).process?.env?.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? STOREFRONT_TOKEN_FALLBACK;
    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: QUERY, variables: { handle } }),
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Shopify error: ${res.status}` }], isError: true };
    }
    const json = await res.json();
    const product = json.data?.productByHandle;
    if (!product) {
      return { content: [{ type: "text", text: `No product found for handle: ${handle}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: { product },
    };
  },
});
