# ElfUI Roadmap

This is the plan for taking ElfUI from the current six components to a complete, professional component library at v1.0. It is the working document for contributors: every entry names the primitive it builds on, how it is made accessible, what it depends on, and which Novatron screens need it. The order inside each milestone is the build order.

Status legend: **done** (shipped), **planned** (not started). Complexity: **S** (about a day, single file), **M** (a few days, several parts or non-trivial behaviour), **L** (a week or more, composed behaviour or third-party dependency).

## Contents

- [Where we are](#where-we-are)
- [Principles](#principles)
- [Milestones at a glance](#milestones-at-a-glance)
- [Milestone details](#milestone-details)
- [Novatron composites and where they belong](#novatron-composites-and-where-they-belong)
- [Explicitly out of scope](#explicitly-out-of-scope)
- [Definition of Done](#definition-of-done-per-component)
- [Release rules](#release-rules)
- [Sources surveyed](#sources-surveyed)

## Where we are

Shipped in 0.2.0: **Button, Input, Badge, Card, Dialog, Tabs**, the `elf` (black with violet accents) and `nova` (gold, 0px radius) themes, the Nuxt module, the shadcn-vue registry and `llms.txt`. Built on Reka UI 2.11, class-variance-authority, tailwind-merge and Tailwind CSS v4.

Reka UI 2.11 (the version in this repo) already ships primitives for almost everything below: Accordion, AlertDialog, AspectRatio, Autocomplete, Avatar, Calendar, Checkbox, Collapsible, Combobox, ContextMenu, DatePicker, DateRangePicker, Dialog, Drawer, DropdownMenu, Editable, Field, Form, HoverCard, Label, Listbox, Menubar, NavigationMenu, NumberField, Pagination, PinInput, Popover, Progress, RadioGroup, RangeCalendar, Rating, ScrollArea, Select, Separator, Slider, Splitter, Stepper, Switch, Tabs, TagsInput, TimeField, Toast, Toggle, ToggleGroup, Toolbar, Tooltip, Tree and VisuallyHidden. What it does not provide, and ElfUI must compose itself, is Table, Data Table, Sidebar, Breadcrumb, Command (partly), Chart, Code Block, Skeleton, Spinner, Alert, Empty, Kbd, Input Group, File Upload and the toast queue.

**Totals:** 66 planned entries (components, utilities and one layout decision) across 7 milestones (v0.3 to v0.9), plus the v1.0 stabilisation release. With the 6 shipped components, ElfUI covers the shadcn-vue catalogue except Button Group, Item, Native Select, Typography and Resizable naming differences (Resizable is `ElfSplitter`; Sonner is replaced by `ElfToaster`), plus the Reka primitives we consider useful and the Novatron composites. Button Group, Item and Native Select are candidates for v1.x.

## Principles

1. **Accessibility is a release gate, not a goal.** Every component follows the matching [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern, is fully keyboard operable, has visible focus in every theme, respects `prefers-reduced-motion`, and reaches WCAG 2.2 AA contrast. axe-core must report zero violations for every example in every theme. A component with a documented keyboard table that is not tested is not done.
2. **Reka first.** If Reka UI has a primitive, build on it. Do not reimplement focus management, typeahead, dismissal, collision handling or ARIA wiring. If Reka has no primitive, compose from native elements and `Primitive`, and say so in the docs page.
3. **API conventions.** Every component: `data-slot` on every part, `data-variant`/`data-size` where applicable, `class` merged with `cn()` last, `asChild`/`as` where it renders an element, `v-model` (and `v-model:open`) for state with an uncontrolled default, a `<Name>Props` type exported from the component's `index.ts`, variants through `cva` and exported as `<name>Variants`, sub-parts named `<Parent><Part>`, relative imports inside `src` (the registry sync rewrites them to aliases). No component reaches for a global, a router or Nuxt auto-imports.
4. **Tokens, not values.** Components use only semantic CSS variables (`--background`, `--foreground`, `--primary`, `--ring`, `--radius` and the additions listed in v0.8). No hard-coded colours or radii. A new theme needs only token values; the `nova` theme must keep working with `--radius: 0`. `elf` and `nova` are dark, `elfwood` is light: components must never assume a dark background.
5. **One source of truth.** A component's props, emits and slots are read from its source by the docs build; examples are single-file components under `src/components/<name>/examples/` and feed docs previews, unit tests, a11y tests and visual baselines. Nothing is described twice.
6. **Small, copyable, owned.** The package ships source (`@xouyi/elfui`) and a shadcn-vue registry. Avoid runtime dependencies beyond Reka UI, cva, tailwind-merge and `@vueuse/core` where justified. Heavy features (Chart, Code Block, Carousel, Markdown) use optional peer dependencies and lazy loading.
7. **Frozen public API after 1.0.** Props, slots, emitted events, `data-slot` names and token names are public API. Breaking changes are announced in the changelog one minor release ahead and land only in a major.
8. **Testing requirement.** Each component has unit tests for variant and logic, browser tests (axe in every theme, keyboard and focus behaviour), and visual baselines for its default examples at 1280px and 360px. See the Definition of Done.
9. **Docs requirement.** A component without a docs page, live examples, generated API tables, an accessibility section (keyboard table plus ARIA roles) and a theming section is not released.
10. **Right-to-left and locale.** Components must not assume left-to-right or English. Date, number and list components take a `locale` and are tested with Turkish (`tr-TR`) since all Novatron apps use Turkish copy. Strings inside components (such as "Close") are props or slots with English defaults.

## Milestones at a glance

| Milestone | Theme | Components | Complexity (S/M/L) |
| :--- | :--- | ---: | :--- |
| v0.3 | Form and feedback foundations | 16 | 14 / 2 / 0 |
| v0.4 | Overlays and disclosure | 11 | 7 / 4 / 0 |
| v0.5 | Navigation and data display | 12 | 6 / 4 / 2 |
| v0.6 | Advanced inputs | 11 | 3 / 4 / 4 |
| v0.7 | Rich display | 8 | 2 / 4 / 2 |
| v0.8 | Layout and utilities | 4 | 3 / 1 / 0 |
| v0.9 | App-level composites | 4 | 0 / 2 / 2 |
| v1.0 | Stabilisation | 0 | API freeze, a11y audit, docs and migration guide, Novatron apps migrated |
| **Total** | | **66** | |

Why this order: v0.3 delivers the form primitives every screen uses and the feedback states (loading, error, progress). v0.4 replaces the three hand-rolled overlay patterns (confirm dialog, sheet, toast host). v0.5 delivers the admin table stack that is duplicated verbatim in courses and stock. v0.6 delivers the inputs that are most costly to hand-roll. v0.7 to v0.9 are content-heavy or optional.

## Milestone details

### v0.3: Form and feedback foundations

Everything needed to build a complete, accessible form and give basic feedback. Unblocks the first Novatron migration (stock add/edit flows, courses admin forms).

#### ElfVisuallyHidden

- **Purpose:** Hide content visually while keeping it available to assistive technology.
- **Built on:** VisuallyHidden
- **Key props, variants and parts:** `as`, `asChild`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Visually hidden content). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** courses `AdminTable` captions, `AdminFilterBar` labels (`cx-visually-hidden`).
- **Status:** shipped (v0.3.0)

#### ElfLabel

- **Purpose:** Accessible label bound to a control.
- **Built on:** Label
- **Key props, variants and parts:** `for`, `as`; disabled styling via `peer`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Label (HTML)). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Every form in stock, courses, forum.
- **Status:** shipped (v0.3.0)

#### ElfField

- **Purpose:** Composed form row: label, control slot, description, error message, required marker; wires `id`, `aria-describedby`, `aria-invalid`.
- **Built on:** composed (Label + native or Elf control)
- **Key props, variants and parts:** `label`, `description`, `error`, `required`, `orientation: vertical | horizontal`; sub-parts `ElfFieldLabel`, `ElfFieldDescription`, `ElfFieldError`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Forms). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfLabel
- **Complexity:** M
- **Novatron screens:** stock `WishlistForm`, `ItemEditSheet`; courses `CourseForm`, `AssignmentForm`; forum `PostForm`, `ProfileEditForm`.
- **Status:** shipped (v0.3.0)

#### ElfTextarea

- **Purpose:** Multi-line text input with optional auto-grow.
- **Built on:** composed (native `textarea`)
- **Key props, variants and parts:** `v-model`, `autoResize`, `rows`, `maxlength`, `invalid`; same size scale as `ElfInput`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Forms). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** forum `PostForm`, `CommentForm`; courses `AssignmentForm`, `CourseChat`.
- **Status:** shipped (v0.3.0)

#### ElfCheckbox

- **Purpose:** Binary or indeterminate selection.
- **Built on:** Checkbox
- **Key props, variants and parts:** `v-model` (`boolean | 'indeterminate'`), `disabled`, `required`, `value` (group mode).
- **Accessibility:** WAI-ARIA pattern: [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfLabel
- **Complexity:** S
- **Novatron screens:** courses `AudiencePicker`, admin tables (row select); stock filters.
- **Status:** shipped (v0.4.0)

#### ElfRadioGroup

- **Purpose:** Single selection among a small set; `ElfRadioGroupItem`.
- **Built on:** RadioGroup
- **Key props, variants and parts:** `v-model`, `orientation`, `disabled`, item `value`.
- **Accessibility:** WAI-ARIA pattern: [Radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfLabel
- **Complexity:** S
- **Novatron screens:** courses `CourseRulesCard`; stock `WishlistForm` priority.
- **Status:** shipped (v0.4.0)

#### ElfSwitch

- **Purpose:** On/off setting that applies immediately.
- **Built on:** Switch
- **Key props, variants and parts:** `v-model`, `disabled`, `size: sm | default`.
- **Accessibility:** WAI-ARIA pattern: [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfLabel
- **Complexity:** S
- **Novatron screens:** courses `CourseRulesCard`, `ChatAdmin`; HQ settings.
- **Status:** shipped (v0.4.0)

#### ElfSelect

- **Purpose:** Single-choice dropdown for 5 to ~20 options (not searchable).
- **Built on:** Select
- **Key props, variants and parts:** `v-model`, `placeholder`, `disabled`; parts `Trigger`, `Content`, `Item`, `Group`, `Label`, `Separator`; `size`.
- **Accessibility:** WAI-ARIA pattern: [Listbox / select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfLabel, ElfField
- **Complexity:** M
- **Novatron screens:** stock location and category pickers; courses `AdminFilterBar` filters; scout forms.
- **Status:** shipped (v0.4.0)

#### ElfSeparator

- **Purpose:** Horizontal or vertical divider.
- **Built on:** Separator
- **Key props, variants and parts:** `orientation`, `decorative`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Separator role). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** `AdminSection`, sidebars, menus.
- **Status:** shipped (v0.3.0)

#### ElfSpinner

- **Purpose:** Indeterminate busy indicator.
- **Built on:** composed (SVG)
- **Key props, variants and parts:** `size`, `label` (announced via `role=status`).
- **Accessibility:** Native semantics; no dedicated APG pattern (Status role). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfVisuallyHidden
- **Complexity:** S
- **Novatron screens:** Buttons in loading state; page loaders everywhere.
- **Status:** shipped (v0.3.0)

#### ElfSkeleton

- **Purpose:** Placeholder block while content loads.
- **Built on:** composed
- **Key props, variants and parts:** `class` only; `aria-hidden`, respects reduced motion.
- **Accessibility:** Native semantics; no dedicated APG pattern (Busy state). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** courses/stock `AdminSkeleton`, `ax-skel`.
- **Status:** shipped (v0.3.0)

#### ElfAlert

- **Purpose:** Inline, persistent message: `default`, `info`, `success`, `warning`, `destructive`; parts `Title`, `Description`.
- **Built on:** composed
- **Key props, variants and parts:** `variant`, optional icon slot, optional dismiss.
- **Accessibility:** WAI-ARIA pattern: [Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** `AdminErrorBox` in courses/stock; form-level errors.
- **Status:** shipped (v0.4.0)

#### ElfProgress

- **Purpose:** Determinate or indeterminate progress bar.
- **Built on:** Progress
- **Key props, variants and parts:** `v-model`, `max`, `variant`, `indeterminate`.
- **Accessibility:** WAI-ARIA pattern: [Meter / progressbar role](https://www.w3.org/WAI/ARIA/apg/patterns/meter/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** courses `ProgressBar`, `CourseCard`, lesson progress.
- **Status:** shipped (v0.4.0)

#### ElfAvatar

- **Purpose:** User image with initials fallback; `ElfAvatarGroup`.
- **Built on:** Avatar
- **Key props, variants and parts:** `src`, `alt`, `fallback`, `size`, `shape` (square default; `rounded` only in elf theme).
- **Accessibility:** Native semantics; no dedicated APG pattern (Image alt text). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** forum `UserAvatar`, comments, profile; HQ member lists.
- **Status:** shipped (v0.4.0)

#### ElfGradientText

- **Purpose:** Inline gradient text for headings and short emphasis.
- **Built on:** Primitive
- **Key props, variants and parts:** `variant` (`brand`, `aurora`, `sunset`, `forest`), `from`, `via`, `to`, `direction`, `animate`.
- **Accessibility:** Native semantics; no dedicated APG pattern (real text, selectable). `forced-colors` falls back to `CanvasText`; preset stops are contrast-tested on every theme; `animate` honours `prefers-reduced-motion`.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Marketing and landing headings (not required by current apps).
- **Status:** shipped (v0.4.0)

#### ElfKbd

- **Purpose:** Keyboard key hint.
- **Built on:** composed (`kbd`)
- **Key props, variants and parts:** `class`; `ElfKbdGroup`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Keyboard interface). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Command palette hints, docs, courses `QuickSearch`.
- **Status:** shipped (v0.3.0)

#### useElfTheme

- **Purpose:** Composable to read and set the active theme (`elf`, `nova`) and persist it; works with and without Nuxt.
- **Built on:** utility
- **Key props, variants and parts:** `theme`, `setTheme`, `cycle`, `toggle`, `themes`; options `themes`, `defaultTheme`, `initial`, `storage` (`cookie` | `localStorage` | `none`), `storageKey`; `elfThemeBootScript()` for no-flash loads. Zero-argument use: the Nuxt module options `themes`/`persist` or the `createElfTheme()` Vue plugin supply the defaults.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Docs site switcher; every app that exposes a theme choice.
- **Status:** shipped (v0.4.0); `toggle()`, module `persist` option and `createElfTheme()` shipped (unreleased, v0.5)

#### ElfThemeSwitcher

- **Purpose:** Ready-made control to switch themes, driven by `useElfTheme`.
- **Built on:** composed (`select`, `button`, Reka UI RadioGroup)
- **Key props, variants and parts:** `variant` (`select` | `buttons` | `toggle`), `label`, `labels`, `themes`, `class`.
- **Accessibility:** WAI-ARIA Radio Group (`buttons`), Select-only Combobox (`select`), plain button (`toggle`). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** `select`, `button`, `useElfTheme`
- **Complexity:** S
- **Novatron screens:** Docs site switcher; every app that exposes a theme choice.
- **Status:** shipped (unreleased, v0.5)

### v0.4: Overlays and disclosure

Floating surfaces, menus and the first feedback surface that appears over the page. Replaces hand-built sheets, confirm dialogs and toast hosts in every app.

#### ElfTooltip

- **Purpose:** Short non-interactive hint on hover or focus; `ElfTooltipProvider` shared delay.
- **Built on:** Tooltip
- **Key props, variants and parts:** `side`, `align`, `delayDuration`, `disableHoverableContent`.
- **Accessibility:** WAI-ARIA pattern: [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Icon buttons in `AppNav`, `MobileTopBar`, row actions.
- **Status:** shipped (v0.4.0)

#### ElfPopover

- **Purpose:** Anchored interactive panel.
- **Built on:** Popover
- **Key props, variants and parts:** `v-model:open`, `side`, `align`, `modal`; parts `Trigger`, `Content`, `Anchor`.
- **Accessibility:** WAI-ARIA pattern: [Dialog (non-modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** M
- **Novatron screens:** courses `AdminFilterBar` extra filters; stock filters.
- **Status:** shipped (v0.4.0)

#### ElfHoverCard

- **Purpose:** Rich preview on hover for sighted pointer users (never the only way to reach content).
- **Built on:** HoverCard
- **Key props, variants and parts:** `openDelay`, `closeDelay`, `side`.
- **Accessibility:** WAI-ARIA pattern: [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfPopover (shared styles)
- **Complexity:** S
- **Novatron screens:** forum author cards in `CommentNode`, `PostCard`.
- **Status:** shipped (v0.4.0)

#### ElfDropdownMenu

- **Purpose:** Action menu opened from a button; items, checkbox items, radio items, sub-menus, shortcuts.
- **Built on:** DropdownMenu
- **Key props, variants and parts:** `v-model:open`, parts `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioItem`, `Label`, `Separator`, `Sub`, `Shortcut`.
- **Accessibility:** WAI-ARIA pattern: [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfKbd, ElfSeparator
- **Complexity:** M
- **Novatron screens:** Row action menus in `AdminTable`; stock `ItemRow` actions; user menu in nav.
- **Status:** shipped (v0.4.0)

#### ElfContextMenu

- **Purpose:** Right-click and long-press menu.
- **Built on:** ContextMenu
- **Key props, variants and parts:** Same part set as Dropdown Menu; `modal`.
- **Accessibility:** WAI-ARIA pattern: [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDropdownMenu (shared styles)
- **Complexity:** S
- **Novatron screens:** stock item list rows (optional); HQ member rows.
- **Status:** shipped (v0.4.0)

#### ElfAlertDialog

- **Purpose:** Modal that demands a decision (destructive confirmation).
- **Built on:** AlertDialog
- **Key props, variants and parts:** `v-model:open`, parts `Trigger`, `Content`, `Title`, `Description`, `Action`, `Cancel`; `variant: default | destructive`.
- **Accessibility:** WAI-ARIA pattern: [Alert and message dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfButton
- **Complexity:** S
- **Novatron screens:** courses/stock `ConfirmDialog`; forum `ReasonDialog`.
- **Status:** shipped (v0.4.0)

#### ElfSheet

- **Purpose:** Edge-anchored modal panel (`top`, `right`, `bottom`, `left`); bottom variant is the mobile pattern.
- **Built on:** Dialog (Drawer for drag-to-dismiss variant)
- **Key props, variants and parts:** `v-model:open`, `side`, `size`; parts `Trigger`, `Content`, `Header`, `Footer`, `Title`, `Description`.
- **Accessibility:** WAI-ARIA pattern: [Dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDialog internals, ElfButton
- **Complexity:** M
- **Novatron screens:** stock `ui/Sheet`, `QuantitySheet`, `ItemEditSheet`; mobile filter panels.
- **Status:** shipped (v0.4.0)

#### ElfToaster + useToast

- **Purpose:** Transient notifications queue with `toast()`, `toast.success()`, `toast.promise()`, actions, dismiss; one `<ElfToaster />` per app.
- **Built on:** Toast (Reka) as the viewport and a11y base; queue implemented in Elf
- **Key props, variants and parts:** `toast(message, { description, variant, duration, action })`, `position`, `limit`.
- **Accessibility:** WAI-ARIA pattern: [Alert (live region)](https://www.w3.org/WAI/ARIA/apg/patterns/alert/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfAlert (styles), ElfButton
- **Complexity:** M
- **Novatron screens:** courses/stock/forum `ToastHost` plus each app's `useToast`.
- **Status:** shipped (v0.4.0)

#### ElfCollapsible

- **Purpose:** Single show/hide region.
- **Built on:** Collapsible
- **Key props, variants and parts:** `v-model:open`, `disabled`.
- **Accessibility:** WAI-ARIA pattern: [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** courses `LessonOutline`, filter groups.
- **Status:** shipped (v0.4.0)

#### ElfAccordion

- **Purpose:** Stacked collapsible sections; `single` or `multiple`.
- **Built on:** Accordion
- **Key props, variants and parts:** `type`, `collapsible`, `v-model`, item `value`.
- **Accessibility:** WAI-ARIA pattern: [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfCollapsible styles
- **Complexity:** S
- **Novatron screens:** courses `CourseRulesCard`; docs FAQ; settings pages.
- **Status:** shipped (v0.4.0)

#### ElfScrollArea

- **Purpose:** Styled overflow container with cross-browser scrollbars.
- **Built on:** ScrollArea
- **Key props, variants and parts:** `type`, `orientation`, `scrollHideDelay`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** courses `LessonShell` TOC, chat panel, command list.
- **Status:** shipped (v0.4.0)

### v0.5: Navigation and data display

The structure of an application: navigation chrome, tables, and the dashboard primitives the admin screens repeat.

#### ElfBreadcrumb

- **Purpose:** Hierarchical location trail with ellipsis collapse.
- **Built on:** composed (Primitive)
- **Key props, variants and parts:** parts `List`, `Item`, `Link` (`asChild` for router links), `Page`, `Separator`, `Ellipsis`.
- **Accessibility:** WAI-ARIA pattern: [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDropdownMenu (ellipsis)
- **Complexity:** S
- **Novatron screens:** courses `LessonShell`, admin page headers (`AdminPageHeader`); stock locations.
- **Status:** shipped (unreleased, v0.5)

#### ElfPagination

- **Purpose:** Page navigation with page numbers, ellipsis, prev/next; `ElfSimplePagination` for prev/next only.
- **Built on:** Pagination
- **Key props, variants and parts:** `v-model:page`, `total`, `itemsPerPage`, `siblingCount`, `showEdges`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Landmark navigation). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfButton
- **Complexity:** S
- **Novatron screens:** courses/stock `AdminPagination`.
- **Status:** shipped (unreleased, v0.5)

#### ElfToggleGroup / ElfToggle

- **Purpose:** Pressable toggle(s); `single` or `multiple`; replaces filter chips.
- **Built on:** Toggle, ToggleGroup
- **Key props, variants and parts:** `type`, `v-model`, `variant: default | outline`, `size`.
- **Accessibility:** WAI-ARIA pattern: [Button (toggle)](https://www.w3.org/WAI/ARIA/apg/patterns/button/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfButton styles
- **Complexity:** S
- **Novatron screens:** courses/stock `AdminChips`; forum feed sort; `UpvoteButton`.
- **Status:** shipped (unreleased, v0.5)

#### ElfTable

- **Purpose:** Semantic styled table: parts `Table`, `Header`, `Body`, `Footer`, `Row`, `Head`, `Cell`, `Caption`; responsive stacked-card mode below `sm`.
- **Built on:** composed (native `table`)
- **Key props, variants and parts:** `caption` required (visually hidden allowed), `stackOnMobile`, sticky header, `density`.
- **Accessibility:** WAI-ARIA pattern: [Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfVisuallyHidden
- **Complexity:** M
- **Novatron screens:** courses/stock `AdminTable`; activity logs; HQ audit log.
- **Status:** shipped (unreleased, v0.5)

#### ElfDataTable

- **Purpose:** Table with sorting, filtering, column visibility, row selection, pagination and loading/empty states (headless logic via TanStack Table Vue).
- **Built on:** composed (`@tanstack/vue-table`) on ElfTable
- **Key props, variants and parts:** `columns`, `data`, `rowKey`, `loading`, `v-model:sorting`, `v-model:selection`, `pageSize`, server-driven mode (`manual*` flags), `#cell-<key>`, `#actions`, `#empty`.
- **Accessibility:** WAI-ARIA pattern: [Grid / sortable table](https://www.w3.org/WAI/ARIA/apg/patterns/table/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfTable, ElfPagination, ElfCheckbox, ElfDropdownMenu, ElfInput, ElfSkeleton, ElfEmpty
- **Complexity:** L
- **Novatron screens:** courses `AdminTable` + `AdminFilterBar` + `AdminPagination` combined; stock `admin/*`; HQ members, audit log.
- **Status:** planned

#### ElfEmpty

- **Purpose:** Empty state: icon, title, description, action.
- **Built on:** composed
- **Key props, variants and parts:** parts `Header`, `Media`, `Title`, `Description`, `Content`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfButton
- **Complexity:** S
- **Novatron screens:** courses/stock `AdminEmpty`; search with no results.
- **Status:** shipped (unreleased, v0.5)

#### ElfStatCard

- **Purpose:** KPI tile: label, value, hint, trend, optional link, loading.
- **Built on:** composed
- **Key props, variants and parts:** `label`, `value`, `hint`, `trend`, `tone`, `to` via `asChild`, `loading`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Landmark / link). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfCard, ElfSkeleton
- **Complexity:** S
- **Novatron screens:** courses/stock `AdminStatCard`; forum `StatTile`; HQ dashboards.
- **Status:** shipped (unreleased, v0.5)

#### ElfAspectRatio

- **Purpose:** Fixed-ratio frame for media.
- **Built on:** AspectRatio
- **Key props, variants and parts:** `ratio`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** stock `Thumb`, `PhotoSlot`; course cards.
- **Status:** shipped (unreleased, v0.5)

#### ElfSidebar

- **Purpose:** Collapsible app navigation: groups, items, active state, rail, mobile sheet; `useSidebar()`.
- **Built on:** composed (Collapsible, Sheet, Tooltip)
- **Key props, variants and parts:** `collapsible: offcanvas | icon | none`, `side`, `variant`, `v-model:open`, keyboard shortcut; parts `Provider`, `Header`, `Content`, `Group`, `Menu`, `MenuButton`, `Footer`, `Trigger`, `Rail`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Landmark navigation). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfSheet, ElfTooltip, ElfCollapsible, ElfSeparator, ElfScrollArea
- **Complexity:** L
- **Novatron screens:** `AppNav` in courses/stock/forum; HQ shell; scout.
- **Status:** shipped (unreleased, v0.5)

#### ElfNavigationMenu

- **Purpose:** Top-level site navigation with flyout panels.
- **Built on:** NavigationMenu
- **Key props, variants and parts:** parts `List`, `Item`, `Trigger`, `Content`, `Link`, `Viewport`, `Indicator`.
- **Accessibility:** WAI-ARIA pattern: [Disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** M
- **Novatron screens:** Docs top bar; marketing pages (not required by current apps).
- **Status:** shipped (unreleased, v0.5)

#### ElfStepper

- **Purpose:** Multi-step progress and wizard header.
- **Built on:** Stepper
- **Key props, variants and parts:** `v-model`, `orientation`, `linear`; parts `Item`, `Trigger`, `Indicator`, `Title`, `Description`, `Separator`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfButton
- **Complexity:** M
- **Novatron screens:** stock `add.vue` (photo, name, details) flow; courses onboarding; HQ provisioning.
- **Status:** shipped (unreleased, v0.5)

#### ElfMenubar

- **Purpose:** Desktop-style horizontal menu bar.
- **Built on:** Menubar
- **Key props, variants and parts:** parts mirror Dropdown Menu.
- **Accessibility:** WAI-ARIA pattern: [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDropdownMenu styles
- **Complexity:** M
- **Novatron screens:** Rich editors (courses `LessonMarkdownEditor`), docs tooling; low priority.
- **Status:** shipped (unreleased, v0.5)

### v0.6: Advanced inputs

Search, pickers and uploads: the inputs that are expensive to get right and that Novatron currently hand-rolls.

#### ElfCombobox

- **Purpose:** Searchable single or multi select with custom filtering and async options.
- **Built on:** Combobox
- **Key props, variants and parts:** `v-model`, `multiple`, `searchTerm`, `filterFunction`, `#empty`, `loading`; parts `Anchor`, `Input`, `Trigger`, `List`, `Item`, `Group`, `Empty`.
- **Accessibility:** WAI-ARIA pattern: [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfPopover styles, ElfInput, ElfCheckbox (indicator)
- **Complexity:** L
- **Novatron screens:** courses `AudiencePicker`; stock category/location; scout team picker.
- **Status:** planned

#### ElfAutocomplete

- **Purpose:** Free-text input with suggestions (value is the typed text).
- **Built on:** Autocomplete (Reka 2.11)
- **Key props, variants and parts:** `v-model`, `suggestions`, `#item`, `@select`, `loading`, debounce left to the caller.
- **Accessibility:** WAI-ARIA pattern: [Combobox (list autocomplete)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfInput, ElfPopover styles
- **Complexity:** M
- **Novatron screens:** stock `NameAutocomplete` and `DuplicateCard` flow.
- **Status:** planned

#### ElfNumberField

- **Purpose:** Numeric input with steppers, min/max/step, locale formatting.
- **Built on:** NumberField
- **Key props, variants and parts:** `v-model`, `min`, `max`, `step`, `formatOptions`, `locale`.
- **Accessibility:** WAI-ARIA pattern: [Spin button](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfInput styles
- **Complexity:** M
- **Novatron screens:** stock `QuantitySheet`; wishlist quantities.
- **Status:** planned

#### ElfPinInput

- **Purpose:** One-time code or PIN entry.
- **Built on:** PinInput
- **Key props, variants and parts:** `v-model` (array), `length`, `type`, `mask`, `@complete`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfInput styles
- **Complexity:** S
- **Novatron screens:** HQ password change or 2FA flows (future).
- **Status:** planned

#### ElfSlider

- **Purpose:** Single or range value selector.
- **Built on:** Slider
- **Key props, variants and parts:** `v-model`, `min`, `max`, `step`, `orientation`, multi-thumb.
- **Accessibility:** WAI-ARIA pattern: [Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Audio/video lesson controls, filter ranges (stock price).
- **Status:** planned

#### ElfTagsInput

- **Purpose:** Enter-to-add chips input.
- **Built on:** TagsInput
- **Key props, variants and parts:** `v-model`, `max`, `delimiter`, `addOnPaste`, `duplicate`; parts `Item`, `ItemText`, `ItemDelete`, `Input`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Grid / listbox keyboard). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfBadge styles, ElfCombobox (optional)
- **Complexity:** M
- **Novatron screens:** courses tags and audiences; stock labels.
- **Status:** planned

#### ElfCalendar

- **Purpose:** Month grid for selecting dates (single, multiple, range via `ElfRangeCalendar`).
- **Built on:** Calendar, RangeCalendar
- **Key props, variants and parts:** `v-model`, `minValue`, `maxValue`, `isDateDisabled`, `locale`, `weekStartsOn`.
- **Accessibility:** WAI-ARIA pattern: [Date picker dialog](https://www.w3.org/WAI/ARIA/apg/patterns/datepicker-dialog/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfButton
- **Complexity:** L
- **Novatron screens:** courses assignment due dates; HQ audit log date range.
- **Status:** planned

#### ElfDatePicker

- **Purpose:** Input plus popover calendar; `ElfDateRangePicker`, `ElfTimeField`.
- **Built on:** DatePicker, DateRangePicker, TimeField
- **Key props, variants and parts:** `v-model`, `granularity`, `locale` (Turkish first), `placeholder`.
- **Accessibility:** WAI-ARIA pattern: [Date picker dialog](https://www.w3.org/WAI/ARIA/apg/patterns/datepicker-dialog/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfCalendar, ElfPopover, ElfField
- **Complexity:** L
- **Novatron screens:** courses `AssignmentForm`; HQ audit filters.
- **Status:** planned

#### ElfFileUpload

- **Purpose:** Dropzone and button for file selection with previews, validation and progress; bring-your-own upload.
- **Built on:** composed (native `input[type=file]` + drag events)
- **Key props, variants and parts:** `v-model` (`File[]`), `accept`, `maxSize`, `maxFiles`, `capture`, `#item`, `@reject`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Forms). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfButton, ElfProgress, ElfAlert
- **Complexity:** M
- **Novatron screens:** courses `AssignmentAttachments`; stock `PhotoSlot` and gallery pick; forum post images.
- **Status:** planned

#### ElfCommand

- **Purpose:** Command palette: search, groups, shortcuts; `ElfCommandDialog` wrapper.
- **Built on:** Listbox + Combobox (filter), composed with Dialog
- **Key props, variants and parts:** `v-model:open`, `v-model:searchTerm`, `filterFunction`, parts `Input`, `List`, `Group`, `Item`, `Empty`, `Shortcut`.
- **Accessibility:** WAI-ARIA pattern: [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDialog, ElfInput, ElfKbd, ElfScrollArea
- **Complexity:** L
- **Novatron screens:** courses `QuickSearch`; docs search; HQ global search.
- **Status:** planned

#### ElfInputGroup

- **Purpose:** Input with leading/trailing addons (icons, buttons, units).
- **Built on:** composed
- **Key props, variants and parts:** parts `Addon`, `Input`, `Button`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Forms). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfInput, ElfButton
- **Complexity:** S
- **Novatron screens:** Search boxes in `AdminFilterBar`; password reveal.
- **Status:** planned

### v0.7: Rich display

Content-heavy components for lessons, activity feeds and dashboards.

#### ElfCodeBlock

- **Purpose:** Syntax-highlighted code with copy button and filename tab; Shiki, lazy-loaded.
- **Built on:** composed (Shiki, optional peer)
- **Key props, variants and parts:** `code`, `lang`, `filename`, `lineNumbers`, `highlight`, `#actions`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Region + button). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfButton, ElfTooltip, ElfScrollArea
- **Complexity:** M
- **Novatron screens:** courses `LessonBody` code fences; docs.
- **Status:** planned

#### ElfTimeline

- **Purpose:** Vertical chronological list.
- **Built on:** composed
- **Key props, variants and parts:** parts `Item`, `Marker`, `Content`, `Time`; `orientation`.
- **Accessibility:** Native semantics; no dedicated APG pattern (List). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfBadge
- **Complexity:** S
- **Novatron screens:** stock `activity.vue`; courses `LessonHistory`, `CourseRevisions`; HQ audit.
- **Status:** planned

#### ElfChart

- **Purpose:** Themed chart wrappers (line, area, bar, donut) on `@unovis/vue` or Chart.js, reading CSS tokens; accessible data table fallback.
- **Built on:** composed (third-party peer dependency)
- **Key props, variants and parts:** `data`, `series`, `type`, `tooltip`, `legend`, `height`; tokens `--chart-1..5`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Chart text alternative). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfCard, ElfTooltip
- **Complexity:** L
- **Novatron screens:** forum `ActivityChart`; courses/stock dashboards; HQ presence.
- **Status:** planned

#### ElfTree

- **Purpose:** Hierarchical expandable list with selection.
- **Built on:** Tree
- **Key props, variants and parts:** `items`, `v-model`, `multiple`, `getKey`, `getChildren`, `#item`.
- **Accessibility:** WAI-ARIA pattern: [Tree view](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfCollapsible styles
- **Complexity:** M
- **Novatron screens:** courses `SectionManager`, `LessonOutline`; stock `CategoryManager`, locations.
- **Status:** planned

#### ElfSplitter

- **Purpose:** Resizable panels, keyboard operable.
- **Built on:** Splitter
- **Key props, variants and parts:** `direction`, `autoSaveId`, `minSize`, `collapsible`.
- **Accessibility:** WAI-ARIA pattern: [Window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** M
- **Novatron screens:** courses `LessonMarkdownEditor` split preview; `DiffView`.
- **Status:** planned

#### ElfRating

- **Purpose:** Star or numeric rating input.
- **Built on:** Rating
- **Key props, variants and parts:** `v-model`, `max`, `readonly`.
- **Accessibility:** WAI-ARIA pattern: [Radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Course feedback (future).
- **Status:** planned

#### ElfCarousel

- **Purpose:** Swipeable slides (optional peer: Embla).
- **Built on:** composed (`embla-carousel-vue`)
- **Key props, variants and parts:** `opts`, `orientation`, `plugins`, parts `Content`, `Item`, `Previous`, `Next`.
- **Accessibility:** WAI-ARIA pattern: [Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfButton
- **Complexity:** M
- **Novatron screens:** stock photo galleries; low priority.
- **Status:** planned

#### ElfMarkdown

- **Purpose:** Safe Markdown renderer with ElfUI prose styles (headings, tables, blockquote, code).
- **Built on:** composed (unified/remark, sanitised)
- **Key props, variants and parts:** `source`, `components`, `sanitize`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfCodeBlock
- **Complexity:** L
- **Novatron screens:** forum `MarkdownContent`; courses `LessonBody`; docs.
- **Status:** planned

### v0.8: Layout and utilities

Decide what to ship for layout, finish provider and theme utilities, and harden the registry for third-party themes.

#### ElfConfigProvider

- **Purpose:** Global defaults: locale and direction, tooltip delay, portal target, id seed (wraps Reka `ConfigProvider`).
- **Built on:** ConfigProvider
- **Key props, variants and parts:** `locale`, `dir`, `scrollBody`, `to` (portal), `useId`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** S
- **Novatron screens:** Every app root (`app.vue`); required for Turkish date/number formatting.
- **Status:** planned

#### ElfPortal config

- **Purpose:** Document the teleport target contract (`#elf-portal`) and SSR behaviour.
- **Built on:** Teleport
- **Key props, variants and parts:** through `ElfConfigProvider`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfConfigProvider
- **Complexity:** S
- **Novatron screens:** Overlays inside scroll containers; docs previews.
- **Status:** planned

#### Layout helpers (decision)

- **Purpose:** `ElfContainer`, `ElfStack`, `ElfGrid`.
- **Built on:** —
- **Key props, variants and parts:** **Decision: do not ship components.** Tailwind utilities already express them; ship documented recipes (page shell, sidebar layout, responsive grid) on the docs site instead.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** —
- **Complexity:** S
- **Novatron screens:** Recipes derive from `AdminSection` and `AdminPageHeader`.
- **Status:** planned

#### Theme utilities

- **Purpose:** `createElfTheme()` (token map to CSS) and a CLI-less 'create your theme' checker (contrast, missing tokens); semantic token additions `--success`, `--warning`, `--info`, `--chart-*`, `--sidebar-*`.
- **Built on:** utility
- **Key props, variants and parts:** `tokens`, `validate`.
- **Accessibility:** Native semantics; no dedicated APG pattern (Contrast (WCAG 2.2 AA)). Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** none
- **Complexity:** M
- **Novatron screens:** `nova` theme maintenance; contrast gate in CI.
- **Status:** planned

### v0.9: App-level composites

Novatron-specific patterns that are reused across more than one app. Each is built only from core components. Recommendation per item is below.

#### ElfAdminPage (pattern)

- **Purpose:** Page header, filter bar, table, pagination, empty/error/skeleton states wired together.
- **Built on:** composed
- **Key props, variants and parts:** recipe over `ElfDataTable`, `ElfBreadcrumb`, `ElfEmpty`, `ElfAlert`.
- **Accessibility:** Native semantics; no dedicated APG pattern. Keyboard and ARIA covered by the Definition of Done.
- **Depends on:** ElfDataTable, ElfEmpty, ElfAlert, ElfBreadcrumb
- **Complexity:** M
- **Novatron screens:** courses `admin/ui/*`; stock `admin/ui/*`.
- **Status:** planned

#### ElfLightbox

- **Purpose:** Full-screen image viewer: close on Escape, focus return, zoom, swipe.
- **Built on:** Dialog
- **Key props, variants and parts:** `src`, `alt`, `gallery`, `v-model:open`.
- **Accessibility:** WAI-ARIA pattern: [Dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDialog, ElfButton
- **Complexity:** M
- **Novatron screens:** stock `Lightbox`, `Thumb`; courses media.
- **Status:** planned

#### ElfCameraCapture

- **Purpose:** Camera stream capture with gallery fallback, permission states.
- **Built on:** composed (`getUserMedia`)
- **Key props, variants and parts:** `@captured(blob)`, `facingMode`, `#fallback`.
- **Accessibility:** WAI-ARIA pattern: [Dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfDialog, ElfButton, ElfAlert
- **Complexity:** L
- **Novatron screens:** stock `CameraCapture`, `PhotoSlot`.
- **Status:** planned

#### ElfQuizRunner

- **Purpose:** Question stepper with answer review and scoring slots.
- **Built on:** composed
- **Key props, variants and parts:** `questions`, `v-model`, `@complete`; slots per question type.
- **Accessibility:** WAI-ARIA pattern: [Radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Keyboard table and roles documented on the component page; Reka provides the interaction model.
- **Depends on:** ElfStepper, ElfRadioGroup, ElfCheckbox, ElfProgress, ElfButton
- **Complexity:** L
- **Novatron screens:** courses `QuizRunner`, `LessonShell`.
- **Status:** planned

## Novatron composites and where they belong

The audit of `courses/app/components`, `stock/app/components` and `forum/app/components` found that `admin/ui/*` is the same eleven components in courses and stock, and that all three apps hand-roll a toast host and confirm dialog. Every one of those is covered by a core component above. Items that are specific to one app are listed with a recommendation so we do not grow the core library with domain code.

| Novatron component | Recommendation | Reasoning |
| :--- | :--- | :--- |
| Admin table, filter bar, pagination, stat card, chips, empty, skeleton, error box (`admin/ui/*` in courses and stock) | **Core** | Duplicated byte-for-byte in two apps already. They map to `ElfDataTable`, `ElfPagination`, `ElfToggleGroup`, `ElfStatCard`, `ElfEmpty`, `ElfSkeleton`, `ElfAlert`. The `ElfAdminPage` recipe is documentation, not a component. |
| Confirm dialog, sheet, toast host | **Core** | `ElfAlertDialog`, `ElfSheet`, `ElfToaster`. Three apps each hand-roll them. |
| Name autocomplete | **Core (generic part)** | `ElfAutocomplete` is generic. The stock-specific catalog lookup stays in the app. |
| Lightbox | **Core, optional registry item** | Small, generic, and needs the same focus handling as Dialog. Offered through the registry so apps that do not need it do not pay for it. |
| Camera capture | **Registry-only ("pro") item** | Depends on browser APIs and device quirks, is used in one app, and has a large surface to maintain. Ship it as a copy-in registry item, not part of the package entry. |
| Quiz runner shell | **App-level until a second consumer exists** | Only courses uses it and its model (question types, scoring) is domain specific. Extract the generic stepper and answer controls into core; keep the runner in courses. |
| Markdown editor and diff view | **App-level** | Heavy, domain specific, and better served by a dedicated library. Core provides `ElfMarkdown` for rendering only. |
| QR code | **App-level** | Single consumer and a thin wrapper over a library. |
| App navigation (`AppNav`, `BottomTabs`, `MobileTopBar`) | **Core (`ElfSidebar`) plus recipe** | Sidebar is core. The mobile bottom tab bar is a documented recipe over `ElfTabs`/`ElfToggleGroup` styling; revisit if a second pattern appears. |

The v0.9 composites (`ElfAdminPage`, `ElfLightbox`, `ElfCameraCapture`, `ElfQuizRunner`) are specified above so that the core API is designed with them in mind, but they are built last, only after the first consumer app has migrated, and only the generic ones (`ElfLightbox`, the Admin page recipe) go into the core entry point.

## Explicitly out of scope

- **Automatic light/dark switching.** `elfwood` is a light theme chosen with `data-theme`; there is no `prefers-color-scheme` switch.
- **Layout components** (`Container`, `Stack`, `Grid`): documented as Tailwind recipes (v0.8).
- **Rich text and Markdown editors**: render-only `ElfMarkdown`; editing stays in apps.
- **Icon set**: ElfUI is icon-agnostic. Components take icons by slot; docs examples use `lucide-vue-next` or `@nuxt/icon`.
- **Form validation library**: `ElfField` shows errors and wires ARIA; examples document integration with VeeValidate and Zod but ElfUI does not depend on them. Reka's `Form`/`Field` primitives may be reconsidered at v1.0.
- **Data fetching, state management, i18n runtime.**
- **Color picker** (Reka ships `ColorArea`, `ColorField` and friends): no Novatron use; reconsider on demand.
- **Toolbar, Editable, Tree-based file manager** primitives beyond the entries above: added only when a screen needs them.

## Definition of Done (per component)

Copy this checklist into the pull request. All boxes are required unless marked N/A with a reason.

- [ ] **Source.** `src/components/<name>/` with one `.vue` file per part, `index.ts` exporting the parts, `<Name>Props` types and `<name>Variants`, wired into `src/index.ts`. Uses semantic tokens only; works in `elf` and `nova` themes and at `--radius: 0`.
- [ ] **Types.** Strict TypeScript, no `any`, no unexported prop types; `bun run typecheck` and `bun run lint` pass.
- [ ] **Examples.** `src/components/<name>/examples/*.vue`: at least `Default`, every variant, every size, `Disabled`, and one realistic composition. Examples are the single source for docs, tests and visual baselines.
- [ ] **Docs page.** `apps/docs/content/components/<name>.md` with Installation (package and registry command), Usage, Examples via `<ComponentPreview>`, generated API reference (props, emits, slots), Accessibility (keyboard table and ARIA roles, with APG link), Theming (tokens used).
- [ ] **Unit test.** Vitest (happy-dom): variant classes, `v-model`, `asChild`, props passthrough, edge cases.
- [ ] **Browser a11y test.** Vitest browser mode: every example mounted in every theme, axe-core with zero violations; interaction tests for focus management, Escape, arrow-key behaviour, focus return and typeahead where the pattern defines them.
- [ ] **Visual baselines.** Default examples captured by Playwright at 1280px and 360px in every theme, generated in the Playwright Docker image through the baselines workflow; PNG diff reviewed in the pull request.
- [ ] **Registry item.** `registry.json` and `registry/r/<name>.json` regenerated (`bun run registry:build`), `registryDependencies` correct, installs into a clean project.
- [ ] **llms entry.** `llms.txt` and `llms-full.txt` regenerated and `bun run llms:check` passes.
- [ ] **Changelog.** One line under `Unreleased` in `CHANGELOG.md`; this roadmap entry status changed to **done** with the release version.
- [ ] **Gate.** `bun run check` is green locally and CI (Check, Visual regression, Build example) is green.

## Release rules

- Each milestone ships as one minor release when all of its components meet the Definition of Done; partial milestones may ship as patch releases of finished components.
- Order within a milestone may change when a Novatron app is blocked, but dependencies always come first (for example `ElfLabel` before `ElfField`).
- The first Novatron migration target is the `stock` app after v0.5 (sheets, toasts, table, autocomplete, camera as an app-level piece), then `courses` after v0.6.
- **v1.0 criteria:** all of v0.3 to v0.8 shipped; the API freeze review done; a manual screen-reader pass (NVDA with Firefox, VoiceOver with Safari) on Dialog, Select, Combobox, Dropdown Menu, Data Table and Date Picker; `stock` and `courses` running on ElfUI in production; a migration guide from the Novatron hand-rolled components; docs complete, including Testing and Contributing.

## Sources surveyed

- shadcn-vue component catalogue (accordion to tooltip, plus blocks and charts, sidebar, sonner, data table): <https://www.shadcn-vue.com/docs/components>
- Reka UI primitives list (and the 2.11 package installed in this repo): <https://reka-ui.com/docs/components/accordion>
- Nuxt UI v4 components (UApp, UDashboard*, UTable, UCommandPalette, UStepper, UTimeline, UFileUpload, UChip and others): <https://ui.nuxt.com/docs/components>
- Radix Themes components: <https://www.radix-ui.com/themes/docs/components/overview>
- WAI-ARIA Authoring Practices Guide patterns: <https://www.w3.org/WAI/ARIA/apg/patterns/>
- Novatron apps: `courses/app/components` (admin/ui, layout, lesson, chat), `stock/app/components` (ui, add, item, admin), `forum/app/components` (post, comment, stats, layout).

Note: the shadcn-vue, Nuxt UI and Radix lists were compared from memory of their documented catalogues at the time of writing and the Reka list was verified against the installed package; re-verify the external catalogues when starting each milestone.
