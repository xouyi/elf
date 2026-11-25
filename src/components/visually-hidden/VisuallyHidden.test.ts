import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VisuallyHidden } from '.'

describe('VisuallyHidden', () => {
  it('renders a span with the hiding styles and keeps its text in the DOM', () => {
    const w = mount(VisuallyHidden, { slots: { default: 'Close' } })
    expect(w.element.tagName).toBe('SPAN')
    expect(w.text()).toBe('Close')
    expect(w.attributes('data-slot')).toBe('visually-hidden')
    const style = (w.element as HTMLElement).style
    expect(style.position).toBe('absolute')
    expect(style.width).toBe('1px')
    expect(style.height).toBe('1px')
    expect(style.overflow).toBe('hidden')
  })

  it('stays in the accessibility tree by default', () => {
    const w = mount(VisuallyHidden)
    expect(w.attributes('aria-hidden')).toBeUndefined()
    expect(w.attributes('tabindex')).toBeUndefined()
  })

  it('removes itself from the accessibility tree and tab order with fully-hidden', () => {
    const w = mount(VisuallyHidden, { props: { feature: 'fully-hidden' } })
    expect(w.attributes('aria-hidden')).toBe('true')
    expect(w.attributes('tabindex')).toBe('-1')
  })

  it('renders another element through as', () => {
    const w = mount(VisuallyHidden, { props: { as: 'caption' }, slots: { default: 'Caption' } })
    expect(w.element.tagName).toBe('CAPTION')
  })

  it('merges onto the child with asChild', () => {
    const w = mount(VisuallyHidden, { props: { asChild: true }, slots: { default: '<a href="#main">Skip</a>' } })
    expect(w.element.tagName).toBe('A')
    expect((w.element as HTMLElement).style.position).toBe('absolute')
    expect(w.attributes('href')).toBe('#main')
  })

  it('applies custom classes', () => {
    expect(mount(VisuallyHidden, { props: { class: 'extra' } }).classes()).toContain('extra')
  })
})
