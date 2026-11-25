# Contributing to ElfUI

ElfUI is a Vue 3 / Nuxt 4 design system built on Reka UI and Tailwind CSS v4, distributed as source. Every change must
pass the quality gate (`bun run check`) before it is accepted. Use **Bun** only (`bun install`, `bun run`, `bunx`);
never npm, pnpm or yarn. Code, comments and docs are in English.

## Setup

```sh
bun install                              # also installs the pre-push hook
bunx playwright install chromium         # once; used by the browser tests and the OG image script
bun run docs:dev                         # docs site with live previews on :3000
```

Node 22+ must be installed next to Bun (some tools, such as Vitest and the shadcn-vue CLI, require it). The docs site
runs on Bun's runtime (`bunx --bun nuxt`), so it needs no native SQLite module.

## Repository layout

| Path | What lives there |
| :--- | :--- |
| `src/components/<name>/` | Component SFCs, `index.ts`, `examples/*.vue`, unit test. |
| `src/themes/`, `src/styles.css` | Theme token files and the Tailwind v4 mapping. |
| `apps/docs/` | The documentation site (Nuxt 4 + Nuxt Content, built with ElfUI). Markdown pages in `content/docs/`. |
| `apps/playground/` | Nuxt 4 integration app linked to the live sources. |
| `examples/nuxt-demo/` | A consumer app installed from a GitHub tag. |
| `registry.json`, `registry/r/` | Generated shadcn-vue registry (committed). |
| `llms.txt`, `llms-full.txt` | Generated AI documentation (committed). |

## Adding a component

Create `src/components/<name>/` with:

| File | Purpose |
| :--- | :--- |
| `<Name>.vue` | The component. Reka UI primitive + `cva()` variants + `cn()`. Use relative imports in `src`. Document every prop with a JSDoc comment; the docs API table is generated from them. |
| `index.ts` | Public exports, the `cva` factory and prop types. |
| `examples/<Example>.vue` | One single-file component per example (`Default`, `Variants`, `Sizes`, `WithIcon`, `Disabled`, ...). Import components from `'@elf/ui'` exactly as a consumer would. These files are the live previews and the code tabs on the docs site, and the fixtures the browser tests mount. |
| `<Name>.test.ts` | Unit tests (Vitest + `@vue/test-utils`): rendering, variants, emitted events, keyboard behavior. |

Then wire it into the rest of the repository:

1. Export it from `src/index.ts`.
2. Add a `meta` entry in `scripts/sync-registry.ts` (title, description, npm `dependencies`, `registryDependencies`),
   then run `bun run registry:build` and commit the regenerated `registry.json` and `registry/r/`.
3. Add curated prose to `scripts/llms-meta.ts`, then run `bun run llms` and commit `llms.txt` / `llms-full.txt`.
   The code samples in `llms-full.txt` are read from your `examples/` folder.
4. Write the docs page `apps/docs/content/docs/2.components/NN.<name>.md` (see below).
5. Add an entry to the Unreleased section of `CHANGELOG.md`.

Design rules: 100% dark UI, tokens only (never hard-coded colors), works in both the `elf` and `novatron` themes,
keyboard accessible, no `class*='size-'` selectors with escaped quotes (use `[class*=size-]`).

### Writing the docs page

Component pages are Markdown with MDC components (`::name{prop="value"}` followed by a closing `::`). Copy an existing page
such as `apps/docs/content/docs/2.components/01.button.md`. Its front matter sets `title`, `description`, `component` (the
directory name) and optional `links`. The body follows a fixed order: first preview, Installation, Usage, Examples, API
Reference, Accessibility (with a keyboard table), Theming, Do and don't.

| MDC component | Renders |
| :--- | :--- |
| `::component-preview{name="button-variants"}` | Live preview of `src/components/button/examples/Variants.vue` plus a Code tab with that exact file (highlighted at build time), a copy button and a per-preview theme toggle. The name is `<dir>-<kebab-case file name>`. |
| `::component-install{component="button"}` | Package and Registry installation tabs, with dependencies read from `registry.json`. |
| `::component-api{component="button"}` | Props, events and slots tables for every `.vue` file in the directory, generated with `vue-component-meta` from the real sources. Never write these tables by hand. |
| `::component-tokens{component="button"}` | The theme tokens the component's classes use, detected from its source. |
| `::callout{type="info"}` | A note. Types: `info`, `tip`, `warning`, `danger`. |

Generated data lives in `apps/docs/app/generated/` and the changelog, roadmap and contributing pages are copied from the
repository root; both are produced by `bun run docs:prepare` (run automatically by `docs:dev` and `docs:build`) and are not
committed. A missing example name or component directory fails the docs build, so broken pages cannot ship.

Design rules: 100% dark UI, tokens only (never hard-coded colors), works in both the `elf` and `novatron` themes,
keyboard accessible, no `class*='size-'` selectors with escaped quotes (use `[class*=size-]`).

## The quality gate

`bun run check` runs, in order:

1. `typecheck`: `vue-tsc` over sources, examples, scripts and tests.
2. `lint`: ESLint with `@antfu/eslint-config` (Vue + TypeScript). `bun run lint:fix` autofixes.
3. `test`: Vitest unit project (happy-dom): `src/**/*.test.ts`. Browser (axe, interaction) tests in real Chromium are
   being rebuilt on top of the examples and will join this step.
4. `contrast`: WCAG contrast of every theme token pair.
5. `registry:check`: rebuilds the registry and fails if the committed `registry.json` / `registry/r` differ.
6. `llms:check`: fails if `llms.txt` / `llms-full.txt` are stale (`bun run llms` regenerates them).
7. `docs:typecheck` (vue-tsc over the docs app), `docs:build` (a full `nuxt generate`, which fails on a broken example
   or component reference) and `playground:build`.

Run subsets while developing: `bun run test:unit`, `bun run docs:dev`.

### Visual regression (being rebuilt)

The Storybook-based screenshot tests were removed together with Storybook. They are being replaced by Playwright tests
that screenshot each example in isolation on the docs site, in both themes. Baselines will be created **only** in the
official Playwright Docker image (`mcr.microsoft.com/playwright:v1.64.0-noble`, the same image the CI `visual` job
uses) because screenshots depend on the operating system's fonts and rasterizer. Until the new tests land, the CI
**Visual regression** job builds the docs site inside that image and `bun run test:visual` is a no-op.

## Git hooks and CI

- **pre-push** (installed by `bun install` through `simple-git-hooks`): `bun run prepush` = typecheck + lint + unit tests.
  Fast on purpose; bypass only in emergencies with `git push --no-verify`.
- **CI** (`.github/workflows/ci.yml`, on push and pull request to `main`, Bun + Node 22): the full `bun run check`, plus
  the Playwright visual job. The built docs site is uploaded as an artifact. The docs site (`apps/docs`), the registry and
  the llms files are deployed to GitHub Pages at `https://xouyi.github.io/elfUI/` only after CI succeeds on `main`. A separate workflow builds `examples/nuxt-demo` from the published tag.

Commits are small and in English, written in the imperative mood ("Add Tooltip component").

## Releasing

1. Add a `## x.y.z` section to `CHANGELOG.md` (rename the Unreleased section) and commit it on `main`.
2. Run `bun run release x.y.z`. It refuses unless the working tree is clean, you are on `main`, the changelog has the
   section, and `bun run check` passes. It then bumps `package.json`, commits `Release vx.y.z` and creates the tag `vx.y.z`.
3. Publish: `git push origin main --follow-tags`.
4. Bump `examples/nuxt-demo` to the new tag (see its README) in a follow-up commit.
