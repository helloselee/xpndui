import Link from "next/link";

const links = [
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
        <span>© 2026 Atelier</span>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link key={l.label} className="hover:text-foreground" href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
