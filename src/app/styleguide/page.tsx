"use client";

import { Info, AlertTriangle, Package } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ProductCard, type Product } from "@/components/product-card";

// Literal class strings so Tailwind's scanner emits each utility (no dynamic bg-${t}).
const tokens = [
  { name: "background", cls: "bg-background" },
  { name: "foreground", cls: "bg-foreground" },
  { name: "card", cls: "bg-card" },
  { name: "primary", cls: "bg-primary" },
  { name: "secondary", cls: "bg-secondary" },
  { name: "muted", cls: "bg-muted" },
  { name: "accent", cls: "bg-accent" },
  { name: "border", cls: "bg-border" },
  { name: "sale", cls: "bg-sale" },
  { name: "destructive", cls: "bg-destructive" },
] as const;

const buttonVariants = ["default", "outline", "secondary", "ghost", "destructive", "sale", "link"] as const;
const badgeVariants = ["default", "secondary", "outline", "sale", "destructive"] as const;

const sampleProduct: Product = {
  name: "Linen Trouser", price: "$98", was: "$130", tone: "oklch(0.9 0.01 120)", sale: true,
};

function Section({ id, title, note, children }: {
  id: string; title: string; note?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-12 first:border-t-0">
      <div className="mb-6">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        {note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-sm text-muted-foreground">Atelier Design System</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight">Style Guide</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Every component rendered with the live app tokens. What you see here is what ships.
            Change a token in globals.css and this whole page shifts with it.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Tokens */}
        <Section id="tokens" title="Color tokens" note="The single source of truth. Every component reads from these.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {tokens.map((t) => (
              <div key={t.name} className="space-y-2">
                <div className={`h-16 rounded-md border border-border ${t.cls}`} />
                <p className="text-xs font-medium">{t.name}</p>
                <code className="text-xs text-muted-foreground">--{t.name}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section id="type" title="Typography" note="Geist Sans. Hierarchy through size and weight, not color.">
          <div className="space-y-2">
            <p className="text-4xl font-medium tracking-tight">Considered essentials</p>
            <p className="text-2xl font-medium tracking-tight">Section heading</p>
            <p className="text-base">Body text for reading. A tightly edited wardrobe of natural fibers.</p>
            <p className="text-sm text-muted-foreground">Muted small text for secondary information.</p>
            <p className="font-mono text-sm">$148.00 · SKU-00421 · Geist Mono</p>
          </div>
        </Section>

        {/* Buttons */}
        <Section id="buttons" title="Buttons" note="Variants and sizes. The sale variant reads the custom --sale token.">
          <div className="flex flex-wrap items-center gap-3">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">default</Button>
            <Button size="lg">lg</Button>
            <Button disabled>disabled</Button>
          </div>
        </Section>

        {/* Badges */}
        <Section id="badges" title="Badges" note="Status and labels. Sale uses the accent token.">
          <div className="flex flex-wrap items-center gap-3">
            {badgeVariants.map((v) => (
              <Badge key={v} variant={v}>{v}</Badge>
            ))}
          </div>
        </Section>

        {/* Form controls */}
        <Section id="forms" title="Form controls" note="Inputs, selection, and ranges.">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@atelier.com" />
              </div>
              <div className="space-y-2">
                <Label>Sort by</Label>
                <Select>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Popular" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="new">Newest</SelectItem>
                    <SelectItem value="price">Price, low to high</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Checkbox id="terms" defaultChecked />
                <Label htmlFor="terms">Subscribe to the journal</Label>
              </div>
              <div className="space-y-2">
                <Label>Size</Label>
                <RadioGroup defaultValue="m" className="flex gap-4">
                  {["s", "m", "l"].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <RadioGroupItem value={s} id={`size-${s}`} />
                      <Label htmlFor={`size-${s}`} className="uppercase">{s}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Price range</Label>
                <Slider defaultValue={[40]} max={100} />
              </div>
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section id="cards" title="Cards" note="Left: default boxed Card (padding from --card-spacing). Right: ProductCard — image bleeds to the edge, text keeps padding.">
          <div className="grid gap-5 sm:grid-cols-[1fr_240px]">
            <Card>
              <CardHeader>
                <CardTitle>Free shipping</CardTitle>
                <CardDescription>On all orders over $150, no code needed.</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={72} />
                <p className="mt-2 text-sm text-muted-foreground">$108 of $150 · $42 to go</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Continue shopping</Button>
              </CardFooter>
            </Card>
            <ProductCard product={sampleProduct} />
          </div>
        </Section>

        {/* Feedback */}
        <Section id="feedback" title="Feedback & status" note="Alerts, toasts, progress, and loading skeletons.">
          <div className="space-y-4">
            <Alert>
              <Info />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Your bag is saved for 24 hours.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle />
              <AlertTitle>Out of stock</AlertTitle>
              <AlertDescription>This size sold out. Try another size or join the waitlist.</AlertDescription>
            </Alert>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => toast.success("Added to bag", { description: "Linen Trouser" })}>
                Trigger toast
              </Button>
              <div className="w-48"><Progress value={45} /></div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Loading state</p>
              <div className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Data */}
        <Section id="table" title="Table" note="Order summary pattern.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Wool Overshirt", "M", "$148"],
                ["Linen Trouser", "32", "$98"],
                ["Cotton Tee", "L", "$42"],
              ].map(([item, size, price]) => (
                <TableRow key={item}>
                  <TableCell className="font-medium">{item}</TableCell>
                  <TableCell className="text-muted-foreground">{size}</TableCell>
                  <TableCell className="text-right tabular-nums">{price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        {/* Disclosure & overlays */}
        <Section id="disclosure" title="Disclosure & overlays" note="Tabs, accordion, avatar, tooltip.">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-6">
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-3 text-sm text-muted-foreground">
                  100% merino wool. Made in Portugal.
                </TabsContent>
                <TabsContent value="shipping" className="pt-3 text-sm text-muted-foreground">
                  Free returns within 30 days.
                </TabsContent>
              </Tabs>

              <div className="flex items-center gap-3">
                <Avatar><AvatarFallback>SL</AvatarFallback></Avatar>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm"><Package />Track order</Button>} />
                  <TooltipContent>Arrives Fri, Jul 24</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <Accordion defaultValue={["care"]}>
              <AccordionItem value="care">
                <AccordionTrigger>Care instructions</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Hand wash cold. Lay flat to dry. Do not bleach.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger>Returns & exchanges</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Free returns within 30 days of delivery.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Section>

        <Separator />
        <p className="py-10 text-center text-sm text-muted-foreground">End of style guide</p>
      </main>
    </div>
  );
}
