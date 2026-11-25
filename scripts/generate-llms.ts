/**
 * Generates llms.txt (index) and llms-full.txt (everything) at the repo root from the component sources
 * (variants, exports, theme tokens) and scripts/llms-meta.ts (curated prose).
 *
 *   bun run llms          write both files
 *   bun run llms:check    fail when the committed files are stale
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { components, novatronRules, rules } from './llms-meta'

// readdir order differs between filesystems (local vs CI); sort so the generated files are byte-identical everywhere.
const byCodePoint = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0)

const root = join(import.meta.dirname, '..')
const read = (p: string) => readFileSync(join(root, p), 'utf8')
const pkg = JSON.parse(read('package.json')) as { version: string }
const SITE = 'https://xouyi.github.io/elfUI'
const REPO = 'https://github.com/xouyi/elfUI'

/** Parse `variants: { name: { option: '...' } }` and defaultVariants from a cva() call. */
function parseVariants(src: string, factory: string) {
  const start = src.indexOf(`export const ${factory}`)
  if (start < 0) throw new Error(`${factory} not found`)
  const body = src.slice(start)
  const vStart = body.indexOf('variants: {')
  const dStart = body.indexOf('defaultVariants: {')
  const block = body.slice(vStart + 'variants: {'.length, dStart)
  const groups: Record<string, string[]> = {}
  let current = ''
  for (const line of block.split('\n')) {
    const g = line.match(/^ {6}(\w+): \{$/)
    if (g) { current = g[1]!; groups[current] = []; continue }
    const o = line.match(/^ {8}(\w+):/)
    if (o && current) groups[current]!.push(o[1]!)
  }
  const defaults: Record<string, string> = {}
  for (const m of body.slice(dStart).split('}')[0]!.matchAll(/(\w+): '(\w+)'/g)) defaults[m[1]!] = m[2]!
  return { groups, defaults }
}

function parseTokens() {
  const css = read('src/themes/elf.css')
  return [...css.matchAll(/--elf-([\w-]+):/g)].map(m => m[1]!)
}

function themeValue(theme: string, token: string) {
  return read(`src/themes/${theme}.css`).match(new RegExp(`--elf-${token}:\\s*([^;]+);`))?.[1]?.trim() ?? ''
}

// Fail loudly when a component directory has no curated metadata, or exports drift.
const dirs = readdirSync(join(root, 'src/components'), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort(byCodePoint)
for (const d of dirs) {
  if (!components.some(c => c.dir === d)) throw new Error(`src/components/${d} has no entry in scripts/llms-meta.ts`)
}
const indexSrc = read('src/index.ts')
for (const c of components) {
  if (!existsSync(join(root, 'src/components', c.dir))) throw new Error(`llms-meta lists missing component ${c.dir}`)
  for (const p of c.parts) {
    if (!new RegExp(`as ${p}\\b`).test(indexSrc)) throw new Error(`${p} is not exported from src/index.ts`)
  }
}

const tokens = parseTokens()
const themes = readdirSync(join(root, 'src/themes')).filter(f => f.endsWith('.css')).map(f => f.replace('.css', '')).sort(byCodePoint)

function componentSection(c: (typeof components)[number], heading: string) {
  const out: string[] = [`${heading} ${c.name}`, '', c.summary, '', `Components: ${c.parts.map(p => `\`${p}\``).join(', ')}`, '']
  if (c.variants) {
    const { groups, defaults } = parseVariants(read(`src/components/${c.dir}/index.ts`), c.variants)
    for (const [g, opts] of Object.entries(groups)) {
      out.push(`- ${g} options: ${opts.map(o => `\`${o}\``).join(', ')} (default \`${defaults[g]}\`)`)
    }
    out.push('')
  }
  out.push('Props:', '')
  for (const p of c.props) out.push(`- \`${p.name}\` (${p.type}${p.default ? `, default ${p.default}` : ''}): ${p.description}`)
  if (c.slots) out.push('', 'Slots:', '', ...c.slots.map(s => `- ${s}`))
  out.push('', 'Accessibility:', '', ...c.a11y.map(a => `- ${a}`), '')
  // The examples are the same single-file components the docs site previews and the tests mount.
  const exDir = join(root, 'src/components', c.dir, 'examples')
  const files = existsSync(exDir) ? readdirSync(exDir).filter(f => f.endsWith('.vue')).sort(byCodePoint) : []
  if (files.length === 0) throw new Error(`src/components/${c.dir} has no examples/*.vue`)
  out.push('Examples:', '')
  for (const f of files) out.push(`${heading}# ${f.replace('.vue', '').replace(/([a-z0-9])([A-Z])/g, '$1 $2')}`, '', '```vue', read(`src/components/${c.dir}/examples/${f}`).trimEnd(), '```', '')
  return out
}

