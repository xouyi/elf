import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function tooltip(rootProps: Record<string, unknown> = {}, contentProps: Record<string, unknown> = {}) {
  return h(Tooltip, rootProps, () => [
    h(TooltipTrigger, null, () => 'Trigger'),
    h(TooltipContent, contentProps, () => 'Hint'),
  ])
}

describe('Tooltip', () => {
  it('works without a provider and renders nothing while closed', () => {
    wrapper = mount({ render: () => tooltip() }, { attachTo: document.body })
    const trigger = wrapper.get('[data-slot="tooltip-trigger"]')
    expect(trigger.element.tagName).toBe('BUTTON')
    expect(trigger.attributes('data-state')).toBe('closed')
    expect(document.body.querySelector('[data-slot="tooltip-content"]')).toBeNull()
  })

  it('renders the content in a portal with role tooltip and links it to the trigger', async () => {
    wrapper = mount({ render: () => tooltip({ defaultOpen: true }) }, { attachTo: document.body })
    await nextTick()
    const content = document.body.querySelector('[data-slot="tooltip-content"]')
    expect(content).not.toBeNull()
    expect(content!.className).toContain('bg-popover')
    const role = document.body.querySelector('[role="tooltip"]')
    expect(role).not.toBeNull()
    expect(wrapper.get('button').attributes('aria-describedby')).toBe(role!.id)
  })

  it('merges a custom class on the content', async () => {
    wrapper = mount({ render: () => tooltip({ defaultOpen: true }, { class: 'w-40' }) }, { attachTo: document.body })
    await nextTick()
    expect(document.body.querySelector('[data-slot="tooltip-content"]')!.classList.contains('w-40')).toBe(true)
  })

  it('emits update:open(false) on Escape', async () => {
    const updates: boolean[] = []
    wrapper = mount({
      render: () => tooltip({ 'open': true, 'onUpdate:open': (v: boolean) => updates.push(v) }),
    }, { attachTo: document.body })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(updates).toEqual([false])
  })

  it('shares one provider between tooltips', () => {
    wrapper = mount({
      render: () => h(TooltipProvider, { delayDuration: 100 }, () => [tooltip(), tooltip()]),
    }, { attachTo: document.body })
    expect(wrapper.findAll('[data-slot="tooltip-trigger"]')).toHaveLength(2)
  })

  it('supports as-child on the trigger', () => {
    wrapper = mount({
      render: () => h(Tooltip, null, () => [
        h(TooltipTrigger, { asChild: true }, () => h('a', { href: '#x' }, 'Link')),
        h(TooltipContent, null, () => 'Hint'),
      ]),
    }, { attachTo: document.body })
    expect(wrapper.get('a').attributes('data-slot')).toBe('tooltip-trigger')
  })
})
