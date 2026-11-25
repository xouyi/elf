/**
 * Release helper: `bun run release <x.y.z>`.
 * Refuses unless the tree is clean, the branch is main, CHANGELOG.md has a section for the version and
 * `bun run check` passes. Then bumps package.json, commits and creates the annotated tag. It never pushes.
 * Pushing the tag starts .github/workflows/release.yml, which publishes `@xouyi/elfui` to npm (Trusted Publishing) and creates
 * the GitHub Release. Versions with a prerelease suffix (`1.0.0-beta.1`) are published under the `next` dist-tag.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { changelogSection } from './changelog-section'

const root = join(import.meta.dirname, '..')
const version = process.argv[2]

function fail(message: string): never {
  console.error(`release: ${message}`)
  process.exit(1)
}

function run(cmd: string[], opts: { inherit?: boolean } = {}) {
  const p = Bun.spawnSync(cmd, { cwd: root, stdout: opts.inherit ? 'inherit' : 'pipe', stderr: opts.inherit ? 'inherit' : 'pipe' })
  return { ok: p.exitCode === 0, out: p.stdout?.toString().trim() ?? '' }
}

if (!version || !/^\d+\.\d+\.\d+(?:-[0-9A-Z.-]+)?$/i.test(version)) fail('usage: bun run release <x.y.z | x.y.z-beta.N>')

const pkgPath = join(root, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version: string }
if (pkg.version === version) fail(`package.json is already at ${version}`)
if (run(['git', 'rev-parse', '-q', '--verify', `refs/tags/v${version}`]).ok) fail(`tag v${version} already exists`)

if (run(['git', 'status', '--porcelain']).out !== '') fail('working tree is not clean')
const branch = run(['git', 'rev-parse', '--abbrev-ref', 'HEAD']).out
if (branch !== 'main') fail(`must be on main (currently on ${branch})`)

const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8')
if (!changelogSection(changelog, version)) fail(`CHANGELOG.md has no non-empty "## ${version}" section (the GitHub Release body is taken from it)`)

console.log(`Running the quality gate before releasing v${version}...`)
if (!run(['bun', 'run', 'check'], { inherit: true }).ok) fail('`bun run check` failed')
// The gate can regenerate files (registry, llms); those must already be committed.
if (run(['git', 'status', '--porcelain']).out !== '') fail('the gate modified tracked files; commit them and retry')

writeFileSync(pkgPath, readFileSync(pkgPath, 'utf8').replace(/("version":\s*")[^"]+(")/, `$1${version}$2`))
// llms.txt embeds the version and install tag, so it must be regenerated in the release commit.
if (!run(['bun', 'run', 'llms'], { inherit: true }).ok) fail('llms generation failed')
run(['git', 'add', 'package.json', 'llms.txt', 'llms-full.txt'])
if (!run(['git', 'commit', '-m', `Release v${version}`], { inherit: true }).ok) fail('commit failed')
if (!run(['git', 'tag', '-a', `v${version}`, '-m', `v${version}`], { inherit: true }).ok) fail('tag failed')
console.log(`\nCreated commit and tag v${version}. Nothing was pushed or published. To release:
  git push origin main --follow-tags
The Release workflow then runs the gate again, publishes @xouyi/elfui@${version} to npm${version.includes('-') ? ' (dist-tag next)' : ''} with provenance
and creates the GitHub Release. Watch it under Actions > Release.`)
