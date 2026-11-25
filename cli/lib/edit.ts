/**
 * Small, AST-free source edits for nuxt.config / vite.config / CSS files.
 * Every function is idempotent and returns `null` when the file has a shape it does not understand,
 * so callers can refuse and print manual instructions instead of corrupting the file.
 */

export interface Prop { key: string, valueStart: number, valueEnd: number }

const OPEN = new Set(['{', '[', '('])
const CLOSE = new Set(['}', ']', ')'])

/** Index just after a string, template or comment that starts at `i`; `i` itself when none starts there. */
function skipLiteral(s: string, i: number): number {
  const ch = s[i]
  if (ch === '\'' || ch === '"' || ch === '`') {
    let j = i + 1
    while (j < s.length && s[j] !== ch) j += s[j] === '\\' ? 2 : 1
    return j + 1
  }
  if (ch === '/' && s[i + 1] === '/') {
    const nl = s.indexOf('\n', i)
    return nl === -1 ? s.length : nl
  }
  if (ch === '/' && s[i + 1] === '*') {
    const end = s.indexOf('*/', i + 2)
    return end === -1 ? s.length : end + 2
  }
  return i
}

/** Index of the bracket matching the one at `open`, or -1. */
export function matchBracket(s: string, open: number): number {
  let depth = 0
  for (let i = open; i < s.length;) {
    const skipped = skipLiteral(s, i)
    if (skipped !== i) {
      i = skipped
      continue
    }
    if (OPEN.has(s[i]!)) depth++
    else if (CLOSE.has(s[i]!) && --depth === 0) return i
    i++
  }
  return -1
}

