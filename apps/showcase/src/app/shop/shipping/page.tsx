import type { Metadata } from "next";
import { Truck } from "lucide-react";

import { ContentLayout } from "@/components/content-layout";
import { Alert, AlertTitle, AlertDescription } from "@xpnd/ui";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@xpnd/ui";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@xpnd/ui";

export const metadata: Metadata = {
  title: "Shipping — Atelier",
  description: "Shipping methods, timelines, and costs.",
};

const methods = [
  ["Standard", "3–5 business days", "Free over $150, else $8"],
  ["Express", "1–2 business days", "$12"],
  ["International", "6–10 business days", "$20"],
];

const faqs = [
  ["Do you ship internationally?", "Yes, to select countries across Europe and North America. Duties and taxes are calculated at checkout where applicable."],
  ["Can I track my order?", "Every order includes a tracking link in the shipping confirmation email. You can also find it under your account orders."],
  ["When does my order ship?", "Orders placed before 2pm local time ship the same business day. Orders after that ship the next business day."],
];

export default function Shipping() {
  return (
    <ContentLayout
      title="Shipping"
      intro="Considered delivery, wherever you are. Here's what to expect."
    >
      <Alert className="mb-8">
        <Truck />
        <AlertTitle>Free standard shipping over $150</AlertTitle>
        <AlertDescription>Applied automatically at checkout. No code needed.</AlertDescription>
      </Alert>

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Delivery time</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods.map(([m, t, c]) => (
              <TableRow key={m}>
                <TableCell className="font-medium">{m}</TableCell>
                <TableCell className="text-muted-foreground">{t}</TableCell>
                <TableCell className="text-right">{c}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mt-12 mb-2 text-lg font-medium tracking-tight">Common questions</h2>
      <Accordion>
        {faqs.map(([q, a]) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ContentLayout>
  );
}
