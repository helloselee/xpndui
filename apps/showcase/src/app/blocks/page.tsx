import { HeroStudio } from "@/registry/blocks/hero-studio";
import { Capabilities } from "@/registry/blocks/capabilities";

// Live preview of the distributable registry blocks (installed via
// `npx shadcn add <registry-url>/hero-studio.json`).
export default function BlocksPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          xpndui registry — block previews
        </p>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 pt-6">
          <code className="text-xs text-muted-foreground">hero-studio</code>
        </div>
        <HeroStudio />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 pt-6">
          <code className="text-xs text-muted-foreground">capabilities</code>
        </div>
        <Capabilities />
      </section>
    </div>
  );
}
