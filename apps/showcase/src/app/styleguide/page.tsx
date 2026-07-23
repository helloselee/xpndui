"use client";

import { useState } from "react";
import { Info, AlertTriangle, Package, Bell, Trash2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@xpnd/ui";
import { Badge, IndicatorBadge } from "@xpnd/ui";
import { Input } from "@xpnd/ui";
import { Label } from "@xpnd/ui";
import { Checkbox } from "@xpnd/ui";
import { Slider } from "@xpnd/ui";
import { Progress } from "@xpnd/ui";
import { Skeleton } from "@xpnd/ui";
import { Separator } from "@xpnd/ui";
import { Swatch } from "@xpnd/ui";
import { RadioGroup, RadioGroupItem } from "@xpnd/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@xpnd/ui";
import { Alert, AlertTitle, AlertDescription } from "@xpnd/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@xpnd/ui";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@xpnd/ui";
import { Avatar, AvatarFallback } from "@xpnd/ui";
import { Tooltip, TooltipTrigger, TooltipContent } from "@xpnd/ui";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@xpnd/ui";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@xpnd/ui";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@xpnd/ui";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@xpnd/ui";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@xpnd/ui";
import { ThemeToggle } from "@/components/theme-toggle";
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

const swatchColors = [
  { name: "Sand", value: "oklch(0.88 0.02 90)" },
  { name: "Sage", value: "oklch(0.86 0.03 150)" },
  { name: "Slate", value: "oklch(0.7 0.02 250)" },
  { name: "Clay", value: "oklch(0.8 0.04 50)" },
];

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
  const [swatch, setSwatch] = useState("Sand");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-4 px-6 py-8">
          <div>
            <p className="text-sm text-muted-foreground">Atelier Design System</p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight">Style Guide</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Every component rendered with the live app tokens. What you see here is what ships.
              Flip the theme to inspect light and dark; change a token in globals.css and this
              whole page shifts with it.
            </p>
          </div>
          <ThemeToggle />
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

          {/* Swatch */}
          <div className="mt-8 space-y-2">
            <Label>Color swatch <span className="text-muted-foreground">· {swatch}</span></Label>
            <div className="flex gap-2">
              {swatchColors.map((c) => (
                <Swatch
                  key={c.name}
                  color={c.value}
                  label={c.name}
                  selected={swatch === c.name}
                  onClick={() => setSwatch(c.name)}
                />
              ))}
            </div>
          </div>

          {/* States */}
          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium">States</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled</Label>
                <Input id="disabled-input" placeholder="Disabled input" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invalid-input">Invalid</Label>
                <Input id="invalid-input" defaultValue="not-an-email" aria-invalid />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-1">
              <div className="flex items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <Label htmlFor="cb-unchecked" className="font-normal">Unchecked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-checked" defaultChecked />
                <Label htmlFor="cb-checked" className="font-normal">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled" disabled />
                <Label htmlFor="cb-disabled" className="font-normal opacity-50">Disabled</Label>
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

        {/* Menus, overlays & pagination */}
        <Section id="overlays" title="Menus, overlays & pagination" note="Dropdown, destructive confirm (AlertDialog, not Dialog), overlay count, and pagination.">
          <div className="flex flex-wrap items-end gap-8">
            {/* Indicator badge */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Indicator badge</p>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell />
                  <IndicatorBadge>3</IndicatorBadge>
                </Button>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell />
                  <IndicatorBadge>12</IndicatorBadge>
                </Button>
              </div>
            </div>

            {/* Dropdown */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Dropdown menu</p>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" size="sm"><MoreHorizontal /> Actions</Button>}
                />
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Manage</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Destructive confirm */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Destructive confirm</p>
              <AlertDialog>
                <AlertDialogTrigger
                  render={<Button variant="destructive" size="sm"><Trash2 /> Delete</Button>}
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action can&apos;t be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-sm font-medium">Pagination</p>
            <Pagination className="justify-start">
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Section>

        <Separator />
        <p className="py-10 text-center text-sm text-muted-foreground">End of style guide</p>
      </main>
    </div>
  );
}
