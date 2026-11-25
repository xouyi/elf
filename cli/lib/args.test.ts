import { describe, expect, it } from 'vitest'
import { parseArgs } from './args'

describe('parseArgs', () => {
  it('splits command, positionals and flags in any order', () => {
    const a = parseArgs(['add', 'button', '--path', 'ui', 'dialog', '--overwrite', '-y', '--registry=./r'])
    expect(a.command).toBe('add')
    expect(a.positionals).toEqual(['button', 'dialog'])
    expect(a.flags).toEqual({ path: 'ui', overwrite: true, yes: true, registry: './r' })
  })

  it('rejects value flags without a value and unknown short flags', () => {
    expect(() => parseArgs(['init', '--theme'])).toThrow('needs a value')
    expect(() => parseArgs(['init', '--theme', '--yes'])).toThrow('needs a value')
    expect(() => parseArgs(['-z'])).toThrow('Unknown flag')
  })

  it('maps --version and -h', () => {
    expect(parseArgs(['--version']).flags.version).toBe(true)
    expect(parseArgs(['-h']).flags.help).toBe(true)
  })
})
