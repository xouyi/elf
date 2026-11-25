import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { Field, FieldControl } from '../field'
import { RadioGroup, RadioGroupItem } from '.'

function group(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  return mount(RadioGroup, {
    props,
    attrs: { 'aria-label': 'Size', ...attrs },
    slots: { default: () => [h(RadioGroupItem, { value: 's' }), h(RadioGroupItem, { value: 'm' }), h(RadioGroupItem, { value: 'l', disabled: true })] },
    attachTo: document.body,
  })
}

describe('RadioGroup', () => {
  it('renders a radiogroup of radio buttons with data-slots', () => {
    const w = group()
    const root = w.get('[data-slot="radio-group"]')
    expect(root.attributes('role')).toBe('radiogroup')
    expect(root.attributes('aria-label')).toBe('Size')
    const radios = w.findAll('[role="radio"]')
    expect(radios).toHaveLength(3)
    expect(radios.every(r => r.attributes('data-slot') === 'radio-group-item')).toBe(true)
    expect(radios.every(r => r.attributes('aria-checked') === 'false')).toBe(true)
    w.unmount()
  })

  it('checks the default value and shows the indicator only for it', () => {
    const w = group({ defaultValue: 'm' })
    const [s, m] = w.findAll('[role="radio"]')
    expect(m!.attributes('aria-checked')).toBe('true')
    expect(m!.attributes('data-state')).toBe('checked')
    expect(m!.find('[data-slot="radio-group-indicator"]').exists()).toBe(true)
    expect(s!.find('[data-slot="radio-group-indicator"]').exists()).toBe(false)
    w.unmount()
  })

  it('emits update:modelValue when an item is clicked and supports v-model', async () => {
    const model = ref('s')
    const App = defineComponent(() => () => h(RadioGroup, { 'modelValue': model.value, 'onUpdate:modelValue': (v: unknown) => (model.value = v as string), 'aria-label': 'x' }, () => [h(RadioGroupItem, { value: 's' }), h(RadioGroupItem, { value: 'm' })]))
    const w = mount(App, { attachTo: document.body })
    await w.findAll('[role="radio"]')[1]!.trigger('click')
    expect(model.value).toBe('m')
    expect(w.findAll('[role="radio"]')[1]!.attributes('aria-checked')).toBe('true')
    w.unmount()
  })

  it('does not select a disabled item and disables every item when the group is disabled', async () => {
    const w = group()
    const l = w.findAll('[role="radio"]')[2]!
    expect(l.attributes('disabled')).toBeDefined()
    await l.trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
    w.unmount()
    const all = group({ disabled: true })
    expect(all.findAll('[role="radio"]').every(r => r.attributes('disabled') !== undefined)).toBe(true)
    expect(all.get('[role="radiogroup"]').attributes('data-disabled')).toBeDefined()
    w.unmount()
  })

  it('exposes the orientation', () => {
    const w = group({ orientation: 'horizontal' })
    expect(w.get('[role="radiogroup"]').attributes('aria-orientation')).toBe('horizontal')
    expect(w.get('[role="radiogroup"]').attributes('data-orientation')).toBe('horizontal')
    w.unmount()
  })

  it('sets aria-invalid from invalid and omits it otherwise', () => {
    expect(group({ invalid: true }).get('[role="radiogroup"]').attributes('aria-invalid')).toBe('true')
    expect(group().get('[role="radiogroup"]').attributes('aria-invalid')).toBeUndefined()
  })

  it('merges custom classes on the group and on items', () => {
    const w = mount(RadioGroup, { props: { class: 'gap-8' }, slots: { default: () => h(RadioGroupItem, { value: 'a', class: 'size-5' }) } })
    expect(w.get('[role="radiogroup"]').classes()).toContain('gap-8')
    expect(w.get('[role="radio"]').classes()).toContain('size-5')
  })

  it('is named, described and flagged by Field', () => {
    const w = mount(Field, {
      props: { id: 'f', label: 'Size', description: 'Pick one', error: 'Required', required: true },
      slots: { default: () => h(FieldControl, () => h(RadioGroup, null, () => h(RadioGroupItem, { value: 'a' }))) },
    })
    const root = w.get('[role="radiogroup"]')
    expect(root.attributes('id')).toBe('f')
    expect(root.attributes('aria-labelledby')).toBe('f-label')
    expect(root.attributes('aria-describedby')).toBe('f-description f-error')
    expect(root.attributes('aria-invalid')).toBe('true')
    expect(root.attributes('aria-required')).toBe('true')
  })
})

describe('RadioGroup reactivity', () => {
  it('disables every item when disabled changes after mount', async () => {
    const off = ref(false)
    const App = defineComponent(() => () => h(RadioGroup, { 'disabled': off.value, 'aria-label': 'x' }, () => [h(RadioGroupItem, { value: 'a' }), h(RadioGroupItem, { value: 'b' })]))
    const w = mount(App, { attachTo: document.body })
    expect(w.findAll('[role="radio"]').some(r => r.attributes('disabled') !== undefined)).toBe(false)
    off.value = true
    await w.vm.$nextTick()
    expect(w.findAll('[role="radio"]').every(r => r.attributes('disabled') !== undefined)).toBe(true)
    w.unmount()
  })
})
