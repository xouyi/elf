import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Field, FieldControl } from '../field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, selectTriggerVariants } from '.'

function select(rootProps: Record<string, unknown> = {}, triggerProps: Record<string, unknown> = {}) {
  return mount(Select, {
    props: rootProps,
    slots: {
      default: () => [
        h(SelectTrigger, { 'aria-label': 'Role', ...triggerProps }, () => h(SelectValue, { placeholder: 'Pick one' })),
        h(SelectContent, () => [h(SelectItem, { value: 'a' }, () => 'Alpha'), h(SelectItem, { value: 'b' }, () => 'Beta')]),
      ],
    },
    attachTo: document.body,
  })
}

describe('Select', () => {
  it('renders a combobox trigger with data-slot, a placeholder and a chevron', () => {
    const w = select()
    const trigger = w.get('[data-slot="select-trigger"]')
    expect(trigger.element.tagName).toBe('BUTTON')
    expect(trigger.attributes('role')).toBe('combobox')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(trigger.attributes('data-placeholder')).toBeDefined()
    expect(trigger.get('[data-slot="select-value"]').text()).toBe('Pick one')
    expect(trigger.find('svg').exists()).toBe(true)
    w.unmount()
  })

  it('shows the label of the selected item for a default value and a controlled value', async () => {
    const w = select({ defaultValue: 'b' })
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(w.get('[data-slot="select-value"]').text()).toBe('Beta')
    w.unmount()
    const controlled = select({ modelValue: 'a' })
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(controlled.get('[data-slot="select-value"]').text()).toBe('Alpha')
    expect(controlled.find('[data-placeholder]').exists()).toBe(false)
    controlled.unmount()
  })

  it('has default and sm sizes and sets aria-invalid from invalid', () => {
    expect(select().get('button').attributes('data-size')).toBe('default')
    expect(select({}, { size: 'sm' }).get('button').attributes('data-size')).toBe('sm')
    expect(selectTriggerVariants({ size: 'sm' })).toContain('h-8')
    expect(select({}, { invalid: true }).get('button').attributes('aria-invalid')).toBe('true')
    expect(select().get('button').attributes('aria-invalid')).toBeUndefined()
  })

  it('is disabled through the root and merges custom trigger classes', () => {
    const w = select({ disabled: true }, { class: 'w-40' })
    const trigger = w.get('button')
    expect(trigger.attributes('disabled')).toBeDefined()
    expect(trigger.classes()).toContain('w-40')
    w.unmount()
  })

  it('opens a listbox of options on pointer down and shows the options in a portal', async () => {
    const w = select()
    await w.get('button').trigger('pointerdown', { button: 0, ctrlKey: false, pointerType: 'mouse' })
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(w.get('button').attributes('aria-expanded')).toBe('true')
    const options = [...document.body.querySelectorAll('[role="option"]')]
    expect(options.map(o => o.textContent?.trim())).toEqual(['Alpha', 'Beta'])
    expect(document.body.querySelector('[data-slot="select-content"]')).not.toBeNull()
    w.unmount()
  })

  it('is wired by Field: id, aria-describedby, aria-invalid and aria-required on the trigger', () => {
    const w = mount(Field, {
      props: { id: 'f', label: 'Role', description: 'Help', error: 'Required', required: true },
      slots: {
        default: () => h(Select, null, () => [
          h(FieldControl, () => h(SelectTrigger, null, () => h(SelectValue, { placeholder: 'Pick' }))),
          h(SelectContent, () => h(SelectItem, { value: 'a' }, () => 'Alpha')),
        ]),
      },
    })
    const trigger = w.get('button[role="combobox"]')
    expect(trigger.attributes('id')).toBe('f')
    expect(trigger.attributes('aria-describedby')).toBe('f-description f-error')
    expect(trigger.attributes('aria-invalid')).toBe('true')
    expect(trigger.attributes('aria-required')).toBe('true')
    expect(w.get('label').attributes('for')).toBe('f')
    w.unmount()
  })
})
