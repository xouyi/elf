import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrev, SimplePagination } from '.'

const Harness = {
  components: { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrev },
  props: { page: { type: Number, default: 1 }, total: { type: Number, default: 100 }, disabled: Boolean, ariaLabel: { type: String, default: undefined }, siblingCount: { type: Number, default: undefined }, showEdges: { type: Boolean, default: undefined } },
  emits: ['update:page'],
  template: `
    <Pagination :page="page" :total="total" :items-per-page="10" :disabled="disabled" :aria-label="ariaLabel" :sibling-count="siblingCount" :show-edges="showEdges" @update:page="$emit('update:page', $event)">
      <PaginationContent v-slot="{ items }">
        <PaginationFirst /><PaginationPrev />
        <template v-for="(item, i) in items" :key="i">
          <PaginationItem v-if="item.type === 'page'" :value="item.value" />
          <PaginationEllipsis v-else />
        </template>
        <PaginationNext /><PaginationLast />
      </PaginationContent>
    </Pagination>`,
}

let wrapper: ReturnType<typeof mount> | undefined
afterEach(() => wrapper?.unmount())

const pageButtons = (w: ReturnType<typeof mount>) => w.findAll('[data-slot="pagination-link"]')

describe('Pagination', () => {
  it('renders a labelled navigation with a list of buttons', () => {
    wrapper = mount(Harness)
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Pagination')
    expect(wrapper.get('ul').attributes('data-slot')).toBe('pagination-content')
    expect(wrapper.findAll('li').length).toBeGreaterThan(5)
    for (const b of wrapper.findAll('button')) expect(b.attributes('type')).toBe('button')
  })

  it('accepts a custom accessible name', () => {
    wrapper = mount(Harness, { props: { ariaLabel: 'Sayfalar' } })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Sayfalar')
  })

  it('marks the current page with aria-current and names every page button', () => {
    wrapper = mount(Harness, { props: { page: 3 } })
    const current = wrapper.findAll('[aria-current="page"]')
    expect(current).toHaveLength(1)
    expect(current[0]!.text()).toBe('3')
    expect(current[0]!.attributes('aria-label')).toBe('Page 3')
  })

  it('collapses far pages into ellipsis and shows the edges by default', () => {
    wrapper = mount(Harness, { props: { page: 5 } })
    expect(wrapper.findAll('[data-slot="pagination-ellipsis"]')).toHaveLength(2)
    expect(pageButtons(wrapper).map(b => b.text())).toEqual(['1', '4', '5', '6', '10'])
    expect(wrapper.get('[data-slot="pagination-ellipsis"]').text()).toBe('More pages')
  })

  it('honours siblingCount and showEdges', () => {
    wrapper = mount(Harness, { props: { page: 5, siblingCount: 2, showEdges: false } })
    expect(pageButtons(wrapper).map(b => b.text())).toEqual(['3', '4', '5', '6', '7'])
  })

  it('emits update:page from page, next, previous, first and last', async () => {
    wrapper = mount(Harness, { props: { page: 5 } })
    await pageButtons(wrapper).find(b => b.text() === '6')!.trigger('click')
    await wrapper.get('[data-slot="pagination-next"]').trigger('click')
    await wrapper.get('[data-slot="pagination-prev"]').trigger('click')
    await wrapper.get('[data-slot="pagination-first"]').trigger('click')
    await wrapper.get('[data-slot="pagination-last"]').trigger('click')
    expect(wrapper.emitted('update:page')!.map(e => e[0])).toEqual([6, 6, 4, 1, 10])
  })

  it('disables previous and first on page 1 and next and last on the last page', async () => {
    wrapper = mount(Harness, { props: { page: 1 } })
    expect(wrapper.get('[data-slot="pagination-prev"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[data-slot="pagination-first"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[data-slot="pagination-next"]').attributes('disabled')).toBeUndefined()
    await wrapper.setProps({ page: 10 })
    expect(wrapper.get('[data-slot="pagination-next"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[data-slot="pagination-last"]').attributes('disabled')).toBeDefined()
  })

  it('disables every control when disabled', async () => {
    wrapper = mount(Harness, { props: { page: 3, disabled: true } })
    await flushPromises()
    for (const b of wrapper.findAll('button')) expect(b.attributes('disabled')).toBeDefined()
  })

  it('shows a single page for an empty list', () => {
    wrapper = mount(Harness, { props: { total: 0 } })
    expect(pageButtons(wrapper).map(b => b.text())).toEqual(['1'])
  })
})

describe('SimplePagination', () => {
  const mountSimple = (props: Record<string, unknown> = {}) => mount(SimplePagination, { props: { total: 45, itemsPerPage: 10, ...props } })

  it('renders previous, status and next', () => {
    wrapper = mountSimple()
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Pagination')
    expect(wrapper.get('[data-slot="simple-pagination-status"]').text()).toBe('Page 1 of 5')
    expect(wrapper.get('[data-slot="simple-pagination-prev"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[data-slot="simple-pagination-prev"]').attributes('aria-label')).toBe('Previous')
  })

  it('emits update:page and supports translated labels', async () => {
    wrapper = mountSimple({ page: 2, prevLabel: 'Onceki', nextLabel: 'Sonraki' })
    expect(wrapper.get('[data-slot="simple-pagination-next"]').attributes('aria-label')).toBe('Sonraki')
    await wrapper.get('[data-slot="simple-pagination-next"]').trigger('click')
    await wrapper.get('[data-slot="simple-pagination-prev"]').trigger('click')
    expect(wrapper.emitted('update:page')!.map(e => e[0])).toEqual([3, 1])
  })

  it('renders the status slot with page and pageCount', () => {
    wrapper = mount(SimplePagination, { props: { total: 45, itemsPerPage: 10, defaultPage: 2 }, slots: { status: `<template #status="{ page, pageCount }">{{ page }}/{{ pageCount }}</template>` } })
    expect(wrapper.get('[data-slot="simple-pagination-status"]').text()).toBe('2/5')
  })
})
