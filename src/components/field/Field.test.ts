import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from '.'

function mountField(props: Record<string, unknown> = {}, control = () => h(FieldControl, () => h(Input))) {
  return mount(Field, { props: { id: 'f', ...props }, slots: { default: control }, attachTo: document.body })
}

describe('Field', () => {
  it('renders the label bound to the control with matching ids', () => {
    const w = mountField({ label: 'Email' })
    const label = w.get('label')
    expect(label.text()).toBe('Email')
    expect(label.attributes('for')).toBe('f')
    expect(label.attributes('id')).toBe('f-label')
    expect(w.get('input').attributes('id')).toBe('f')
    expect(w.attributes('data-slot')).toBe('field')
    w.unmount()
  })

  it('generates an id when none is given', () => {
    const w = mount(Field, { props: { label: 'Name' }, slots: { default: () => h(FieldControl, () => h(Input)) } })
    const id = w.get('input').attributes('id')
    expect(id).toBeTruthy()
    expect(w.get('label').attributes('for')).toBe(id)
  })

  it('references the description from the control', () => {
    const w = mountField({ description: 'Helper text' })
    const description = w.get('[data-slot="field-description"]')
    expect(description.text()).toBe('Helper text')
    expect(description.attributes('id')).toBe('f-description')
    expect(w.get('input').attributes('aria-describedby')).toBe('f-description')
    expect(w.get('input').attributes('aria-invalid')).toBeUndefined()
    w.unmount()
  })

  it('marks the control invalid and references the alert when there is an error', () => {
    const w = mountField({ description: 'Helper', error: 'Too short' })
    const error = w.get('[data-slot="field-error"]')
    expect(error.attributes('role')).toBe('alert')
    expect(error.attributes('id')).toBe('f-error')
    expect(error.text()).toBe('Too short')
    expect(w.get('input').attributes('aria-invalid')).toBe('true')
    expect(w.get('input').attributes('aria-describedby')).toBe('f-description f-error')
    expect(w.attributes('data-invalid')).toBe('true')
    w.unmount()
  })

  it('is invalid without a message when invalid is set', () => {
    const w = mountField({ invalid: true })
    expect(w.get('input').attributes('aria-invalid')).toBe('true')
    expect(w.find('[data-slot="field-error"]').exists()).toBe(false)
    expect(w.get('input').attributes('aria-describedby')).toBeUndefined()
    w.unmount()
  })

  it('adds and removes the error reference as the message changes', async () => {
    const w = mountField({ error: 'Bad' })
    expect(w.get('input').attributes('aria-describedby')).toBe('f-error')
    await w.setProps({ error: '' })
    expect(w.find('[data-slot="field-error"]').exists()).toBe(false)
    expect(w.get('input').attributes('aria-describedby')).toBeUndefined()
    expect(w.get('input').attributes('aria-invalid')).toBeUndefined()
    w.unmount()
  })

  it('marks required fields with a hidden asterisk and aria-required', () => {
    const w = mountField({ label: 'Name', required: true })
    expect(w.get('input').attributes('aria-required')).toBe('true')
    const star = w.get('label span')
    expect(star.attributes('aria-hidden')).toBe('true')
    expect(star.text()).toBe('*')
    w.unmount()
  })

  it('disables the control and flags the group so the label dims', () => {
    const w = mountField({ label: 'Name', disabled: true })
    expect(w.get('input').attributes('disabled')).toBeDefined()
    expect(w.attributes('data-disabled')).toBe('true')
    expect(w.get('label').classes()).toContain('group-data-[disabled=true]:opacity-50')
    w.unmount()
  })

  it('supports the horizontal orientation', () => {
    const w = mountField({ orientation: 'horizontal' })
    expect(w.attributes('data-orientation')).toBe('horizontal')
    expect(w.classes()).toContain('sm:flex-row')
    w.unmount()
  })

  it('works with a textarea', () => {
    const w = mountField({ error: 'Required' }, () => h(FieldControl, () => h(Textarea)))
    const area = w.get('textarea')
    expect(area.attributes('id')).toBe('f')
    expect(area.attributes('aria-invalid')).toBe('true')
    expect(area.attributes('aria-describedby')).toBe('f-error')
    w.unmount()
  })

  it('wires parts rendered by hand through the context', async () => {
    const w = mount(Field, {
      props: { id: 'm' },
      slots: {
        default: () => [
          h(FieldLabel, () => 'Name'),
          h(FieldControl, () => h(Input)),
          h(FieldDescription, () => 'Hint'),
          h(FieldError, () => 'Oops'),
        ],
      },
      attachTo: document.body,
    })
    await w.vm.$nextTick()
    const input = w.get('input')
    expect(w.get('label').attributes('for')).toBe('m')
    expect(input.attributes('aria-describedby')).toBe('m-description m-error')
    expect(input.attributes('aria-invalid')).toBe('true')
    w.unmount()
  })

  it('does not overwrite attributes of a control outside a field', () => {
    const w = mount(FieldControl, { slots: { default: () => h(Input, { 'id': 'own', 'aria-describedby': 'x' }) } })
    expect(w.attributes('id')).toBe('own')
    expect(w.attributes('aria-describedby')).toBe('x')
  })

  it('renders parts on their own without a field', () => {
    expect(mount(FieldLabel, { slots: { default: 'Solo' } }).element.tagName).toBe('LABEL')
    expect(mount(FieldDescription, { slots: { default: 'Hint' } }).attributes('id')).toBeUndefined()
    expect(mount(FieldError, { slots: { default: 'Oops' } }).attributes('role')).toBe('alert')
  })

  it('merges custom classes', () => {
    const w = mountField({ class: 'max-w-xs' })
    expect(w.classes()).toContain('max-w-xs')
    w.unmount()
  })
})
