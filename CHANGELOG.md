# Changelog

## Unreleased

- Add `ElfTooltip`, `ElfTooltipTrigger`, `ElfTooltipContent` and `ElfTooltipProvider`, built on the Reka UI Tooltip primitive: opens on hover and keyboard focus, closes on Escape, hoverable content, a shared open delay through the provider (400 ms by default), `side`/`align`, `v-model:open`, and a standalone mode that creates its own provider.
- Add `ElfPopover`, `ElfPopoverTrigger`, `ElfPopoverAnchor`, `ElfPopoverContent` and `ElfPopoverClose`, built on the Reka UI Popover primitive: anchored interactive panel, `v-model:open`, `side`/`align`, optional `modal` focus trap, focus moves in and returns to the trigger, Escape and outside click close, never exceeds the viewport.
- Add `ElfHoverCard`, `ElfHoverCardTrigger` and `ElfHoverCardContent`, built on the Reka UI HoverCard primitive: link preview that opens on hover and keyboard focus with configurable `openDelay` and `closeDelay`, Escape closes, `side`/`align`, `v-model:open`; shares the panel styles of `ElfPopover` (`popoverPanelClass`).

## 0.4.0

- Add the `useElfTheme()` composable (`theme`, `themes`, `setTheme`, `cycle`) and `elfThemeBootScript()`: reads and sets `data-theme` on `<html>`, SSR-safe (per-app state, no `document` access on the server), typed theme names with support for custom themes, optional persistence in a cookie or localStorage, auto-imported by the Nuxt module. `elfThemes`, `ElfTheme` and the new `isElfTheme()` now live in `src/lib/themes.ts` and are still exported from the package root.
- Add the `--elf-destructive-text` token and the `text-destructive-text` utility: readable error text on `background`, `card` and `popover` (7.2:1 or better in both themes, checked by `bun run contrast`). `ElfFieldError`, the required marker of `ElfFieldLabel`, the Input, Textarea and Label examples and `ElfAlert` use it instead of mixing `destructive` with white. Custom themes must define `--elf-destructive-text`.
- Add `ElfAvatar`, `ElfAvatarImage`, `ElfAvatarFallback` and `ElfAvatarGroup` (`avatarVariants`), built on the Reka UI Avatar primitive: image with fallback, initials from `name`, `size` (`sm` | `default` | `lg` | `xl`), a `label` that exposes the avatar as one named image, and an overlapping group.
- Add `ElfProgress`, built on the Reka UI Progress primitive: determinate (`v-model`, `max`) and indeterminate (`null`) bars, `size`, `label`, `aria-labelledby` wiring, `getValueText`, `indicatorClass`, and a reduced-motion fallback. Adds the `elf-progress-indeterminate` keyframes to `styles.css`.
- Add `ElfAlert`, `ElfAlertTitle` and `ElfAlertDescription` (`alertVariants`): `default`, `destructive`, `success` and `warning` variants with per-variant icons, an `icon` slot, `showIcon`, and `role` handling (`alert` for destructive, `status` otherwise, `none` to drop the role).
- Add `ElfSelect` with `ElfSelectTrigger`, `ElfSelectValue`, `ElfSelectContent`, `ElfSelectItem`, `ElfSelectGroup`, `ElfSelectLabel`, `ElfSelectSeparator`, `ElfSelectScrollUpButton` and `ElfSelectScrollDownButton`, built on the Reka UI Select primitive: popper positioning, typeahead, `size`, `invalid`, 16px text on small screens, and `ElfField` wiring through `ElfFieldControl` around the trigger.
- Add `ElfSwitch`, built on the Reka UI Switch primitive: `v-model`, `size` (`default` | `sm`, exported `switchVariants`), `disabled`, a `thumb` slot, Space and Enter toggling, and `ElfField` wiring.
- Add `ElfRadioGroup` and `ElfRadioGroupItem`, built on the Reka UI RadioGroup primitive: `v-model`, `orientation`, `disabled`, `required`, `invalid`, roving arrow-key selection, and in `ElfField` the group is named by the field label and gets the described, invalid and required wiring.
- Add `ElfCheckbox`, built on the Reka UI Checkbox primitive: `v-model` (`boolean | 'indeterminate'`), `invalid`, `disabled`, `required`, a custom indicator slot, and automatic id, `aria-describedby`, `aria-invalid` and required wiring inside `ElfField`.
- Theme: the `elf` theme now uses pure black, neutral (zero-chroma) surfaces instead of purple-tinted near-black: background `#000000`, card `#0a0a0a`, popover `#0f0f0f`, muted `#171717`, secondary `#1c1c1c`, border `#262626`, input `#6b6b6b`. Violet stays the brand accent (`primary`, `ring`) and `accent` is a subtle violet for hover and selected states. All pairs still pass WCAG AA (`bun run contrast`). Visual baselines of the `elf` theme change.

## 0.3.0

- **Breaking rename: `@elf/ui` is now `@xouyi/elfui`.** The package is published on npm as `@xouyi/elfui` (the unscoped `elfui` name was rejected by npm as too similar to the existing `elf-ui`). Imports become `from '@xouyi/elfui'`, `@xouyi/elfui/nuxt`, `@xouyi/elfui/styles.css`, `@xouyi/elfui/themes/*.css` and `@xouyi/elfui/lib/utils`. The installed CLI binary is still `elfui`, the Nuxt module option key becomes `elfui:` (was `elf:`) and the `Elf` component prefix is unchanged. No compatibility shim: `@elf/ui` was never published to npm. Upgrade from a GitHub install: `bun remove @elf/ui && bun add @xouyi/elfui`, then rename the imports and the `elf:` config key.
- Add the `elfui` CLI (`bunx @xouyi/elfui@latest init | add | list | diff`; the installed binary is `elfui`): sets up Nuxt or Vite + Vue projects idempotently and copies registry components with import rewriting, never overwriting without `--overwrite`. Zero runtime dependencies, built to `dist/cli.mjs`; unit and end-to-end tests run in `bun run check`.
- Release: pushing a `vX.Y.Z` tag publishes to npm with Trusted Publishing (OIDC, provenance, `-beta.N` goes to the `next` tag) and creates the GitHub Release from this changelog.
- Docs: Installation pages rewritten around `bun add @xouyi/elfui` and `bunx @xouyi/elfui@latest init`; new CLI page; GitHub installs moved to "Install from GitHub".
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
