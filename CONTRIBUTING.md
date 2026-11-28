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
| `tests/browser/` | Vitest browser-mode tests (real Chromium): axe over every example in every theme, interaction tests. |
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
| `examples/<Example>.vue` | One single-file component per example (`Default`, `Variants`, `Sizes`, `WithIcon`, `Disabled`, ...). Import components from `'@xouyi/elfui'` exactly as a consumer would. These files are the live previews and the code tabs on the docs site, and the fixtures the browser tests mount. |
| `<Name>.test.ts` | Unit tests (Vitest + `@vue/test-utils`): rendering, variants, emitted events, ARIA attributes. |

Then wire it into the rest of the repository:

1. Export it from `src/index.ts`.
2. Add a `meta` entry in `scripts/sync-registry.ts` (title, description, npm `dependencies`, `registryDependencies`),
   then run `bun run registry:build` and commit the regenerated `registry.json` and `registry/r/`.
3. Add curated prose to `scripts/llms-meta.ts`, then run `bun run llms` and commit `llms.txt` / `llms-full.txt`.
   The code samples in `llms-full.txt` are read from your `examples/` folder.
4. Write the docs page `apps/docs/content/docs/2.components/NN.<name>.md` (see below).
5. Add an entry to the Unreleased section of `CHANGELOG.md`.
6. Cover the behavior: examples are tested automatically (axe, every theme, plus a visual baseline each); add interaction
   tests to `tests/browser/interactions.test.ts` for keyboard, focus and state behavior. Then create the baselines (see
   "Visual regression").

Design rules: tokens only (never hard-coded colors, no `dark:` variants), works in the dark `elf` and `nova` themes and the light `elfwood` theme,
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

#### Name, version and URLs (never hard-code them)

The package name, version, repository, site and registry URLs are read from `package.json` at build time by
`apps/docs/lib/site.ts`. A release therefore never requires a docs edit. In Vue components call `useSite()`
(`site.name`, `site.version`, `site.repo`, `site.site`, `site.registry`, `site.npm`). In Markdown, including fenced
code blocks (Shiki highlights the real value), write a placeholder; a `content:file:beforeParse` hook replaces it
in the raw Markdown before parsing:

| Placeholder | Value |
| :--- | :--- |
| `{{pkg}}` | npm package name (`@xouyi/elfui`) |
| `{{version}}` | `package.json` version, no leading `v` (a tag is `v{{version}}`) |
| `{{repo}}` | GitHub repository URL |
| `{{repo-slug}}` | GitHub `owner/name`, for `github:` installs |
| `{{site}}` | Published docs site URL, no trailing slash |
| `{{registry}}` | Static shadcn-vue registry base URL (`{{registry}}/button.json`) |
| `{{registry-raw}}` | The `raw.githubusercontent.com` registry fallback |
| `{{npm}}` | npm package page |

Write them without spaces. Other `{{ ... }}` text (Vue mustache in examples) is left alone. `CHANGELOG.md`,
`CONTRIBUTING.md` and `ROADMAP.md` are copied verbatim and keep their history text. `tests/docs/site.test.ts` fails when a
docs page or component contains a hard-coded `@xouyi/elfui@<semver>`, `#v<semver>`, site URL or repository URL.

Generated data lives in `apps/docs/app/generated/` and the changelog, roadmap and contributing pages are copied from the
repository root; both are produced by `bun run docs:prepare` (run automatically by `docs:dev` and `docs:build`) and are not
committed. A missing example name or component directory fails the docs build, so broken pages cannot ship.

Design rules: tokens only (never hard-coded colors, no `dark:` variants), works in the dark `elf` and `nova` themes and the light `elfwood` theme,
keyboard accessible, no `class*='size-'` selectors with escaped quotes (use `[class*=size-]`).

## The quality gate

`bun run check` runs `bun run check:fast` (every step below except the `browser` project of step 3) and then the browser tests. In order:

1. `typecheck`: `vue-tsc` over sources, examples, scripts and tests.
2. `lint`: ESLint with `@antfu/eslint-config` (Vue + TypeScript). `bun run lint:fix` autofixes.
3. `test`: Vitest with two projects. `unit` (happy-dom, `src/**/*.test.ts`) and `browser` (real Chromium through
   Playwright, `tests/browser/**/*.test.ts`): every example mounted in every theme with `axe-core`, and keyboard,
   focus and `v-model` interaction tests.
