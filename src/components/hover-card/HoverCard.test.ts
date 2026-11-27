import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function card(rootProps: Record<string, unknown> = {}, contentProps: Record<string, unknown> = {}) {
  return mount({
    render: () => h(HoverCard, rootProps, () => [
      h(HoverCardTrigger, { href: '#x' }, () => 'Trigger'),
      h(HoverCardContent, contentProps, () => 'Card body'),
    ]),
  }, { attachTo: document.body })
}

describe('HoverCard', () => {
  it('renders the trigger as a link, closed by default', () => {
    wrapper = card()
    const trigger = wrapper.get('[data-slot="hover-card-trigger"]')
    expect(trigger.element.tagName).toBe('A')
    expect(trigger.attributes('data-state')).toBe('closed')
    expect(document.body.querySelector('[data-slot="hover-card-content"]')).toBeNull()
  })

  it('renders styled content in a portal when open and merges classes', async () => {
    wrapper = card({ defaultOpen: true }, { class: 'w-40' })
    await nextTick()
    const content = document.body.querySelector('[data-slot="hover-card-content"]')!
    expect(content.textContent).toContain('Card body')
    expect(content.className).toContain('bg-popover')
    expect(content.classList.contains('w-40')).toBe(true)
  })

  it('supports as-child on the trigger', () => {
    wrapper = mount({
      render: () => h(HoverCard, null, () => [
        h(HoverCardTrigger, { asChild: true }, () => h('span', { tabindex: 0 }, 'Span')),
        h(HoverCardContent, null, () => 'Body'),
      ]),
    }, { attachTo: document.body })
    expect(wrapper.get('span').attributes('data-slot')).toBe('hover-card-trigger')
  })

  it('opens on focus and emits update:open', async () => {
    const updates: boolean[] = []
    wrapper = card({ 'onUpdate:open': (v: boolean) => updates.push(v), 'openDelay': 0 })
    await wrapper.get('a').trigger('focus')
    await new Promise(r => setTimeout(r, 30))
    expect(updates).toContain(true)
  })
})
