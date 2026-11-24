# Contributing to Elf

Elf is a Vue 3 / Nuxt 4 design system built on Reka UI and Tailwind CSS v4, distributed as source. Every change must
pass the quality gate (`bun run check`) before it is accepted. Use **Bun** only (`bun install`, `bun run`, `bunx`);
never npm, pnpm or yarn. Code, comments and docs are in English.

## Setup

```sh
bun install                              # also installs the pre-push hook
bunx playwright install chromium         # once; used by the Storybook tests
bun run storybook                        # docs and component workbench on :6006
```

Node 22+ must be installed next to Bun (some tools, such as Vitest and the shadcn-vue CLI, require it).

## Adding a component

Create `src/components/<name>/` with:

| File | Purpose |
| :--- | :--- |
| `<Name>.vue` | The component. Reka UI primitive + `cva()` variants + `cn()`. Use relative imports in `src`. |
| `index.ts` | Public exports, the `cva` factory and prop types. |
| `<Name>.stories.ts` | Stories under `Components/<Name>`: a `Default` story, one per variant/state, and a both-themes story (see `.storybook/both-themes.ts`). Autodocs builds the props table. |
| `<Name>.test.ts` | Unit tests (Vitest + `@vue/test-utils`): rendering, variants, emitted events, keyboard behavior. |

Then wire it into the rest of the repository:

1. Export it from `src/index.ts`.
2. Add a `meta` entry in `scripts/sync-registry.ts` (title, description, npm `dependencies`, `registryDependencies`),
   then run `bun run registry:build` and commit the regenerated `registry.json` and `registry/r/`.
3. Add curated prose to `scripts/llms-meta.ts`, then run `bun run llms` and commit `llms.txt` / `llms-full.txt`.
4. Mention it in `src/docs/ComponentsOverview.mdx` and `CHANGELOG.md` (Unreleased section).

Design rules: 100% dark UI, tokens only (never hard-coded colors), works in both the `elf` and `novatron` themes,
keyboard accessible, no `class*='size-'` selectors with escaped quotes (use `[class*=size-]`).

## The quality gate

`bun run check` runs, in order:

1. `typecheck`: `vue-tsc` over sources, stories, scripts and tests.
2. `lint`: ESLint with `@antfu/eslint-config` (Vue + TypeScript). `bun run lint:fix` autofixes.
3. `test`: Vitest with three projects.
   - `unit` (happy-dom): `src/**/*.test.ts`.
   - `storybook-elf` and `storybook-novatron`: every story is rendered in real Chromium through Storybook's Vitest
     addon (`@storybook/addon-vitest`, Playwright provider) and checked with axe (`a11y.test: 'error'`) with each theme
     active. A story that throws or has an accessibility violation fails the gate. The theme is injected by
     `.storybook/vitest.setup.ts`.
4. `contrast`: WCAG contrast of every theme token pair.
5. `registry:check`: rebuilds the registry and fails if the committed `registry.json` / `registry/r` differ.
6. `llms:check`: fails if `llms.txt` / `llms-full.txt` are stale (`bun run llms` regenerates them).
7. `build-storybook` and `playground:build`.

Run subsets while developing: `bun run test:unit`, `bun run test:storybook`.

### Visual regression

`bun run test:visual` builds Storybook and compares Playwright screenshots of every story in both themes
(1280 px wide; the default story of each component also at 360 px) against the baselines in
`tests/visual/__screenshots__/`.

Screenshots depend on the operating system's fonts and rasterizer, so baselines are created **only** in the official
Playwright Docker image (`mcr.microsoft.com/playwright:v1.64.0-noble`, the same image the CI `visual` job runs in).
Do not commit baselines generated on your own machine.

To accept an intentional visual change: open GitHub Actions, run the **Visual baselines** workflow on your branch, and
review the resulting `test(visual): update baselines` commit. Until the first baselines are committed the CI visual job
only prints a warning (non-blocking); once baselines exist it is blocking. If you have Docker locally you can do the
same with:

```sh
docker run --rm -v "$PWD":/work -w /work mcr.microsoft.com/playwright:v1.64.0-noble \
  bash -c "curl -fsSL https://bun.sh/install | bash && ~/.bun/bin/bun install --frozen-lockfile && ~/.bun/bin/bun run test:visual:update"
```

When bumping `playwright`, update the image tag in `.github/workflows/ci.yml` and `visual-baselines.yml` together and
regenerate the baselines.

## Git hooks and CI

- **pre-push** (installed by `bun install` through `simple-git-hooks`): `bun run prepush` = typecheck + lint + unit tests.
  Fast on purpose; bypass only in emergencies with `git push --no-verify`.
- **CI** (`.github/workflows/ci.yml`, on push and pull request to `main`, Bun + Node 22): the full `bun run check`, plus
  the Playwright visual job. Storybook's static build is uploaded as an artifact. The docs site is deployed to GitHub
  Pages only after CI succeeds on `main`. A separate workflow builds `examples/nuxt-demo` from the published tag.

Commits are small and in English, written in the imperative mood ("Add Tooltip component").

## Releasing

1. Add a `## x.y.z` section to `CHANGELOG.md` (rename the Unreleased section) and commit it on `main`.
2. Run `bun run release x.y.z`. It refuses unless the working tree is clean, you are on `main`, the changelog has the
   section, and `bun run check` passes. It then bumps `package.json`, commits `Release vx.y.z` and creates the tag `vx.y.z`.
3. Publish: `git push origin main --follow-tags`.
4. Bump `examples/nuxt-demo` to the new tag (see its README) in a follow-up commit.
