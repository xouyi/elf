# Contributing to ElfUI

ElfUI is a Vue 3 / Nuxt 4 design system built on Reka UI and Tailwind CSS v4, distributed as source. Every change must
pass the quality gate (`bun run check`) before it is accepted. Use **Bun** only (`bun install`, `bun run`, `bunx`);
never npm, pnpm or yarn. Code, comments and docs are in English.

## Setup

```sh
bun install                              # also installs the pre-push hook
bunx playwright install chromium         # once; used by the browser tests, the visual tests and the OG image script
bun run docs:dev                         # docs site with live previews on :3000
```

Node 22+ must be installed next to Bun (some tools, such as Vitest and the shadcn-vue CLI, require it). The docs site
runs on Bun's runtime (`bunx --bun nuxt`), so it needs no native SQLite module.

## Repository layout

| Path | What lives there |
| :--- | :--- |
| `src/components/<name>/` | Component SFCs, `index.ts`, `examples/*.vue`, unit test. |
| `tests/browser/` | Vitest browser-mode tests (real Chromium): axe over every example in both themes, interaction tests. |
| `tests/visual/` | Playwright visual regression tests and the committed baselines in `__screenshots__/`. |
| `src/themes/`, `src/styles.css` | Theme token files and the Tailwind v4 mapping. |
| `apps/docs/` | The documentation site (Nuxt 4 + Nuxt Content, built with ElfUI). Markdown pages in `content/docs/`. |
| `apps/playground/` | Nuxt 4 integration app linked to the live sources. |
| `examples/nuxt-demo/` | A consumer app (installed from a GitHub tag until the first npm release). |
| `cli/` | The `elfui` CLI (`bun run build:cli` bundles it to `dist/cli.mjs`; `bun run test:cli`). |
| `registry.json`, `registry/r/` | Generated shadcn-vue registry (committed). |
| `llms.txt`, `llms-full.txt` | Generated AI documentation (committed). |

## Adding a component

Create `src/components/<name>/` with:

| File | Purpose |
| :--- | :--- |
| `<Name>.vue` | The component. Reka UI primitive + `cva()` variants + `cn()`. Use relative imports in `src`. Document every prop with a JSDoc comment; the docs API table is generated from them. |
| `index.ts` | Public exports, the `cva` factory and prop types. |
| `examples/<Example>.vue` | One single-file component per example (`Default`, `Variants`, `Sizes`, `WithIcon`, `Disabled`, ...). Import components from `'elfui'` exactly as a consumer would. These files are the live previews and the code tabs on the docs site, and the fixtures the browser tests mount. |
| `<Name>.test.ts` | Unit tests (Vitest + `@vue/test-utils`): rendering, variants, emitted events, ARIA attributes. |

Then wire it into the rest of the repository:

1. Export it from `src/index.ts`.
2. Add a `meta` entry in `scripts/sync-registry.ts` (title, description, npm `dependencies`, `registryDependencies`),
   then run `bun run registry:build` and commit the regenerated `registry.json` and `registry/r/`.
3. Add curated prose to `scripts/llms-meta.ts`, then run `bun run llms` and commit `llms.txt` / `llms-full.txt`.
   The code samples in `llms-full.txt` are read from your `examples/` folder.
4. Write the docs page `apps/docs/content/docs/2.components/NN.<name>.md` (see below).
5. Add an entry to the Unreleased section of `CHANGELOG.md`.
6. Cover the behavior: examples are tested automatically (axe, both themes, plus a visual baseline each); add interaction
   tests to `tests/browser/interactions.test.ts` for keyboard, focus and state behavior. Then create the baselines (see
   "Visual regression").

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
3. `test`: Vitest with two projects. `unit` (happy-dom, `src/**/*.test.ts`) and `browser` (real Chromium through
   Playwright, `tests/browser/**/*.test.ts`): every example mounted in both themes with `axe-core`, and keyboard,
   focus and `v-model` interaction tests.
4. `contrast`: WCAG contrast of every theme token pair.
5. `registry:check`: rebuilds the registry and fails if the committed `registry.json` / `registry/r` differ.
6. `llms:check`: fails if `llms.txt` / `llms-full.txt` are stale (`bun run llms` regenerates them).
7. `docs:typecheck` (vue-tsc over the docs app), `docs:build` (a full `nuxt generate`, which fails on a broken example
   or component reference) and `playground:build`.

Run subsets while developing: `bun run test:unit`, `bun run test:browser`, `bun run docs:dev`.

### How tests work

| Layer | Where | Command |
| :--- | :--- | :--- |
| Unit | `src/components/<name>/<Name>.test.ts` | `bun run test:unit` |
| Browser (axe + interaction) | `tests/browser/` | `bun run test:browser` |
| Visual regression | `tests/visual/` | `bun run test:visual` (CI image only) |

