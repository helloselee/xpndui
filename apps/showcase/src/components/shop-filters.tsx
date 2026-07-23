"use client";

import { Label } from "@xpndui/ui";
import { Checkbox } from "@xpndui/ui";
import { Slider } from "@xpndui/ui";
import { Separator } from "@xpndui/ui";
import { Button } from "@xpndui/ui";
import { Swatch } from "@xpndui/ui";

export const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Accessories"];
export const COLORS = [
  { name: "Sand", value: "oklch(0.88 0.02 90)" },
  { name: "Sage", value: "oklch(0.86 0.03 150)" },
  { name: "Slate", value: "oklch(0.7 0.02 250)" },
  { name: "Clay", value: "oklch(0.8 0.04 50)" },
  { name: "Fog", value: "oklch(0.92 0.005 250)" },
];
export const PRICE_MAX = 250;

export type Filters = {
  cats: string[];
  colors: string[];
  price: number[];
};

export function ShopFilters({
  filters,
  onToggleCat,
  onToggleColor,
  onPrice,
  onClear,
}: {
  filters: Filters;
  onToggleCat: (c: string) => void;
  onToggleColor: (c: string) => void;
  onPrice: (v: number[]) => void;
  onClear: () => void;
}) {
  const active = filters.cats.length + filters.colors.length +
    (filters.price[0] > 0 || filters.price[1] < PRICE_MAX ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Filters</h2>
        {active > 0 && (
          <Button variant="link" size="xs" className="h-auto px-0" onClick={onClear}>
            Clear all
          </Button>
        )}
      </div>

      {/* Category */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Category</p>
        {CATEGORIES.map((c) => (
          <div key={c} className="flex items-center gap-2">
            <Checkbox
              id={`cat-${c}`}
              checked={filters.cats.includes(c)}
              onCheckedChange={() => onToggleCat(c)}
            />
            <Label htmlFor={`cat-${c}`} className="font-normal">{c}</Label>
          </div>
        ))}
      </div>

      <Separator />

      {/* Color */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Color</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <Swatch
              key={c.name}
              color={c.value}
              label={c.name}
              selected={filters.colors.includes(c.name)}
              onClick={() => onToggleColor(c.name)}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Price</p>
          <span className="text-sm text-muted-foreground tabular-nums">
            ${filters.price[0]} – ${filters.price[1]}
          </span>
        </div>
        <Slider
          value={filters.price}
          onValueChange={(v) => onPrice(Array.isArray(v) ? [...v] : [v, v])}
          min={0}
          max={PRICE_MAX}
          step={10}
        />
      </div>
    </div>
  );
}
