import { resolve } from 'node:path'
import { add } from './commands/add'
import { diff } from './commands/diff'
import { init } from './commands/init'
import { list } from './commands/list'
import { flagString, parseArgs } from './lib/args'
import { c, CliError } from './lib/log'

declare const __ELFUI_VERSION__: string | undefined

export const VERSION = typeof __ELFUI_VERSION__ === 'string' ? __ELFUI_VERSION__ : '0.0.0-dev'

export const HELP = `${c.bold('elfui')} ${VERSION}: set up ElfUI and copy its components into your project.

${c.bold('Usage')}
  elfui <command> [options]            (installed bin; or: bunx @xouyi/elfui <command>)

${c.bold('Commands')}
  init                  Install @xouyi/elfui + Tailwind CSS v4, patch your Nuxt or Vite config and main CSS (safe to re-run)
  add <component...>    Copy components (and what they depend on) from the registry into your project
  list                  Show every component in the registry
  diff <component...>   Compare your local copy of a component with the registry version

${c.bold('Options')}
  --theme <elf|novatron>   init: theme to configure (default: elf)
  --path <dir>             add/diff: components directory below src (default: components/ui)
  --overwrite              add: replace files that differ from the registry
  --registry <url|dir>     Registry base URL or local directory (env: ELFUI_REGISTRY)
                           default: https://xouyi.github.io/elfUI/r/
  --no-install             Do not run the package manager
  --dry-run                Print what would change without writing files
  --cwd <dir>              Run as if started in <dir>
  --json                   list: machine-readable output
  -y, --yes                Accept defaults, never prompt
  -v, --version            Print the version
  -h, --help               Print this help

${c.bold('Examples')}
  bunx @xouyi/elfui@latest init --theme novatron --yes
  bunx @xouyi/elfui add button dialog
  bunx @xouyi/elfui add field --path components/ui --overwrite
  bunx @xouyi/elfui diff button
  elfui list --registry ./registry/r

${c.bold('Docs')}  https://xouyi.github.io/elfUI/docs/getting-started/cli`

export async function run(argv: string[]): Promise<number> {
  const args = parseArgs(argv)
  if (args.flags.version) {
    console.log(VERSION)
    return 0
  }
  if (args.flags.help || !args.command || args.command === 'help') {
    console.log(HELP)
    return args.command || args.flags.help ? 0 : 1
  }
  const ctx = { cwd: resolve(flagString(args.flags, 'cwd') ?? process.cwd()), dryRun: args.flags['dry-run'] === true }
  switch (args.command) {
    case 'init': return init(args, ctx)
    case 'add': return add(args, ctx)
    case 'list': return list(args)
    case 'diff': return diff(args, ctx)
    default:
      throw new CliError(`Unknown command "${args.command}". Run \`elfui --help\` for usage.`)
  }
}
