"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@xpnd/ui";
import { Badge } from "@xpnd/ui";
import { Card, CardContent } from "@xpnd/ui";
import { AspectRatio } from "@xpnd/ui";

export type Product = {
  name: string;
  price: string;
  was?: string;
  tone: string;
  sale?: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group gap-0 pt-0">
      {/* Image bleeds to the card edges; the Card's overflow-hidden + rounded-xl clip it */}
      <Link href="/shop/product" className="relative block">
        <AspectRatio ratio={3 / 4}>
          <div
            className="size-full transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundColor: product.tone }}
          />
        </AspectRatio>
        {product.sale && (
          <Badge variant="sale" className="absolute top-3 left-3">
            Sale
          </Badge>
        )}
      </Link>

      {/* CardContent carries the horizontal padding; Card carries the bottom padding */}
      <CardContent className="pt-4">
        <Link href="/shop/product" className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <div className="text-right text-sm">
            <span className={product.sale ? "text-sale font-medium" : "font-medium"}>
              {product.price}
            </span>
            {product.was && (
              <span className="ml-1.5 text-muted-foreground line-through">{product.was}</span>
            )}
          </div>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() => toast.success("Added to bag", { description: product.name })}
        >
          Add to bag
        </Button>
      </CardContent>
    </Card>
  );
}
