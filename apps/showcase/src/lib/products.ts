import type { Product } from "@/components/product-card";

export type CatalogItem = {
  slug: string;
  name: string;
  priceNum: number;
  was?: string;
  category: string;
  color: string;
  tone: string;
  sale?: boolean;
};

// Single source for the product catalog. Pages (shop, search, wishlist) read
// from here instead of re-declaring their own arrays.
export const CATALOG: CatalogItem[] = [
  { slug: "wool-overshirt", name: "Wool Overshirt", priceNum: 148, category: "Outerwear", color: "Sand", tone: "oklch(0.88 0.02 60)" },
  { slug: "linen-trouser", name: "Linen Trouser", priceNum: 98, was: "$130", category: "Bottoms", color: "Sage", tone: "oklch(0.9 0.01 120)", sale: true },
  { slug: "cashmere-crew", name: "Cashmere Crew", priceNum: 220, category: "Tops", color: "Clay", tone: "oklch(0.85 0.03 40)" },
  { slug: "cotton-tee", name: "Cotton Tee", priceNum: 42, category: "Tops", color: "Fog", tone: "oklch(0.92 0.005 250)" },
  { slug: "leather-belt", name: "Leather Belt", priceNum: 68, was: "$85", category: "Accessories", color: "Clay", tone: "oklch(0.8 0.04 50)", sale: true },
  { slug: "merino-beanie", name: "Merino Beanie", priceNum: 54, category: "Accessories", color: "Slate", tone: "oklch(0.87 0.02 200)" },
  { slug: "silk-scarf", name: "Silk Scarf", priceNum: 110, category: "Accessories", color: "Sand", tone: "oklch(0.9 0.03 340)" },
  { slug: "canvas-tote", name: "Canvas Tote", priceNum: 74, category: "Accessories", color: "Sand", tone: "oklch(0.86 0.02 90)" },
  { slug: "corduroy-shirt", name: "Corduroy Shirt", priceNum: 118, category: "Tops", color: "Clay", tone: "oklch(0.83 0.03 70)" },
  { slug: "wide-chino", name: "Wide Chino", priceNum: 92, category: "Bottoms", color: "Sage", tone: "oklch(0.88 0.02 130)" },
  { slug: "quilted-jacket", name: "Quilted Jacket", priceNum: 245, category: "Outerwear", color: "Slate", tone: "oklch(0.75 0.02 250)" },
  { slug: "ribbed-socks", name: "Ribbed Socks", priceNum: 24, category: "Accessories", color: "Fog", tone: "oklch(0.91 0.005 200)" },
];

export function toProductCard(i: CatalogItem): Product {
  return { name: i.name, price: `$${i.priceNum}`, was: i.was, tone: i.tone, sale: i.sale };
}
