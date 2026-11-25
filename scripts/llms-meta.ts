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
  {
    dir: 'label',
    name: 'Label',
    summary: 'Accessible label for a form control. Renders a native label; clicking it focuses or toggles the control.',
    parts: ['ElfLabel'],
    props: [
      { name: 'for', type: 'string', description: 'The id of the control the label belongs to.' },
      { name: 'as', type: 'string | Component', default: 'label', description: 'Element to render.' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render the child element with Label styling (attribute: as-child).' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes.' },
    ],
    slots: ['default: label text'],
    a11y: ['Connect every control with for and a matching id.', 'Put the control before the label and give it the peer class so peer-disabled dims the label.'],
  },
  {
    dir: 'separator',
    name: 'Separator',
    summary: 'Horizontal or vertical divider. Decorative by default; set decorative to false to expose role=separator.',
    parts: ['ElfSeparator'],
    props: [
      { name: 'orientation', type: '\'horizontal\' | \'vertical\'', default: 'horizontal', description: 'Direction of the line. A vertical separator needs a parent with a height.' },
      { name: 'decorative', type: 'boolean', default: 'true', description: 'When true the element is hidden from assistive technology (role none).' },
      { name: 'as', type: 'string | Component', default: 'div', description: 'Element to render.' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes.' },
    ],
    a11y: ['Use decorative="false" only when the divider separates meaningful regions.', 'Do not use a separator as the only cue between sections.'],
  },
  {
    dir: 'kbd',
    name: 'Kbd',
    summary: 'Keyboard key hint. A native kbd element; ElfKbdGroup keeps the keys of one shortcut together.',
    parts: ['ElfKbd', 'ElfKbdGroup'],
    props: [
      { name: 'as', type: 'string | Component', default: 'kbd', description: 'Element to render (both parts).' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render the child element with Kbd styling (attribute: as-child).' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes (both parts).' },
    ],
    slots: ['default: key name or an icon (icon-only keys need ElfVisuallyHidden text)'],
    a11y: ['Icon-only keys need visually hidden text naming the key (aria-label is not valid on kbd).', 'A hint is not a control: keep the action reachable another way.'],
  },
  {
    dir: 'spinner',
    name: 'Spinner',
    summary: 'Indeterminate busy indicator. An SVG ring in a role=status region with a visually hidden label; inherits the text color.',
    parts: ['ElfSpinner'],
    variants: 'spinnerVariants',
    props: [
      { name: 'size', type: 'size union', default: 'default', description: 'Diameter: sm, default, lg, xl.' },
      { name: 'label', type: 'string', default: 'Loading', description: 'Announced to assistive technology, not shown.' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes; set the color with a text utility.' },
    ],
    a11y: ['Mount the spinner when work starts so the status is announced.', 'Use a specific label when several spinners can appear.', 'Animation stops under prefers-reduced-motion.'],
  },
  {
    dir: 'skeleton',
    name: 'Skeleton',
    summary: 'Placeholder block shown while content loads. Decorative (aria-hidden); size and shape come from classes.',
    parts: ['ElfSkeleton'],
    props: [{ name: 'class', type: 'string | array | object', description: 'Size and shape (h-4 w-40, size-10 rounded-full); merged with base classes.' }],
    a11y: ['Skeletons are aria-hidden: mark the loading region with aria-busy and render a visually hidden role=status message.', 'The pulse stops under prefers-reduced-motion.'],
  },
  {
    dir: 'textarea',
    name: 'Textarea',
    summary: 'Multi-line text input with v-model and optional auto-grow. A native textarea: all native attributes fall through.',
    parts: ['ElfTextarea'],
    props: [
      { name: 'modelValue', type: 'string', description: 'Bound with v-model.' },
      { name: 'defaultValue', type: 'string', description: 'Initial value when uncontrolled.' },
      { name: 'autoResize', type: 'boolean', default: 'false', description: 'Grow and shrink with the content (attribute: auto-resize). Cap with a max-h-* class.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Sets aria-invalid="true" and the destructive border and ring.' },
      { name: 'rows', type: 'number', default: '3', description: 'Visible lines; the minimum height with autoResize.' },
      { name: 'maxlength', type: 'number', description: 'Maximum number of characters.' },
      { name: 'class', type: 'string | array | object', description: 'Merged with base classes.' },
    ],
    a11y: ['Always provide a visible label (ElfLabel for=) or aria-label; a placeholder is not a label.', 'Describe errors in text and link them with aria-describedby (ElfField does this).'],
  },
  {
    dir: 'field',
    name: 'Field',
    summary: 'Form row: label, one control, description and error wired through id, for, aria-describedby and aria-invalid. Wrap the control in ElfFieldControl; works with ElfInput, ElfTextarea and native controls.',
    parts: ['ElfField', 'ElfFieldControl', 'ElfFieldLabel', 'ElfFieldDescription', 'ElfFieldError'],
    variants: 'fieldVariants',
    props: [
      { name: 'ElfField label', type: 'string', description: 'Label text (or use the label slot / ElfFieldLabel).' },
      { name: 'ElfField description', type: 'string', description: 'Helper text; the control references it with aria-describedby.' },
      { name: 'ElfField error', type: 'string', description: 'Error message (role=alert). Sets aria-invalid on the control. Show it after blur or submit.' },
      { name: 'ElfField invalid', type: 'boolean', default: 'false', description: 'Invalid state without a message.' },
      { name: 'ElfField required', type: 'boolean', default: 'false', description: 'Adds a label marker and aria-required on the control.' },
      { name: 'ElfField disabled', type: 'boolean', default: 'false', description: 'Disables the control and dims the label.' },
      { name: 'ElfField orientation', type: '\'vertical\' | \'horizontal\'', default: 'vertical', description: 'Horizontal puts the label beside the control from the sm breakpoint.' },
      { name: 'ElfField id', type: 'string', description: 'Control id; generated by default.' },
      { name: 'class', type: 'string | array | object', description: 'Accepted by every part; merged with base classes.' },
    ],
    slots: ['ElfField default: exactly one ElfFieldControl wrapping the control', 'ElfField label / description / error: rich content instead of the props'],
    a11y: ['Wrap exactly one control in ElfFieldControl; it merges id, aria-describedby, aria-invalid, aria-required and disabled onto the child.', 'Do not render errors on first load: the error has role=alert and is announced when it appears.'],
  },
]

export const rules = [
  'Use ElfUI components (ElfButton, ElfInput, ElfBadge, ElfCard, ElfDialog, ElfTabs) instead of hand-rolling buttons, inputs, badges, cards, dialogs or tabs.',
  'Choose appearance with props (variant, size), not custom classes or inline styles.',
  'Style with theme tokens (bg-primary, text-muted-foreground, border-border), never hard-coded colors (no #hex, no bg-violet-500).',
  'ElfUI is dark only: do not add light-mode styles or dark: variants.',
  'Do not override border radius with arbitrary values; radii derive from the theme (novatron is sharp, 0px).',
  'Components are auto-imported in Nuxt with the Elf prefix; outside Nuxt import them from "@xouyi/elfui".',
  'Always label inputs (label for= or aria-label) and give icon-only buttons an aria-label.',
  'Dialogs need a title and description; tabs lists need an aria-label.',
  'Keep exactly one primary (default variant) button per view; use destructive only for irreversible actions.',
  'Install from npm (`bun add @xouyi/elfui`, or `bunx @xouyi/elfui@latest init` to set up a project); typescript 5 or 6 (not 7) must be installed in the consumer project.',
  'Use Bun for all package commands (bun add, bun run, bunx), never npm, pnpm or yarn.',
]

export const novatronRules = [
  'Use data-theme="novatron" (or the `elfui: { theme: "novatron" }` option in nuxt.config; the config key stays `elfui`) for anything representing Novatron Robotics (FRC Team 10202).',
  'Palette: obsidian black background (#050505 / #09090b) and Novatron gold (#ffcc00) primary. 100% dark mode.',
  'Geometry is sharp: 0px border radius everywhere. Never add rounded-* overrides or rounded arbitrary values.',
  'Downstream user-facing copy for Novatron apps is Turkish; code, identifiers and comments are English.',
]
