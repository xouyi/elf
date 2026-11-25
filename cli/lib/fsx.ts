import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative } from 'node:path'
import { log } from './log'

export interface Ctx {
  cwd: string
  dryRun: boolean
}

export const rel = (ctx: Ctx, file: string) => relative(ctx.cwd, file) || '.'

export const readIfExists = (file: string): string | null => (existsSync(file) ? readFileSync(file, 'utf8') : null)

export function writeFile(ctx: Ctx, file: string, content: string, verb: 'create' | 'update'): void {
  log.ok(`${ctx.dryRun ? `would ${verb}` : verb === 'create' ? 'created' : 'updated'} ${rel(ctx, file)}`)
  if (ctx.dryRun) return
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}
