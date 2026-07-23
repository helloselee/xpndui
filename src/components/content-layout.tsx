import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Shared scaffold for content/info pages (shipping, returns, contact):
// header + titled main + footer, so each page only supplies its body.
export function ContentLayout({
  title,
  intro,
  width = "prose",
  children,
}: {
  title: string;
  intro?: string;
  width?: "prose" | "wide";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className={`mx-auto px-6 py-12 ${width === "wide" ? "max-w-5xl" : "max-w-3xl"}`}>
        <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
        {intro && <p className="mt-3 max-w-xl text-muted-foreground text-pretty">{intro}</p>}
        <div className="mt-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
