import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const Harness = {
  components: { Tabs, TabsContent, TabsList, TabsTrigger },
  template: `
    <Tabs default-value="a">
      <TabsList aria-label="Sections">
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
        <TabsTrigger value="c">C</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Panel A</TabsContent>
      <TabsContent value="b">Panel B</TabsContent>
      <TabsContent value="c">Panel C</TabsContent>
    </Tabs>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

describe('Tabs', () => {
  it('exposes tab roles and selects the default value', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await flushPromises()
    expect(wrapper.get('[role="tablist"]').attributes('aria-label')).toBe('Sections')
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs).toHaveLength(3)
    expect(tabs[0]!.attributes('aria-selected')).toBe('true')
    expect(tabs[1]!.attributes('aria-selected')).toBe('false')
    expect(tabs[0]!.attributes('aria-controls')).toBe(wrapper.get('[role="tabpanel"][data-state="active"]').attributes('id'))
    expect(wrapper.get('[role="tabpanel"][data-state="active"]').text()).toBe('Panel A')
  })

  it('switches panel on click', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await flushPromises()
    await wrapper.findAll('[role="tab"]')[1]!.trigger('mousedown', { button: 0, ctrlKey: false })
    await flushPromises()
    expect(wrapper.get('[role="tabpanel"][data-state="active"]').text()).toBe('Panel B')
  })

  it('moves focus and selection with arrow keys, Home and End', async () => {
    wrapper = mount(Harness, { attachTo: document.body })
    await flushPromises()
    const tabs = () => wrapper!.findAll('[role="tab"]')
    ;(tabs()[0]!.element as HTMLElement).focus()
    await tabs()[0]!.trigger('keydown', { key: 'ArrowRight' })
    await flushPromises()
    expect(document.activeElement).toBe(tabs()[1]!.element)
    expect(tabs()[1]!.attributes('aria-selected')).toBe('true')
    await tabs()[1]!.trigger('keydown', { key: 'End' })
    await flushPromises()
    expect(document.activeElement).toBe(tabs()[2]!.element)
    await tabs()[2]!.trigger('keydown', { key: 'Home' })
    await flushPromises()
    expect(document.activeElement).toBe(tabs()[0]!.element)
    expect(wrapper.get('[role="tabpanel"][data-state="active"]').text()).toBe('Panel A')
  })
})
