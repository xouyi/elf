import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createElfTheme } from '../../composables/use-elf-theme'
import { ThemeSwitcher } from '.'

function render(props: Record<string, unknown> = {}, config?: Parameters<typeof createElfTheme>[0]) {
  return mount(ThemeSwitcher, { props, attachTo: document.body, global: { plugins: config ? [createElfTheme(config)] : [] } })
}

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  document.body.innerHTML = ''
})

describe('ThemeSwitcher', () => {
  it('renders a select trigger named Theme by default, showing the active theme', async () => {
    const w = render()
    await flushPromises()
    const trigger = w.get('[data-slot="theme-switcher"]')
    expect(trigger.attributes('role')).toBe('combobox')
    expect(trigger.attributes('aria-label')).toBe('Theme')
    expect(trigger.text()).toContain('Elf')
    w.unmount()
  })

  it('renders a radiogroup of buttons with the active theme checked', () => {
    const w = render({ variant: 'buttons' })
    const group = w.get('[role="radiogroup"]')
    expect(group.attributes('aria-label')).toBe('Theme')
    const radios = w.findAll('[role="radio"]')
    expect(radios.map(r => r.text())).toEqual(['Elf', 'Nova', 'Elfwood'])
    expect(radios.map(r => r.attributes('aria-checked'))).toEqual(['true', 'false', 'false'])
    w.unmount()
  })

  it('changes the theme and data-theme when a button is clicked', async () => {
    const w = render({ variant: 'buttons' })
    await w.findAll('[role="radio"]')[1]!.trigger('click')
    expect(document.documentElement.dataset.theme).toBe('nova')
    expect(w.findAll('[role="radio"]')[1]!.attributes('aria-checked')).toBe('true')
    w.unmount()
  })

  it('uses labels and a custom accessible name', () => {
    const w = render({ variant: 'buttons', label: 'Color scheme', labels: { elf: 'Violet' } })
    expect(w.get('[role="radiogroup"]').attributes('aria-label')).toBe('Color scheme')
    expect(w.findAll('[role="radio"]').map(r => r.text())).toEqual(['Violet', 'Nova', 'Elfwood'])
    w.unmount()
  })

  it('toggle: one button that cycles the themes and names the current one', async () => {
    const w = render({ variant: 'toggle' })
    const button = w.get('button')
    expect(button.attributes('aria-label')).toBe('Theme: Elf')
    expect(button.attributes('title')).toContain('Switch to Nova')
    await button.trigger('click')
    expect(document.documentElement.dataset.theme).toBe('nova')
    expect(button.attributes('aria-label')).toBe('Theme: Nova')
    w.unmount()
  })

  it('works with custom themes from createElfTheme()', async () => {
    const w = render({ variant: 'buttons' }, { themes: ['ocean', 'forest'], defaultTheme: 'ocean', persist: false })
    expect(w.findAll('[role="radio"]').map(r => r.text())).toEqual(['Ocean', 'Forest'])
    await w.findAll('[role="radio"]')[1]!.trigger('click')
    expect(document.documentElement.dataset.theme).toBe('forest')
    w.unmount()
  })

  it('offers only the themes of the themes prop', () => {
    const w = render({ variant: 'buttons', themes: ['elf', 'elfwood'] })
    expect(w.findAll('[role="radio"]').map(r => r.text())).toEqual(['Elf', 'Elfwood'])
    w.unmount()
  })

  it('passes class and attributes to the control', () => {
    const w = render({ variant: 'toggle', class: 'extra', id: 'switcher' })
    expect(w.get('button').classes()).toContain('extra')
    expect(w.get('button').attributes('id')).toBe('switcher')
    w.unmount()
  })
})
