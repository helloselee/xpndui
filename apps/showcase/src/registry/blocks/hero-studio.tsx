import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@xpndui/ui";

type Cta = { label: string; href: string };

export function HeroStudio({
  eyebrow = "Brand studio — est. 2026",
  title = "We build brands worth keeping.",
  description = "A studio that designs, builds, and operates consumer brands end to end — identity, product, and the storefront they live in.",
  primaryCta = { label: "See the work", href: "#work" },
  secondaryCta = { label: "Start a project", href: "#contact" },
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta | null;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-36">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-6 max-w-4xl text-5xl font-medium tracking-tight text-balance md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">{description}</p>
      <div className="mt-10 flex items-center gap-3">
        <Button size="lg" nativeButton={false} render={<Link href={primaryCta.href} />}>
          {primaryCta.label} <ArrowRight />
        </Button>
        {secondaryCta && (
          <Button size="lg" variant="ghost" nativeButton={false} render={<Link href={secondaryCta.href} />}>
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
