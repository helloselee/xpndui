"use client";

import Link from "next/link";
import { Search, Menu, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/cart-button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose,
} from "@/components/ui/sheet";

const nav = [
  { label: "New", href: "/shop/collection" },
  { label: "Men", href: "/shop/collection" },
  { label: "Women", href: "/shop/collection" },
  { label: "Sale", href: "/shop/collection" },
];

export function SiteHeader({ cartCount = 2 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/shop" className="text-base font-semibold tracking-tight">
            ATELIER
          </Link>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {nav.map((n) => (
              <Link key={n.label} className="transition-colors hover:text-foreground" href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost" size="icon" aria-label="Search"
            nativeButton={false} render={<Link href="/shop/search" />}
          >
            <Search />
          </Button>
          <Button
            variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex"
            nativeButton={false} render={<Link href="/shop/wishlist" />}
          >
            <Heart />
          </Button>
          <ThemeToggle />
          <CartButton count={cartCount} />

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 p-6">
              <SheetHeader className="px-0">
                <SheetTitle>ATELIER</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 text-sm">
                {nav.map((n) => (
                  <SheetClose key={n.label} render={<Link href={n.href} />}>
                    <span className="block rounded-md px-2 py-2 hover:bg-muted">{n.label}</span>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
