/**
 * Curated, human-written metadata for llms.txt. Variant lists, exports and theme tokens are read
 * from the sources by generate-llms.ts; only prose lives here; code examples are read from src/components/<dir>/examples/*.vue.
 * Adding a component: add an entry below (the generator fails when a component directory has none).
 */
export interface ComponentMeta {
  /** Directory name in src/components. */
  dir: string
  name: string
  summary: string
  /** Exported Vue components in this family, in the order they should be listed. */
  parts: string[]
  /** Variant factory exported from index.ts, if any (its cva options are parsed). */
  variants?: string
  props: { name: string, type: string, default?: string, description: string }[]
  slots?: string[]
  a11y: string[]
}

export const components: ComponentMeta[] = [
  {
    dir: 'button',
    name: 'Button',
    summary: 'Triggers an action. Renders a native button; use as-child to render a link or other element.',
    parts: ['ElfButton'],
    variants: 'buttonVariants',
    props: [
      { name: 'variant', type: 'variant union', default: 'default', description: 'Visual style.' },
      { name: 'size', type: 'size union', default: 'default', description: 'Size. Use icon for square icon-only buttons.' },
      { name: 'as', type: 'string | Component', default: 'button', description: 'Element to render.' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render the child element with Button styling (attribute: as-child).' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes via cn().' },
    ],
    slots: ['default: button content (text and icons)'],
    a11y: ['Icon-only buttons (size="icon") must have an aria-label.', 'Use as-child with a link for navigation.'],
  },
  {
    dir: 'input',
    name: 'Input',
    summary: 'Single-line text input with v-model. A native input: all native attributes fall through.',
    parts: ['ElfInput'],
    props: [
      { name: 'modelValue', type: 'string | number', description: 'Bound with v-model.' },
      { name: 'defaultValue', type: 'string | number', description: 'Initial value when uncontrolled.' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes.' },
    ],
    a11y: ['Always provide a visible label (label for=) or aria-label; a placeholder is not a label.', 'Set aria-invalid="true" for errors and describe the error in text.'],
  },
  {
    dir: 'badge',
    name: 'Badge',
    summary: 'Small pill for status and labels. Static text unless rendered as a link or button with as-child.',
    parts: ['ElfBadge'],
    variants: 'badgeVariants',
    props: [
      { name: 'variant', type: 'variant union', default: 'default', description: 'Visual style.' },
      { name: 'as', type: 'string | Component', default: 'span', description: 'Element to render.' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render the child element with Badge styling.' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes.' },
    ],
    slots: ['default: badge text'],
    a11y: ['Do not rely on color alone: the text must state the status.'],
  },
  {
    dir: 'card',
    name: 'Card',
    summary: 'Container for grouped content, composed from parts.',
    parts: ['ElfCard', 'ElfCardHeader', 'ElfCardTitle', 'ElfCardDescription', 'ElfCardAction', 'ElfCardContent', 'ElfCardFooter'],
    props: [{ name: 'class', type: 'string | array | object', description: 'Accepted by every part; merged with base classes.' }],
    slots: ['default on every part', 'ElfCardAction sits top-right inside ElfCardHeader'],
    a11y: ['A card is a plain div; choose heading semantics for the title yourself.', 'If the whole card is a link, link the title rather than wrapping the card.'],
  },
  {
    dir: 'dialog',
    name: 'Dialog',
    summary: 'Accessible modal dialog on Reka UI: focus trap, Escape to close, focus restore.',
    parts: ['ElfDialog', 'ElfDialogTrigger', 'ElfDialogContent', 'ElfDialogHeader', 'ElfDialogTitle', 'ElfDialogDescription', 'ElfDialogFooter', 'ElfDialogClose', 'ElfDialogOverlay'],
    props: [
      { name: 'ElfDialog open / defaultOpen', type: 'boolean', description: 'Controlled (v-model:open) or initial open state.' },
      { name: 'ElfDialogContent showCloseButton', type: 'boolean', default: 'true', description: 'Show the corner close button.' },
      { name: 'ElfDialogFooter showCloseButton', type: 'boolean', default: 'false', description: 'Append a Close button to the footer.' },
    ],
    slots: ['ElfDialogTrigger and ElfDialogClose: use as-child with an ElfButton'],
    a11y: ['Always include ElfDialogTitle and ElfDialogDescription.', 'Do not stack dialogs.'],
  },
  {
    dir: 'tabs',
    name: 'Tabs',
    summary: 'Switch between related views. Roving focus and arrow-key navigation on Reka UI.',
    parts: ['ElfTabs', 'ElfTabsList', 'ElfTabsTrigger', 'ElfTabsContent'],
    props: [
      { name: 'ElfTabs defaultValue / modelValue', type: 'string', description: 'Initial or v-model selected tab value.' },
      { name: 'ElfTabsTrigger value', type: 'string', description: 'Required; must match an ElfTabsContent value.' },
      { name: 'ElfTabsContent value', type: 'string', description: 'Required; panel for the matching trigger.' },
    ],
    a11y: ['Give ElfTabsList an aria-label.', 'Use tabs for peer views, not for step-by-step flows.'],
  },
  {
    dir: 'visually-hidden',
    name: 'VisuallyHidden',
    summary: 'Hides content visually while keeping it in the accessibility tree. Use it for icon-button names, hidden labels and table captions.',
    parts: ['ElfVisuallyHidden'],
    props: [
      { name: 'as', type: 'string | Component', default: 'span', description: 'Element to render.' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render the child element with the hiding styles (attribute: as-child).' },
      { name: 'feature', type: '\'focusable\' | \'fully-hidden\'', default: 'focusable', description: 'fully-hidden also removes the content from the accessibility tree and tab order (aria-hidden, tabindex -1).' },
      { name: 'class', type: 'string | array | object', description: 'Merged onto the element.' },
    ],
    slots: ['default: the hidden content (text, or an element with as-child)'],
    a11y: ['Prefer visible text. Use this only where a visual label would be redundant.', 'Keep fully-hidden for decorative helpers; never put real content in it.'],
  },
]

export const rules = [
  'Use ElfUI components (ElfButton, ElfInput, ElfBadge, ElfCard, ElfDialog, ElfTabs) instead of hand-rolling buttons, inputs, badges, cards, dialogs or tabs.',
  'Choose appearance with props (variant, size), not custom classes or inline styles.',
  'Style with theme tokens (bg-primary, text-muted-foreground, border-border), never hard-coded colors (no #hex, no bg-violet-500).',
  'ElfUI is dark only: do not add light-mode styles or dark: variants.',
  'Do not override border radius with arbitrary values; radii derive from the theme (novatron is sharp, 0px).',
  'Components are auto-imported in Nuxt with the Elf prefix; outside Nuxt import them from "@elf/ui".',
  'Always label inputs (label for= or aria-label) and give icon-only buttons an aria-label.',
  'Dialogs need a title and description; tabs lists need an aria-label.',
  'Keep exactly one primary (default variant) button per view; use destructive only for irreversible actions.',
  'Install from a pinned GitHub tag (github:xouyi/elfUI#vX.Y.Z); typescript 5 or 6 (not 7) must be installed in the consumer project.',
  'Use Bun for all package commands (bun add, bun run, bunx), never npm, pnpm or yarn.',
]

export const novatronRules = [
  'Use data-theme="novatron" (or elf: { theme: "novatron" } in nuxt.config) for anything representing Novatron Robotics (FRC Team 10202).',
  'Palette: obsidian black background (#050505 / #09090b) and Novatron gold (#ffcc00) primary. 100% dark mode.',
  'Geometry is sharp: 0px border radius everywhere. Never add rounded-* overrides or rounded arbitrary values.',
  'Downstream user-facing copy for Novatron apps is Turkish; code, identifiers and comments are English.',
]
