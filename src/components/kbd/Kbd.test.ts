import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Kbd, KbdGroup } from '.'

describe('Kbd', () => {
  it('renders a kbd element with its key text', () => {
    const w = mount(Kbd, { slots: { default: 'Esc' } })
    expect(w.element.tagName).toBe('KBD')
    expect(w.text()).toBe('Esc')
    expect(w.attributes('data-slot')).toBe('kbd')
    expect(w.classes()).toContain('bg-muted')
    expect(w.classes()).toContain('select-none')
  })

  it('merges custom classes over base classes', () => {
    const w = mount(Kbd, { props: { class: 'h-8' } })
    expect(w.classes()).toContain('h-8')
    expect(w.classes()).not.toContain('h-5')
  })

  it('renders another element through as', () => {
    expect(mount(Kbd, { props: { as: 'span' } }).element.tagName).toBe('SPAN')
  })

  it('merges onto the child with asChild', () => {
    const w = mount(Kbd, { props: { asChild: true }, slots: { default: '<span>K</span>' } })
    expect(w.element.tagName).toBe('SPAN')
    expect(w.classes()).toContain('bg-muted')
  })

  it('passes native attributes through', () => {
    expect(mount(Kbd, { attrs: { title: 'Enter key' } }).attributes('title')).toBe('Enter key')
  })
})

describe('KbdGroup', () => {
  it('renders a kbd that groups keys', () => {
    const w = mount(KbdGroup, { slots: { default: '<kbd>Ctrl</kbd><kbd>K</kbd>' } })
    expect(w.element.tagName).toBe('KBD')
    expect(w.attributes('data-slot')).toBe('kbd-group')
    expect(w.element.querySelectorAll('kbd')).toHaveLength(2)
    expect(w.classes()).toContain('inline-flex')
  })

  it('merges custom classes', () => {
    expect(mount(KbdGroup, { props: { class: 'gap-2' } }).classes()).toContain('gap-2')
  })
})
