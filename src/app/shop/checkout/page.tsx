"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Lock, CreditCard, Truck, Zap } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const summary = [
  { name: "Linen Trouser", meta: "Sand · 32", price: 98, tone: "oklch(0.9 0.01 120)", qty: 1 },
  { name: "Wool Overshirt", meta: "Ecru · M", price: 148, tone: "oklch(0.88 0.02 60)", qty: 1 },
  { name: "Cotton Tee", meta: "Fog · L", price: 42, tone: "oklch(0.92 0.005 250)", qty: 2 },
];

const delivery = [
  { id: "standard", label: "Standard", detail: "3–5 business days", price: "Free", icon: Truck },
  { id: "express", label: "Express", detail: "1–2 business days", price: "$12", icon: Zap },
];

function Field({ id, label, className, ...props }: React.ComponentProps<typeof Input> & { label: string }) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}

export default function Checkout() {
  const router = useRouter();
  const [ship, setShip] = useState("standard");
  const subtotal = summary.reduce((s, l) => s + l.price * l.qty, 0);
  const shipCost = ship === "express" ? 12 : 0;
  const total = subtotal + shipCost;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/shop/order-confirmed");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader cartCount={4} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/shop/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-4" /> Back to bag
        </Link>
        <h1 className="text-2xl font-medium tracking-tight">Checkout</h1>

        <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="space-y-6">
            {/* Contact */}
            <Card>
              <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
              <CardContent>
                <Field id="email" label="Email" type="email" placeholder="you@atelier.com" required />
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader><CardTitle>Shipping address</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Field id="first" label="First name" placeholder="Jane" required />
                <Field id="last" label="Last name" placeholder="Doe" required />
                <Field id="address" label="Address" placeholder="123 Linen St" className="col-span-2" required />
                <Field id="apt" label="Apartment (optional)" placeholder="Apt 4B" className="col-span-2" />
                <Field id="city" label="City" placeholder="Lisbon" required />
                <Field id="postal" label="Postal code" placeholder="1100-001" required />
                <div className="col-span-2 space-y-1.5">
                  <Label>Country</Label>
                  <Select defaultValue="Portugal">
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Delivery method */}
            <Card>
              <CardHeader><CardTitle>Delivery method</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup value={ship} onValueChange={setShip} className="gap-3">
                  {delivery.map((d) => {
                    const Icon = d.icon;
                    return (
                      <Label
                        key={d.id}
                        htmlFor={`ship-${d.id}`}
                        data-active={ship === d.id}
                        className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 data-[active=true]:border-foreground"
                      >
                        <RadioGroupItem value={d.id} id={`ship-${d.id}`} />
                        <Icon className="size-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{d.label}</p>
                          <p className="text-sm text-muted-foreground">{d.detail}</p>
                        </div>
                        <span className="text-sm font-medium tabular-nums">{d.price}</span>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="card">Card number</Label>
                  <div className="relative">
                    <CreditCard className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="card" inputMode="numeric" placeholder="4242 4242 4242 4242" className="pl-8" required />
                  </div>
                </div>
                <Field id="exp" label="Expiry" placeholder="MM / YY" required />
                <Field id="cvc" label="CVC" placeholder="123" inputMode="numeric" required />
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader><CardTitle>Order summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {summary.map((l) => (
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
                    <span className="tabular-nums">{shipCost === 0 ? "Free" : `$${shipCost}`}</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span className="tabular-nums">${total}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Lock /> Pay ${total}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Encrypted and secure. You can review before paying.
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
}
