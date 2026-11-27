import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants } from '.'

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const Single = {
  components: { ToggleGroup, ToggleGroupItem },
  props: { variant: { type: String, default: undefined }, joined: Boolean },
  template: `
    <ToggleGroup type="single" default-value="a" aria-label="Choice" :variant="variant" :joined="joined" size="sm">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b" variant="outline">B</ToggleGroupItem>
      <ToggleGroupItem value="c" disabled>C</ToggleGroupItem>
    </ToggleGroup>`,
}

describe('Toggle', () => {
  it('renders a button with aria-pressed, data attributes and default variants', () => {
    wrapper = mount(Toggle, { slots: { default: 'Bold' }, attrs: { 'aria-label': 'Bold' } })
    const button = wrapper.get('button')
    expect(button.attributes('data-slot')).toBe('toggle')
    expect(button.attributes('data-variant')).toBe('default')
    expect(button.attributes('data-size')).toBe('default')
    expect(button.attributes('aria-pressed')).toBe('false')
    expect(button.classes()).toContain('h-9')
  })

  it('toggles on click and emits update:modelValue', async () => {
    wrapper = mount(Toggle, { slots: { default: 'Bold' } })
    const button = wrapper.get('button')
    await button.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(button.attributes('aria-pressed')).toBe('true')
    expect(button.attributes('data-state')).toBe('on')
    await button.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
  })

  it('follows modelValue and does not toggle while disabled', async () => {
    wrapper = mount(Toggle, { props: { modelValue: true, disabled: true }, slots: { default: 'Bold' } })
    const button = wrapper.get('button')
    expect(button.attributes('aria-pressed')).toBe('true')
    await button.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('applies the outline variant, size and merges class last', () => {
    wrapper = mount(Toggle, { props: { variant: 'outline', size: 'lg', class: 'extra' } })
    const button = wrapper.get('button')
    expect(button.attributes('data-variant')).toBe('outline')
    expect(button.classes()).toEqual(expect.arrayContaining(['border', 'h-10', 'extra']))
    expect(toggleVariants({ size: 'sm' })).toContain('h-8')
  })
})

describe('ToggleGroup', () => {
  it('single: radiogroup of radios, passes the group size and per-item override', async () => {
    wrapper = mount(Single, { attachTo: document.body })
    await flushPromises()
    expect(wrapper.get('[data-slot="toggle-group"]').attributes('role')).toBe('group')
    const items = wrapper.findAll('[data-slot="toggle-group-item"]')
    expect(items).toHaveLength(3)
    expect(items[0]!.attributes('data-size')).toBe('sm')
    expect(items[0]!.attributes('data-variant')).toBe('default')
    expect(items[1]!.attributes('data-variant')).toBe('outline')
    expect(items[0]!.attributes('data-state')).toBe('on')
    expect(items[2]!.attributes('disabled')).toBeDefined()
  })

  it('single: pressing another item moves the selection', async () => {
    wrapper = mount(Single, { attachTo: document.body })
    await flushPromises()
    const items = () => wrapper!.findAll('[data-slot="toggle-group-item"]')
    await items()[1]!.trigger('click')
    expect(items()[0]!.attributes('data-state')).toBe('off')
    expect(items()[1]!.attributes('data-state')).toBe('on')
    const group = wrapper.findComponent(ToggleGroup)
    expect(group.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
  })

  it('multiple: items toggle independently and v-model is an array', async () => {
    const Host = {
      components: { ToggleGroup, ToggleGroupItem },
      template: `<ToggleGroup type="multiple" v-model="v" aria-label="Marks"><ToggleGroupItem value="a">A</ToggleGroupItem><ToggleGroupItem value="b">B</ToggleGroupItem></ToggleGroup>`,
      data: () => ({ v: ['a'] }),
    }
    wrapper = mount(Host, { attachTo: document.body })
    await flushPromises()
    const items = () => wrapper!.findAll('[data-slot="toggle-group-item"]')
    await items()[1]!.trigger('click')
    expect((wrapper.vm as unknown as { v: string[] }).v).toEqual(['a', 'b'])
    await items()[0]!.trigger('click')
    expect((wrapper.vm as unknown as { v: string[] }).v).toEqual(['b'])
    expect(items()[0]!.attributes('aria-pressed')).toBe('false')
  })

  it('joined: removes the gap and the inner radii', async () => {
    wrapper = mount(Single, { props: { joined: true, variant: 'outline' }, attachTo: document.body })
    await flushPromises()
    expect(wrapper.get('[data-slot="toggle-group"]').classes()).toContain('gap-0')
    expect(wrapper.findAll('[data-slot="toggle-group-item"]')[1]!.classes()).toEqual(expect.arrayContaining(['rounded-none', 'not-first:-ms-px']))
  })
})
