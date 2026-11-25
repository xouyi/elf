import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Textarea } from '.'

describe('Textarea', () => {
  it('renders a textarea with three rows and forwards attributes', () => {
    const w = mount(Textarea, { attrs: { placeholder: 'Message', name: 'message' } })
    expect(w.element.tagName).toBe('TEXTAREA')
    expect(w.attributes('data-slot')).toBe('textarea')
    expect(w.attributes('rows')).toBe('3')
    expect(w.attributes('placeholder')).toBe('Message')
    expect(w.attributes('name')).toBe('message')
  })

  it('supports v-model', async () => {
    const w = mount(Textarea, { props: { modelValue: 'a' } })
    expect((w.element as HTMLTextAreaElement).value).toBe('a')
    await w.setValue('abc')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['abc'])
  })

  it('uses the default value when uncontrolled', () => {
    expect((mount(Textarea, { props: { defaultValue: 'hi' } }).element as HTMLTextAreaElement).value).toBe('hi')
  })

  it('sets aria-invalid from invalid and omits it otherwise', () => {
    expect(mount(Textarea, { props: { invalid: true } }).attributes('aria-invalid')).toBe('true')
    expect(mount(Textarea).attributes('aria-invalid')).toBeUndefined()
  })

  it('lets an explicit aria-invalid attribute through', () => {
    expect(mount(Textarea, { attrs: { 'aria-invalid': 'true' } }).attributes('aria-invalid')).toBe('true')
  })

  it('applies rows and maxlength', () => {
    const w = mount(Textarea, { props: { rows: 6, maxlength: 100 } })
    expect(w.attributes('rows')).toBe('6')
    expect(w.attributes('maxlength')).toBe('100')
  })

  it('is vertically resizable by hand unless autoResize is on', () => {
    expect(mount(Textarea).classes()).toContain('resize-y')
    const auto = mount(Textarea, { props: { autoResize: true } })
    expect(auto.classes()).toContain('resize-none')
    expect(auto.classes()).not.toContain('resize-y')
  })

  it('is disabled through the native attribute', () => {
    expect(mount(Textarea, { attrs: { disabled: '' } }).attributes('disabled')).toBeDefined()
  })

  it('merges custom classes', () => {
    expect(mount(Textarea, { props: { class: 'max-h-40' } }).classes()).toContain('max-h-40')
  })
})
