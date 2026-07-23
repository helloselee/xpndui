import { cn } from "../lib/utils";

// Selectable color swatch. Encapsulates hover, focus-visible, and selected
// states so call sites (shop filters, PDP color picker) stay consistent and
// don't hand-roll the same button each time.
function Swatch({
  color,
  selected,
  label,
  className,
  ...props
}: React.ComponentProps<"button"> & { color: string; selected?: boolean; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      data-selected={selected || undefined}
      className={cn(
        "size-7 rounded-full border border-border outline-none transition-all",
        "hover:border-foreground/40",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-selected:border-transparent data-selected:ring-2 data-selected:ring-ring data-selected:ring-offset-2 data-selected:ring-offset-background",
        className
      )}
      style={{ backgroundColor: color }}
      {...props}
    />
  );
}

export { Swatch };
