/**
 * Generates registry/_generated from src/ and registry.json.
 *
 * Source files use relative imports so the npm package works without aliases.
 * Registry copies use shadcn-vue aliases (@/lib/utils, @/components/ui/*),
 * which the shadcn-vue CLI rewrites to the consumer's components.json aliases.
 */
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const out = join(root, 'registry', '_generated')
rmSync(out, { recursive: true, force: true })

const rewrite = (s: string) =>
  s
    .replaceAll(/from '\.\.\/\.\.\/lib\/utils'/g, 'from \'@/lib/utils\'')
    .replaceAll(/from '\.\.\/([a-z-]+)'/g, 'from \'@/components/ui/$1\'')

// Primary host is GitHub Pages; https://raw.githubusercontent.com/xouyi/elfUI/main/registry/r is the fallback.
const REGISTRY = 'https://xouyi.github.io/elfUI/r'
const dep = (name: string) => `${REGISTRY}/${name}.json`

mkdirSync(join(out, 'lib'), { recursive: true })
writeFileSync(join(out, 'lib', 'utils.ts'), readFileSync(join(root, 'src/lib/utils.ts'), 'utf8'))

const meta: Record<string, { title: string, description: string, dependencies: string[], registryDependencies?: string[] }> = {
  button: { title: 'Button', description: 'Button with default, secondary, outline, ghost, destructive and link variants.', dependencies: ['reka-ui', 'class-variance-authority'] },
  input: { title: 'Input', description: 'Text input with v-model support.', dependencies: ['@vueuse/core'] },
  badge: { title: 'Badge', description: 'Badge with default, secondary, outline, destructive, success and warning variants.', dependencies: ['reka-ui', 'class-variance-authority', '@vueuse/core'] },
  card: { title: 'Card', description: 'Card with header, title, description, action, content and footer.', dependencies: [] },
  dialog: { title: 'Dialog', description: 'Accessible modal dialog built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue'], registryDependencies: [dep('button')] },
  tabs: { title: 'Tabs', description: 'Accessible tabs built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'] },
  label: { title: 'Label', description: 'Accessible label for a form control, built on Reka UI.', dependencies: ['reka-ui'] },
  separator: { title: 'Separator', description: 'Horizontal or vertical divider, built on Reka UI.', dependencies: ['reka-ui'] },
  kbd: { title: 'Kbd', description: 'Keyboard key hint with a group for shortcuts.', dependencies: ['reka-ui'] },
  spinner: { title: 'Spinner', description: 'Indeterminate busy indicator announced through role status.', dependencies: ['class-variance-authority'], registryDependencies: [dep('visually-hidden')] },
  skeleton: { title: 'Skeleton', description: 'Placeholder block shown while content loads.', dependencies: [] },
  textarea: { title: 'Textarea', description: 'Multi-line text input with v-model and optional auto-grow.', dependencies: ['@vueuse/core'] },
  field: { title: 'Field', description: 'Form row with label, control, description and error wired through ids and ARIA attributes.', dependencies: ['reka-ui', 'class-variance-authority'], registryDependencies: [dep('label')] },
  checkbox: { title: 'Checkbox', description: 'Binary or indeterminate selection control built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue'], registryDependencies: [dep('field')] },
  'radio-group': { title: 'Radio Group', description: 'Mutually exclusive options with arrow-key navigation, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'], registryDependencies: [dep('field')] },
  switch: { title: 'Switch', description: 'On/off setting with sm and default sizes, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', 'class-variance-authority'] },
  select: { title: 'Select', description: 'Dropdown to choose one value from a list, with groups, typeahead and scroll buttons, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue', 'class-variance-authority'], registryDependencies: [dep('field')] },
  alert: { title: 'Alert', description: 'Static message with default, destructive, success and warning variants and live region handling.', dependencies: ['class-variance-authority', '@lucide/vue'] },
  progress: { title: 'Progress', description: 'Determinate and indeterminate progress bar built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', 'class-variance-authority'] },
  'gradient-text': { title: 'Gradient Text', description: 'Inline gradient text with theme-aware presets, custom stops, direction and a reduced-motion-safe shimmer.', dependencies: ['reka-ui'] },
  avatar: { title: 'Avatar', description: 'Image with initials fallback, four sizes and an overlapping group, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', 'class-variance-authority'] },
  'scroll-area': { title: 'Scroll Area', description: 'Scrolling container with styled scrollbars that stays keyboard scrollable, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'] },
  'context-menu': { title: 'Context Menu', description: 'Right-click, long-press and keyboard menu with the same parts and styles as the Dropdown Menu, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue'], registryDependencies: [dep('dropdown-menu')] },
  'dropdown-menu': { title: 'Dropdown Menu', description: 'Action menu opened from a button with items, checkbox and radio items, groups, sub menus and shortcuts, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue', 'class-variance-authority'] },
  'hover-card': { title: 'Hover Card', description: 'Rich preview on hover or focus of a link, built on Reka UI and sharing the Popover panel styles.', dependencies: ['reka-ui', '@vueuse/core'], registryDependencies: [dep('popover')] },
  popover: { title: 'Popover', description: 'Anchored interactive panel with trigger, anchor and close parts, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'] },
  tooltip: { title: 'Tooltip', description: 'Short non-interactive hint on hover or focus with a shared delay provider, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'] },
  'visually-hidden': { title: 'Visually Hidden', description: 'Hides content visually while keeping it available to assistive technology.', dependencies: ['reka-ui'] },
  'alert-dialog': { title: 'Alert Dialog', description: 'Modal that demands a decision, with Cancel and Action parts and initial focus on Cancel, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'], registryDependencies: [dep('button'), dep('dialog')] },
  sheet: { title: 'Sheet', description: 'Edge-anchored modal panel (top, right, bottom, left) with a mobile-friendly bottom sheet, built on Reka UI Dialog.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue', 'class-variance-authority'], registryDependencies: [dep('dialog')] },
  toast: { title: 'Toast', description: 'Toaster and useToast(): a queue of transient notifications with variants, actions, promise toasts, swipe to dismiss and an F8 hotkey, built on Reka UI Toast.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue', 'class-variance-authority'], registryDependencies: [dep('button')] },
  collapsible: { title: 'Collapsible', description: 'Single show and hide region with an animated height, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core'] },
  accordion: { title: 'Accordion', description: 'Stacked collapsible sections, single or multiple, with arrow-key navigation, built on Reka UI.', dependencies: ['reka-ui', '@vueuse/core', '@lucide/vue'], registryDependencies: [dep('collapsible')] },
  table: { title: 'Table', description: 'Semantic styled table with caption, density, sticky header, sortable header affordance and a stacked-card mode on small screens.', dependencies: ['@vueuse/core'] },
}

