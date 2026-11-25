# Changelog

## Unreleased

- Docs: Storybook is gone. The documentation is a Nuxt 4 + Nuxt Content site (`apps/docs`) built with ElfUI itself, with live previews and copyable source for every example, API tables generated from the component sources (`vue-component-meta`), a live theme token and contrast table, Cmd/Ctrl+K search, and a page per component. Published at https://xouyi.github.io/elfUI/.
- Examples: component stories became `src/components/<name>/examples/*.vue`, the single source for docs previews and tests.
- The repository is now `xouyi/elfUI` (package name `@elf/ui` and the `Elf` component prefix are unchanged). Registry URLs are `https://xouyi.github.io/elfUI/r/`.
- Removed `bun run storybook`, `bun run build-storybook` and the Storybook-based tests; `bun run check` builds the docs site instead (`bun run docs:build`). Browser and visual regression tests are being rebuilt on top of the docs site.

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
