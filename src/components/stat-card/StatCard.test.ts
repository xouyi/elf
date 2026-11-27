import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { StatCard, StatCardLink } from '.'

describe('StatCard', () => {
  it('renders label, value and hint inside a group named by the label', () => {
    const w = mount(StatCard, { props: { label: 'Members', value: 48, hint: 'this month' } })
    expect(w.attributes('data-slot')).toBe('stat-card')
    expect(w.attributes('role')).toBe('group')
    const label = w.find('[data-slot="stat-card-label"]')
    expect(w.attributes('aria-labelledby')).toBe(label.attributes('id'))
    expect(label.text()).toBe('Members')
    expect(w.find('[data-slot="stat-card-value"]').text()).toBe('48')
    expect(w.find('[data-slot="stat-card-hint"]').text()).toBe('this month')
    expect(w.attributes('aria-busy')).toBeUndefined()
  })

  it('shows the trend with a direction and an accessible description', () => {
    const w = mount(StatCard, { props: { label: 'L', value: 1, trend: '+12%', trendDirection: 'up', trendLabel: 'up 12 percent' } })
    const trend = w.find('[data-slot="stat-card-trend"]')
    expect(trend.attributes('data-direction')).toBe('up')
    expect(trend.text()).toContain('up 12 percent')
    expect(trend.find('[aria-hidden="true"]:not(svg)').text()).toBe('+12%')
  })

  it('applies the tone', () => {
    const w = mount(StatCard, { props: { label: 'L', value: 1, tone: 'destructive' } })
    expect(w.attributes('data-tone')).toBe('destructive')
    expect(w.classes()).toContain('border-destructive/50')
  })

  it('replaces the value with skeletons and marks the card busy while loading', () => {
    const w = mount(StatCard, { props: { label: 'L', value: 5, hint: 'h', loading: true, loadingLabel: 'Loading members' } })
    expect(w.attributes('aria-busy')).toBe('true')
    expect(w.find('[data-slot="stat-card-value"]').exists()).toBe(false)
    expect(w.findAll('[data-slot="skeleton"]').length).toBe(2)
    expect(w.find('[role="status"]').text()).toBe('Loading members')
  })

  it('supports label, default and hint slots', () => {
    const w = mount(StatCard, { slots: { label: 'Custom label', default: '<b>9</b>', hint: 'custom hint' } })
    expect(w.find('[data-slot="stat-card-label"]').text()).toBe('Custom label')
    expect(w.find('[data-slot="stat-card-value"] b').text()).toBe('9')
    expect(w.find('[data-slot="stat-card-hint"]').text()).toBe('custom hint')
  })

  it('stretches a link over the whole card and supports asChild', () => {
    const w = mount(StatCard, {
      props: { value: 1 },
      slots: { label: '<StatCardLink href="/x">Open</StatCardLink>' },
      global: { components: { StatCardLink } },
    })
    const link = w.find('a')
    expect(link.attributes('data-slot')).toBe('stat-card-link')
    expect(link.attributes('href')).toBe('/x')
    expect(link.classes()).toContain('after:absolute')
    const child = mount(StatCardLink, { props: { asChild: true }, slots: { default: '<button type="button">Go</button>' } })
    expect(child.element.tagName).toBe('BUTTON')
  })
})
