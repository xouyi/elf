import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Field, FieldControl } from '../field'
import { Switch, switchVariants } from '.'

// The Reka root renders a fragment (button plus an optional form input), so tests address the button.
type Options = Parameters<typeof mount<typeof Switch>>[1]
function toggle(options: Options = {}) {
  const wrapper = mount(Switch, options) as VueWrapper
  return Object.assign(wrapper.get('button'), { wrapper })
}

describe('Switch', () => {
  it('renders a button with role switch, data-slots and an off state', () => {
    const s = toggle({ attrs: { 'aria-label': 'Reminders' } })
    expect(s.attributes('role')).toBe('switch')
    expect(s.attributes('data-slot')).toBe('switch')
    expect(s.attributes('aria-checked')).toBe('false')
    expect(s.attributes('data-state')).toBe('unchecked')
    expect(s.get('[data-slot="switch-thumb"]').attributes('data-state')).toBe('unchecked')
  })

  it('toggles and emits update:modelValue on click', async () => {
    const s = toggle({ props: { modelValue: false } })
    await s.trigger('click')
    expect(s.wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
  })

  it('reflects a controlled value and a default value', () => {
    expect(toggle({ props: { modelValue: true } }).attributes('aria-checked')).toBe('true')
    expect(toggle({ props: { defaultValue: true } }).attributes('data-state')).toBe('checked')
  })

  it('does not toggle when disabled', async () => {
    const s = toggle({ props: { disabled: true } })
    expect(s.attributes('disabled')).toBeDefined()
    await s.trigger('click')
    expect(s.wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('has default and sm sizes through data-size and the variant helper', () => {
    expect(toggle().attributes('data-size')).toBe('default')
    expect(toggle({ props: { size: 'sm' } }).attributes('data-size')).toBe('sm')
    expect(switchVariants({ size: 'sm' })).toContain('h-5')
    expect(switchVariants()).toContain('h-6')
  })

  it('merges custom classes and renders the thumb slot', () => {
    const s = toggle({ props: { class: 'ml-2' }, slots: { thumb: () => h('i', { id: 'icon' }) } })
    expect(s.classes()).toContain('ml-2')
    expect(s.find('#icon').exists()).toBe(true)
  })

  it('is wired by Field: id, aria-describedby and disabled', () => {
    const w = mount(Field, {
      props: { id: 'f', label: 'Digest', description: 'Weekly', disabled: true },
      slots: { default: () => h(FieldControl, () => h(Switch)) },
    })
    const s = w.get('button[role="switch"]')
    expect(s.attributes('id')).toBe('f')
    expect(s.attributes('aria-describedby')).toBe('f-description')
    expect(s.attributes('disabled')).toBeDefined()
  })
})
