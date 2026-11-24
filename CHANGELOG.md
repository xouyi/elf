# Changelog

## Unreleased

- Docs site: Storybook guides (introduction, getting started, theming, without Nuxt, registry, AI assistants) and a docs page per component, published to GitHub Pages at https://xouyi.github.io/elf/.
- `llms.txt` and `llms-full.txt` generated from the component sources (`bun run llms`, `bun run llms:check`).
- Registry items now point at `https://xouyi.github.io/elf/r/`; the raw GitHub URLs remain a fallback.
- Example project `examples/nuxt-demo` that installs Elf from a GitHub tag, with a CI build job.

## 0.1.0

- Initial release: Button, Input, Badge, Card, Dialog, Tabs.
- Themes: `elf` (default) and `novatron`.
- Nuxt module (`@elf/ui/nuxt`) and shadcn-vue registry.
