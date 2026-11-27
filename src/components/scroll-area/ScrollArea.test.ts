import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ScrollArea } from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

function area(props: Record<string, unknown> = {}) {
  return mount(ScrollArea, { props, slots: { default: () => h('p', 'Content') }, attachTo: document.body })
}

describe('ScrollArea', () => {
  it('renders the slot inside a focusable viewport with data-slot parts', () => {
    wrapper = area()
    expect(wrapper.attributes('data-slot')).toBe('scroll-area')
    const viewport = wrapper.get('[data-slot="scroll-area-viewport"]')
    expect(viewport.attributes('tabindex')).toBe('0')
    expect(viewport.text()).toBe('Content')
    expect(wrapper.classes()).toContain('overflow-hidden')
  })

  it('names the scrollable region only when a label is given', () => {
    wrapper = area({ label: 'Inventory' })
    const viewport = wrapper.get('[data-slot="scroll-area-viewport"]')
    expect(viewport.attributes('role')).toBe('region')
    expect(viewport.attributes('aria-label')).toBe('Inventory')
    wrapper.unmount()
    wrapper = area()
    expect(wrapper.get('[data-slot="scroll-area-viewport"]').attributes('role')).toBeUndefined()
  })

  it('merges class and viewportClass', () => {
    wrapper = area({ class: 'h-40', viewportClass: 'p-2' })
    expect(wrapper.classes()).toContain('h-40')
    expect(wrapper.get('[data-slot="scroll-area-viewport"]').classes()).toContain('p-2')
  })

  it('passes type and scrollHideDelay to the root', () => {
    wrapper = area({ type: 'always', scrollHideDelay: 100 })
    expect(wrapper.attributes('data-slot')).toBe('scroll-area')
    expect(wrapper.attributes('type')).toBeUndefined()
  })
})
