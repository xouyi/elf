import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '.'

const Harness = {
  components: { Accordion, AccordionContent, AccordionItem, AccordionTrigger },
  props: { type: { type: String, default: 'single' }, collapsible: Boolean, defaultValue: { type: [String, Array], default: undefined } },
  template: `
    <Accordion :type="type" :collapsible="collapsible" :default-value="defaultValue">
      <AccordionItem value="a"><AccordionTrigger>A</AccordionTrigger><AccordionContent>Alpha</AccordionContent></AccordionItem>
      <AccordionItem value="b"><AccordionTrigger>B</AccordionTrigger><AccordionContent>Beta</AccordionContent></AccordionItem>
      <AccordionItem value="c" disabled><AccordionTrigger>C</AccordionTrigger><AccordionContent>Gamma</AccordionContent></AccordionItem>
    </Accordion>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
})

const triggers = () => wrapper!.findAll('[data-slot="accordion-trigger"]')
const expanded = () => triggers().map(t => t.attributes('aria-expanded'))

describe('Accordion', () => {
  it('renders a heading per trigger and everything collapsed by default', () => {
    wrapper = mount(Harness)
    expect(wrapper.findAll('h3 [data-slot="accordion-trigger"]')).toHaveLength(3)
    expect(expanded()).toEqual(['false', 'false', 'false'])
  })

  it('single: opening another item closes the first; the open one cannot be closed unless collapsible', async () => {
    wrapper = mount(Harness, { props: { defaultValue: 'a' } })
    expect(expanded()).toEqual(['true', 'false', 'false'])
    await triggers()[1]!.trigger('click')
    expect(expanded()).toEqual(['false', 'true', 'false'])
    await triggers()[1]!.trigger('click')
    expect(expanded()).toEqual(['false', 'true', 'false'])
  })

  it('single collapsible: the open item can be closed', async () => {
    wrapper = mount(Harness, { props: { defaultValue: 'a', collapsible: true } })
    await triggers()[0]!.trigger('click')
    expect(expanded()).toEqual(['false', 'false', 'false'])
  })

  it('multiple: several items stay open', async () => {
    wrapper = mount(Harness, { props: { type: 'multiple', defaultValue: ['a'] } })
    await triggers()[1]!.trigger('click')
    expect(expanded()).toEqual(['true', 'true', 'false'])
  })

  it('disabled items do not open', async () => {
    wrapper = mount(Harness)
    expect(triggers()[2]!.attributes('disabled')).toBeDefined()
    await triggers()[2]!.trigger('click')
    expect(expanded()[2]).toBe('false')
  })

  it('names the region by its trigger', async () => {
    wrapper = mount(Harness, { props: { defaultValue: 'a' }, attachTo: document.body })
    const content = wrapper.get('[data-slot="accordion-content"]')
    expect(content.attributes('role')).toBe('region')
    expect(content.attributes('aria-labelledby')).toBe(triggers()[0]!.attributes('id'))
  })
})
