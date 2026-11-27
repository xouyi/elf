import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function nav(rootProps: Record<string, unknown> = {}) {
  return mount({
    render: () => h(NavigationMenu, rootProps, () => h(NavigationMenuList, null, () => [
      h(NavigationMenuItem, { value: 'a' }, () => [
        h(NavigationMenuTrigger, null, () => 'Learn'),
        h(NavigationMenuContent, null, () => h(NavigationMenuLink, { href: '#x' }, () => 'Guide')),
      ]),
      h(NavigationMenuItem, null, () => h(NavigationMenuLink, { href: '#y', variant: 'trigger', active: true }, () => 'Docs')),
    ])),
  }, { attachTo: document.body })
}

describe('NavigationMenu', () => {
  it('renders a nav landmark with a list, data-slot parts and a collapsed trigger', async () => {
    wrapper = nav()
    await nextTick()
    const root = wrapper.get('[data-slot="navigation-menu"]')
    expect(root.element.tagName).toBe('NAV')
    expect(root.attributes('data-viewport')).toBe('true')
    expect(wrapper.get('[data-slot="navigation-menu-list"]').element.tagName).toBe('UL')
    const trigger = wrapper.get('[data-slot="navigation-menu-trigger"]')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(trigger.classes()).toContain('h-10')
  })

  it('shows the panel in the shared viewport by default and inside the item with viewport=false', async () => {
    wrapper = nav({ modelValue: 'a' })
    await new Promise(r => setTimeout(r, 30))
    const viewport = document.body.querySelector('[data-slot="navigation-menu-viewport"]')
    expect(viewport?.querySelector('[data-slot="navigation-menu-content"]')).not.toBeNull()
    wrapper.unmount()
    wrapper = nav({ modelValue: 'a', viewport: false })
    await new Promise(r => setTimeout(r, 30))
    expect(document.body.querySelector('[data-slot="navigation-menu-viewport"]')).toBeNull()
    expect(wrapper.get('[data-slot="navigation-menu"]').attributes('data-viewport')).toBe('false')
    expect(document.body.querySelector('[data-slot="navigation-menu-item"] [data-slot="navigation-menu-content"]')).not.toBeNull()
  })

  it('opens the panel for a controlled value and marks the link as the current page', async () => {
    wrapper = nav({ modelValue: 'a' })
    await new Promise(r => setTimeout(r, 30))
    expect(wrapper.get('[data-slot="navigation-menu-trigger"]').attributes('aria-expanded')).toBe('true')
    expect(document.body.querySelector('[data-slot="navigation-menu-content"]')).not.toBeNull()
    const current = wrapper.get('[aria-current="page"]')
    expect(current.attributes('data-slot')).toBe('navigation-menu-link')
    expect(current.attributes('data-variant')).toBe('trigger')
  })

  it('styles item links differently and merges custom classes', async () => {
    wrapper = mount({ render: () => h(NavigationMenu, { class: 'custom' }, () => h(NavigationMenuList, null, () => h(NavigationMenuItem, null, () => h(NavigationMenuLink, { href: '#', class: 'font-bold' }, () => 'Plain')))) }, { attachTo: document.body })
    await nextTick()
    expect(wrapper.get('[data-slot="navigation-menu"]').classes()).toContain('custom')
    const link = wrapper.get('[data-slot="navigation-menu-link"]')
    expect(link.attributes('data-variant')).toBe('item')
    expect(link.classes()).toContain('font-bold')
    expect(link.classes()).toContain('flex-col')
    expect(navigationMenuTriggerStyle()).toContain('h-10')
  })
})
