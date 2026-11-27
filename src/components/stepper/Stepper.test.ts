import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '.'

const Harness = {
  components: { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger },
  props: {
    linear: { type: Boolean, default: true },
    defaultValue: { type: Number, default: 1 },
    orientation: { type: String, default: 'horizontal' },
    label: { type: String, default: undefined },
  },
  template: `
    <Stepper :linear="linear" :default-value="defaultValue" :orientation="orientation" :aria-label="label">
      <StepperItem :step="1">
        <StepperTrigger><StepperIndicator /><StepperTitle>One</StepperTitle><StepperDescription>First</StepperDescription></StepperTrigger>
        <StepperSeparator />
      </StepperItem>
      <StepperItem :step="2">
        <StepperTrigger><StepperIndicator /><StepperTitle>Two</StepperTitle></StepperTrigger>
        <StepperSeparator />
      </StepperItem>
      <StepperItem :step="3" disabled>
        <StepperTrigger><StepperIndicator /><StepperTitle>Three</StepperTitle></StepperTrigger>
      </StepperItem>
    </Stepper>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => {
  wrapper?.unmount()
})

const triggers = () => wrapper!.findAll('[data-slot="stepper-trigger"]')
const states = () => wrapper!.findAll('[data-slot="stepper-item"]').map(i => i.attributes('data-state'))

describe('Stepper', () => {
  it('renders a labelled group with a status announcement', async () => {
    wrapper = mount(Harness, { props: { label: 'Wizard' } })
    await nextTick()
    const root = wrapper.get('[data-slot="stepper"]')
    expect(root.attributes('role')).toBe('group')
    expect(root.attributes('aria-label')).toBe('Wizard')
    expect(root.get('[role="status"]').text()).toBe('Step 1 of 3')
  })

  it('marks the active item with aria-current and derives completed and inactive states', () => {
    wrapper = mount(Harness, { props: { defaultValue: 2 } })
    expect(states()).toEqual(['completed', 'active', 'inactive'])
    const items = wrapper.findAll('[data-slot="stepper-item"]')
    expect(items.map(i => i.attributes('aria-current'))).toEqual([undefined, 'true', undefined])
  })

  it('names each trigger by its title and describes it by its description', () => {
    wrapper = mount(Harness, { attachTo: document.body })
    const first = triggers()[0]!
    const title = wrapper.get('[data-slot="stepper-title"]')
    expect(first.attributes('aria-labelledby')).toBe(title.attributes('id'))
    expect(first.attributes('aria-describedby')).toBe(wrapper.get('[data-slot="stepper-description"]').attributes('id'))
    expect(first.attributes('type')).toBe('button')
  })

  it('linear: allows only the next step, not further ahead', async () => {
    wrapper = mount(Harness)
    expect(triggers()[2]!.attributes('disabled')).toBeDefined()
    await triggers()[1]!.trigger('mousedown')
    expect(states()).toEqual(['completed', 'active', 'inactive'])
  })

  it('shows a check icon for completed steps and the number (as generated content, so the accessible name stays the title) otherwise', () => {
    wrapper = mount(Harness, { props: { defaultValue: 2 } })
    const indicators = wrapper.findAll('[data-slot="stepper-indicator"]')
    expect(indicators[0]!.find('svg').exists()).toBe(true)
    expect(indicators[1]!.attributes('data-step')).toBe('2')
    expect(indicators[2]!.attributes('data-step')).toBe('3')
    expect(indicators.map(i => i.text())).toEqual(['', '', ''])
    expect(indicators.every(i => i.attributes('aria-hidden') === 'true')).toBe(true)
  })

  it('non-linear: any enabled step can be chosen, disabled ones cannot', async () => {
    wrapper = mount(Harness, { props: { linear: false } })
    expect(triggers()[2]!.attributes('disabled')).toBeDefined()
    await triggers()[1]!.trigger('mousedown')
    expect(states()[1]).toBe('active')
  })

  it('exposes the orientation on the parts', () => {
    wrapper = mount(Harness, { props: { orientation: 'vertical' } })
    expect(wrapper.get('[data-slot="stepper"]').attributes('data-orientation')).toBe('vertical')
    expect(wrapper.get('[data-slot="stepper-separator"]').attributes('data-orientation')).toBe('vertical')
  })
})
