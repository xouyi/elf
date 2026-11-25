import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Separator } from '.'

describe('Separator', () => {
  it('is horizontal and decorative by default', () => {
    const w = mount(Separator)
    expect(w.attributes('data-slot')).toBe('separator')
    expect(w.attributes('data-orientation')).toBe('horizontal')
    expect(w.attributes('role')).toBe('none')
    expect(w.attributes('aria-orientation')).toBeUndefined()
    expect(w.classes()).toContain('bg-border')
  })

  it('exposes role separator when not decorative', () => {
    const w = mount(Separator, { props: { decorative: false } })
    expect(w.attributes('role')).toBe('separator')
  })

  it('sets aria-orientation for a vertical separator that is not decorative', () => {
    const w = mount(Separator, { props: { decorative: false, orientation: 'vertical' } })
    expect(w.attributes('data-orientation')).toBe('vertical')
    expect(w.attributes('aria-orientation')).toBe('vertical')
    expect(w.classes()).toContain('data-[orientation=vertical]:w-px')
  })

  it('merges custom classes', () => {
    expect(mount(Separator, { props: { class: 'my-4' } }).classes()).toContain('my-4')
  })

  it('renders another element through as', () => {
    expect(mount(Separator, { props: { as: 'hr' } }).element.tagName).toBe('HR')
  })
})
