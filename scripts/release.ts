/**
 * Release helper: `bun run release <x.y.z>`.
 * Refuses unless the tree is clean, the branch is main, CHANGELOG.md has a section for the version and
 * `bun run check` passes. Then bumps package.json, commits and creates the annotated tag. It never pushes.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

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

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) fail('usage: bun run release <x.y.z>')

const pkgPath = join(root, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version: string }
if (pkg.version === version) fail(`package.json is already at ${version}`)
if (run(['git', 'rev-parse', '-q', '--verify', `refs/tags/v${version}`]).ok) fail(`tag v${version} already exists`)

if (run(['git', 'status', '--porcelain']).out !== '') fail('working tree is not clean')
const branch = run(['git', 'rev-parse', '--abbrev-ref', 'HEAD']).out
if (branch !== 'main') fail(`must be on main (currently on ${branch})`)

const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8')
const heading = new RegExp(`^##\\s+\\[?v?${version.replaceAll('.', '\\.')}\\]?(\\s|$)`, 'm')
if (!heading.test(changelog)) fail(`CHANGELOG.md has no "## ${version}" section`)

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
console.log(`\nCreated commit and tag v${version}. Publish with:\n  git push origin main --follow-tags`)
