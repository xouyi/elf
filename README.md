# Elf

[![CI](https://github.com/xouyi/elf/actions/workflows/ci.yml/badge.svg)](https://github.com/xouyi/elf/actions/workflows/ci.yml)
[![Docs](https://github.com/xouyi/elf/actions/workflows/pages.yml/badge.svg)](https://xouyi.github.io/elf/)

**[Documentation](https://xouyi.github.io/elf/)** · **[llms.txt](https://xouyi.github.io/elf/llms.txt)** (for AI assistants, [full version](https://xouyi.github.io/elf/llms-full.txt)) · **[Example app](examples/nuxt-demo)**

Elf is a dark-only design system for Vue 3 and Nuxt 4. Components are built on
[Reka UI](https://reka-ui.com) primitives with shadcn-vue style structure (CVA variants, `cn()`,
CSS-variable theming) and styled with Tailwind CSS v4.

- Components: Button, Input, Badge, Card, Dialog, Tabs (all prefixed `Elf` in Vue, for example `<ElfButton>`)
- Themes: `elf` (violet, rounded, default) and `novatron` (gold on obsidian, sharp corners)
- Distribution: one npm-style package `@elf/ui` installed from GitHub, plus a shadcn-vue registry for copying components
- Docs: Storybook 10 published at https://xouyi.github.io/elf/ (`bun run storybook` locally)
- AI assistants: `llms.txt` and `llms-full.txt`, generated from the sources (`bun run llms`)
- Example: [`examples/nuxt-demo`](examples/nuxt-demo) installs Elf from a GitHub tag like a real consumer

Elf ships Vue SFC sources. The Vue compiler needs `typescript` in your project to resolve the Reka UI prop types inside those sources, so install it as a dev dependency.

Requirements: Bun, Nuxt 4 (or Vue 3 + Vite), Tailwind CSS v4 with `@tailwindcss/vite`.

## Install in a Nuxt 4 app

```bash
bun add github:xouyi/elf#v0.1.0 tailwindcss @tailwindcss/vite
bun add -d typescript
```

`nuxt.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@elf/ui/nuxt'],
  css: ['~/assets/css/main.css'],
  elf: { theme: 'novatron' }, // 'elf' | 'novatron'; optional: themes: ['elf'] to bundle extra themes
  vite: { plugins: [tailwindcss()] },
})
```

`app/assets/css/main.css`:

```css
@import 'tailwindcss';
@import '@elf/ui/styles.css';
```

Use the components (auto-imported with the `Elf` prefix):

```vue
<ElfCard>
  <ElfCardHeader><ElfCardTitle>Hello</ElfCardTitle></ElfCardHeader>
  <ElfCardContent><ElfButton>Save</ElfButton></ElfCardContent>
</ElfCard>
```

`@elf/ui/styles.css` maps Elf tokens to Tailwind colors and radii and tells Tailwind to scan the
Elf component sources. The Nuxt module adds the theme token CSS and sets `data-theme` on `<html>`.

### Without Nuxt

```ts
import { ElfButton } from '@elf/ui'
```

```css
@import 'tailwindcss';
@import '@elf/ui/styles.css';
@import '@elf/ui/themes/elf.css';
```

Set `<html data-theme="elf">` (or `novatron`).

## Theming

Each theme is one CSS file in `src/themes/` that defines `--elf-*` tokens under `[data-theme='<name>']`:
`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`,
`success`, `warning` (each with a `-foreground`), `border`, `input`, `ring`, `radius`, `radius-pill`.
Switch at runtime with `document.documentElement.dataset.theme = 'elf'`. Tokens can also be scoped to any
element: `<div data-theme="elf">`.

`bun run contrast` checks WCAG AA (4.5:1 text pairs, 3:1 for input border and focus ring) for every theme.

## Registry (copy a component into your project)

Components can be copied and forked with the shadcn-vue CLI. Register the namespace in `components.json`:

```json
{ "registries": { "@elf": "https://xouyi.github.io/elf/r/{name}.json" } }
```

```bash
bunx shadcn-vue@latest add @elf/button @elf/dialog @elf/elf-theme
```

The same files are also served from `https://raw.githubusercontent.com/xouyi/elf/main/registry/r/{name}.json` as a fallback.

Registry items rewrite imports to your aliases (`@/lib/utils`, `@/components/ui/*`). Regenerate with
`bun run registry:build`; the generated `registry/r/*.json` files are committed.

## Contributing

```bash
bun install
bun run storybook        # docs and visual testing
bun run check            # typecheck, tests, contrast, registry, storybook build, playground build
```

Adding a component:

1. Create `src/components/<name>/` with the SFCs, an `index.ts` (variants, prop types), `<Name>.stories.ts` and `<Name>.test.ts`.
2. Import siblings and utilities with relative paths (`../../lib/utils`); the registry sync rewrites them.
3. Export it with the `Elf` prefix from `src/index.ts`.
4. Add it to `scripts/sync-registry.ts`, then run `bun run check`.

Node 22+ is recommended for the test and Storybook tooling.

## Release flow

```bash
# update CHANGELOG.md and package.json version
bun run check
git commit -am "chore: release v0.1.0"
git tag v0.1.0
git push --follow-tags
```

Consumers pin with `bun add github:xouyi/elf#v0.1.0`.

## Structure

```
src/components/<name>/   SFCs, index.ts, stories, tests
src/themes/              one CSS file per theme
src/styles.css           Tailwind v4 token mappings and base layer
src/nuxt/module.ts       Nuxt module
src/docs                 Storybook MDX guides (component docs live next to each component)
scripts/generate-llms.ts llms.txt generator (curated prose in scripts/llms-meta.ts)
examples/nuxt-demo       Nuxt 4 app installed from the GitHub tag
registry.json, registry/r  shadcn-vue registry
apps/playground          Nuxt 4 integration app
.storybook               Storybook 10 config
```

## License

MIT
