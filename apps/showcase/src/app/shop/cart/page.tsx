"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@xpnd/ui";
import { Input } from "@xpnd/ui";
import { Badge } from "@xpnd/ui";
import { Separator } from "@xpnd/ui";
import { Progress } from "@xpnd/ui";
import { AspectRatio } from "@xpnd/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@xpnd/ui";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@xpnd/ui";

type Line = {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  tone: string;
  qty: number;
};

const initial: Line[] = [
  { id: 1, name: "Linen Trouser", color: "Sand", size: "32", price: 98, tone: "oklch(0.9 0.01 120)", qty: 1 },
  { id: 2, name: "Wool Overshirt", color: "Ecru", size: "M", price: 148, tone: "oklch(0.88 0.02 60)", qty: 1 },
  { id: 3, name: "Cotton Tee", color: "Fog", size: "L", price: 42, tone: "oklch(0.92 0.005 250)", qty: 2 },
];

const FREE_SHIPPING = 150;

export default function Cart() {
  const [lines, setLines] = useState<Line[]>(initial);

  const setQty = (id: number, delta: number) =>
    setLines((ls) =>
      ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l))
    );

  const remove = (id: number) => {
    const line = lines.find((l) => l.id === id);
    setLines((ls) => ls.filter((l) => l.id !== id));
    toast.success("Removed from bag", { description: line?.name });
  };

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;
  const toFree = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader cartCount={lines.reduce((n, l) => n + l.qty, 0)} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-medium tracking-tight">Your bag</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lines.length} {lines.length === 1 ? "item" : "items"}
        </p>

        {lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-medium">Your bag is empty</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Nothing here yet. Explore the edit and find something worth keeping.
            </p>
            <Button nativeButton={false} render={<Link href="/shop/collection" />}>Continue shopping</Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Line items */}
            <div className="divide-y divide-border border-y border-border">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-4 py-5">
                  <Link href="/shop/product" className="w-24 shrink-0">
                    <div className="overflow-hidden rounded-md border border-border">
                      <AspectRatio ratio={3 / 4}>
                        <div className="size-full" style={{ backgroundColor: l.tone }} />
                      </AspectRatio>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href="/shop/product" className="text-sm font-medium hover:underline">
                          {l.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {l.color} · Size {l.size}
                        </p>
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        ${l.price * l.qty}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-8 items-center rounded-md border border-border">
                        <Button
                          variant="ghost" size="icon" className="size-7"
                          onClick={() => setQty(l.id, -1)} aria-label="Decrease"
                        >
                          <Minus />
                        </Button>
                        <span className="w-7 text-center text-sm tabular-nums">{l.qty}</span>
                        <Button
                          variant="ghost" size="icon" className="size-7"
                          onClick={() => setQty(l.id, 1)} aria-label="Increase"
                        >
                          <Plus />
                        </Button>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Trash2 /> Remove
                            </Button>
                          }
                        />
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove this item?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {l.name} ({l.color}, size {l.size}) will be removed from your bag.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep it</AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={() => remove(l.id)}>
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <Card>
                <CardHeader>
                  <CardTitle>Order summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Free shipping progress */}
                  <div className="space-y-2">
                    {toFree > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Add <span className="font-medium text-foreground">${toFree}</span> for free shipping
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-foreground">You&apos;ve unlocked free shipping</p>
                    )}
                    <Progress value={Math.min(100, (subtotal / FREE_SHIPPING) * 100)} />
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Promo code" className="pl-8" />
                    </div>
                    <Button variant="outline" onClick={() => toast.error("Invalid code", { description: "That promo code has expired." })}>
                      Apply
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="tabular-nums">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="tabular-nums">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span className="tabular-nums">${total}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" nativeButton={false} render={<Link href="/shop/checkout" />}>
                    Checkout
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Badge variant="outline">Secure</Badge>
                    <span>Encrypted payment · Free returns</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
