import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button } from "@xpndui/ui";
import { IndicatorBadge } from "@xpndui/ui";

// Bundles the relative parent + icon + overlay count so call sites can't forget
// the `relative` anchor (the classic overlay-badge footgun).
export function CartButton({ count = 0, href = "/shop/cart" }: { count?: number; href?: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={`Cart, ${count} items`}
      nativeButton={false}
      render={<Link href={href} />}
    >
      <ShoppingBag />
      {count > 0 && <IndicatorBadge>{count > 99 ? "99+" : count}</IndicatorBadge>}
    </Button>
  );
}
