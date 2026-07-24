type Capability = { n: string; title: string; body: string };

const defaultItems: Capability[] = [
  { n: "01", title: "Brand & identity", body: "Naming, voice, and visual systems built to last past a launch." },
  { n: "02", title: "Product design", body: "From first sketch to a line worth putting your name on." },
  { n: "03", title: "Commerce & storefront", body: "Design systems and stores that turn browsers into believers." },
  { n: "04", title: "Growth & retention", body: "The unglamorous work that keeps a brand alive." },
];

export function Capabilities({
  eyebrow = "01 — What we do",
  heading = "A studio for the whole arc of a brand.",
  items = defaultItems,
}: {
  eyebrow?: string;
  heading?: string;
  items?: Capability[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight">{heading}</h2>
      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {items.map((c) => (
          <div key={c.n} className="flex gap-3 border-t border-border pt-5">
            <span className="w-6 shrink-0 font-mono text-sm leading-7 text-muted-foreground">{c.n}</span>
            <div className="flex-1">
              <h3 className="text-lg font-medium leading-7">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
