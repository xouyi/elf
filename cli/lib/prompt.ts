import { createInterface } from 'node:readline/promises'

export const isInteractive = () => Boolean(process.stdin.isTTY && process.stdout.isTTY)

/** Asks a question on a TTY; returns the default for empty answers. */
export async function ask(question: string, fallback: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  try {
    const answer = (await rl.question(`${question} (${fallback}) `)).trim()
    return answer || fallback
  }
  finally {
    rl.close()
  }
}

export async function confirm(question: string): Promise<boolean> {
  return /^y(?:es)?$/i.test(await ask(`${question} [y/N]`, 'n'))
}
