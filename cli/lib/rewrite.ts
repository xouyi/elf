import { dirname, join, posix, relative, sep } from 'node:path'

export interface RewriteTarget {
  /** Absolute directory of the file being written. */
  fileDir: string
  srcDir: string
  /** Absolute directory components are written to (`<srcDir>/components/ui`). */
  uiDir: string
  /** Alias prefix mapping to srcDir (`@/`, `~/`) or null for relative imports. */
  alias: string | null
}

const toPosix = (p: string) => p.split(sep).join('/')

function specifier(abs: string, t: RewriteTarget): string {
  if (t.alias) return `${t.alias}${toPosix(relative(t.srcDir, abs))}`
  const rel = toPosix(relative(t.fileDir, abs))
  return rel.startsWith('.') ? rel : `./${rel}`
}

/**
 * Registry sources import through shadcn-vue aliases: `@/lib/utils` and `@/components/ui/<name>`.
 * Rewrites them to the project's alias, or to relative paths when the project has no alias.
 */
export function rewriteImports(content: string, t: RewriteTarget): string {
  return content
    .replaceAll(/(from\s+)(['"])@\/components\/ui\/([\w./-]+)\2/g, (_m, from: string, q: string, name: string) => `${from}${q}${specifier(join(t.uiDir, name), t)}${q}`)
    .replaceAll(/(from\s+)(['"])@\/(lib\/[\w./-]+)\2/g, (_m, from: string, q: string, rest: string) => `${from}${q}${specifier(join(t.srcDir, rest), t)}${q}`)
}

/** Where a registry file lands. `uiRelative` is the path below `.../ui/` for registry:ui files. */
export function destinationFor(file: { path: string, target?: string }, t: Pick<RewriteTarget, 'srcDir' | 'uiDir'>): string {
  if (file.target) return join(t.srcDir, file.target)
  const marker = '/ui/'
  const at = file.path.indexOf(marker)
  const rest = at === -1 ? posix.basename(file.path) : file.path.slice(at + marker.length)
  return join(t.uiDir, rest)
}

export function dirOf(file: string): string {
  return dirname(file)
}
