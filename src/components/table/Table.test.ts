import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '.'

function build(props: Record<string, unknown> = {}, headProps: Record<string, unknown> = {}) {
  return mount({
    components: { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow },
    setup: () => ({ props, headProps }),
    template: `
      <Table v-bind="props">
        <TableHeader><TableRow><TableHead v-bind="headProps">Name</TableHead></TableRow></TableHeader>
        <TableBody><TableRow :selected="true"><TableCell label="Name">Ayşe</TableCell></TableRow></TableBody>
        <TableFooter><TableRow><TableCell>Total</TableCell></TableRow></TableFooter>
      </Table>`,
  })
}

describe('Table', () => {
  it('renders native table semantics with a caption and data-slot markers', () => {
    const w = build({ caption: 'Members' })
    for (const slot of ['table-container', 'table', 'table-caption', 'table-header', 'table-body', 'table-footer', 'table-row', 'table-head', 'table-cell'])
      expect(w.find(`[data-slot="${slot}"]`).exists(), slot).toBe(true)
    expect(w.find('table caption').text()).toBe('Members')
    expect(w.find('th').attributes('scope')).toBe('col')
    expect(w.find('table').attributes('role')).toBeUndefined()
    expect(w.find('td').attributes('role')).toBeUndefined()
  })

  it('hides the caption visually but keeps it in the DOM', () => {
    const w = build({ caption: 'Members', captionHidden: true })
    expect(w.find('caption').classes()).toContain('sr-only')
    expect(w.find('caption').text()).toBe('Members')
  })

  it('lets the caption slot replace the default caption', () => {
    const w = mount(Table, {
      props: { caption: 'Members' },
      slots: { caption: '<TableCaption>Custom</TableCaption>' },
      global: { components: { TableCaption } },
    })
    expect(w.find('caption').text()).toBe('Custom')
  })

  it('exposes density, stack and sticky state as data attributes', () => {
    const w = build({ caption: 'm', density: 'compact', stickyHeader: true })
    expect(w.find('table').attributes('data-density')).toBe('compact')
    expect(w.find('table').attributes('data-sticky')).toBe('true')
    expect(w.find('table').attributes('data-stack')).toBe('false')
    expect(build({ caption: 'm' }).find('table').attributes('data-density')).toBe('default')
  })

  it('adds ARIA table roles when stacked so the semantics survive display changes', () => {
    const w = build({ caption: 'm', stackOnMobile: true })
    expect(w.find('table').attributes('role')).toBe('table')
    expect(w.find('thead').attributes('role')).toBe('rowgroup')
    expect(w.find('tbody').attributes('role')).toBe('rowgroup')
    expect(w.find('tr').attributes('role')).toBe('row')
    expect(w.find('th').attributes('role')).toBe('columnheader')
    expect(w.find('td[data-label]').attributes('role')).toBe('cell')
    expect(w.find('td[data-label]').attributes('data-label')).toBe('Name')
  })

  it('renders aria-sort on a column header', () => {
    expect(build({ caption: 'm' }, { sort: 'ascending' }).find('th').attributes('aria-sort')).toBe('ascending')
    expect(build({ caption: 'm' }).find('th').attributes('aria-sort')).toBeUndefined()
  })

  it('marks a selected row', () => {
    expect(build({ caption: 'm' }).find('tbody tr').attributes('data-state')).toBe('selected')
  })

  it('merges custom classes on the table and the container', () => {
    const w = build({ caption: 'm', class: 'min-w-96', containerClass: 'max-h-40' })
    expect(w.find('table').classes()).toContain('min-w-96')
    expect(w.find('[data-slot="table-container"]').classes()).toContain('max-h-40')
  })

  it('works when a part is used outside a table', () => {
    expect(mount(TableCell).element.tagName).toBe('TD')
  })
})
