"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Minus, Plus, Heart, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard, type Product } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Swatch } from "@/components/ui/swatch";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

const gallery = [
  "oklch(0.9 0.01 120)",
  "oklch(0.86 0.02 90)",
  "oklch(0.83 0.03 70)",
  "oklch(0.88 0.02 200)",
];

const colors = [
  { name: "Sand", value: "oklch(0.88 0.02 90)" },
  { name: "Sage", value: "oklch(0.86 0.03 150)" },
  { name: "Slate", value: "oklch(0.7 0.02 250)" },
];

const sizes = ["28", "30", "32", "34", "36"];

const related: Product[] = [
  { name: "Wool Overshirt", price: "$148", tone: "oklch(0.88 0.02 60)" },
  { name: "Cashmere Crew", price: "$220", tone: "oklch(0.85 0.03 40)" },
  { name: "Cotton Tee", price: "$42", tone: "oklch(0.92 0.005 250)" },
  { name: "Canvas Tote", price: "$74", tone: "oklch(0.86 0.02 90)" },
];

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(colors[0].name);
  const [size, setSize] = useState("32");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/shop" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop/collection" className="hover:text-foreground">Trousers</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Linen Trouser</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <Carousel className="w-full">
            <CarouselContent>
              {gallery.map((tone, i) => (
                <CarouselItem key={i}>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <AspectRatio ratio={4 / 5}>
                      <div className="size-full" style={{ backgroundColor: tone }} />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </Carousel>

          {/* Info */}
          <div>
            <Badge variant="sale" className="mb-3">Sale</Badge>
            <h1 className="text-2xl font-medium tracking-tight">Linen Trouser</h1>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex text-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={i < 4 ? "size-4 fill-current" : "size-4 text-muted-foreground"} />
                ))}
              </div>
              <span className="text-muted-foreground">4.0 · 128 reviews</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-medium text-sale">$98</span>
              <span className="text-lg text-muted-foreground line-through">$130</span>
              <span className="text-sm text-sale">25% off</span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground text-pretty">
              A relaxed straight-leg trouser cut from breathable European linen. Garment-dyed
              for a soft, lived-in hand from the first wear.
            </p>

            <Separator className="my-6" />

            {/* Color */}
            <div className="space-y-2">
              <Label>Color: <span className="text-muted-foreground">{color}</span></Label>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <Swatch
                    key={c.name}
                    color={c.value}
                    label={c.name}
                    selected={color === c.name}
                    onClick={() => setColor(c.name)}
                    className="size-8"
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Size</Label>
                <button className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                  Size guide
                </button>
              </div>
              <RadioGroup value={size} onValueChange={setSize} className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <Label
                    key={s}
                    htmlFor={`size-${s}`}
                    data-active={size === s}
                    className="flex h-9 w-12 cursor-pointer items-center justify-center rounded-md border border-border text-sm data-[active=true]:border-foreground data-[active=true]:bg-foreground data-[active=true]:text-background"
                  >
                    <RadioGroupItem value={s} id={`size-${s}`} className="sr-only" />
                    {s}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity + add */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 items-center rounded-md border border-border">
                <Button
                  variant="ghost" size="icon" className="size-9"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                >
                  <Minus />
                </Button>
                <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                <Button
                  variant="ghost" size="icon" className="size-9"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                >
                  <Plus />
                </Button>
              </div>
              <Button
                size="lg" className="h-10 flex-1"
                onClick={() => toast.success("Added to bag", { description: `Linen Trouser · ${color} · ${size} · ×${qty}` })}
              >
                Add to bag — $98
              </Button>
              <Button variant="outline" size="icon" className="size-10" aria-label="Save">
                <Heart />
              </Button>
            </div>

            {/* Assurances */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
                <Truck className="size-4" /> Free shipping over $150
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
                <RotateCcw className="size-4" /> 30-day returns
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
                <ShieldCheck className="size-4" /> 2-year warranty
              </div>
            </div>

            {/* Details accordion */}
            <Accordion defaultValue={["details"]} className="mt-6">
              <AccordionItem value="details">
                <AccordionTrigger>Details & materials</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  100% European linen. Garment-dyed. Straight leg, mid-rise. Made in Portugal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Machine wash cold, gentle. Line dry. Warm iron if needed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Ships in 1–2 business days. Free returns within 30 days of delivery.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related */}
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-medium tracking-tight">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
