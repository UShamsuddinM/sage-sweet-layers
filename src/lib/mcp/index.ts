import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProductsTool from "./tools/list-products";
import getProductTool from "./tools/get-product";
import whoamiTool from "./tools/whoami";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "sweet-layers-mcp",
  title: "Sweet Layers",
  version: "0.1.0",
  instructions:
    "Tools for the Sweet Layers luxury cake atelier. Use `list_products` to browse the catalog, `get_product` to fetch details by handle, and `whoami` to verify identity.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProductsTool, getProductTool, whoamiTool],
});
