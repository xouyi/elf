/**
 * Generates everything the docs site derives from the repository, so nothing is hand-copied and nothing drifts:
 *
 *   app/generated/component-meta.json   props, emits, slots, tokens used and registry data per component
 *                                       (vue-component-meta reads the real SFC sources and their TypeScript types)
 *   app/generated/examples.json         source and Shiki-highlighted HTML of every src/components/<dir>/examples/*.vue
 *   app/generated/tokens.json           both themes' tokens as hex plus the WCAG contrast ratios
 *   content/docs/3.resources/*.md       CHANGELOG.md, CONTRIBUTING.md and ROADMAP.md rendered as pages
 *
 * Run by `bun run docs:prepare` (and automatically before dev, build and generate).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { codeToHtml } from 'shiki'
import { createChecker } from 'vue-component-meta'
import { ratio, readThemes, textPairs, toHex, uiPairs } from '../../../scripts/lib/color'

const docsRoot = join(import.meta.dirname, '..')
const root = join(docsRoot, '..', '..')
const out = join(docsRoot, 'app', 'generated')
mkdirSync(out, { recursive: true })

const byCodePoint = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0)
const read = (p: string) => readFileSync(join(root, p), 'utf8')
const writeJson = (name: string, data: unknown) => writeFileSync(join(out, name), `${JSON.stringify(data, null, 1)}\n`)
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

const componentDirs = readdirSync(join(root, 'src/components'), { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort(byCodePoint)

// ---------------------------------------------------------------- themes and contrast
const themes = readThemes(root)
const tokenNames = Object.keys(themes[0]!.raw)
const tokens = {
  themes: themes.map(t => t.name),
  tokens: tokenNames.map(name => ({
    name,
    isColor: name !== 'radius' && name !== 'radius-pill',
    values: Object.fromEntries(themes.map(t => [t.name, { css: t.raw[name]!, hex: t.colors[name] ? toHex(t.colors[name]!) : null }])),
  })),
  contrast: Object.fromEntries(themes.map(t => [t.name, [
    ...textPairs.map(([fg, bg]) => ({ fg, bg, kind: 'text', min: 4.5, ratio: ratio(t.colors[fg]!, t.colors[bg]!) })),
    ...uiPairs.map(([fg, bg]) => ({ fg, bg, kind: 'ui', min: 3, ratio: ratio(t.colors[fg]!, t.colors[bg]!) })),
  ].map(r => ({ ...r, ratio: Number(r.ratio.toFixed(2)), pass: r.ratio >= r.min }))])),
}
writeJson('tokens.json', tokens)

// ---------------------------------------------------------------- component meta
const registry = JSON.parse(read('registry.json')) as { items: { name: string, dependencies?: string[], registryDependencies?: string[] }[] }
const checker = createChecker(join(root, 'tsconfig.json'), { forceUseTs: true })

const stripNullish = (type: string) => type.replace(/ \| (undefined|null)/g, '').replace(/^(undefined|null) \| /, '')
const tokenAlternation = [...tokenNames].filter(n => !n.startsWith('radius')).sort((a, b) => b.length - a.length).join('|')
const tokenUtility = new RegExp(`(?:^|[\\s"'\`:\\[(])(?:[a-z-]+:)*(?:bg|text|border|ring|outline|fill|stroke|from|to|via|decoration|divide|shadow|accent|caret|selection:bg|selection:text)-(${tokenAlternation})(?![\\w-])`, 'g')

function usedTokens(dir: string): string[] {
  const used = new Set<string>()
  const base = join(root, 'src/components', dir)
  for (const f of readdirSync(base).filter(f => /\.(vue|ts)$/.test(f) && !f.endsWith('.test.ts'))) {
    const src = readFileSync(join(base, f), 'utf8')
    for (const m of src.matchAll(tokenUtility)) used.add(m[1]!)
    if (/rounded-(?:sm|md|lg|xl|badge)/.test(src)) used.add('radius')
  }
  return tokenNames.filter(n => used.has(n === 'radius' ? 'radius' : n))
}

const components: Record<string, unknown> = {}
for (const dir of componentDirs) {
  const base = join(root, 'src/components', dir)
  const parts = readdirSync(base).filter(f => f.endsWith('.vue')).sort(byCodePoint).map((file) => {
    const meta = checker.getComponentMeta(join(base, file))
    const name = `Elf${file.replace('.vue', '')}`
    return {
      name,
      file: `src/components/${dir}/${file}`,
      // Vue's built-in attrs (key, ref, onVue:*) are flagged `global`; keep only props the component documents itself.
      props: meta.props.filter(p => !p.global || p.description).map(p => ({
        name: p.name,
        type: stripNullish(p.type),
        default: p.default ?? null,
        required: p.required,
        description: p.description,
        deprecated: p.tags.some(t => t.name === 'deprecated'),
      })),
      emits: meta.events.map(e => ({ name: e.name, type: e.type, description: e.description })),
      slots: meta.slots.map(s => ({ name: s.name, type: s.type, description: s.description })),
    }
  })
  const item = registry.items.find(i => i.name === dir)
  components[dir] = {
    dir,
    parts,
    tokens: usedTokens(dir),
    registry: { name: dir, dependencies: item?.dependencies ?? [], registryDependencies: (item?.registryDependencies ?? []).map(u => u.replace(/^.*\/(.+)\.json$/, '$1')) },
  }
}
writeJson('component-meta.json', components)

// ---------------------------------------------------------------- examples
const examples: Record<string, unknown> = {}
for (const dir of componentDirs) {
  const exDir = join(root, 'src/components', dir, 'examples')
  if (!existsSync(exDir)) continue
  for (const file of readdirSync(exDir).filter(f => f.endsWith('.vue')).sort(byCodePoint)) {
    const code = readFileSync(join(exDir, file), 'utf8').trimEnd()
    const name = `${dir}-${kebab(file.replace('.vue', ''))}`
    examples[name] = {
      name,
      component: dir,
      title: file.replace('.vue', '').replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
      file: `src/components/${dir}/examples/${file}`,
      code,
      html: await codeToHtml(code, { lang: 'vue', theme: 'github-dark-default' }),
    }
  }
}
writeJson('examples.json', examples)

// ---------------------------------------------------------------- repository markdown rendered as pages
const github = 'https://github.com/xouyi/elfUI'
const resources = join(docsRoot, 'content/docs/3.resources')
mkdirSync(resources, { recursive: true })

function page(file: string, source: string, title: string, description: string, fallback: string) {
  const path = join(root, source)
  let body = existsSync(path) ? readFileSync(path, 'utf8') : fallback
  // The page title comes from front matter; drop the file's own H1 so it is not repeated.
  body = body.replace(/^# .*\n+/, '')
  // Relative repository links (./ARCHITECTURE.md, examples/nuxt-demo) would 404 on the site; point them at GitHub.
  body = body.replace(/\]\((?!https?:|#|\/)(\.\/)?([^)\s]+)\)/g, (_m, _dot, target: string) => `](${github}/blob/main/${target})`)
  const front = ['---', `title: ${title}`, `description: ${description}`, `editPath: ${source}`, '---', ''].join('\n')
  writeFileSync(join(resources, file), `${front}\n${body}`)
}

page('2.contributing.md', 'CONTRIBUTING.md', 'Contributing', 'How to set up, add components, run the quality gate and release ElfUI.', '# Contributing\n\nSee the repository.')
page('3.changelog.md', 'CHANGELOG.md', 'Changelog', 'Release notes for every ElfUI version.', '# Changelog\n\nNo releases yet.')
page(
  '4.roadmap.md',
  'ROADMAP.md',
  'Roadmap',
  'Planned components and milestones from v0.3 to v1.0.',
  `# Roadmap\n\nThe roadmap is being written. Follow progress in the [issue tracker](${github}/issues) and the [changelog](/docs/resources/changelog).\n`,
)

console.log(`docs prepare: ${componentDirs.length} components, ${Object.keys(examples).length} examples, ${themes.length} themes`)
