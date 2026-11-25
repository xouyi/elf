import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Field, FieldControl } from '../field'
import { Checkbox } from '.'

// The Reka root renders a fragment (button plus an optional form input), so tests address the button.
type Options = Parameters<typeof mount<typeof Checkbox>>[1]
function box(options: Options = {}) {
  const wrapper = mount(Checkbox, options) as VueWrapper
  return Object.assign(wrapper.get('button'), { wrapper })
}

describe('Checkbox', () => {
  it('renders a button with role checkbox, data-slot and an unchecked state', () => {
    const b = box({ attrs: { 'aria-label': 'Accept' } })
    expect(b.element.tagName).toBe('BUTTON')
    expect(b.attributes('role')).toBe('checkbox')
    expect(b.attributes('data-slot')).toBe('checkbox')
    expect(b.attributes('aria-checked')).toBe('false')
    expect(b.attributes('data-state')).toBe('unchecked')
  })

  it('toggles and emits update:modelValue on click', async () => {
    const b = box({ props: { modelValue: false } })
    await b.trigger('click')
    expect(b.wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
  })

  it('reflects a controlled checked value and renders the check icon', () => {
    const b = box({ props: { modelValue: true } })
    expect(b.attributes('aria-checked')).toBe('true')
    expect(b.attributes('data-state')).toBe('checked')
    expect(b.find('[data-slot="checkbox-indicator"] svg').exists()).toBe(true)
  })

  it('supports the indeterminate state with aria-checked="mixed" and a distinct icon', async () => {
    const w = mount(Checkbox, { props: { modelValue: 'indeterminate' } })
    const b = () => w.get('button')
    expect(b().attributes('aria-checked')).toBe('mixed')
    expect(b().attributes('data-state')).toBe('indeterminate')
    const mixedIcon = b().get('svg').html()
    await w.setProps({ modelValue: true })
    expect(b().get('svg').html()).not.toBe(mixedIcon)
    await w.setProps({ modelValue: 'indeterminate' })
    await b().trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([true])
  })

  it('uses defaultValue when uncontrolled', () => {
    expect(box({ props: { defaultValue: true } }).attributes('data-state')).toBe('checked')
  })

  it('does not toggle when disabled', async () => {
    const b = box({ props: { disabled: true } })
    expect(b.attributes('disabled')).toBeDefined()
    expect(b.attributes('data-disabled')).toBeDefined()
    await b.trigger('click')
    expect(b.wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('sets aria-invalid from invalid and omits it otherwise', () => {
    expect(box({ props: { invalid: true } }).attributes('aria-invalid')).toBe('true')
    expect(box().attributes('aria-invalid')).toBeUndefined()
  })

  it('merges custom classes and supports custom indicator content', () => {
    const b = box({ props: { modelValue: true, class: 'size-6' }, slots: { default: () => h('i', { id: 'custom' }) } })
    expect(b.classes()).toContain('size-6')
    expect(b.find('#custom').exists()).toBe(true)
  })

  it('is wired by Field: id, aria-describedby, aria-invalid, aria-required and disabled', () => {
    const w = mount(Field, {
      props: { id: 'f', label: 'Agree', description: 'Help', error: 'Required', required: true, disabled: true },
      slots: { default: () => h(FieldControl, () => h(Checkbox)) },
    })
    const b = w.get('button[role="checkbox"]')
    expect(b.attributes('id')).toBe('f')
    expect(b.attributes('aria-describedby')).toBe('f-description f-error')
    expect(b.attributes('aria-invalid')).toBe('true')
    expect(b.attributes('aria-required')).toBe('true')
    expect(b.attributes('disabled')).toBeDefined()
  })
})
