"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard, type Product } from "@/components/product-card";
import { ShopFilters, PRICE_MAX, type Filters } from "@/components/shop-filters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext,
} from "@/components/ui/pagination";

type Item = Omit<Product, "price"> & { category: string; color: string; priceNum: number };

const ALL: Item[] = [
  { name: "Wool Overshirt", priceNum: 148, category: "Outerwear", color: "Sand", tone: "oklch(0.88 0.02 60)" },
  { name: "Linen Trouser", priceNum: 98, was: "$130", category: "Bottoms", color: "Sage", tone: "oklch(0.9 0.01 120)", sale: true },
  { name: "Cashmere Crew", priceNum: 220, category: "Tops", color: "Clay", tone: "oklch(0.85 0.03 40)" },
  { name: "Cotton Tee", priceNum: 42, category: "Tops", color: "Fog", tone: "oklch(0.92 0.005 250)" },
  { name: "Leather Belt", priceNum: 68, was: "$85", category: "Accessories", color: "Clay", tone: "oklch(0.8 0.04 50)", sale: true },
  { name: "Merino Beanie", priceNum: 54, category: "Accessories", color: "Slate", tone: "oklch(0.87 0.02 200)" },
  { name: "Silk Scarf", priceNum: 110, category: "Accessories", color: "Sand", tone: "oklch(0.9 0.03 340)" },
  { name: "Canvas Tote", priceNum: 74, category: "Accessories", color: "Sand", tone: "oklch(0.86 0.02 90)" },
  { name: "Corduroy Shirt", priceNum: 118, category: "Tops", color: "Clay", tone: "oklch(0.83 0.03 70)" },
  { name: "Wide Chino", priceNum: 92, category: "Bottoms", color: "Sage", tone: "oklch(0.88 0.02 130)" },
  { name: "Quilted Jacket", priceNum: 245, category: "Outerwear", color: "Slate", tone: "oklch(0.75 0.02 250)" },
  { name: "Ribbed Socks", priceNum: 24, category: "Accessories", color: "Fog", tone: "oklch(0.91 0.005 200)" },
];

const PER_PAGE = 8;
const emptyFilters: Filters = { cats: [], colors: [], price: [0, PRICE_MAX] };

export default function Shop() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const toggle = (key: "cats" | "colors", v: string) => {
    setPage(1);
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v],
    }));
  };

  const results = useMemo(() => {
    const filtered = ALL.filter(
      (p) =>
        (filters.cats.length === 0 || filters.cats.includes(p.category)) &&
        (filters.colors.length === 0 || filters.colors.includes(p.color)) &&
        p.priceNum >= filters.price[0] &&
        p.priceNum <= filters.price[1]
    );
    if (sort === "low") filtered.sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "high") filtered.sort((a, b) => b.priceNum - a.priceNum);
    return filtered;
  }, [filters, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const toProduct = (i: Item): Product => ({
    name: i.name, price: `$${i.priceNum}`, was: i.was, tone: i.tone, sale: i.sale,
  });

  const filterProps = {
    filters,
    onToggleCat: (c: string) => toggle("cats", c),
    onToggleColor: (c: string) => toggle("colors", c),
    onPrice: (v: number[]) => { setPage(1); setFilters((f) => ({ ...f, price: v })); },
    onClear: () => { setPage(1); setFilters(emptyFilters); },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-medium tracking-tight">Shop all</h1>
          <p className="mt-1 text-sm text-muted-foreground">Considered pieces for every day.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <ShopFilters {...filterProps} />
          </aside>

          <div>
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger
                    render={
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <SlidersHorizontal /> Filters
                      </Button>
                    }
                  />
                  <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                    <SheetHeader className="px-0">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <ShopFilters {...filterProps} />
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-muted-foreground">
                  {results.length} {results.length === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sort} onValueChange={(v) => setSort(v ?? "featured")}>
                  <SelectTrigger size="sm" className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="low">Price: low to high</SelectItem>
                    <SelectItem value="high">Price: high to low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden items-center rounded-md border border-border sm:flex">
                  <Button
                    variant={view === "grid" ? "secondary" : "ghost"}
                    size="icon" className="size-8 rounded-r-none"
                    onClick={() => setView("grid")} aria-label="Grid view"
                  >
                    <LayoutGrid />
                  </Button>
                  <Button
                    variant={view === "list" ? "secondary" : "ghost"}
                    size="icon" className="size-8 rounded-l-none"
                    onClick={() => setView("list")} aria-label="List view"
                  >
                    <List />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {shown.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
                <p className="font-medium">No matches</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Nothing fits these filters. Try widening your price range or clearing colors.
                </p>
                <Button variant="outline" size="sm" onClick={filterProps.onClear}>Clear filters</Button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
                {shown.map((p) => (
                  <ProductCard key={p.name} product={toProduct(p)} />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border border-y border-border">
                {shown.map((p) => (
                  <Link key={p.name} href="/product" className="flex items-center gap-4 py-4">
                    <div className="w-20 shrink-0 overflow-hidden rounded-md border border-border">
                      <AspectRatio ratio={1}>
                        <div className="size-full" style={{ backgroundColor: p.tone }} />
                      </AspectRatio>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{p.name}</p>
                        {p.sale && <Badge variant="sale">Sale</Badge>}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{p.category} · {p.color}</p>
                    </div>
                    <div className="text-sm">
                      <span className={p.sale ? "text-sale font-medium" : "font-medium"}>${p.priceNum}</span>
                      {p.was && <span className="ml-1.5 text-muted-foreground line-through">{p.was}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
              <>
                <Separator className="my-8" />
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }}
                      />
                    </PaginationItem>
                    {Array.from({ length: pageCount }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={current === i + 1}
                          onClick={(e) => { e.preventDefault(); setPage(i + 1); }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(pageCount, p + 1)); }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
