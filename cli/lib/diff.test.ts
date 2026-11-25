import { describe, expect, it } from 'vitest'
import { diffLines, formatDiff, summarizeDiff } from './diff'

describe('diffLines', () => {
  it('counts added and removed lines', () => {
    const lines = diffLines('a\nb\nc', 'a\nx\nc\nd')
    expect(summarizeDiff(lines)).toEqual({ added: 2, removed: 1 })
    expect(formatDiff(lines)).toContain('- b')
    expect(formatDiff(lines)).toContain('+ x')
  })

  it('reports no changes for equal text', () => {
    expect(summarizeDiff(diffLines('same', 'same'))).toEqual({ added: 0, removed: 0 })
  })
})
