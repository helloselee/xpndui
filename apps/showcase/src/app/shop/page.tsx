import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@xpndui/ui";
import { Separator } from "@xpndui/ui";
import { AspectRatio } from "@xpndui/ui";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterForm } from "@/components/newsletter-form";
import { CATALOG, toProductCard } from "@/lib/products";

const featured = CATALOG.slice(0, 4);

const lookbook = [
  { caption: "Fibers, first", tone: "oklch(0.88 0.02 60)" },
  { caption: "Cut to move", tone: "oklch(0.86 0.03 150)" },
  { caption: "Dyed by hand", tone: "oklch(0.9 0.03 340)" },
];

export default function BrandStory() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Brand hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          An ATELIER brand — operated by{" "}
          <Link href="/" className="underline-offset-4 hover:text-foreground hover:underline">FORMWORK</Link>
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-6xl">
          Considered essentials, made to last.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
          A tightly edited wardrobe of natural fibers and quiet colors. We make fewer things,
          and we make them to keep.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/shop/collection" />}>
            Shop the collection <ArrowRight />
          </Button>
          <Button size="lg" variant="ghost" nativeButton={false} render={<a href="#story" />}>Our story</Button>
        </div>
      </section>

      <Separator />

      {/* Story */}
      <section id="story" className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-xl border border-border">
          <AspectRatio ratio={4 / 3}>
            <div className="size-full" style={{ backgroundColor: "oklch(0.86 0.03 150)" }} />
          </AspectRatio>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Made with intention</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight">Quiet clothes, built to compound.</h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Every piece is cut from natural fibers and finished in small runs by makers we know.
            We&apos;d rather do a few things well than chase a calendar of drops.
          </p>
          <p className="mt-3 text-muted-foreground text-pretty">
            The result is a wardrobe that gets better with wear — the kind you reach for on a
            Tuesday and still love in five years.
          </p>
        </div>
      </section>

      {/* Lookbook */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-medium tracking-tight">Fall lookbook</h2>
            <Link
              href="/shop/collection"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Shop the looks <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {lookbook.map((l) => (
              <figure key={l.caption} className="space-y-3">
                <div className="overflow-hidden rounded-xl border border-border">
                  <AspectRatio ratio={3 / 4}>
                    <div className="size-full" style={{ backgroundColor: l.tone }} />
                  </AspectRatio>
                </div>
                <figcaption className="text-sm text-muted-foreground">{l.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* The edit */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">The edit</h2>
            <p className="mt-1 text-sm text-muted-foreground">A handful of pieces to start with.</p>
          </div>
          <Link
            href="/shop/collection"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            View all <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={toProductCard(p)} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">Join the journal</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Occasional notes on new pieces, restocks, and how we make things. No noise.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
