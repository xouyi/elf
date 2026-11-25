/**
 * Prints the CHANGELOG.md section for a version (used for GitHub Release notes).
 * Usage: bun scripts/changelog-section.ts <x.y.z[-pre.N]>
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function changelogSection(changelog: string, version: string): string | null {
  const lines = changelog.split('\n')
  const escaped = version.replaceAll('.', '\\.')
  const start = lines.findIndex(l => new RegExp(`^##\\s+\\[?v?${escaped}\\]?(\\s|$)`).test(l))
  if (start === -1) return null
  const end = lines.findIndex((l, i) => i > start && /^##\s/.test(l))
  return lines.slice(start + 1, end === -1 ? undefined : end).join('\n').trim()
}

if (import.meta.main) {
  const version = process.argv[2]
  if (!version) {
    console.error('usage: bun scripts/changelog-section.ts <version>')
    process.exit(1)
  }
  const section = changelogSection(readFileSync(join(import.meta.dirname, '..', 'CHANGELOG.md'), 'utf8'), version)
  if (!section) {
    console.error(`CHANGELOG.md has no "## ${version}" section`)
    process.exit(1)
  }
  console.log(section)
}
