# ElfUI Nuxt demo

A realistic Nuxt 4 app that consumes ElfUI **exactly like a real project**: it installs the published
[`@xouyi/elfui`](https://www.npmjs.com/package/@xouyi/elfui) package from npm, not a workspace link. It is the proof that a
published release works end to end; CI builds it on every push and pull request.

- Dashboard: stat cards, badges, filterable list (`app/pages/index.vue`)
- Members: form inside a dialog with inline validation (`app/pages/members.vue`)
- Settings: tabs, forms and a destructive confirmation (`app/pages/settings.vue`)
- Theme switcher (`novatron` / `elf`) in the header, persisted in a cookie (`app/composables/useElfTheme.ts`)

## How to try ElfUI

```bash
cd examples/nuxt-demo
bun install
bun run dev        # http://localhost:3000
bun run build      # production build, what CI runs
```

Requires Bun and Node 22+. Tailwind CSS v4 and `typescript@5` are installed as the ElfUI docs describe.

## Setup used here

```ts
// nuxt.config.ts
modules: ['@xouyi/elfui/nuxt'],
elfui: { theme: 'novatron', themes: ['elf'] },
```

```css
/* app/assets/css/main.css */
@import 'tailwindcss';
@import '@xouyi/elfui/styles.css';
```

## Bump the ElfUI version

```bash
cd examples/nuxt-demo
bun update @xouyi/elfui
bun run build
```

Commit `package.json` and `bun.lock` together.
