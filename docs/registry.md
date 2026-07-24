# Blocks registry (patterns)

Primitives ship as the npm package `@xpndui/ui` (locked, versioned). **Section
patterns/blocks** (hero, capabilities, product grid, …) ship instead as a
**shadcn registry** — consumers copy the source into their project and own it,
because sections are opinionated compositions meant to be customized.

## Layout

- Block source: `apps/showcase/src/registry/blocks/*.tsx` (each imports from `@xpndui/ui`)
- Manifest: `apps/showcase/registry.json`
- Built output: `apps/showcase/public/r/*.json` (served as static files)
- Live preview: `/blocks`

## Building

```bash
pnpm --filter showcase registry:build   # shadcn build → public/r/*.json
```

Commit the generated `public/r/*.json`; once the showcase app is deployed, they
are served at `https://<host>/r/<name>.json`.

## Installing a block (consumer)

```bash
npx shadcn add https://<host>/r/hero-studio.json
```

This copies `hero-studio.tsx` into the consumer's project and installs the
listed dependencies (`@xpndui/ui`, `lucide-react`). The consumer then edits it
freely — that's the point of a block.

## Adding a new block

1. Create `apps/showcase/src/registry/blocks/<name>.tsx` — self-contained,
   content parameterized via props with sensible defaults, primitives from `@xpndui/ui`.
2. Add an entry to `registry.json` (`type: registry:block`, `dependencies`, `files.target`).
3. `pnpm --filter showcase registry:build` and commit `public/r`.
4. Optionally preview it on `/blocks`.

> Primitives (npm, controlled) vs patterns (registry, copy-and-own) — pick the
> tier by how much a consumer will customize it.
