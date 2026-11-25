import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { parseJsonc } from './jsonc'
import { CliError } from './log'
import { detectPackageManager } from './pm'
import type { PackageManager } from './pm'

export type Framework = 'nuxt' | 'vite'

export interface PackageJson {
  name?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}

export interface Project {
  cwd: string
  framework: Framework
  pm: PackageManager
  pkg: PackageJson
  /** Directory that `lib/` and `components/` live in (`app/` for Nuxt 4, `src/` for Vite). */
  srcDir: string
  /** Import alias that maps to `srcDir` (`~/` or `@/`), or null when the project has none (relative imports are used). */
  alias: string | null
  /** nuxt.config.* or vite.config.*, absolute. */
  configFile: string
}

const NUXT_CONFIGS = ['nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs', 'nuxt.config.mts']
const VITE_CONFIGS = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs', 'vite.config.mts']

export function readPackageJson(cwd: string): PackageJson {
  const file = join(cwd, 'package.json')
  if (!existsSync(file)) throw new CliError(`No package.json in ${cwd}. Run this command from the root of your project.`)
  return JSON.parse(readFileSync(file, 'utf8')) as PackageJson
}

export function hasDependency(pkg: PackageJson, name: string): boolean {
  return Boolean(pkg.dependencies?.[name] || pkg.devDependencies?.[name])
}

function firstExisting(cwd: string, names: string[]): string | null {
  const hit = names.find(n => existsSync(join(cwd, n)))
  return hit ? join(cwd, hit) : null
}

interface TsPaths { baseDir: string, paths: Record<string, string[]> }

function readTsPaths(cwd: string): TsPaths[] {
  const found: TsPaths[] = []
  for (const name of ['tsconfig.json', 'tsconfig.app.json']) {
    const file = join(cwd, name)
    if (!existsSync(file)) continue
    try {
      const opts = (parseJsonc(readFileSync(file, 'utf8')) as { compilerOptions?: { baseUrl?: string, paths?: Record<string, string[]> } }).compilerOptions
      if (opts?.paths) found.push({ baseDir: resolve(dirname(file), opts.baseUrl ?? '.'), paths: opts.paths })
    }
    catch {
      // An unreadable tsconfig only means we fall back to relative imports.
    }
  }
  return found
}

/** Finds `@/*` or `~/*` in tsconfig paths and confirms the bundler config declares the same alias. */
function detectViteAlias(cwd: string, configFile: string): { alias: string, srcDir: string } | null {
  const configText = readFileSync(configFile, 'utf8')
  for (const { baseDir, paths } of readTsPaths(cwd)) {
    for (const prefix of ['@', '~']) {
      const target = paths[`${prefix}/*`]?.[0]
      if (!target || !target.endsWith('/*')) continue
      // The alias must also exist for the bundler, otherwise imports would compile in the editor but fail at build time.
      if (!configText.includes('alias') || !(configText.includes(`'${prefix}'`) || configText.includes(`"${prefix}"`))) continue
      return { alias: `${prefix}/`, srcDir: resolve(baseDir, target.slice(0, -2)) }
    }
  }
  return null
}

export function detectProject(cwd: string): Project {
  const pkg = readPackageJson(cwd)
  const pm = detectPackageManager(cwd)
  const nuxtConfig = firstExisting(cwd, NUXT_CONFIGS)
  if (nuxtConfig || hasDependency(pkg, 'nuxt')) {
    if (!nuxtConfig) throw new CliError('Found "nuxt" in package.json but no nuxt.config.ts. Create one (or run `nuxi init`) and retry.')
    return { cwd, framework: 'nuxt', pm, pkg, srcDir: existsSync(join(cwd, 'app')) ? join(cwd, 'app') : cwd, alias: '~/', configFile: nuxtConfig }
  }
  const viteConfig = firstExisting(cwd, VITE_CONFIGS)
  if (viteConfig && hasDependency(pkg, 'vue')) {
    const aliased = detectViteAlias(cwd, viteConfig)
    return {
      cwd,
      framework: 'vite',
      pm,
      pkg,
      srcDir: aliased?.srcDir ?? (existsSync(join(cwd, 'src')) ? join(cwd, 'src') : cwd),
      alias: aliased?.alias ?? null,
      configFile: viteConfig,
    }
  }
  throw new CliError('Could not detect a Nuxt or Vite + Vue project (need nuxt.config.ts, or vite.config.ts with "vue" in package.json). ElfUI supports Nuxt 4 and Vite + Vue 3.')
}