const items: unknown[] = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'cn utility',
    description: 'clsx + tailwind-merge class helper.',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [{ path: 'registry/_generated/lib/utils.ts', type: 'registry:lib', target: 'lib/utils.ts' }],
  },
]

for (const [name, m] of Object.entries(meta)) {
  const srcDir = join(root, 'src/components', name)
  const dstDir = join(out, 'ui', name)
  mkdirSync(dstDir, { recursive: true })
  const files = readdirSync(srcDir, { withFileTypes: true })
    .filter(e => e.isFile() && !e.name.endsWith('.test.ts'))
    .map(e => e.name)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)) // code-point order: readdir order differs per filesystem
  for (const f of files) {
    writeFileSync(join(dstDir, f), rewrite(readFileSync(join(srcDir, f), 'utf8')))
  }
  items.push({
    name,
    type: 'registry:ui',
    title: m.title,
    description: m.description,
    dependencies: m.dependencies,
    registryDependencies: [dep('utils'), ...(m.registryDependencies ?? [])],
    files: files.map(f => ({ path: `registry/_generated/ui/${name}/${f}`, type: 'registry:ui' })),
  })
}

// Theme tokens and Tailwind mappings, copied into the project as plain CSS.
mkdirSync(join(out, 'css'), { recursive: true })
const styles = readFileSync(join(root, 'src/styles.css'), 'utf8').replace(/^@source .*\n\n?/m, '')
writeFileSync(join(out, 'css', 'elf.css'), styles)
cpSync(join(root, 'src/themes'), join(out, 'css', 'themes'), { recursive: true })
items.push({
  name: 'elf-theme',
  type: 'registry:file',
  title: 'Elf theme',
  description: 'Tailwind v4 token mappings and the elf, nova and elfwood theme files. Import elf.css after tailwindcss.',
  files: [
    { path: 'registry/_generated/css/elf.css', type: 'registry:file', target: 'assets/css/elf/elf.css' },
    { path: 'registry/_generated/css/themes/elf.css', type: 'registry:file', target: 'assets/css/elf/themes/elf.css' },
    { path: 'registry/_generated/css/themes/nova.css', type: 'registry:file', target: 'assets/css/elf/themes/nova.css' },
    { path: 'registry/_generated/css/themes/elfwood.css', type: 'registry:file', target: 'assets/css/elf/themes/elfwood.css' },
  ],
})

writeFileSync(
  join(root, 'registry.json'),
  `${JSON.stringify({ $schema: 'https://shadcn-vue.com/schema/registry.json', name: 'elf', homepage: 'https://xouyi.github.io/elfUI/', items }, null, 2)}\n`,
)
console.log(`registry.json: ${items.length} items`)