The browser project discovers every `src/components/*/examples/*.vue`, mounts it in both themes and requires zero axe
violations, so a new example is covered without writing a test. Behavior (focus trap, keyboard navigation, `v-model`)
goes into `tests/browser/interactions.test.ts`. The full explanation is on the docs site under Resources, Testing.

### Visual regression

The docs site renders each example alone at `/__examples/<component>/<example>?theme=elf|novatron` (noindex, not in the
sitemap or search). `tests/visual/examples.spec.ts` screenshots every example in both themes at 1280 and 360 px and
compares them with `tests/visual/__screenshots__/<component>/<example>-<theme>-<width>.png`.

Baselines depend on the operating system's fonts and rasterizer, so they are created **only** in the official Playwright
Docker image (`mcr.microsoft.com/playwright:v1.64.0-noble`), by the **Visual baselines** workflow. Never commit PNGs
generated on your machine. To update baselines after an intentional visual change:

1. Open a pull request with the change. The **Visual regression** job fails and uploads the `visual-report` artifact.
2. Run **Actions - Visual baselines - Run workflow** on the pull request branch. It commits the changed PNGs to the branch.
3. Review the PNG diff in the pull request's **Files changed** tab; every changed image must be explained by the change.
4. Push an empty commit (pushes by the workflow do not start CI) so the required checks run, then merge.

A new example fails with "A snapshot doesn't exist" until the workflow has run once for it. Delete the PNGs of removed
examples in the same pull request. To debug the harness locally, `bun run docs:build` and
`VISUAL_PORT=4390 bun run test:visual`; screenshot comparisons will not match CI there.

## Git hooks and CI

- **pre-push** (installed by `bun install` through `simple-git-hooks`): `bun run prepush` = typecheck + lint + unit tests.
  Fast on purpose; bypass only in emergencies with `git push --no-verify`.
- **CI** (`.github/workflows/ci.yml`, on push and pull request to `main`, Bun + Node 22): the full `bun run check`
  (**Check**, includes the browser tests), the blocking Playwright **Visual regression** job, and **Build example**. The built docs site is uploaded as an artifact. The docs site (`apps/docs`), the registry and
  the llms files are deployed to GitHub Pages at `https://xouyi.github.io/elfUI/` only after CI succeeds on `main`. A separate workflow builds `examples/nuxt-demo`. The CLI is tested by unit tests and by an end-to-end test of the built binary against temporary projects and the local `registry/r` (no network); both run inside `bun run check`.

Commits are small and in English, written in the imperative mood ("Add Tooltip component").

## Releasing

1. Add a `## x.y.z` section to `CHANGELOG.md` (rename the Unreleased section) and commit it on `main`.
2. Run `bun run release x.y.z` (`x.y.z-beta.N` for a prerelease). It refuses unless the working tree is clean, you are on `main`, the changelog has the
   section, and `bun run check` passes. It then bumps `package.json`, commits `Release vx.y.z` and creates the tag `vx.y.z`. It never pushes.
3. Publish: `git push origin main --follow-tags`. The **Release** workflow (`.github/workflows/release.yml`) then verifies that the tag equals
   the `package.json` version, runs `bun run check`, publishes `elfui` to npm with provenance and creates the GitHub Release from the changelog section.
   Prereleases are published with the `next` dist-tag, so `bun add elfui` keeps resolving to the last stable version.
4. After the first npm release, switch `examples/nuxt-demo` to `"elfui": "^x.y.z"` (see its README).

## Publishing to npm (one-time setup)

CI publishes with npm Trusted Publishing (OIDC): there is no `NPM_TOKEN` secret. npm only lets you configure a trusted publisher for a package
that already exists, so the very first version is published by hand.

1. Create an npm account at npmjs.com, verify the e-mail and enable two-factor authentication (authenticator app or security key).
2. First publish from a clean checkout of the release tag (this claims the name `elfui`). `bunx npm` is used because Bun has no `login`/OIDC flow
   and `npm publish` is the only client that can attach provenance:

   ```bash
   git clone https://github.com/xouyi/elfUI.git && cd elfUI
   git checkout v0.3.0 && bun install --frozen-lockfile
   bun run check
   bunx npm@latest login
   bunx npm@latest publish --access public   # `prepack` builds dist/cli.mjs; enter the 2FA code when asked
   ```

   Provenance cannot be generated from a laptop, so this first version has none; later ones do.
3. On npmjs.com open **elfui > Settings > Trusted publishing > GitHub Actions** and enter owner `xouyi`, repository `elfUI`, workflow filename `release.yml`
   (leave the environment empty). Save.
4. Optional hardening: under **Settings > Publishing access** choose "Require two-factor authentication and disallow tokens".
5. From then on, releases are `bun run release x.y.z` plus `git push origin main --follow-tags`.

Trusted Publishing needs npm 11.5.1 or newer and Node 22.14 or newer; the workflow uses `bunx npm@latest` on Node 22. `bun publish` is not used
because it cannot perform the OIDC token exchange.
