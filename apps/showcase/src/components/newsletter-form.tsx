"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

import { Input } from "@xpnd/ui";
import { Button } from "@xpnd/ui";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("You're on the list", { description: "Thanks for subscribing to the journal." });
    setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
