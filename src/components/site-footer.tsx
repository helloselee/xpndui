import Link from "next/link";

const links = ["Shipping", "Returns", "Contact"];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
        <span>© 2026 Atelier</span>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link key={l} className="hover:text-foreground" href="/">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
