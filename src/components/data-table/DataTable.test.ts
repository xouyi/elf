import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createDataTableColumnHelper, DataTable } from '.'

interface Row {
  id: string
  name: string
  points: number
}

const rows: Row[] = [
  { id: 'a', name: 'Charlie', points: 30 },
  { id: 'b', name: 'Alpha', points: 10 },
  { id: 'c', name: 'Bravo', points: 20 },
  { id: 'd', name: 'Delta', points: 40 },
  { id: 'e', name: 'Echo', points: 50 },
]
const col = createDataTableColumnHelper<Row>()
const columns = [
  col.accessor('name', { header: 'Name' }),
  col.accessor('points', { header: 'Points' }),
]

function build(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(DataTable as any, { props: { caption: 'Teams', columns, data: rows, rowKey: 'id', ...props }, slots })
}

const names = (w: ReturnType<typeof build>) => w.findAll('tbody tr').map(tr => tr.findAll('td')[0]?.text())

describe('DataTable', () => {
  it('renders a captioned native table with header buttons and rows', () => {
    const w = build()
    expect(w.find('caption').text()).toBe('Teams')
    expect(w.findAll('thead th')).toHaveLength(2)
    expect(names(w)).toEqual(['Charlie', 'Alpha', 'Bravo', 'Delta', 'Echo'])
    // No pagination for a single page, no selection column by default.
    expect(w.find('[data-slot="data-table-footer"]').exists()).toBe(false)
    expect(w.findAll('[role="checkbox"]')).toHaveLength(0)
  })

  it('renders sortable headers as buttons inside the th and reflects the sort in aria-sort', async () => {
    const w = build()
    const th = w.findAll('thead th')[0]!
    expect(th.attributes('aria-sort')).toBe('none')
    const button = th.find('button')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    expect(th.attributes('aria-sort')).toBe('ascending')
    expect(names(w)).toEqual(['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'])
    await button.trigger('click')
    expect(th.attributes('aria-sort')).toBe('descending')
    expect(names(w)[0]).toBe('Echo')
    expect(w.emitted('update:sorting')?.at(-1)).toEqual([[{ id: 'name', desc: true }]])
  })

  it('sorts numbers numerically, largest first on the first click (the TanStack default for numbers)', async () => {
    const w = build()
    const button = w.findAll('thead th')[1]!.find('button')
    await button.trigger('click')
    const points = () => w.findAll('tbody tr').map(tr => tr.findAll('td')[1]?.text())
    expect(points()).toEqual(['50', '40', '30', '20', '10'])
    await button.trigger('click')
    expect(points()).toEqual(['10', '20', '30', '40', '50'])
  })

  it('leaves columns with enableSorting false without a button or aria-sort', () => {
    const w = build({ columns: [col.accessor('name', { header: 'Name', enableSorting: false })] })
    expect(w.find('thead th button').exists()).toBe(false)
    expect(w.find('thead th').attributes('aria-sort')).toBeUndefined()
  })

  it('applies a controlled sorting model', () => {
    const w = build({ sorting: [{ id: 'points', desc: true }] })
    expect(names(w)[0]).toBe('Echo')
    expect(w.findAll('thead th')[1]!.attributes('aria-sort')).toBe('descending')
  })

  it('paginates and moves pages through the buttons', async () => {
    const w = build({ pageSize: 2 })
    expect(names(w)).toEqual(['Charlie', 'Alpha'])
    expect(w.findAll('nav[aria-label="Pagination"]')).toHaveLength(2)
    const next = w.find('[data-slot="simple-pagination-next"]')
    await next.trigger('click')
    expect(names(w)).toEqual(['Bravo', 'Delta'])
    expect(w.emitted('update:pagination')?.at(-1)).toEqual([{ pageIndex: 1, pageSize: 2 }])
    expect(w.find('[data-slot="simple-pagination-status"]').text()).toBe('Page 2 of 3')
  })

  it('shows every row without pagination when paginated is false', () => {
    const w = build({ pageSize: 2, paginated: false })
    expect(w.findAll('tbody tr')).toHaveLength(5)
    expect(w.find('[data-slot="data-table-footer"]').exists()).toBe(false)
  })

  it('adds labelled selection checkboxes and reports the selection by row key', async () => {
    const w = build({ selectable: true })
    const boxes = w.findAll('[role="checkbox"]')
    expect(boxes).toHaveLength(6)
    expect(boxes[0]!.attributes('aria-label')).toBe('Select all rows')
    expect(boxes[1]!.attributes('aria-label')).toBe('Select row')

    await boxes[2]!.trigger('click')
    expect(w.emitted('update:selection')?.at(-1)).toEqual([{ b: true }])
    expect(w.findAll('tbody tr')[1]!.attributes('data-state')).toBe('selected')
    expect(w.text()).toContain('1 of 5 row(s) selected')

    await boxes[0]!.trigger('click')
    expect(w.emitted('update:selection')?.at(-1)?.[0]).toEqual({ a: true, b: true, c: true, d: true, e: true })
    expect(w.findAll('[role="checkbox"]')[0]!.attributes('aria-checked')).toBe('true')
  })

  it('marks the header checkbox mixed when only some rows are selected', () => {
    const w = build({ selectable: true, selection: { a: true } })
    expect(w.findAll('[role="checkbox"]')[0]!.attributes('aria-checked')).toBe('mixed')
  })

  it('filters rows with the global filter', async () => {
    const w = build({ searchable: true })
    const input = w.find('input[type="search"]')
    expect(input.attributes('aria-label')).toBe('Search')
    await input.setValue('ch')
    expect(names(w)).toEqual(['Charlie', 'Echo'])
    expect(w.emitted('update:globalFilter')?.at(-1)).toEqual(['ch'])
  })

  it('shows the default empty state with no data and after a search with no match', async () => {
    const w = build({ data: [] })
    expect(w.find('[data-slot="data-table-empty"]').text()).toContain('No results')
    const filtered = build({ searchable: true })
    await filtered.find('input').setValue('zzz')
    expect(filtered.find('[data-slot="data-table-empty"]').exists()).toBe(true)
  })

  it('lets the empty slot replace the default empty state', () => {
    const w = build({ data: [] }, { empty: '<p id="custom">Nothing</p>' })
    expect(w.find('#custom').exists()).toBe(true)
    expect(w.text()).not.toContain('No results')
  })

  it('shows skeleton rows, aria-busy and a status while loading', () => {
    const w = build({ loading: true, loadingRows: 3 })
    expect(w.findAll('[data-slot="data-table-skeleton-row"]')).toHaveLength(3)
    expect(w.find('[data-slot="table-container"]').attributes('aria-busy')).toBe('true')
    expect(w.find('[role="status"]').text()).toBe('Loading')
    expect(w.find('[data-slot="data-table-empty"]').exists()).toBe(false)
    expect(names(w).join()).not.toContain('Charlie')
  })

  it('lets the loading slot replace the skeleton rows', () => {
    const w = build({ loading: true }, { loading: '<p id="spin">Wait</p>' })
    expect(w.find('#spin').exists()).toBe(true)
    expect(w.find('[data-slot="data-table-skeleton-row"]').exists()).toBe(false)
  })

  it('renders cell and header slots per column id', () => {
    const w = mount(DataTable as any, {
      props: { caption: 'Teams', columns, data: rows, rowKey: 'id' },
      slots: {
        'cell-points': '<template #cell-points="{ value, row }"><b class="pts">{{ value }}!{{ row.original.name }}</b></template>',
        'header-name': '<template #header-name="{ column }"><i class="hd">Team {{ column.id }}</i></template>',
      },
    })
    expect(w.find('.pts').text()).toBe('30!Charlie')
    expect(w.find('.hd').text()).toBe('Team name')
  })

  it('renders the actions slot in the toolbar', () => {
    const w = build({}, { actions: '<button id="act">Export</button>' })
    expect(w.find('[data-slot="data-table-toolbar"] #act').exists()).toBe(true)
  })

  it('hides columns from the visibility model and offers the menu button', () => {
    const w = build({ columnVisibility: { points: false }, columnToggle: true })
    expect(w.findAll('thead th')).toHaveLength(1)
    expect(w.text()).toContain('Columns')
  })

  it('keeps the order of data in manual mode and uses rowCount for the page count', async () => {
    const w = build({ manualSorting: true, manualPagination: true, manualFiltering: true, rowCount: 50, pageSize: 5, data: rows })
    await w.findAll('thead th')[0]!.find('button').trigger('click')
    expect(names(w)).toEqual(['Charlie', 'Alpha', 'Bravo', 'Delta', 'Echo'])
    expect(w.emitted('update:sorting')?.at(-1)).toEqual([[{ id: 'name', desc: false }]])
    expect(w.find('[data-slot="simple-pagination-status"]').text()).toBe('Page 1 of 10')
  })

  it('goes back to the first page when the sort changes in manual pagination mode', async () => {
    const w = build({ manualSorting: true, manualPagination: true, rowCount: 50, pageSize: 5, pagination: { pageIndex: 3, pageSize: 5 } })
    await w.findAll('thead th')[0]!.find('button').trigger('click')
    await nextTick()
    expect(w.emitted('update:pagination')?.at(-1)).toEqual([{ pageIndex: 0, pageSize: 5 }])
  })

  it('translates the texts through labels', () => {
    const w = build({ selectable: true, searchable: true, labels: { search: 'Ara', selectAll: 'Tümünü seç', selectRow: 'Satırı seç' } })
    expect(w.find('input').attributes('aria-label')).toBe('Ara')
    expect(w.findAll('[role="checkbox"]')[0]!.attributes('aria-label')).toBe('Tümünü seç')
    expect(w.findAll('[role="checkbox"]')[1]!.attributes('aria-label')).toBe('Satırı seç')
  })

  it('passes stackOnMobile to the table and labels the cells', () => {
    const w = build({ stackOnMobile: true })
    expect(w.find('table').attributes('data-stack')).toBe('true')
    expect(w.find('td').attributes('data-label')).toBe('Name')
  })
})
