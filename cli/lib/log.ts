const useColor = !process.env.NO_COLOR && process.stdout.isTTY

const wrap = (open: number, close: number) => (s: string) => (useColor ? `\u001B[${open}m${s}\u001B[${close}m` : s)

export const c = {
  bold: wrap(1, 22),
  dim: wrap(2, 22),
  red: wrap(31, 39),
  green: wrap(32, 39),
  yellow: wrap(33, 39),
  cyan: wrap(36, 39),
}

export const log = {
  info: (m: string) => console.log(m),
  step: (m: string) => console.log(`${c.cyan('>')} ${m}`),
  ok: (m: string) => console.log(`${c.green('+')} ${m}`),
  skip: (m: string) => console.log(`${c.dim('-')} ${m}`),
  warn: (m: string) => console.warn(`${c.yellow('!')} ${m}`),
  error: (m: string) => console.error(`${c.red('x')} ${m}`),
}

/** A failure with a user-facing message; the entry point prints it without a stack trace. */
export class CliError extends Error {}