const installNuxt = [
  '```bash',
  '# automatic: installs, patches nuxt.config and the main CSS (idempotent)',
  'bunx @xouyi/elfui@latest init --theme novatron --yes',
  '',
  '# or by hand',
  'bun add @xouyi/elfui tailwindcss @tailwindcss/vite',
  'bun add -d typescript@5',
  '```',
  '',
  '```ts',
  '// nuxt.config.ts',
  'import tailwindcss from \'@tailwindcss/vite\'',
  '',
  'export default defineNuxtConfig({',
  '  modules: [\'@xouyi/elfui/nuxt\'],',
  '  css: [\'~/assets/css/main.css\'],',
  '  elfui: { theme: \'novatron\', themes: [\'elf\'] }, // config key stays elfui; theme: \'elf\' | \'novatron\'',
  '  vite: { plugins: [tailwindcss()] },',
  '})',
  '```',
  '',
  '```css',
  '/* app/assets/css/main.css */',
  '@import \'tailwindcss\';',
  '@import \'@xouyi/elfui/styles.css\';',
  '```',
]

const installPlain = [
  '```bash',
  'bunx @xouyi/elfui@latest init --yes   # or: bun add @xouyi/elfui tailwindcss @tailwindcss/vite && bun add -d typescript@5',
  '```',
  '',
  '```css',
  '@import \'tailwindcss\';',
  '@import \'@xouyi/elfui/styles.css\';',
  '@import \'@xouyi/elfui/themes/elf.css\';',
  '@import \'@xouyi/elfui/themes/novatron.css\';',
  '```',
  '',
  '```ts',
  'import { ElfButton } from \'@xouyi/elfui\'',
  '```',
  '',
  'Set `<html data-theme="elf">` (or `novatron`).',
]

const intro = 'ElfUI is a dark-only design system for Vue 3 and Nuxt 4, built on Reka UI and Tailwind CSS v4, with two themes: elf (pure black with violet accents, rounded) and novatron (gold on obsidian, sharp corners).'

const links = [
  `- [Documentation site](${SITE}/): guides and a page per component with live previews, API tables and accessibility notes`,
  `- [Repository](${REPO}): source, issues, releases`,
  `- [Example Nuxt app](${REPO}/tree/main/examples/nuxt-demo): realistic consumer app`,
  `- [Registry item index](${SITE}/r/registry.json): shadcn-vue registry (copy components into your project)`,
  `- [llms-full.txt](${SITE}/llms-full.txt): complete reference for AI assistants`,
]

// llms.txt (llmstxt.org): H1, blockquote, free text, H2 link lists.
const index = [
  '# ElfUI',
  '',
  `> ${intro}`,
  '',
  `ElfUI is source-distributed and published on npm as \`@xouyi/elfui\` (currently ${pkg.version}). Install with \`bun add @xouyi/elfui\` or \`bunx @xouyi/elfui@latest init\`. All Vue components use the \`Elf\` prefix. Use Bun for every command.`,
  '',
  '## Docs',
  '',
  `- [Introduction](${SITE}/docs/getting-started/introduction): what ElfUI is and what it includes`,
  `- [Installation (Nuxt)](${SITE}/docs/getting-started/installation-nuxt): install in a Nuxt 4 app`,
  `- [Installation (Vite + Vue)](${SITE}/docs/getting-started/installation-vite): Vite and Vue setup`,
  `- [Theming](${SITE}/docs/getting-started/theming): tokens, data-theme, creating a theme`,
  `- [CLI](${SITE}/docs/getting-started/cli): bunx @xouyi/elfui init, add, list, diff`,
  `- [useElfTheme](${SITE}/docs/getting-started/use-elf-theme): composable to read, set and persist the theme (SSR-safe)`,
  `- [Registry](${SITE}/docs/getting-started/registry): copy components with bunx @xouyi/elfui add (or the shadcn-vue CLI)`,
  ...components.map(c => `- [${c.name}](${SITE}/docs/components/${c.dir}): ${c.summary}`),
  '',
  '## Reference',
  '',
  ...links,
  '',
  '## Rules',
  '',
  ...rules.map(r => `- ${r}`),
  '',
  '## Optional',
  '',
  `- [Changelog](${SITE}/docs/resources/changelog)`,
  `- [Roadmap](${SITE}/docs/resources/roadmap)`,
  `- [Contributing](${SITE}/docs/resources/contributing)`,
  '',
].join('\n')

