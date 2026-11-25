import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Label } from '.'

describe('Label', () => {
  it('renders a label bound to a control through for', () => {
    const w = mount(Label, { props: { for: 'email' }, slots: { default: 'Email' } })
    expect(w.element.tagName).toBe('LABEL')
    expect(w.attributes('for')).toBe('email')
    expect(w.attributes('data-slot')).toBe('label')
    expect(w.text()).toBe('Email')
  })

  it('carries the typography and disabled-peer classes', () => {
    const w = mount(Label)
    expect(w.classes()).toContain('text-sm')
    expect(w.classes()).toContain('font-medium')
    expect(w.classes()).toContain('peer-disabled:opacity-50')
  })

  it('merges custom classes over base classes', () => {
    const w = mount(Label, { props: { class: 'text-base' } })
    expect(w.classes()).toContain('text-base')
    expect(w.classes()).not.toContain('text-sm')
  })

  it('renders another element through as', () => {
    expect(mount(Label, { props: { as: 'span' } }).element.tagName).toBe('SPAN')
  })

  it('merges onto the child with asChild', () => {
    const w = mount(Label, { props: { asChild: true }, slots: { default: '<legend>Group</legend>' } })
    expect(w.element.tagName).toBe('LEGEND')
    expect(w.classes()).toContain('font-medium')
  })

  it('passes native attributes through', () => {
    expect(mount(Label, { attrs: { id: 'l1' } }).attributes('id')).toBe('l1')
  })
})
