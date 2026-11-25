import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Alert, AlertDescription, AlertTitle, alertVariants } from '.'

describe('Alert', () => {
  it('renders data-slots, the default variant, an icon, the title and the description', () => {
    const w = mount(Alert, { slots: { default: () => [h(AlertTitle, () => 'Title'), h(AlertDescription, () => 'Body')] } })
    expect(w.attributes('data-slot')).toBe('alert')
    expect(w.attributes('data-variant')).toBe('default')
    expect(w.find('[data-slot="alert-icon"] svg').exists()).toBe(true)
    expect(w.get('[data-slot="alert-title"]').text()).toBe('Title')
    expect(w.get('[data-slot="alert-description"]').text()).toBe('Body')
  })

  it('defaults the role to status, and to alert for destructive', () => {
    expect(mount(Alert).attributes('role')).toBe('status')
    expect(mount(Alert, { props: { variant: 'success' } }).attributes('role')).toBe('status')
    expect(mount(Alert, { props: { variant: 'warning' } }).attributes('role')).toBe('status')
    expect(mount(Alert, { props: { variant: 'destructive' } }).attributes('role')).toBe('alert')
  })

  it('lets the role be set explicitly or removed', () => {
    expect(mount(Alert, { props: { role: 'alert' } }).attributes('role')).toBe('alert')
    expect(mount(Alert, { props: { variant: 'destructive', role: 'status' } }).attributes('role')).toBe('status')
    expect(mount(Alert, { props: { role: 'none' } }).attributes('role')).toBeUndefined()
  })

  it('uses a different icon per variant', () => {
    const icons = (['default', 'destructive', 'success', 'warning'] as const).map(variant => mount(Alert, { props: { variant } }).get('svg').html())
    expect(new Set(icons).size).toBe(4)
  })

  it('hides the icon from assistive technology and can remove it', () => {
    expect(mount(Alert).get('[data-slot="alert-icon"]').attributes('aria-hidden')).toBe('true')
    expect(mount(Alert, { props: { showIcon: false } }).find('[data-slot="alert-icon"]').exists()).toBe(false)
  })

  it('renders a custom icon slot instead of the default icon', () => {
    const w = mount(Alert, { slots: { icon: () => h('svg', { id: 'mine' }) } })
    expect(w.find('#mine').exists()).toBe(true)
    expect(w.findAll('svg')).toHaveLength(1)
  })

  it('exposes variant classes and merges custom classes', () => {
    expect(alertVariants({ variant: 'destructive' })).toContain('border-destructive/50')
    expect(alertVariants({ variant: 'warning' })).toContain('border-warning/40')
    const w = mount(Alert, { props: { class: 'max-w-sm' }, attrs: { id: 'a' } })
    expect(w.classes()).toContain('max-w-sm')
    expect(w.attributes('id')).toBe('a')
  })
})
