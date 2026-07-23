"use client";

import { useState, type FormEvent } from "react";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { ContentLayout } from "@/components/content-layout";
import { Button } from "@xpndui/ui";
import { Input } from "@xpndui/ui";
import { Label } from "@xpndui/ui";
import { Textarea } from "@xpndui/ui";
import { Separator } from "@xpndui/ui";

const details = [
  { icon: Mail, title: "Email", body: "help@atelier.com" },
  { icon: Clock, title: "Response time", body: "Within 1 business day" },
  { icon: MessageSquare, title: "Hours", body: "Mon–Fri, 9am–6pm CET" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent", { description: "We'll get back to you within a business day." });
  };

  return (
    <ContentLayout
      title="Contact"
      intro="Questions about an order, sizing, or a piece you're eyeing? We're happy to help."
      width="wide"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_260px]">
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Jane Doe" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@atelier.com" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} placeholder="Tell us a little more…" required />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit">Send message</Button>
            {sent && <span className="text-sm text-muted-foreground">Thanks — we&apos;ll be in touch.</span>}
          </div>
        </form>

        {/* Details */}
        <aside className="space-y-6">
          {details.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.title} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{d.title}</p>
                  <p className="text-sm text-muted-foreground">{d.body}</p>
                </div>
              </div>
            );
          })}
          <Separator />
          <p className="text-sm text-muted-foreground">
            Prefer to browse? Head back to the{" "}
            <a href="/shop/collection" className="text-foreground underline-offset-4 hover:underline">shop</a>.
          </p>
        </aside>
      </div>
    </ContentLayout>
  );
}
