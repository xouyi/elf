import { flagString } from '../lib/args'
import type { ParsedArgs } from '../lib/args'
import { c, log } from '../lib/log'
import { readRegistryJson, resolveRegistryBase } from '../lib/registry'
import type { RegistryIndex } from '../lib/registry'

export async function list(args: ParsedArgs): Promise<number> {
  const base = resolveRegistryBase(flagString(args.flags, 'registry'))
  const index = await readRegistryJson<RegistryIndex>(base, 'registry')
  if (args.flags.json === true) {
    console.log(JSON.stringify(index.items.map(i => ({ name: i.name, type: i.type, title: i.title, description: i.description, dependencies: i.dependencies ?? [], registryDependencies: i.registryDependencies ?? [] })), null, 2))
    return 0
  }
  const width = Math.max(...index.items.map(i => i.name.length))
  log.info(c.bold(`ElfUI registry (${index.items.length} items) at ${base}`))
  for (const item of index.items) log.info(`  ${item.name.padEnd(width)}  ${c.dim(item.description ?? item.title ?? '')}`)
  log.info('\nAdd one with: elfui add <name>')
  return 0
}
