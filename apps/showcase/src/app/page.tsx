import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { Button } from "@xpnd/ui";
import { Separator } from "@xpnd/ui";
import { AspectRatio } from "@xpnd/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "FORMWORK — Brand studio",
  description: "A studio that designs, builds, and operates consumer brands end to end.",
};

const capabilities = [
  { n: "01", title: "Brand & identity", body: "Naming, voice, and visual systems built to last past a launch." },
  { n: "02", title: "Product design", body: "From first sketch to a line worth putting your name on." },
  { n: "03", title: "Commerce & storefront", body: "Design systems and stores that turn browsers into believers." },
  { n: "04", title: "Growth & retention", body: "The unglamorous work that keeps a brand alive." },
];

const brands = [
  { name: "ATELIER", kind: "Considered essentials", tone: "oklch(0.88 0.02 60)", href: "/shop", status: "Live" },
  { name: "MABLE", kind: "Home & objects", tone: "oklch(0.86 0.03 150)", status: "In studio" },
  { name: "PARC", kind: "Outdoor apparel", tone: "oklch(0.8 0.04 50)", status: "In studio" },
];

const principles = [
  ["Own the whole thing", "Identity, product, and commerce are one system, not three vendors."],
  ["Build to keep", "We design brands to compound, not to chase a launch spike."],
  ["Operate, don't just deliver", "We run what we build and stay on the hook for outcomes."],
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-base font-semibold tracking-tight">FORMWORK</Link>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" nativeButton={false} render={<a href="#work" />}>Work</Button>
            <Button variant="ghost" size="sm" nativeButton={false} render={<a href="#studio" />}>Studio</Button>
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/shop/contact" />}>Contact</Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Brand studio — est. 2026</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium tracking-tight text-balance md:text-7xl">
          We build brands worth keeping.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
          FORMWORK designs, builds, and operates consumer brands end to end — identity, product,
          and the storefront they live in.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <Button size="lg" nativeButton={false} render={<a href="#work" />}>
            See the brands <ArrowRight />
          </Button>
          <Button size="lg" variant="ghost" nativeButton={false} render={<Link href="/shop/contact" />}>
            Start a project
          </Button>
        </div>
      </section>

      <Separator />

      {/* Capabilities */}
      <section id="studio" className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">01 — What we do</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight">
          A studio for the whole arc of a brand.
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {capabilities.map((c) => (
            <div key={c.n} className="border-t border-border pt-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-muted-foreground">{c.n}</span>
                <h3 className="text-lg font-medium">{c.title}</h3>
              </div>
              <p className="mt-2 pl-9 text-sm text-muted-foreground text-pretty">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands we operate */}
      <section id="work" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">02 — Brands we operate</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight">
            We don&apos;t pitch decks. We run brands.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {brands.map((b) => {
              const inner = (
                <>
                  <div className="overflow-hidden rounded-xl border border-border">
                    <AspectRatio ratio={4 / 5}>
                      <div
                        className="size-full transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundColor: b.tone }}
                      />
                    </AspectRatio>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-sm text-muted-foreground">{b.kind}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {b.status}
                      {b.href && <ArrowUpRight className="ml-1 inline size-3.5" />}
                    </span>
                  </div>
                </>
              );
              return b.href ? (
                <Link key={b.name} href={b.href} className="group block">{inner}</Link>
              ) : (
                <div key={b.name} className="group block opacity-90">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">03 — How we work</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-balance">
          Fewer, better brands — owned from identity to checkout.
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {principles.map(([title, body]) => (
            <div key={title}>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
            Have a brand in mind?
          </h2>
          <Button size="lg" nativeButton={false} render={<Link href="/shop/contact" />}>
            Start a project <ArrowRight />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 FORMWORK — a brand studio</span>
          <div className="flex gap-6">
            <a className="hover:text-foreground" href="#studio">Studio</a>
            <a className="hover:text-foreground" href="#work">Work</a>
            <Link className="hover:text-foreground" href="/shop/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
