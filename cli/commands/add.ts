import { join, resolve } from 'node:path'
import { flagString } from '../lib/args'
import type { ParsedArgs } from '../lib/args'
import { diffLines, summarizeDiff } from '../lib/diff'
import { readIfExists, rel, writeFile } from '../lib/fsx'
import type { Ctx } from '../lib/fsx'
import { c, CliError, log } from '../lib/log'
import { install } from '../lib/pm'
import { detectProject, hasDependency } from '../lib/project'
import type { Project } from '../lib/project'
import { collectDependencies, readRegistryJson, resolveItems, resolveRegistryBase } from '../lib/registry'
import type { RegistryIndex, RegistryItem } from '../lib/registry'
import { destinationFor, rewriteImports } from '../lib/rewrite'

export interface PlannedFile { item: RegistryItem, dest: string, content: string, shared: boolean }

/** Maps every registry file to its destination in the project, with imports rewritten to the project's alias. */
export function planFiles(items: RegistryItem[], project: Project, uiPath: string): PlannedFile[] {
  const uiDir = join(project.srcDir, uiPath)
  const planned: PlannedFile[] = []
  for (const item of items) {
    for (const file of item.files ?? []) {
      const dest = destinationFor(file, { srcDir: project.srcDir, uiDir })
      const dir = resolve(dest, '..')
      planned.push({
        item,
        dest,
        content: rewriteImports(file.content, { fileDir: dir, srcDir: project.srcDir, uiDir, alias: project.alias }),
        // Shared helpers (lib/utils) are created when missing and left alone otherwise: projects often have their own `cn`.
        shared: item.type === 'registry:lib',
      })
    }
  }
  return planned
}

export async function validateNames(base: string, names: string[]): Promise<void> {
  let index: RegistryIndex
  try {
    index = await readRegistryJson<RegistryIndex>(base, 'registry')
  }
  catch {
    return // The item lookup below reports a precise error.
  }
  const known = index.items.map(i => i.name)
  const unknown = names.filter(n => !known.includes(n))
  if (unknown.length > 0) {
    throw new CliError(`Unknown component${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}.\nAvailable: ${known.filter(n => n !== 'utils').join(', ')}\nRun \`elfui list\` for descriptions.`)
  }
}

export async function add(args: ParsedArgs, ctx: Ctx): Promise<number> {
  if (args.positionals.length === 0) throw new CliError('Name at least one component, for example: elfui add button dialog\nRun `elfui list` to see all components.')
  const project = detectProject(ctx.cwd)
  const base = resolveRegistryBase(flagString(args.flags, 'registry'))
  const uiPath = (flagString(args.flags, 'path') ?? 'components/ui').replace(/^\.?\//, '').replace(/\/$/, '')
  const overwrite = args.flags.overwrite === true

  await validateNames(base, args.positionals)
  const items = await resolveItems(base, args.positionals)
  const planned = planFiles(items, project, uiPath)

  let written = 0
  let unchanged = 0
  const skipped: { file: string, added: number, removed: number }[] = []
  for (const p of planned) {
    const existing = readIfExists(p.dest)
    if (existing === null) {
      writeFile(ctx, p.dest, p.content, 'create')
      written++
    }
    else if (existing === p.content) {
      unchanged++
    }
    else if (overwrite) {
      writeFile(ctx, p.dest, p.content, 'update')
      written++
    }
    else if (!p.shared) {
      const { added, removed } = summarizeDiff(diffLines(existing, p.content))
      skipped.push({ file: rel(ctx, p.dest), added, removed })
    }
  }

  for (const s of skipped) log.warn(`${s.file} exists and differs from the registry (+${s.added} -${s.removed}); kept your version`)
  if (skipped.length > 0) log.info(`  Re-run with ${c.bold('--overwrite')} to replace ${skipped.length === 1 ? 'it' : 'them'}, or ${c.bold('elfui diff <component>')} to inspect the changes.`)

  const missing = (key: 'dependencies' | 'devDependencies') => collectDependencies(items, key).filter(n => !hasDependency(project.pkg, n))
  const runtime = missing('dependencies')
  const dev = missing('devDependencies')
  if (runtime.length + dev.length > 0) {
    if (args.flags['no-install'] === true || ctx.dryRun) {
      log.warn(`Install manually: ${[...runtime, ...dev].join(' ')}`)
    }
    else {
      install(ctx.cwd, project.pm, runtime, false)
      install(ctx.cwd, project.pm, dev, true)
    }
  }

  const names = [...new Set(planned.filter(p => !p.shared).map(p => p.item.name))]
  log.info(`\n${written} file${written === 1 ? '' : 's'} written, ${unchanged} already up to date${skipped.length > 0 ? `, ${skipped.length} skipped` : ''}.`)
  if (names.length > 0) log.info(`Import from ${project.alias ?? './'}${uiPath}/<component>, for example: import { Button } from '${project.alias ?? './'}${uiPath}/button'`)
  return 0
}
