# Elf Nuxt demo

A realistic Nuxt 4 app that consumes Elf **exactly like a real project**: it installs `@elf/ui` from the public
GitHub tag, not from a workspace link. It is the proof that a published tag works end to end.

- Dashboard: stat cards, badges, filterable list (`app/pages/index.vue`)
- Members: form inside a dialog with inline validation (`app/pages/members.vue`)
- Settings: tabs, forms and a destructive confirmation (`app/pages/settings.vue`)
- Theme switcher (`novatron` / `elf`) in the header, persisted in a cookie (`app/composables/useElfTheme.ts`)

## How to try Elf

```bash
cd examples/nuxt-demo
bun install
bun run dev        # http://localhost:3000
bun run build      # production build, what CI runs
```

Requires Bun and Node 22+. Tailwind CSS v4 and `typescript` are installed as the Elf docs describe.

## Pin and bump the Elf version

The version is the tag in `package.json`:

```json
"@elf/ui": "github:xouyi/elf#v0.1.0"
```

To move to a new release (after the tag exists on GitHub):

```bash
cd examples/nuxt-demo
bun remove @elf/ui
bun add github:xouyi/elf#v0.2.0
bun run build
```

Remove and add (instead of editing `package.json`) so `bun.lock` records the new commit. Commit both files.

## Notes

- This directory is not part of the root workspace (`workspaces` only covers `apps/*`) and is not published
  with the package (`files` whitelist). It has its own `bun.lock`.
- CI (`.github/workflows/example.yml`) installs and builds it on every push and pull request.
