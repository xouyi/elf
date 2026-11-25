import { flagString } from '../lib/args'
import type { ParsedArgs } from '../lib/args'
import { diffLines, formatDiff, summarizeDiff } from '../lib/diff'
import { readIfExists, rel } from '../lib/fsx'
import type { Ctx } from '../lib/fsx'
import { c, CliError, log } from '../lib/log'
import { detectProject } from '../lib/project'
import { readRegistryJson, resolveRegistryBase } from '../lib/registry'
import type { RegistryItem } from '../lib/registry'
import { planFiles, validateNames } from './add'

/** Compares the local copy of each component with the registry version (imports rewritten the way `add` would). */
export async function diff(args: ParsedArgs, ctx: Ctx): Promise<number> {
  if (args.positionals.length === 0) throw new CliError('Name a component to compare, for example: elfui diff button')
  const project = detectProject(ctx.cwd)
  const base = resolveRegistryBase(flagString(args.flags, 'registry'))
  const uiPath = (flagString(args.flags, 'path') ?? 'components/ui').replace(/^\.?\//, '').replace(/\/$/, '')
  await validateNames(base, args.positionals)

  let differing = 0
  for (const name of args.positionals) {
    const item = await readRegistryJson<RegistryItem>(base, name)
    for (const file of planFiles([item], project, uiPath)) {
      const local = readIfExists(file.dest)
      if (local === null) {
        log.warn(`${rel(ctx, file.dest)} is not installed (run: elfui add ${name})`)
        differing++
        continue
      }
      if (local === file.content) {
        log.skip(`${rel(ctx, file.dest)} matches the registry`)
        continue
      }
      differing++
      const lines = diffLines(local, file.content)
      const { added, removed } = summarizeDiff(lines)
      log.info(`${c.bold(rel(ctx, file.dest))}  (- local, + registry: +${added} -${removed})`)
      log.info(formatDiff(lines))
    }
  }
  if (differing === 0) log.info('\nEverything matches the registry.')
  return 0
}
