import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function popover(rootProps: Record<string, unknown> = {}, contentProps: Record<string, unknown> = {}) {
  return mount({
    render: () => h(Popover, rootProps, () => [
      h(PopoverTrigger, null, () => 'Open'),
      h(PopoverContent, contentProps, () => [h('p', 'Body'), h(PopoverClose, null, () => 'Done')]),
    ]),
  }, { attachTo: document.body })
}

describe('Popover', () => {
  it('is closed initially and the trigger exposes aria attributes', () => {
    wrapper = popover()
    const trigger = wrapper.get('[data-slot="popover-trigger"]')
    expect(trigger.element.tagName).toBe('BUTTON')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.body.querySelector('[data-slot="popover-content"]')).toBeNull()
  })

  it('renders token-styled content in a portal when open', async () => {
    wrapper = popover({ defaultOpen: true }, { class: 'w-40' })
    await nextTick()
    const content = document.body.querySelector('[data-slot="popover-content"]')!
    expect(content.getAttribute('role')).toBe('dialog')
    expect(content.className).toContain('bg-popover')
    expect(content.classList.contains('w-40')).toBe(true)
    expect(wrapper.get('button').attributes('aria-controls')).toBe(content.id)
  })

  it('opens on click and the close part closes it', async () => {
    wrapper = popover()
    await wrapper.get('button').trigger('click')
    await nextTick()
    expect(document.body.querySelector('[data-slot="popover-content"]')).not.toBeNull()
    document.body.querySelector<HTMLElement>('[data-slot="popover-close"]')!.click()
    await nextTick()
    await new Promise(r => setTimeout(r, 50))
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
  })

  it('emits update:open', async () => {
    const updates: boolean[] = []
    wrapper = popover({ 'onUpdate:open': (v: boolean) => updates.push(v) })
    await wrapper.get('button').trigger('click')
    expect(updates).toEqual([true])
  })
})
