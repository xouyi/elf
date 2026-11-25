/**
 * Links the repo root into apps/<app>/node_modules/elfui (default app: playground) so the playground
 * resolves `elfui` exactly like an installed dependency, but against live sources.
 */
import { existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const app = process.argv[2] ?? 'playground'
const modules = join(root, 'apps', app, 'node_modules')
const link = join(modules, 'elfui')
mkdirSync(modules, { recursive: true })
if (existsSync(link)) rmSync(link, { recursive: true, force: true })
symlinkSync(relative(modules, root), link, 'dir')
console.log(`linked ${link} -> ${root}`)