const full = [
  '# ElfUI (full reference)',
  '',
  `> ${intro}`,
  '',
  `Version ${pkg.version}. Docs: ${SITE}/ . Source: ${REPO} .`,
  '',
  '## Rules for AI assistants',
  '',
  ...rules.map(r => `- ${r}`),
  '',
  '### Novatron theme rules',
  '',
  ...novatronRules.map(r => `- ${r}`),
  '',
  '## Install (Nuxt 4)',
  '',
  'Requirements: Bun, Nuxt 4, Tailwind CSS v4 with @tailwindcss/vite, typescript 5 or 6 as a dev dependency (`typescript@5`; the Vue compiler needs its JavaScript API to resolve Reka UI prop types, which TypeScript 7 no longer exposes).',
  '',
  ...installNuxt,
  '',
  'Components are auto-imported with the Elf prefix. Module options: `theme` (\'elf\' | \'novatron\', default \'elf\'), `themes` (extra theme CSS to bundle), `prefix` (default \'Elf\').',
  '',
  'Upgrade: `bun update @xouyi/elfui`. Advanced: an unreleased commit can be installed with `bun add github:xouyi/elfUI#<tag-or-sha>`.',
  '',
  '## Install (Vue + Vite, no Nuxt)',
  '',
  ...installPlain,
  '',
  '## CLI and registry (copy components)',
  '',
  '```bash',
  'bunx @xouyi/elfui add button dialog          # copies sources, rewrites imports to your alias, installs deps',
  'bunx @xouyi/elfui list                       # all components',
  'bunx @xouyi/elfui diff button                # compare your copy with the registry',
  'bunx @xouyi/elfui add button --overwrite     # replace a changed local copy (never done without the flag)',
  `bunx shadcn-vue@latest add ${SITE}/r/button.json`,
  '```',
  '',
  `The same files work with shadcn-vue. Register \`"@elf": "${SITE}/r/{name}.json"\` under \`registries\` in components.json and run \`bunx shadcn-vue@latest add @elf/button @elf/elf-theme\`. Items: utils, ${components.map(c => c.dir).join(', ')}, elf-theme. Fallback host: https://raw.githubusercontent.com/xouyi/elfUI/main/registry/r/{name}.json`,
  '',
  '## Theming',
  '',
  `Themes: ${themes.map(t => `\`${t}\``).join(', ')}. Select with \`data-theme\` on html or any element. Dark only.`,
  '',
  '```ts',
  'document.documentElement.dataset.theme = \'novatron\'',
  '```',
  '',
  'Or from code, SSR-safe, with optional persistence (auto-imported in Nuxt; otherwise `import { useElfTheme } from "@xouyi/elfui"`):',
  '',
  '```ts',
  'const { theme, themes, setTheme, cycle } = useElfTheme({ storage: \'cookie\' }) // storage: \'cookie\' | \'localStorage\' | \'none\' (default)',
  'setTheme(\'novatron\')',
  '```',
  '',
  'Tokens (CSS variables `--elf-<name>`, Tailwind utilities `bg-<name>`, `text-<name>-foreground`, `border-border`, `ring-ring`):',
  '',
  `| Token | ${themes.join(' | ')} |`,
  `| :-- | ${themes.map(() => ':--').join(' | ')} |`,
  ...tokens.map(t => `| ${t} | ${themes.map(th => `\`${themeValue(th, t)}\``).join(' | ')} |`),
  '',
  'Create a theme: add a CSS file declaring every token under `[data-theme=\'name\']`, import it after styles.css, then run `bun run contrast` (WCAG AA).',
  '',
  '## Components',
  '',
  ...components.flatMap(c => componentSection(c, '###')),
  '## Exports from "@xouyi/elfui"',
  '',
  `- Components: ${[...indexSrc.matchAll(/as (Elf\w+)/g)].map(m => `\`${m[1]}\``).join(', ')}`,
  '- Helpers: `cn`, `buttonVariants`, `badgeVariants`, `elfThemes`',
  '- Types: `ButtonProps`, `ButtonVariants`, `BadgeProps`, `BadgeVariants`, `ElfTheme`',
  '',
].join('\n')

const outputs: Record<string, string> = { 'llms.txt': index, 'llms-full.txt': full }
const check = process.argv.includes('--check')
let stale = false
for (const [file, content] of Object.entries(outputs)) {
  const path = join(root, file)
  if (check) {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) {
      console.error(`${file} is stale; run \`bun run llms\` and commit the result`)
      stale = true
    }
  }
  else {
    writeFileSync(path, content)
    console.log(`wrote ${file} (${content.length} bytes)`)
  }
}
if (stale) process.exit(1)
