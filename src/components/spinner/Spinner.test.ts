import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Spinner } from '.'

describe('Spinner', () => {
  it('is a status region with a default hidden label and a decorative svg', () => {
    const w = mount(Spinner)
    expect(w.attributes('role')).toBe('status')
    expect(w.attributes('data-slot')).toBe('spinner')
    expect(w.attributes('data-size')).toBe('default')
    expect(w.text()).toBe('Loading')
    expect(w.get('svg').attributes('aria-hidden')).toBe('true')
    expect(w.find('[data-slot="visually-hidden"]').exists()).toBe(true)
  })

  it('announces a custom label', () => {
    expect(mount(Spinner, { props: { label: 'Saving changes' } }).text()).toBe('Saving changes')
  })

  it.each([
    ['sm', 'size-3'],
    ['default', 'size-4'],
    ['lg', 'size-6'],
    ['xl', 'size-8'],
  ] as const)('applies the %s size', (size, cls) => {
    const w = mount(Spinner, { props: { size } })
    expect(w.classes()).toContain(cls)
    expect(w.attributes('data-size')).toBe(size)
  })

  it('spins unless the user prefers reduced motion', () => {
    const svg = mount(Spinner).get('svg')
    expect(svg.classes()).toContain('animate-spin')
    expect(svg.classes()).toContain('motion-reduce:animate-none')
  })

  it('merges custom classes over variant classes', () => {
    const w = mount(Spinner, { props: { class: 'size-10 text-primary' } })
    expect(w.classes()).toContain('size-10')
    expect(w.classes()).not.toContain('size-4')
    expect(w.classes()).toContain('text-primary')
  })
})
