import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Skeleton } from '.'

describe('Skeleton', () => {
  it('renders a decorative pulsing block', () => {
    const w = mount(Skeleton)
    expect(w.element.tagName).toBe('DIV')
    expect(w.attributes('data-slot')).toBe('skeleton')
    expect(w.attributes('aria-hidden')).toBe('true')
    expect(w.classes()).toContain('animate-pulse')
    expect(w.classes()).toContain('bg-accent')
  })

  it('stops animating when the user prefers reduced motion', () => {
    expect(mount(Skeleton).classes()).toContain('motion-reduce:animate-none')
  })

  it('merges custom size and shape classes over the base classes', () => {
    const w = mount(Skeleton, { props: { class: 'size-12 rounded-full' } })
    expect(w.classes()).toContain('size-12')
    expect(w.classes()).toContain('rounded-full')
    expect(w.classes()).not.toContain('rounded-md')
  })

  it('passes native attributes through', () => {
    expect(mount(Skeleton, { attrs: { id: 's1' } }).attributes('id')).toBe('s1')
  })
})