4. `contrast`: WCAG contrast of every theme token pair.
5. `registry:check`: rebuilds the registry and fails if the committed `registry.json` / `registry/r` differ.
6. `llms:check`: fails if `llms.txt` / `llms-full.txt` are stale (`bun run llms` regenerates them).
7. `docs:typecheck` (vue-tsc over the docs app), `docs:build` (a full `nuxt generate`, which fails on a broken example
   or component reference), `docs:verify` (headless Chromium over every built docs page: multi-line code blocks must render
   line by line and no placeholder may survive; it serves the built site on a free port, or on `DOCS_VERIFY_PORT` when
   set) and `playground:build`.

Run subsets while developing: `bun run test:unit`, `bun run test:browser`, `bun run docs:dev`.

### How tests work

| Layer | Where | Command |
| :--- | :--- | :--- |
| Unit | `src/components/<name>/<Name>.test.ts` | `bun run test:unit` |
| Browser (axe + interaction) | `tests/browser/` | `bun run test:browser` |
| Visual regression | `tests/visual/` | `bun run test:visual` (CI image only) |

The browser project discovers every `src/components/*/examples/*.vue`, mounts it in every theme and requires zero axe
violations, so a new example is covered without writing a test. Behavior (focus trap, keyboard navigation, `v-model`)
goes into `tests/browser/interactions.test.ts`. The full explanation is on the docs site under Resources, Testing.

### Visual regression

The docs site renders each example alone at `/__examples/<component>/<example>?theme=elf|nova|elfwood` (noindex, not in the
sitemap or search). `tests/visual/examples.spec.ts` screenshots every example in the themes and widths set in
`tests/visual/settings.ts` (default: only the `elf` theme, at 1280 and 360 px; themes differ in tokens, not layout, and axe still
covers every theme) and compares them with `tests/visual/__screenshots__/<component>/<example>-<theme>-<width>.png`.
Override for one run with `VISUAL_THEMES=elf,elfwood VISUAL_WIDTHS=1280`; after changing the defaults, regenerate the baselines.

**Opt-in.** Screenshots do not run on every pull request. They run only when the pull request has the `visual` label
(`gh pr create --label visual`, or add it later) and on manual runs of the CI workflow. Use the label for major or
visually important changes (new components, theme or token changes, layout work). Without it the shards are skipped and the
required **Visual regression** summary passes. Baselines can drift while unlabelled pull requests change visuals, so a
labelled pull request may show unrelated diffs: regenerate with `bun run baselines` and review them.

Baselines depend on the operating system's fonts and rasterizer, so they are created **only** in the official Playwright
Docker image (`mcr.microsoft.com/playwright:v1.64.0-noble`), by the **Visual baselines** workflow. Never commit PNGs
generated on your machine. To update baselines after an intentional visual change:

1. Open a pull request with the change and the `visual` label. The **Visual regression** job fails and uploads the `visual-report` artifact.
2. Run `bun run baselines` on the pull request branch (or **Actions - Visual baselines - Run workflow**). It commits the changed PNGs to the branch.
3. Review the PNG diff in the pull request's **Files changed** tab; every changed image must be explained by the change.
4. `bun run baselines` re-pushes the commit under your name, which starts the required checks. After a manual workflow run, push an empty commit instead (pushes by the workflow do not start CI). Then merge.

A new example fails with "A snapshot doesn't exist" until the workflow has run once for it. Delete the PNGs of removed
examples in the same pull request. To debug the harness locally, `bun run docs:build` and
`VISUAL_PORT=4390 bun run test:visual`; screenshot comparisons will not match CI there.

## Git hooks and CI

- **pre-push** (installed by `bun install` through `simple-git-hooks`): `bun run prepush` = typecheck + lint + unit tests.
  Fast on purpose; bypass only in emergencies with `git push --no-verify`.
