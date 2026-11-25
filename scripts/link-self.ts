/**
 * Links the repo root into apps/<app>/node_modules/@elf/ui (default app: playground) so the playground
 * resolves `@elf/ui` exactly like an installed dependency, but against live sources.
 */
import { existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const app = process.argv[2] ?? 'playground'
const scope = join(root, 'apps', app, 'node_modules', '@elf')
const link = join(scope, 'ui')
mkdirSync(scope, { recursive: true })
if (existsSync(link)) rmSync(link, { recursive: true, force: true })
symlinkSync(relative(scope, root), link, 'dir')
console.log(`linked ${link} -> ${root}`)
