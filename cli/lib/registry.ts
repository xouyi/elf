import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CliError } from './log'

export const DEFAULT_REGISTRY = 'https://xouyi.github.io/elfUI/r/'

export interface RegistryFile { path: string, content: string, type: string, target?: string }

export interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
}

export interface RegistryIndex { name: string, items: Omit<RegistryItem, 'files'>[] }

/** `--registry` flag, then `ELFUI_REGISTRY`, then the public site. Accepts an http(s) URL, a directory or a file: URL. */
export function resolveRegistryBase(flag?: string, env = process.env.ELFUI_REGISTRY): string {
  return flag || env || DEFAULT_REGISTRY
}

const isRemote = (base: string) => /^https?:\/\//i.test(base)

export async function readRegistryJson<T>(base: string, name: string): Promise<T> {
  const file = `${name}.json`
  if (isRemote(base)) {
    const url = new URL(file, base.endsWith('/') ? base : `${base}/`).toString()
    let res: Response
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(15_000), headers: { accept: 'application/json' } })
    }
    catch (error) {
      throw new CliError(`Could not reach the registry at ${url}: ${(error as Error).message}`)
    }
    if (res.status === 404) throw new CliError(`"${name}" was not found in the registry (${url}).`)
    if (!res.ok) throw new CliError(`The registry answered ${res.status} for ${url}.`)
    return await res.json() as T
  }
  const dir = base.startsWith('file:') ? fileURLToPath(base) : base
  try {
    return JSON.parse(readFileSync(join(dir, file), 'utf8')) as T
  }
  catch {
    throw new CliError(`"${name}" was not found in the local registry (${join(dir, file)}).`)
  }
}

/** `https://host/r/utils.json`, `@elf/utils` and `utils` all name the item `utils`. */
export function registryDependencyName(ref: string): string {
  const last = ref.split('/').pop() ?? ref
  return last.replace(/\.json$/, '')
}

/** Resolves items and their registryDependencies recursively. Dependencies come first; each item appears once. */
export async function resolveItems(base: string, names: string[]): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>()
  const visiting = new Set<string>()
  async function visit(name: string): Promise<void> {
    if (resolved.has(name) || visiting.has(name)) return
    visiting.add(name)
    const item = await readRegistryJson<RegistryItem>(base, name)
    for (const dep of item.registryDependencies ?? []) await visit(registryDependencyName(dep))
    visiting.delete(name)
    resolved.set(name, item)
  }
  for (const name of names) await visit(name)
  return [...resolved.values()]
}

export function collectDependencies(items: RegistryItem[], key: 'dependencies' | 'devDependencies'): string[] {
  return [...new Set(items.flatMap(i => i[key] ?? []))].sort()
}
