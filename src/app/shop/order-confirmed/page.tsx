import Link from "next/link";
import { CheckCircle2, Package, Mail } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  { name: "Linen Trouser", meta: "Sand · 32", price: 98, tone: "oklch(0.9 0.01 120)", qty: 1 },
  { name: "Wool Overshirt", meta: "Ecru · M", price: 148, tone: "oklch(0.88 0.02 60)", qty: 1 },
  { name: "Cotton Tee", meta: "Fog · L", price: 42, tone: "oklch(0.92 0.005 250)", qty: 2 },
];

export default function OrderConfirmed() {
  const subtotal = items.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Success header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-7 text-foreground" />
          </div>
          <h1 className="mt-5 text-2xl font-medium tracking-tight">Order confirmed</h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground text-pretty">
            Thanks for your order. We&apos;ve sent a confirmation to your email and will let you
            know when it ships.
          </p>
          <p className="mt-4 font-mono text-sm">Order #ATL-2026-04821</p>
        </div>

        {/* Meta row */}
        <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2.5 rounded-md border border-border p-3">
            <Mail className="size-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Confirmation</p>
              <p className="font-medium">jane@atelier.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-md border border-border p-3">
            <Package className="size-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Arrives</p>
              <p className="font-medium">Jul 27 – 29</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <Card className="mt-6">
          <CardHeader><CardTitle>Order summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {items.map((l) => (
                <div key={l.name} className="flex items-center gap-3">
                  <div className="relative w-12 shrink-0">
                    <div className="overflow-hidden rounded-md border border-border">
                      <AspectRatio ratio={3 / 4}>
                        <div className="size-full" style={{ backgroundColor: l.tone }} />
                      </AspectRatio>
                    </div>
                    <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-foreground text-xs text-background tabular-nums">
                      {l.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{l.meta}</p>
                  </div>
                  <span className="text-sm tabular-nums">${l.price * l.qty}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="tabular-nums">Free</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span className="tabular-nums">${subtotal}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/shop/collection" />}>Continue shopping</Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>Back home</Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
