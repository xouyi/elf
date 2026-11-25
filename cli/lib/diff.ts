export interface DiffLine { kind: ' ' | '+' | '-', text: string }

/** Line diff through a longest-common-subsequence table. Components are small, so O(n*m) is fine. */
export function diffLines(a: string, b: string): DiffLine[] {
  const x = a === '' ? [] : a.split('\n')
  const y = b === '' ? [] : b.split('\n')
  const lcs: number[][] = Array.from({ length: x.length + 1 }, () => Array.from<number>({ length: y.length + 1 }).fill(0))
  for (let i = x.length - 1; i >= 0; i--) {
    for (let j = y.length - 1; j >= 0; j--) {
      lcs[i]![j] = x[i] === y[j] ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!)
    }
  }
  const out: DiffLine[] = []
  let i = 0
  let j = 0
  while (i < x.length && j < y.length) {
    if (x[i] === y[j]) {
      out.push({ kind: ' ', text: x[i]! })
      i++
      j++
    }
    else if (lcs[i + 1]![j]! >= lcs[i]![j + 1]!) {
      out.push({ kind: '-', text: x[i++]! })
    }
    else {
      out.push({ kind: '+', text: y[j++]! })
    }
  }
  while (i < x.length) out.push({ kind: '-', text: x[i++]! })
  while (j < y.length) out.push({ kind: '+', text: y[j++]! })
  return out
}

export function summarizeDiff(lines: DiffLine[]): { added: number, removed: number } {
  return {
    added: lines.filter(l => l.kind === '+').length,
    removed: lines.filter(l => l.kind === '-').length,
  }
}

/** Renders changed lines with `context` unchanged lines around each change. */
export function formatDiff(lines: DiffLine[], context = 2): string {
  const keep = lines.map(() => false)
  lines.forEach((l, idx) => {
    if (l.kind === ' ') return
    for (let k = Math.max(0, idx - context); k <= Math.min(lines.length - 1, idx + context); k++) keep[k] = true
  })
  const out: string[] = []
  let gap = false
  lines.forEach((l, idx) => {
    if (!keep[idx]) {
      gap = true
      return
    }
    if (gap && out.length > 0) out.push('  ...')
    gap = false
    out.push(`${l.kind} ${l.text}`)
  })
  return out.join('\n')
}
