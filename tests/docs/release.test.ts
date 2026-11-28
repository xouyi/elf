import { describe, expect, it } from 'vitest'
import { bump, foldUnreleased } from '../../scripts/release'

describe('release helper', () => {
  it('bumps patch, minor and major versions', () => {
    expect(bump('0.5.1', 'patch')).toBe('0.5.2')
    expect(bump('0.5.1', 'minor')).toBe('0.6.0')
    expect(bump('0.5.1', 'major')).toBe('1.0.0')
    expect(bump('1.0.0-beta.2', 'patch')).toBe('1.0.1')
  })

  it('renames only the first Unreleased heading', () => {
    const log = '# Changelog\n\n## Unreleased\n\n- Fix a thing.\n\n## 0.5.1\n\n- Older.\n'
    expect(foldUnreleased(log, '0.5.2')).toBe('# Changelog\n\n## 0.5.2\n\n- Fix a thing.\n\n## 0.5.1\n\n- Older.\n')
    expect(foldUnreleased('# Changelog\n\n## 0.5.1\n', '0.5.2')).toBeNull()
  })
})
