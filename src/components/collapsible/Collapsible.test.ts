import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '.'

const Harness = {
  components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
  props: { defaultOpen: Boolean, disabled: Boolean },
  template: `
    <Collapsible :default-open="defaultOpen" :disabled="disabled">
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Hidden text</CollapsibleContent>
    </Collapsible>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
})

describe('Collapsible', () => {
  it('is closed by default with aria-expanded=false and no content', () => {
    wrapper = mount(Harness)
    const trigger = wrapper.get('[data-slot="collapsible-trigger"]')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('[data-slot="collapsible-content"]').exists() ? wrapper.get('[data-slot="collapsible-content"]').isVisible() : false).toBe(false)
  })

  it('opens and closes from the trigger and links trigger and content with aria-controls', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    const trigger = wrapper.get('[data-slot="collapsible-trigger"]')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    const content = wrapper.get('[data-slot="collapsible-content"]')
    expect(content.text()).toBe('Hidden text')
    expect(trigger.attributes('aria-controls')).toBe(content.attributes('id'))
    expect(content.attributes('data-state')).toBe('open')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('can start open', () => {
    wrapper = mount(Harness, { props: { defaultOpen: true } })
    expect(wrapper.get('[data-slot="collapsible-trigger"]').attributes('aria-expanded')).toBe('true')
  })

  it('does not toggle when disabled', async () => {
    wrapper = mount(Harness, { props: { disabled: true } })
    const trigger = wrapper.get('[data-slot="collapsible-trigger"]')
    expect(trigger.attributes('disabled')).toBeDefined()
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('emits update:open', async () => {
    wrapper = mount(Harness)
    await wrapper.get('[data-slot="collapsible-trigger"]').trigger('click')
    expect(wrapper.getComponent(Collapsible).emitted('update:open')?.[0]).toEqual([true])
  })
})
