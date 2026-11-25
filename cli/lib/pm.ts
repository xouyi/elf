import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { CliError, log } from './log'

export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm'

const LOCKFILES: [string, PackageManager][] = [
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['package-lock.json', 'npm'],
  ['npm-shrinkwrap.json', 'npm'],
]

/** Lockfile first, then the invoking package manager (`bunx elfui`), then Bun. */
export function detectPackageManager(cwd: string, userAgent = process.env.npm_config_user_agent): PackageManager {
  for (const [file, pm] of LOCKFILES) {
    if (existsSync(join(cwd, file))) return pm
  }
  const fromAgent = /^(bun|pnpm|yarn|npm)\//.exec(userAgent ?? '')?.[1]
  return (fromAgent as PackageManager | undefined) ?? 'bun'
}

export function installCommand(pm: PackageManager, packages: string[], dev: boolean): { cmd: string, args: string[] } {
  switch (pm) {
    case 'bun': return { cmd: 'bun', args: ['add', ...(dev ? ['-d'] : []), ...packages] }
    case 'pnpm': return { cmd: 'pnpm', args: ['add', ...(dev ? ['-D'] : []), ...packages] }
    case 'yarn': return { cmd: 'yarn', args: ['add', ...(dev ? ['-D'] : []), ...packages] }
    default: return { cmd: 'npm', args: ['install', ...(dev ? ['-D'] : []), ...packages] }
  }
}

export function runnerCommand(pm: PackageManager): string {
  return { bun: 'bunx', pnpm: 'pnpm dlx', yarn: 'yarn dlx', npm: 'npx' }[pm]
}

export function install(cwd: string, pm: PackageManager, packages: string[], dev: boolean): void {
  if (packages.length === 0) return
  const { cmd, args } = installCommand(pm, packages, dev)
  log.step(`${cmd} ${args.join(' ')}`)
  const res = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  if (res.error || res.status !== 0) {
    throw new CliError(`"${cmd} ${args.join(' ')}" failed. Install the packages manually and re-run the command (it is safe to repeat).`)
  }
}
