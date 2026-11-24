import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Input } from '.'

describe('Input', () => {
  it('renders an input and forwards attributes', () => {
    const w = mount(Input, { attrs: { placeholder: 'Name', type: 'email', 'aria-invalid': 'true' } })
    expect(w.element.tagName).toBe('INPUT')
    expect(w.attributes('placeholder')).toBe('Name')
    expect(w.attributes('type')).toBe('email')
    expect(w.attributes('aria-invalid')).toBe('true')
    expect(w.attributes('data-slot')).toBe('input')
  })

  it('supports v-model', async () => {
    const w = mount(Input, { props: { modelValue: 'a' } })
    expect((w.element as HTMLInputElement).value).toBe('a')
    await w.setValue('abc')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['abc'])
  })

  it('uses the default value when uncontrolled', () => {
    const w = mount(Input, { props: { defaultValue: 'hi' } })
    expect((w.element as HTMLInputElement).value).toBe('hi')
  })

  it('merges custom classes', () => {
    expect(mount(Input, { props: { class: 'h-12' } }).classes()).toContain('h-12')
  })
})
