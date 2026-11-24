import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Badge } from '.'

describe('Badge', () => {
  it('renders a span with the default variant', () => {
    const w = mount(Badge, { slots: { default: 'New' } })
    expect(w.element.tagName).toBe('SPAN')
    expect(w.text()).toBe('New')
    expect(w.classes()).toContain('bg-primary')
  })

  it.each([
    ['secondary', 'bg-secondary'],
    ['outline', 'border-border'],
    ['destructive', 'bg-destructive'],
    ['success', 'bg-success'],
    ['warning', 'bg-warning'],
  ] as const)('applies the %s variant', (variant, cls) => {
    const w = mount(Badge, { props: { variant } })
    expect(w.classes()).toContain(cls)
    expect(w.attributes('data-variant')).toBe(variant)
  })

  it('supports as', () => {
    expect(mount(Badge, { props: { as: 'a' } }).element.tagName).toBe('A')
  })
})
