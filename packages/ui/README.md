# @xpnd/ui

The xpnd design system — accessible components, design tokens, and utilities built on
[shadcn](https://ui.shadcn.com) conventions and [Base UI](https://base-ui.com) (not Radix),
styled with Tailwind CSS v4.

## Install

```bash
pnpm add @xpnd/ui
# peer dependencies
pnpm add @base-ui/react react react-dom
```

## Setup (Tailwind v4)

In your global CSS (e.g. `app/globals.css`):

```css
@import "tailwindcss";
@import "@xpnd/ui/tokens.css";

/* Generate the utility classes used inside the package's compiled components.
   Adjust the relative path to your node_modules. */
@source "../node_modules/@xpnd/ui/dist";
```

`@xpnd/ui/tokens.css` is the theme: it defines the color, radius, and font tokens
(light + dark) via Tailwind v4 `@theme`. Changing your app's tokens is done by
overriding these CSS variables — there is no separate JS preset in v4.

## Usage

```tsx
import { Button, Card, CardContent, Badge } from "@xpnd/ui";

export function Example() {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Badge variant="sale">Sale</Badge>
      </CardContent>
    </Card>
  );
}
```

## Dark mode

Tokens ship both light and dark values. Toggle by putting a `dark` class on `<html>`
(e.g. via [`next-themes`](https://github.com/pacocoursey/next-themes)):

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  {children}
</ThemeProvider>
```

## Conventions (Base UI, not Radix)

- Polymorphism uses the `render` prop, not `asChild`:
  `<Button render={<a href="/x" />} nativeButton={false} />`.
- Rendering `Button` as a link/anchor needs `nativeButton={false}`.
- Selection controls (`Checkbox`, `RadioGroup`) style interaction states with
  `data-[checked]:` / `data-[unchecked]:`.
- Components are shipped as compiled ESM with `"use client"` preserved where needed,
  plus type declarations. Consume from a bundler (Next.js, Vite).
