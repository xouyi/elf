/**
 * Curated, human-written metadata for llms.txt. Variant lists, exports and theme tokens are read
 * from the sources by generate-llms.ts; only prose and examples live here.
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
  example: string
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
    example: `<ElfButton variant="outline" size="sm" @click="save">Save</ElfButton>
<ElfButton as-child><NuxtLink to="/docs">Documentation</NuxtLink></ElfButton>
<ElfButton size="icon" aria-label="Add"><Plus /></ElfButton>`,
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
    example: `<label for="email" class="text-sm font-medium">Email</label>
<ElfInput id="email" v-model="email" type="email" placeholder="you@example.com" />`,
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
    example: `<ElfBadge variant="success">Live</ElfBadge>
<ElfBadge variant="warning">Pending review</ElfBadge>`,
  },
  {
    dir: 'card',
    name: 'Card',
    summary: 'Container for grouped content, composed from parts.',
    parts: ['ElfCard', 'ElfCardHeader', 'ElfCardTitle', 'ElfCardDescription', 'ElfCardAction', 'ElfCardContent', 'ElfCardFooter'],
    props: [{ name: 'class', type: 'string | array | object', description: 'Accepted by every part; merged with base classes.' }],
    slots: ['default on every part', 'ElfCardAction sits top-right inside ElfCardHeader'],
    a11y: ['A card is a plain div; choose heading semantics for the title yourself.', 'If the whole card is a link, link the title rather than wrapping the card.'],
    example: `<ElfCard>
  <ElfCardHeader>
    <ElfCardTitle>Match log</ElfCardTitle>
    <ElfCardDescription>Qualification 12</ElfCardDescription>
    <ElfCardAction><ElfBadge variant="success">Won</ElfBadge></ElfCardAction>
  </ElfCardHeader>
  <ElfCardContent>...</ElfCardContent>
  <ElfCardFooter><ElfButton>Open</ElfButton></ElfCardFooter>
</ElfCard>`,
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
    example: `<ElfDialog v-model:open="open">
  <ElfDialogTrigger as-child><ElfButton variant="outline">Edit</ElfButton></ElfDialogTrigger>
  <ElfDialogContent>
    <ElfDialogHeader>
      <ElfDialogTitle>Edit profile</ElfDialogTitle>
      <ElfDialogDescription>Update your display name.</ElfDialogDescription>
    </ElfDialogHeader>
    <ElfInput aria-label="Display name" />
    <ElfDialogFooter>
      <ElfDialogClose as-child><ElfButton variant="outline">Cancel</ElfButton></ElfDialogClose>
      <ElfButton>Save</ElfButton>
    </ElfDialogFooter>
  </ElfDialogContent>
</ElfDialog>`,
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
    example: `<ElfTabs default-value="overview">
  <ElfTabsList aria-label="Account sections">
    <ElfTabsTrigger value="overview">Overview</ElfTabsTrigger>
    <ElfTabsTrigger value="settings">Settings</ElfTabsTrigger>
  </ElfTabsList>
  <ElfTabsContent value="overview">...</ElfTabsContent>
  <ElfTabsContent value="settings">...</ElfTabsContent>
</ElfTabs>`,
  },
]

export const rules = [
  'Use Elf components (ElfButton, ElfInput, ElfBadge, ElfCard, ElfDialog, ElfTabs) instead of hand-rolling buttons, inputs, badges, cards, dialogs or tabs.',
  'Choose appearance with props (variant, size), not custom classes or inline styles.',
  'Style with theme tokens (bg-primary, text-muted-foreground, border-border), never hard-coded colors (no #hex, no bg-violet-500).',
  'Elf is dark only: do not add light-mode styles or dark: variants.',
  'Do not override border radius with arbitrary values; radii derive from the theme (novatron is sharp, 0px).',
  'Components are auto-imported in Nuxt with the Elf prefix; outside Nuxt import them from "@elf/ui".',
  'Always label inputs (label for= or aria-label) and give icon-only buttons an aria-label.',
  'Dialogs need a title and description; tabs lists need an aria-label.',
  'Keep exactly one primary (default variant) button per view; use destructive only for irreversible actions.',
  'Install from a pinned GitHub tag (github:xouyi/elf#vX.Y.Z); typescript must be installed in the consumer project.',
  'Use Bun for all package commands (bun add, bun run, bunx), never npm, pnpm or yarn.',
]

export const novatronRules = [
  'Use data-theme="novatron" (or elf: { theme: "novatron" } in nuxt.config) for anything representing Novatron Robotics (FRC Team 10202).',
  'Palette: obsidian black background (#050505 / #09090b) and Novatron gold (#ffcc00) primary. 100% dark mode.',
  'Geometry is sharp: 0px border radius everywhere. Never add rounded-* overrides or rounded arbitrary values.',
  'Downstream user-facing copy for Novatron apps is Turkish; code, identifiers and comments are English.',
]
