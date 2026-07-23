import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, Clock, BadgeCheck } from "lucide-react";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@xpndui/ui";
import { Separator } from "@xpndui/ui";
import { Card, CardContent } from "@xpndui/ui";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@xpndui/ui";

export const metadata: Metadata = {
  title: "Returns — Atelier",
  description: "Our returns and exchanges policy.",
};

const highlights = [
  { icon: Clock, title: "30 days", body: "Return unworn items within 30 days of delivery." },
  { icon: RotateCcw, title: "Free returns", body: "Prepaid label included for domestic orders." },
  { icon: BadgeCheck, title: "Easy exchanges", body: "Swap size or color at no extra cost." },
];

const steps = [
  ["Start a request", "Open your order under account and select the items to return."],
  ["Print the label", "We email a prepaid shipping label within minutes."],
  ["Drop it off", "Pack items with tags attached and drop at any carrier point."],
  ["Get refunded", "Refunds land within 5 business days of us receiving the return."],
];

const faqs = [
  ["What can't be returned?", "Final-sale items, gift cards, and worn or washed pieces without tags."],
  ["How long do refunds take?", "5 business days after we receive and inspect your return, to your original payment method."],
  ["Can I exchange instead of refund?", "Yes. Choose exchange when starting your request and pick the new size or color."],
];

export default function Returns() {
  return (
    <ContentLayout
      title="Returns & exchanges"
      intro="Not quite right? Sending it back is simple and free for domestic orders."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {highlights.map((h) => {
          const Icon = h.icon;
          return (
            <Card key={h.title}>
              <CardContent className="space-y-2">
                <Icon className="size-5 text-muted-foreground" />
                <p className="font-medium">{h.title}</p>
                <p className="text-sm text-muted-foreground">{h.body}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-12 mb-4 text-lg font-medium tracking-tight">How to return</h2>
      <ol className="space-y-4">
        {steps.map(([title, body], i) => (
          <li key={title} className="flex gap-4">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm text-background tabular-nums">
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <Separator className="my-10" />

      <h2 className="mb-2 text-lg font-medium tracking-tight">Common questions</h2>
      <Accordion>
        {faqs.map(([q, a]) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10">
        <Button nativeButton={false} render={<Link href="/shop/contact" />}>Still need help? Contact us</Button>
      </div>
    </ContentLayout>
  );
}
