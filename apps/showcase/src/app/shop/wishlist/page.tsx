"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@xpnd/ui";
import { CATALOG, toProductCard } from "@/lib/products";

const initial = CATALOG.filter((p) =>
  ["wool-overshirt", "linen-trouser", "silk-scarf", "quilted-jacket"].includes(p.slug)
);

export default function Wishlist() {
  const [saved, setSaved] = useState(initial);

  const remove = (slug: string, name: string) => {
    setSaved((s) => s.filter((p) => p.slug !== slug));
    toast.success("Removed from wishlist", { description: name });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Wishlist</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {saved.length} {saved.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {saved.length > 0 && (
            <Button
              variant="outline" size="sm"
              onClick={() => toast.success("Added to bag", { description: `${saved.length} items` })}
            >
              <ShoppingBag /> Move all to bag
            </Button>
          )}
        </div>

        {saved.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <Heart className="size-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">Your wishlist is empty</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tap the heart on any product to save it here for later.
            </p>
            <Button nativeButton={false} render={<Link href="/shop/collection" />}>Browse the shop</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
            {saved.map((p) => (
              <div key={p.slug} className="relative">
                <Button
                  variant="secondary" size="icon-sm"
                  className="absolute top-2 right-2 z-10 rounded-full shadow-sm"
                  aria-label={`Remove ${p.name}`}
                  onClick={() => remove(p.slug, p.name)}
                >
                  <X />
                </Button>
                <ProductCard product={toProductCard(p)} />
              </div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
