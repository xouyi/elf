/**
 * `bun run baselines`: regenerate the visual baselines of the current branch in CI and bring them back.
 *
 * Pushes the branch, runs the "Visual baselines" workflow on it, waits, then fast-forwards to the commit the workflow
 * pushed and re-authors it with your git identity (the workflow commits as github-actions[bot]). Baselines are only ever
 * rendered in CI's Playwright Docker image; screenshots made on another OS differ by a few pixels.
 */
export {}

const sh = (cmd: string[], inherit = false) => {
  const p = Bun.spawnSync(cmd, { stdout: inherit ? 'inherit' : 'pipe', stderr: inherit ? 'inherit' : 'pipe' })
  return { ok: p.exitCode === 0, out: p.stdout?.toString().trim() ?? '' }
}
function fail(message: string): never {
  console.error(`baselines: ${message}`)
  process.exit(1)
}

const branch = sh(['git', 'rev-parse', '--abbrev-ref', 'HEAD']).out
if (branch === 'main') fail('run it on a pull request branch, not main')
if (sh(['git', 'status', '--porcelain']).out !== '') fail('commit your changes first')

if (!sh(['git', 'push', '-u', 'origin', branch], true).ok) fail('push failed')
const before = sh(['gh', 'run', 'list', '--workflow', 'Visual baselines', '--branch', branch, '--limit', '1', '--json', 'databaseId', '-q', '.[0].databaseId']).out
if (!sh(['gh', 'workflow', 'run', 'Visual baselines', '--ref', branch], true).ok) fail('could not start the workflow')

let id = ''
for (let i = 0; i < 30 && (!id || id === before); i++) {
  await Bun.sleep(2000)
  id = sh(['gh', 'run', 'list', '--workflow', 'Visual baselines', '--branch', branch, '--limit', '1', '--json', 'databaseId', '-q', '.[0].databaseId']).out
}
if (!id || id === before) fail('the workflow run did not appear')
console.log(`Waiting for run ${id} (about 3 minutes)...`)
if (!sh(['gh', 'run', 'watch', id, '--exit-status', '--interval', '15'], true).ok) fail(`run ${id} failed: gh run view ${id} --log-failed`)

sh(['git', 'fetch', 'origin', branch])
const remoteHead = sh(['git', 'rev-parse', `origin/${branch}`]).out
if (remoteHead === sh(['git', 'rev-parse', 'HEAD']).out) {
  console.log('Baselines unchanged.')
  process.exit(0)
}
if (!sh(['git', 'merge', '--ff-only', `origin/${branch}`], true).ok) fail('could not fast-forward to the baselines commit')
if (!sh(['git', 'commit', '--amend', '--reset-author', '--no-edit', '--no-verify'], true).ok) fail('amend failed')
if (!sh(['git', 'push', '--force-with-lease', '--no-verify', 'origin', branch], true).ok) fail('push failed')
console.log('Baselines updated and pushed.')
