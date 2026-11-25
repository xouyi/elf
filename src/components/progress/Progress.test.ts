import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Progress, progressVariants } from '.'

describe('Progress', () => {
  it('renders a progressbar with value, min and max and data-slots', () => {
    const w = mount(Progress, { props: { modelValue: 40, label: 'Upload' } })
    expect(w.attributes('role')).toBe('progressbar')
    expect(w.attributes('data-slot')).toBe('progress')
    expect(w.attributes('aria-valuenow')).toBe('40')
    expect(w.attributes('aria-valuemin')).toBe('0')
    expect(w.attributes('aria-valuemax')).toBe('100')
    expect(w.attributes('data-state')).toBe('loading')
    expect(w.get('[data-slot="progress-indicator"]').attributes('style')).toContain('width: 40%')
  })

  it('names the bar from label, aria-label or the default percentage', () => {
    expect(mount(Progress, { props: { modelValue: 40, label: 'Upload' } }).attributes('aria-label')).toBe('Upload')
    expect(mount(Progress, { props: { modelValue: 40 }, attrs: { 'aria-label': 'Sync' } }).attributes('aria-label')).toBe('Sync')
    expect(mount(Progress, { props: { modelValue: 40 } }).attributes('aria-label')).toBe('40%')
  })

  it('leaves the name to aria-labelledby when there is a visible label', () => {
    const w = mount(Progress, { props: { modelValue: 40 }, attrs: { 'aria-labelledby': 'title' } })
    expect(w.attributes('aria-labelledby')).toBe('title')
    expect(w.attributes('aria-label')).toBeUndefined()
  })

  it('is indeterminate without a value: no aria-valuenow, no width, animated', () => {
    const w = mount(Progress, { props: { modelValue: null, label: 'Syncing' } })
    expect(w.attributes('data-state')).toBe('indeterminate')
    expect(w.attributes('aria-valuenow')).toBeUndefined()
    const indicator = w.get('[data-slot="progress-indicator"]')
    expect(indicator.attributes('style') ?? '').not.toContain('width')
    expect(indicator.classes().join(' ')).toContain('elf-progress-indeterminate')
  })

  it('is complete at the maximum and scales a custom max', () => {
    expect(mount(Progress, { props: { modelValue: 100, label: 'x' } }).attributes('data-state')).toBe('complete')
    const w = mount(Progress, { props: { modelValue: 5, max: 20, label: 'x' } })
    expect(w.attributes('aria-valuemax')).toBe('20')
    expect(w.get('[data-slot="progress-indicator"]').attributes('style')).toContain('width: 25%')
  })

  it('updates the value and clamps the drawn width', async () => {
    const w = mount(Progress, { props: { modelValue: 10, label: 'x' } })
    await w.setProps({ modelValue: 75 })
    expect(w.attributes('aria-valuenow')).toBe('75')
    expect(w.get('[data-slot="progress-indicator"]').attributes('style')).toContain('width: 75%')
  })

  it('passes aria-valuetext through getValueText', () => {
    const w = mount(Progress, { props: { modelValue: 7, max: 12, label: 'x', getValueText: (v: number | null | undefined, m: number) => `${v} of ${m}` } })
    expect(w.attributes('aria-valuetext')).toBe('7 of 12')
  })

  it('has sizes and merges track and indicator classes', () => {
    expect(mount(Progress, { props: { modelValue: 1, label: 'x' } }).classes()).toContain('h-2')
    expect(mount(Progress, { props: { modelValue: 1, label: 'x', size: 'lg' } }).classes()).toContain('h-3')
    expect(progressVariants({ size: 'sm' })).toContain('h-1.5')
    const w = mount(Progress, { props: { modelValue: 1, label: 'x', class: 'w-40', indicatorClass: 'bg-success' } })
    expect(w.classes()).toContain('w-40')
    expect(w.get('[data-slot="progress-indicator"]').classes()).toContain('bg-success')
    expect(w.get('[data-slot="progress-indicator"]').classes()).not.toContain('bg-primary')
  })
})
