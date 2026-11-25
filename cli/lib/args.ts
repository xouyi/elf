export interface ParsedArgs {
  command?: string
  positionals: string[]
  flags: Record<string, string | boolean>
}

/** Flags that take a value (`--theme novatron` or `--theme=novatron`). Everything else is boolean. */
const VALUE_FLAGS = new Set(['theme', 'path', 'registry', 'cwd'])
const SHORT_FLAGS: Record<string, string> = { y: 'yes', h: 'help', v: 'version' }

export function parseArgs(argv: string[]): ParsedArgs {
  const flags: Record<string, string | boolean> = {}
  const rest: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!
    if (arg === '--') {
      rest.push(...argv.slice(i + 1))
      break
    }
    if (arg.startsWith('--')) {
      const eq = arg.indexOf('=')
      const name = eq === -1 ? arg.slice(2) : arg.slice(2, eq)
      if (VALUE_FLAGS.has(name)) {
        const value = eq === -1 ? argv[++i] : arg.slice(eq + 1)
        if (value === undefined || (eq === -1 && value.startsWith('--'))) throw new Error(`Flag --${name} needs a value.`)
        flags[name] = value
      }
      else {
        flags[name] = eq === -1 ? true : arg.slice(eq + 1) !== 'false'
      }
    }
    else if (/^-[a-z]$/i.test(arg)) {
      const long = SHORT_FLAGS[arg.slice(1)]
      if (!long) throw new Error(`Unknown flag ${arg}.`)
      flags[long] = true
    }
    else {
      rest.push(arg)
    }
  }
  const [command, ...positionals] = rest
  return { command, positionals, flags }
}

export function flagString(flags: ParsedArgs['flags'], name: string): string | undefined {
  const v = flags[name]
  return typeof v === 'string' ? v : undefined
}
