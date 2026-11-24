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
    .replaceAll(/from '\.\.\/([a-z]+)'/g, 'from \'@/components/ui/$1\'')

// Primary host is GitHub Pages; https://raw.githubusercontent.com/xouyi/elf/main/registry/r is the fallback.
const REGISTRY = 'https://xouyi.github.io/elf/r'
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
  const files = readdirSync(srcDir)
    .filter(f => !/\.(test|stories)\.ts$/.test(f) && !f.endsWith('.mdx'))
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
  description: 'Tailwind v4 token mappings and the elf and novatron theme files. Import elf.css after tailwindcss.',
  files: [
    { path: 'registry/_generated/css/elf.css', type: 'registry:file', target: 'assets/css/elf/elf.css' },
    { path: 'registry/_generated/css/themes/elf.css', type: 'registry:file', target: 'assets/css/elf/themes/elf.css' },
    { path: 'registry/_generated/css/themes/novatron.css', type: 'registry:file', target: 'assets/css/elf/themes/novatron.css' },
  ],
})

writeFileSync(
  join(root, 'registry.json'),
  `${JSON.stringify({ $schema: 'https://shadcn-vue.com/schema/registry.json', name: 'elf', homepage: 'https://xouyi.github.io/elf/', items }, null, 2)}\n`,
)
console.log(`registry.json: ${items.length} items`)