- **CI** (`.github/workflows/ci.yml`, on push and pull request to `main`, Bun + Node 22). The slow suites run as parallel shards so a pull
  request finishes in about 4 minutes: **Static checks and docs** (`bun run check:fast`), **Browser tests** in 3 shards
  (`vitest --project browser --shard=i/3`) and **Visual regression** in 3 shards (`playwright test --shard=i/3`). The small **Check** and
  **Visual regression** summary jobs pass only when every shard passed; they are the names branch protection requires, together with
  **Build example**. The built docs site is uploaded as an artifact. The docs site (`apps/docs`), the registry and
  the llms files are deployed to GitHub Pages at `https://xouyi.github.io/elfUI/` only after CI succeeds on `main`. A separate workflow builds `examples/nuxt-demo`. The CLI is tested by unit tests and by an end-to-end test of the built binary against temporary projects and the local `registry/r` (no network); both run in `bun run check:fast`.
- **Visual baselines** (`.github/workflows/visual-baselines.yml`, manual): renders every screenshot in the Playwright Docker image in 3 shards
  and commits the merged set to the branch. Run it with `bun run baselines` from a pull request branch: it pushes, starts the workflow,
  waits (about 3 minutes), pulls the baselines commit and re-authors it with your git identity.

## Releasing

A small fix goes from branch to npm in about 10 minutes:

1. On a branch: make the change and add a line under `## Unreleased` at the top of `CHANGELOG.md` (create the heading if it is missing).
2. If the change alters how something looks and is important (a theme, a token, a new component): `bun run baselines`, and open
   the pull request with `--label visual`. Small fixes skip both.
3. Open the pull request; when **Check**, **Visual regression** and **Build example** are green (about 4 minutes), merge it.
4. On an up-to-date `main`: `bun run release patch` (or `minor`, `major`, an explicit `x.y.z`, or `x.y.z-beta.N` for a prerelease).
   It refuses unless the tree is clean and you are on `main`, renames `## Unreleased` to `## x.y.z`, runs a quick gate
   (typecheck, lint, unit tests, registry and llms up to date; about 1 minute. The docs build, browser and visual suites already passed on
   the pull request; `--full` runs `bun run check` instead),
   bumps `package.json`, regenerates the llms files, commits `Release vx.y.z` and creates the tag `vx.y.z`.
5. Publish and push: `bunx npm@latest publish --access public --provenance=false` (while npm Trusted Publishing is not set up), then
   `git push origin main vx.y.z`. Once Trusted Publishing works, skip the manual publish and use `bun run release patch --push`.
   The **Release** workflow (`.github/workflows/release.yml`) verifies that the tag equals the `package.json` version, runs a quick
   typecheck and unit test pass, publishes `@xouyi/elfui` to npm with provenance unless that version is already there, and creates the
   GitHub Release from the changelog section (about 1 minute). Prereleases are published with the `next` dist-tag, so `bun add @xouyi/elfui`
   keeps resolving to the last stable version.
6. After a release, switch `examples/nuxt-demo` to `"@xouyi/elfui": "^x.y.z"` (see its README).

## Publishing to npm (one-time setup)

CI publishes with npm Trusted Publishing (OIDC): there is no `NPM_TOKEN` secret. npm only lets you configure a trusted publisher for a package
that already exists, so the very first version is published by hand.

1. Create an npm account at npmjs.com, verify the e-mail and enable two-factor authentication (authenticator app or security key).
2. First publish from a clean checkout of the release tag (this claims the name `@xouyi/elfui`). `bunx npm` is used because Bun has no `login`/OIDC flow
   and `npm publish` is the only client that can attach provenance:

   ```bash
   git clone https://github.com/xouyi/elfUI.git && cd elfUI
   git checkout v0.3.0 && bun install --frozen-lockfile
   bun run check
   bunx npm@latest login
   bunx npm@latest publish --access public   # `prepack` builds dist/cli.mjs; enter the 2FA code when asked
   ```

   Provenance cannot be generated from a laptop, so this first version has none; later ones do.
3. On npmjs.com open **@xouyi/elfui > Settings > Trusted publishing > GitHub Actions** and enter owner `xouyi`, repository `elfUI`, workflow filename `release.yml`
   (leave the environment empty). Save.
4. Optional hardening: under **Settings > Publishing access** choose "Require two-factor authentication and disallow tokens".
5. From then on, releases are `bun run release x.y.z` plus `git push origin main --follow-tags`.

Trusted Publishing needs npm 11.5.1 or newer and Node 22.14 or newer; the workflow uses `bunx npm@latest` on Node 22. `bun publish` is not used
because it cannot perform the OIDC token exchange.
