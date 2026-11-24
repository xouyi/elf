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

const root = join(import.meta.dirname, '..')
const read = (p: string) => readFileSync(join(root, p), 'utf8')
const pkg = JSON.parse(read('package.json')) as { version: string }
const SITE = 'https://xouyi.github.io/elf'
const REPO = 'https://github.com/xouyi/elf'
const TAG = `v${pkg.version}`

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
const dirs = readdirSync(join(root, 'src/components'), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
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
const themes = readdirSync(join(root, 'src/themes')).map(f => f.replace('.css', ''))

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
  out.push('', 'Accessibility:', '', ...c.a11y.map(a => `- ${a}`), '', 'Example:', '', '```vue', c.example, '```', '')
  return out
}

const installNuxt = [
  '```bash',
  `bun add github:xouyi/elf#${TAG} tailwindcss @tailwindcss/vite`,
  'bun add -d typescript',
  '```',
  '',
  '```ts',
  '// nuxt.config.ts',
  'import tailwindcss from \'@tailwindcss/vite\'',
  '',
  'export default defineNuxtConfig({',
  '  modules: [\'@elf/ui/nuxt\'],',
  '  css: [\'~/assets/css/main.css\'],',
  '  elf: { theme: \'novatron\', themes: [\'elf\'] }, // theme: \'elf\' | \'novatron\'',
  '  vite: { plugins: [tailwindcss()] },',
  '})',
  '```',
  '',
  '```css',
  '/* app/assets/css/main.css */',
  '@import \'tailwindcss\';',
  '@import \'@elf/ui/styles.css\';',
  '```',
]

const installPlain = [
  '```css',
  '@import \'tailwindcss\';',
  '@import \'@elf/ui/styles.css\';',
  '@import \'@elf/ui/themes/elf.css\';',
  '@import \'@elf/ui/themes/novatron.css\';',
  '```',
  '',
  '```ts',
  'import { ElfButton } from \'@elf/ui\'',
  '```',
  '',
  'Set `<html data-theme="elf">` (or `novatron`).',
]

const intro = 'Elf is a dark-only design system for Vue 3 and Nuxt 4, built on Reka UI and Tailwind CSS v4, with two themes: elf (violet, rounded) and novatron (gold on obsidian, sharp corners).'

const links = [
  `- [Documentation site](${SITE}/): Storybook with every component, props and guides`,
  `- [Repository](${REPO}): source, issues, releases`,
  `- [Example Nuxt app](${REPO}/tree/main/examples/nuxt-demo): realistic consumer installed from a GitHub tag`,
  `- [Registry item index](${SITE}/r/registry.json): shadcn-vue registry (copy components into your project)`,
  `- [llms-full.txt](${SITE}/llms-full.txt): complete reference for AI assistants`,
]

// llms.txt (llmstxt.org): H1, blockquote, free text, H2 link lists.
const index = [
  '# Elf',
  '',
  `> ${intro}`,
  '',
  `Elf is source-distributed: install from a pinned GitHub tag (currently ${TAG}). All Vue components use the \`Elf\` prefix. Use Bun for every command.`,
  '',
  '## Docs',
  '',
  `- [Getting started](${SITE}/?path=/docs/guide-getting-started--docs): install in a Nuxt 4 app`,
  `- [Theming](${SITE}/?path=/docs/guide-theming--docs): tokens, data-theme, creating a theme`,
  `- [Using without Nuxt](${SITE}/?path=/docs/guide-using-without-nuxt--docs): Vite and Vue setup`,
  `- [Registry](${SITE}/?path=/docs/guide-registry--docs): copy components with the shadcn-vue CLI`,
  ...components.map(c => `- [${c.name}](${SITE}/?path=/docs/components-${c.dir}--docs): ${c.summary}`),
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
  `- [Changelog](${REPO}/blob/main/CHANGELOG.md)`,
  `- [Contributing](${REPO}/blob/main/CONTRIBUTING.md)`,
  '',
].join('\n')

const full = [
  '# Elf (full reference)',
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
  'Requirements: Bun, Nuxt 4, Tailwind CSS v4 with @tailwindcss/vite, typescript (dev dependency; the Vue compiler needs it to resolve Reka UI prop types).',
  '',
  ...installNuxt,
  '',
  'Components are auto-imported with the Elf prefix. Module options: `theme` (\'elf\' | \'novatron\', default \'elf\'), `themes` (extra theme CSS to bundle), `prefix` (default \'Elf\').',
  '',
  'Upgrade: `bun remove @elf/ui && bun add github:xouyi/elf#vX.Y.Z`.',
  '',
  '## Install (Vue + Vite, no Nuxt)',
  '',
  ...installPlain,
  '',
  '## Registry (copy components)',
  '',
  '```bash',
  `bunx shadcn-vue@latest add ${SITE}/r/button.json`,
  '```',
  '',
  `Or register \`"@elf": "${SITE}/r/{name}.json"\` under \`registries\` in components.json and run \`bunx shadcn-vue@latest add @elf/button @elf/elf-theme\`. Items: utils, ${components.map(c => c.dir).join(', ')}, elf-theme. Fallback host: https://raw.githubusercontent.com/xouyi/elf/main/registry/r/{name}.json`,
  '',
  '## Theming',
  '',
  `Themes: ${themes.map(t => `\`${t}\``).join(', ')}. Select with \`data-theme\` on html or any element. Dark only.`,
  '',
  '```ts',
  'document.documentElement.dataset.theme = \'novatron\'',
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
  '## Exports from "@elf/ui"',
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
