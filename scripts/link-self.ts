/**
 * Links the repo root into apps/<app>/node_modules/@xouyi/elfui (default app: playground) so the playground
 * resolves `@xouyi/elfui` exactly like an installed dependency, but against live sources.
 */
import { existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const app = process.argv[2] ?? 'playground'
const modules = join(root, 'apps', app, 'node_modules')
const link = join(modules, '@xouyi', 'elfui')
mkdirSync(dirname(link), { recursive: true })
if (existsSync(link)) rmSync(link, { recursive: true, force: true })
symlinkSync(relative(dirname(link), root), link, 'dir')
console.log(`linked ${link} -> ${root}`)
