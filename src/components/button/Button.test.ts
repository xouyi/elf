import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Button } from '.'

describe('Button', () => {
  it('renders a button with default variant and size', () => {
    const w = mount(Button, { slots: { default: 'Save' } })
    expect(w.element.tagName).toBe('BUTTON')
    expect(w.text()).toBe('Save')
    expect(w.attributes('data-variant')).toBe('default')
    expect(w.attributes('data-size')).toBe('default')
    expect(w.classes()).toContain('bg-primary')
  })

  it.each([
    ['secondary', 'bg-secondary'],
    ['outline', 'border-input'],
    ['ghost', 'hover:bg-accent'],
    ['destructive', 'bg-destructive'],
    ['link', 'underline-offset-4'],
  ] as const)('applies the %s variant', (variant, cls) => {
    const w = mount(Button, { props: { variant } })
    expect(w.classes()).toContain(cls)
  })

  it.each([
    ['sm', 'h-8'],
    ['lg', 'h-10'],
    ['icon', 'size-9'],
  ] as const)('applies the %s size', (size, cls) => {
    expect(mount(Button, { props: { size } }).classes()).toContain(cls)
  })

  it('merges custom classes over variant classes', () => {
    const w = mount(Button, { props: { class: 'h-20' } })
    expect(w.classes()).toContain('h-20')
    expect(w.classes()).not.toContain('h-9')
  })

  it('renders another element through as', () => {
    const w = mount(Button, { props: { as: 'a' }, attrs: { href: '/x' } })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('href')).toBe('/x')
  })

  it('merges onto the child with asChild', () => {
    const w = mount(Button, { props: { asChild: true }, slots: { default: '<a href="/y">Go</a>' } })
    expect(w.element.tagName).toBe('A')
    expect(w.classes()).toContain('bg-primary')
  })

  it('respects disabled', () => {
    const w = mount(Button, { attrs: { disabled: '' } })
    expect(w.attributes('disabled')).toBeDefined()
  })
})
