/**
 * Release helper: `bun run release <x.y.z | patch | minor | major> [--full] [--push]`.
 *
 * Refuses unless the tree is clean and the branch is main. Then:
 * 1. Resolves the version (`patch`/`minor`/`major` bump the current one).
 * 2. Renames CHANGELOG.md `## Unreleased` to `## x.y.z` when the version has no section yet.
 * 3. Runs a quick gate (typecheck, lint, unit tests, registry and llms up to date). Everything else, including the docs build,
 *    the browser and the visual suites, already passed on the pull request that brought the code to main (branch protection
 *    requires it), so it is not repeated here. `--full` runs the whole `bun run check` instead.
 * 4. Bumps package.json, regenerates the llms files, commits `Release vx.y.z` and creates the annotated tag.
 * 5. With `--push`, pushes main and the tag. Pushing the tag starts .github/workflows/release.yml, which publishes to npm
 *    (skipped when the version is already there) and creates the GitHub Release. Without `--push`, nothing leaves the machine.
 * Versions with a prerelease suffix (`1.0.0-beta.1`) are published under the `next` dist-tag.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { changelogSection } from './changelog-section'

const root = join(import.meta.dirname, '..')
const args = process.argv.slice(2)
const full = args.includes('--full')
const push = args.includes('--push')
const target = args.find(a => !a.startsWith('--'))

function fail(message: string): never {
  console.error(`release: ${message}`)
  process.exit(1)
}

function run(cmd: string[], opts: { inherit?: boolean } = {}) {
  const p = Bun.spawnSync(cmd, { cwd: root, stdout: opts.inherit ? 'inherit' : 'pipe', stderr: opts.inherit ? 'inherit' : 'pipe' })
  return { ok: p.exitCode === 0, out: p.stdout?.toString().trim() ?? '' }
}

export function bump(current: string, kind: 'patch' | 'minor' | 'major'): string {
  const [major, minor, patch] = current.split('-')[0]!.split('.').map(Number) as [number, number, number]
  if (kind === 'major') return `${major + 1}.0.0`
  if (kind === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

/** Renames the first `## Unreleased` heading to `## <version>`. Returns null when there is no such heading. */
export function foldUnreleased(changelog: string, version: string): string | null {
  const re = /^## Unreleased[ \t]*$/m
  return re.test(changelog) ? changelog.replace(re, `## ${version}`) : null
}

if (import.meta.main) {
  if (!target) fail('usage: bun run release <x.y.z | x.y.z-beta.N | patch | minor | major> [--full] [--push]')

  const pkgPath = join(root, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version: string }
  const version = target === 'patch' || target === 'minor' || target === 'major' ? bump(pkg.version, target) : target
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Z.-]+)?$/i.test(version)) fail(`invalid version "${version}"`)
  if (pkg.version === version) fail(`package.json is already at ${version}`)
  if (run(['git', 'rev-parse', '-q', '--verify', `refs/tags/v${version}`]).ok) fail(`tag v${version} already exists`)

  if (run(['git', 'status', '--porcelain']).out !== '') fail('working tree is not clean')
  const branch = run(['git', 'rev-parse', '--abbrev-ref', 'HEAD']).out
  if (branch !== 'main') fail(`must be on main (currently on ${branch})`)

  const changelogPath = join(root, 'CHANGELOG.md')
  let changelog = readFileSync(changelogPath, 'utf8')
  if (!changelogSection(changelog, version)) {
    const folded = foldUnreleased(changelog, version)
    if (!folded || !changelogSection(folded, version))
      fail(`CHANGELOG.md needs a non-empty "## Unreleased" or "## ${version}" section (the GitHub Release body is taken from it)`)
    changelog = folded
  }

  console.log(`Releasing v${version}: running the ${full ? 'full' : 'quick'} gate...`)
  const gate = full ? [['bun', 'run', 'check']] : [['bun', 'run', 'prepush'], ['bun', 'run', 'registry:check'], ['bun', 'run', 'llms:check']]
  for (const cmd of gate) {
    if (!run(cmd, { inherit: true }).ok) fail(`\`${cmd.join(' ')}\` failed`)
  }
  // The gate can regenerate files (registry, llms); those must already be committed.
  if (run(['git', 'status', '--porcelain']).out !== '') fail('the gate modified tracked files; commit them and retry')

  writeFileSync(changelogPath, changelog)
  writeFileSync(pkgPath, readFileSync(pkgPath, 'utf8').replace(/("version":\s*")[^"]+(")/, `$1${version}$2`))
  // llms.txt embeds the version and install tag, so it must be regenerated in the release commit.
  if (!run(['bun', 'run', 'llms'], { inherit: true }).ok) fail('llms generation failed')
  run(['git', 'add', 'CHANGELOG.md', 'package.json', 'llms.txt', 'llms-full.txt'])
  if (!run(['git', 'commit', '-m', `Release v${version}`], { inherit: true }).ok) fail('commit failed')
  if (!run(['git', 'tag', '-a', `v${version}`, '-m', `v${version}`], { inherit: true }).ok) fail('tag failed')

  if (push) {
    if (!run(['git', 'push', 'origin', 'main', `v${version}`], { inherit: true }).ok) fail('push failed')
    console.log(`\nPushed main and v${version}. The Release workflow publishes to npm (if needed) and creates the GitHub Release.`)
  }
  else {
    console.log(`\nCreated commit and tag v${version}. Nothing was pushed. Next:
  git push origin main v${version}     # or rerun with --push next time
The Release workflow publishes @xouyi/elfui@${version} to npm${version.includes('-') ? ' (dist-tag next)' : ''} unless it is already
there, and creates the GitHub Release. To publish by hand instead, run \`bunx npm@latest publish --access public --provenance=false\`
before pushing the tag.`)
  }
}
