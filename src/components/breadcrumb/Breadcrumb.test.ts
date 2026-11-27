import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '.'

const Harness = {
  components: { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator },
  props: { label: { type: String, default: undefined } },
  template: `
    <Breadcrumb :aria-label="label">
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => wrapper?.unmount())

describe('Breadcrumb', () => {
  it('renders a labelled navigation landmark with an ordered list', () => {
    wrapper = mount(Harness)
    const nav = wrapper.get('nav')
    expect(nav.attributes('aria-label')).toBe('Breadcrumb')
    expect(nav.attributes('data-slot')).toBe('breadcrumb')
    expect(wrapper.get('ol').attributes('data-slot')).toBe('breadcrumb-list')
    expect(wrapper.findAll('li[data-slot="breadcrumb-item"]')).toHaveLength(3)
  })

  it('accepts a custom accessible name', () => {
    wrapper = mount(Harness, { props: { label: 'Konum' } })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Konum')
  })

  it('marks the current page and hides separators from assistive technology', () => {
    wrapper = mount(Harness)
    const page = wrapper.get('[data-slot="breadcrumb-page"]')
    expect(page.attributes('aria-current')).toBe('page')
    expect(page.attributes('aria-disabled')).toBe('true')
    const separators = wrapper.findAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(2)
    for (const s of separators) {
      expect(s.attributes('role')).toBe('presentation')
      expect(s.attributes('aria-hidden')).toBe('true')
    }
  })

  it('renders links as anchors and supports asChild', () => {
    wrapper = mount({
      components: { BreadcrumbLink },
      template: `<div><BreadcrumbLink href="/a" class="x">A</BreadcrumbLink><BreadcrumbLink as-child><button>B</button></BreadcrumbLink></div>`,
    })
    const [a, b] = wrapper.findAll('[data-slot="breadcrumb-link"]')
    expect(a!.element.tagName).toBe('A')
    expect(a!.classes()).toContain('x')
    expect(b!.element.tagName).toBe('BUTTON')
  })

  it('gives the ellipsis a screen reader label', () => {
    wrapper = mount(Harness)
    expect(wrapper.get('[data-slot="breadcrumb-ellipsis"]').text()).toBe('More')
  })
})
