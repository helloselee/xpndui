"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Input } from "@xpnd/ui";
import { Button } from "@xpnd/ui";
import { Badge } from "@xpnd/ui";
import { CATALOG, toProductCard } from "@/lib/products";

const suggestions = ["Linen", "Wool", "Tote", "Cashmere"];

export default function Search() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return CATALOG.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-medium tracking-tight">Search</h1>

        {/* Search field */}
        <div className="relative mt-5 max-w-xl">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search for pieces, categories…"
            className="h-11 pl-9 text-base"
          />
        </div>

        {/* Suggestions */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Try:</span>
          {suggestions.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setQuery(s)}
            >
              {s}
            </Badge>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8">
          {!q ? (
            <p className="text-sm text-muted-foreground">Start typing to search the catalog.</p>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
              <p className="font-medium">No results for “{query.trim()}”</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Check the spelling or try a broader term.
              </p>
              <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/shop/collection" />}>
                Browse all
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
              </p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
                {results.map((p) => (
                  <ProductCard key={p.slug} product={toProductCard(p)} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