/** Top-level `key: value` properties of the object literal opened at `open`. Spreads and methods are reported with an empty key. */
export function objectProps(s: string, open: number): { props: Prop[], close: number } | null {
  const close = matchBracket(s, open)
  if (close === -1 || s[open] !== '{') return null
  const props: Prop[] = []
  let i = open + 1
  while (i < close) {
    const skipped = skipLiteral(s, i)
    // Leading whitespace, commas and comments between properties.
    if (/[\s,]/.test(s[i]!) || (skipped !== i && !/['"`]/.test(s[i]!))) {
      i = skipped !== i ? skipped : i + 1
      continue
    }
    const keyMatch = /^(?:([A-Z_$][\w$]*)|'([^']*)'|"([^"]*)")\s*:/i.exec(s.slice(i, close))
    const start = i
    let depth = 0
    let j = keyMatch ? i + keyMatch[0].length : i
    const valueStart = j
    while (j < close) {
      const skip = skipLiteral(s, j)
      if (skip !== j) {
        j = skip
        continue
      }
      if (OPEN.has(s[j]!)) depth++
      else if (CLOSE.has(s[j]!)) depth--
      else if (s[j] === ',' && depth === 0) break
      j++
    }
    props.push({ key: keyMatch ? (keyMatch[1] ?? keyMatch[2] ?? keyMatch[3]!) : '', valueStart: keyMatch ? valueStart : start, valueEnd: j })
    i = j
  }
  return { props, close }
}

/** Index of the `{` of the first argument in `export default <callee>({`, or -1. */
export function findConfigObject(s: string, callee: string): number {
  const m = new RegExp(`export\\s+default\\s+${callee}\\s*\\(\\s*\\{`).exec(s)
  return m ? m.index + m[0].length - 1 : -1
}

function indentOfLineAt(s: string, index: number): string {
  const lineStart = s.lastIndexOf('\n', index - 1) + 1
  return /^[ \t]*/.exec(s.slice(lineStart))![0]
}

/** Inserts `text,` as the first property of the object opened at `open`. */
export function insertProp(s: string, open: number, text: string): string {
  const close = matchBracket(s, open)
  const inner = s.slice(open + 1, close)
  const baseIndent = indentOfLineAt(s, open)
  if (inner.trim() === '') return `${s.slice(0, open + 1)}\n${baseIndent}  ${text},\n${baseIndent}${s.slice(close)}`
  const indent = /\n([ \t]+)\S/.exec(inner)?.[1] ?? `${baseIndent}  `
  return `${s.slice(0, open + 1)}\n${indent}${text},${s.slice(open + 1)}`
}

/** Adds `item` to the array literal property `key` of the object at `open`. null: the value is not an array literal. */
export function addToArrayProp(s: string, open: number, key: string, item: string, alreadyHas: RegExp | null): { src: string, changed: boolean } | null {
  const found = objectProps(s, open)
  const prop = found?.props.find(p => p.key === key)
  if (!found || !prop) return null
  const raw = s.slice(prop.valueStart, prop.valueEnd)
  const arrStart = prop.valueStart + (raw.length - raw.trimStart().length)
  if (s[arrStart] !== '[') return null
  const arrEnd = matchBracket(s, arrStart)
  if (arrEnd === -1) return null
  const content = s.slice(arrStart + 1, arrEnd)
  if (alreadyHas?.test(content)) return { src: s, changed: false }
  if (content.trim() === '') return { src: `${s.slice(0, arrStart + 1)}${item}${s.slice(arrEnd)}`, changed: true }
  const lastIdx = arrStart + 1 + content.trimEnd().length
  const hasComma = s[lastIdx - 1] === ','
  if (content.includes('\n')) {
    const indent = /\n([ \t]*)\S/.exec(content)?.[1] ?? '  '
    return { src: `${s.slice(0, lastIdx)}${hasComma ? '' : ','}\n${indent}${item},${s.slice(lastIdx)}`, changed: true }
  }
  return { src: `${s.slice(0, hasComma ? lastIdx - 1 : lastIdx)}, ${item}${s.slice(hasComma ? lastIdx - 1 : lastIdx)}`, changed: true }
}

/** Adds `import <local> from '<from>'` after the last import. Returns the local binding name of an existing default import. */
export function ensureDefaultImport(s: string, local: string, from: string): { src: string, local: string, changed: boolean } {
  const existing = new RegExp(`import\\s+(\\w+)\\s+from\\s+['"]${from.replaceAll(/[/.]/g, '\\$&')}['"]`).exec(s)
  if (existing) return { src: s, local: existing[1]!, changed: false }
  const imports = [...s.matchAll(/^import\b[^;'"]*['"][^'"\n]+['"];?[ \t]*$/gm)]
  const semi = imports.at(-1)?.[0].endsWith(';') ? ';' : ''
  const line = `import ${local} from '${from}'${semi}`
  if (imports.length === 0) return { src: `${line}\n${s}`, local, changed: true }
  const last = imports.at(-1)!
  const at = last.index! + last[0].length
  return { src: `${s.slice(0, at)}\n${line}${s.slice(at)}`, local, changed: true }
}

/** Ensures the Tailwind plugin is registered in `plugins: [...]` of the object at `open` (the Vite config shape). */
export function ensureVitePlugin(s: string, open: number, call: string, alreadyHas: RegExp): { src: string, changed: boolean } | null {
  const found = objectProps(s, open)
  if (!found) return null
  const plugins = found.props.find(p => p.key === 'plugins')
  if (!plugins) return { src: insertProp(s, open, `plugins: [${call}]`), changed: true }
  return addToArrayProp(s, open, 'plugins', call, alreadyHas)
}

/** Opening brace of an object-literal property value, or -1. */
export function propObjectOpen(s: string, open: number, key: string): number {
  const prop = objectProps(s, open)?.props.find(p => p.key === key)
  if (!prop) return -1
  const raw = s.slice(prop.valueStart, prop.valueEnd)
  const at = prop.valueStart + (raw.length - raw.trimStart().length)
  return s[at] === '{' ? at : -2
}

/** Adds the missing `@import` lines to a stylesheet, in order, keeping the ones that exist. */
export function ensureCssImports(css: string, wanted: { re: RegExp, line: string }[]): { css: string, changed: boolean } {
  const lines = css.split('\n')
  let changed = false
  let after = -1
  for (const w of wanted) {
    const at = lines.findIndex(l => w.re.test(l))
    if (at !== -1) {
      after = at
      continue
    }
    let insertAt = after + 1
    if (after === -1) insertAt = lines[0]?.startsWith('@charset') ? 1 : 0
    lines.splice(insertAt, 0, w.line)
    after = insertAt
    changed = true
  }
  return { css: lines.join('\n'), changed }
}
