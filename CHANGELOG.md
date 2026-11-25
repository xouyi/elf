# Changelog

## Unreleased

- **Breaking rename: `@elf/ui` is now `elfui`.** The package is published on npm as `elfui` (unscoped). Imports become `from 'elfui'`, `elfui/nuxt`, `elfui/styles.css`, `elfui/themes/*.css` and `elfui/lib/utils`, and the Nuxt module option key becomes `elfui:` (was `elf:`). The `Elf` component prefix is unchanged. No compatibility shim: `@elf/ui` was never published to npm. Upgrade from a GitHub install: `bun remove @elf/ui && bun add elfui`, then rename the imports and the `elf:` config key.
- Add the `elfui` CLI (`bunx elfui@latest init | add | list | diff`): sets up Nuxt or Vite + Vue projects idempotently and copies registry components with import rewriting, never overwriting without `--overwrite`. Zero runtime dependencies, built to `dist/cli.mjs`; unit and end-to-end tests run in `bun run check`.
- Release: pushing a `vX.Y.Z` tag publishes to npm with Trusted Publishing (OIDC, provenance, `-beta.N` goes to the `next` tag) and creates the GitHub Release from this changelog.
- Docs: Installation pages rewritten around `bun add elfui` and `bunx elfui@latest init`; new CLI page; GitHub installs moved to "Install from GitHub".
- npm-ready package: `files` whitelist, `publishConfig` (public, provenance), `bin`, `keywords`, `homepage`, `bugs`, `engines` and peer dependencies (`vue`, `tailwindcss`, `@tailwindcss/vite`, `typescript`, optional `nuxt`).
- Add `ElfField` with `ElfFieldControl`, `ElfFieldLabel`, `ElfFieldDescription` and `ElfFieldError`: label, control, description and error wired through `id`, `for`, `aria-describedby`, `aria-invalid` and `aria-required`, plus `useFieldContext()`; works with `ElfInput` and `ElfTextarea`.
- Add `ElfTextarea`: native textarea with `v-model`, `autoResize`, `invalid`, `rows` and `maxlength`, sharing the `ElfInput` styles.
- Add `ElfSkeleton`: a decorative placeholder block (`aria-hidden`, reduced-motion aware).
- Add `ElfSpinner`: an SVG busy indicator with `size` and an announced `label` (`role="status"`), reduced-motion aware.
- Add `ElfKbd` and `ElfKbdGroup`, composed from the native `kbd` element.
- Add `ElfSeparator`, built on the Reka UI Separator primitive (`orientation`, `decorative`, default decorative).
- Add `ElfLabel`, built on the Reka UI Label primitive (`for`, `as`, `asChild`), with `peer-disabled` and `group` disabled styling.
- Add `ElfVisuallyHidden`, built on the Reka UI VisuallyHidden primitive (`as`, `asChild`, `feature`).
- Docs: Storybook is gone. The documentation is a Nuxt 4 + Nuxt Content site (`apps/docs`) built with ElfUI itself, with live previews and copyable source for every example, API tables generated from the component sources (`vue-component-meta`), a live theme token and contrast table, Cmd/Ctrl+K search, and a page per component. Published at https://xouyi.github.io/elfUI/.
- Examples: component stories became `src/components/<name>/examples/*.vue`, the single source for docs previews and tests.
- The repository is now `xouyi/elfUI`. Registry URLs are `https://xouyi.github.io/elfUI/r/`.
- Removed `bun run storybook`, `bun run build-storybook` and the Storybook-based tests; `bun run check` builds the docs site instead (`bun run docs:build`).
- Tests: Vitest browser project (real Chromium) mounts every example in both themes and requires zero `axe-core` violations, plus interaction tests for Dialog focus and Escape handling, Tabs keyboard navigation, Button `as-child` and Input `v-model`. `bun run test:browser`.
- Visual regression: Playwright screenshots every example in isolation (`/__examples/<component>/<example>` on the docs site) in both themes at 1280 and 360 px; baselines are created only by the Visual baselines workflow in the Playwright image. New docs page "Testing".
- Fix: the Input "Invalid" example error text now meets 4.5:1 contrast in both themes.

## 0.2.0

- Docs site: Storybook guides (introduction, getting started, theming, without Nuxt, registry, AI assistants) and a docs page per component, published to GitHub Pages at https://xouyi.github.io/elf/.
- `llms.txt` and `llms-full.txt` generated from the component sources (`bun run llms`, `bun run llms:check`).
- Registry items now point at `https://xouyi.github.io/elf/r/`; the raw GitHub URLs remain a fallback.
- Example project `examples/nuxt-demo` that installs Elf from a GitHub tag, with a CI build job.
- Quality gate: `bun run check` (typecheck, ESLint, unit and Storybook a11y tests in both themes, contrast, registry and llms drift checks, Storybook and playground builds) runs in CI on every push and pull request and as a pre-push hook; Playwright visual regression job; `bun run release` refuses to tag unless the gate passes.
- Deterministic registry and llms generation across operating systems.

## 0.1.0

- Initial release: Button, Input, Badge, Card, Dialog, Tabs.
- Themes: `elf` (default) and `novatron`.
- Nuxt module (`@elf/ui/nuxt`) and shadcn-vue registry.
