import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { applyPlaceholders, placeholderNames, site } from '../../apps/docs/lib/site'

const root = join(import.meta.dirname, '..', '..')
const docs = join(root, 'apps/docs')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { name: string, version: string }

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

// CHANGELOG, CONTRIBUTING and ROADMAP are copied from the repository root and keep their history text verbatim.
const generated = /3\.resources\/[234]\./
const pages = walk(join(docs, 'content')).filter(f => f.endsWith('.md') && !generated.test(f))
const app = walk(join(docs, 'app')).filter(f => /\.(?:vue|ts)$/.test(f) && !f.includes('/generated/') && !f.includes('/__examples/'))
const files = [...pages, ...app]

describe('docs single source (apps/docs/lib/site.ts)', () => {
  it('reads name and version from package.json', () => {
    expect(site.name).toBe(pkg.name)
    expect(site.version).toBe(pkg.version)
    expect(site.site).toMatch(/^https:\/\/[^/]+\/[^/]+$/)
    expect(site.repo).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+$/)
    expect(site.registry).toBe(`${site.site}/r`)
  })

  it('replaces every placeholder, also inside fenced code blocks', () => {
    const md = ['```bash', 'bun add {{pkg}}@{{version}}', 'curl {{registry}}/button.json', '```'].join('\n')
    const out = applyPlaceholders(md)
    expect(out).toContain(`bun add ${site.name}@${site.version}`)
    expect(out).toContain(`curl ${site.registry}/button.json`)
    for (const name of placeholderNames) expect(applyPlaceholders(`{{${name}}}`)).not.toContain('{{')
  })

  it('leaves unknown mustache expressions alone', () => {
    expect(applyPlaceholders('{{ count }} {{unknown}}')).toBe('{{ count }} {{unknown}}')
  })

  it('has no hard-coded version, repository or site URL in docs pages or components', () => {
    const bad = [
      /@xouyi\/elfui@\d+\.\d+\.\d+/,
      /#v\d+\.\d+\.\d+/,
      /xouyi\.github\.io/,
      /github\.com\/xouyi\//,
      /github:xouyi\//,
      /raw\.githubusercontent\.com\/xouyi\//,
    ]
    const hits = files.flatMap(f => readFileSync(f, 'utf8').split('\n').flatMap((line, i) =>
      bad.filter(re => re.test(line)).map(re => `${relative(root, f)}:${i + 1} matches ${re}`)))
    expect(hits, 'Use {{version}}, {{pkg}}, {{repo}}, {{site}} or {{registry}} in Markdown and useSite() in Vue').toEqual([])
  })
})
