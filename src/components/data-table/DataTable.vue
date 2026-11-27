<script setup lang="ts" generic="TData extends RowData">
import type { Column, OnChangeFn, PaginationState, RowData, RowSelectionState, SortingState, Updater, ColumnVisibilityState } from '@tanstack/vue-table'
import type { DataTableLabels, DataTableProps } from './index'
import { ArrowDown, ArrowUp, ChevronsUpDown, Columns3, Inbox } from '@lucide/vue'
import { FlexRender, functionalUpdate, useTable } from '@tanstack/vue-table'
import { computed, watch } from 'vue'
import { cn } from '../../lib/utils'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../dropdown-menu'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../empty'
import { Input } from '../input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrev, SimplePagination } from '../pagination'
import { Skeleton } from '../skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { dataTableFeatures } from './features'

const props = withDefaults(defineProps<DataTableProps<TData>>(), {
  loadingRows: 5,
  paginated: true,
  pageSize: 10,
})

defineSlots<{
  /** Content of a body cell. Replace `<key>` with the column id. Slot props: `row` (TanStack row, `row.original` is your object), `column`, `value`, `cell`. */
  [key: `cell-${string}`]: (props: { row: unknown, column: unknown, value: unknown, cell: unknown }) => unknown
  /** Label of a column header, inside the sort button when the column is sortable. Replace `<key>` with the column id. Slot props: `column`, `header`, `sorted` (`'asc'`, `'desc'` or `false`). */
  [key: `header-${string}`]: (props: { column: unknown, header: unknown, sorted: false | 'asc' | 'desc' }) => unknown
  /** Extra toolbar content, for example buttons, next to the search input and the column menu. */
  actions?: (props: { table: unknown }) => unknown
  /** Replaces the default empty state, shown when there are no rows and the table is not loading. Rendered in one full-width cell. */
  empty?: (props: Record<string, never>) => unknown
  /** Replaces the default skeleton rows while `loading`. Rendered in one full-width cell. */
  loading?: (props: Record<string, never>) => unknown
}>()
/** Sort state, `[{ id: 'name', desc: false }]`. Bind with `v-model:sorting`. */
const sorting = defineModel<SortingState>('sorting', { default: () => [] })
/** Selected rows as an object keyed by row id (see `rowKey`), `{ 'm-1': true }`. Bind with `v-model:selection`. */
const selection = defineModel<Record<string, boolean>>('selection', { default: () => ({}) })
/** Hidden columns as an object keyed by column id, `{ email: false }`. A missing id is visible. Bind with `v-model:columnVisibility`. */
const columnVisibility = defineModel<ColumnVisibilityState>('columnVisibility', { default: () => ({}) })
/** Zero-based page and page size, `{ pageIndex: 0, pageSize: 10 }`. Bind with `v-model:pagination`; without it the table keeps its own page and starts from `pageSize`. */
const pagination = defineModel<PaginationState>('pagination')
/** The search text. Bind with `v-model:globalFilter`. */
const globalFilter = defineModel<string>('globalFilter', { default: '' })

const defaultLabels: DataTableLabels = {
  search: 'Search',
  columns: 'Columns',
  selectAll: 'Select all rows',
  selectRow: 'Select row',
  loading: 'Loading',
  emptyTitle: 'No results',
  emptyDescription: 'There are no rows to show.',
  pagination: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  selected: (selected, total) => `${selected} of ${total} row(s) selected`,
  status: (page, pageCount) => `Page ${page} of ${pageCount}`,
}
const text = computed<DataTableLabels>(() => ({ ...defaultLabels, ...props.labels }))

const pageState = computed<PaginationState>(() => pagination.value ?? { pageIndex: 0, pageSize: props.pageSize })
watch(() => props.pageSize, (size) => {
  if (pagination.value) pagination.value = { ...pagination.value, pageSize: size }
})

// Every state slice is controlled: the models above own it and the table reports changes back through the updaters.
function bind<T>(model: { value: T }): OnChangeFn<T> {
  return (updater: Updater<T>) => {
    model.value = functionalUpdate(updater, model.value)
  }
}

function rowId(row: TData, index: number): string {
  const key = props.rowKey
  if (typeof key === 'function') return key(row, index)
  if (key) return String((row as Record<string, unknown>)[key])
  return String(index)
}

const table = useTable<typeof dataTableFeatures, TData>({
  features: dataTableFeatures,
  columns: computed(() => props.columns),
  data: computed(() => props.data),
  state: computed(() => ({
    sorting: sorting.value,
    rowSelection: selection.value as RowSelectionState,
    columnVisibility: columnVisibility.value,
    pagination: pageState.value,
    globalFilter: globalFilter.value,
  })),
  getRowId: rowId,
  globalFilterFn: 'includesString',
  manualSorting: computed(() => props.manualSorting ?? false),
  manualFiltering: computed(() => props.manualFiltering ?? false),
  manualPagination: computed(() => props.manualPagination ?? false),
  rowCount: computed(() => props.rowCount),
  enableRowSelection: computed(() => props.selectable ?? false),
  onSortingChange: bind(sorting),
  onRowSelectionChange: bind(selection as { value: RowSelectionState }),
  onColumnVisibilityChange: bind(columnVisibility),
  onPaginationChange: (updater: Updater<PaginationState>) => {
    pagination.value = functionalUpdate(updater, pageState.value)
  },
  onGlobalFilterChange: (updater: Updater<string>) => {
    globalFilter.value = functionalUpdate(updater, globalFilter.value) ?? ''
  },
})

// With a server page the old page index is meaningless after the query changes, so go back to the first page.
watch([sorting, globalFilter], () => {
  if (props.manualPagination && pageState.value.pageIndex !== 0)
    pagination.value = { ...pageState.value, pageIndex: 0 }
})

const rows = computed(() => (props.paginated ? table.getRowModel().rows : table.getPrePaginatedRowModel().rows))
const visibleColumns = computed(() => table.getVisibleLeafColumns())
const colSpan = computed(() => Math.max(1, visibleColumns.value.length + (props.selectable ? 1 : 0)))
const totalRows = computed(() => (props.manualPagination ? (props.rowCount ?? props.data.length) : table.getPrePaginatedRowModel().rows.length))
const pageCount = computed(() => (props.paginated ? Math.max(1, Math.ceil(totalRows.value / pageState.value.pageSize)) : 1))
const toolbar = computed(() => props.searchable || props.columnToggle)
const selectedCount = computed(() => Object.values(selection.value).filter(Boolean).length)
const hideableColumns = computed(() => table.getAllLeafColumns().filter(c => c.getCanHide()))

type AnyColumn = Column<typeof dataTableFeatures, TData, unknown>

/** The visible name of a column: its string header, else its id. */
function columnLabel(column: AnyColumn): string {
  const header = column.columnDef.header
  return typeof header === 'string' ? header : column.id
}

function ariaSort(column: AnyColumn) {
  if (!column.getCanSort()) return undefined
  const dir = column.getIsSorted()
  return dir === 'asc' ? 'ascending' : dir === 'desc' ? 'descending' : 'none'
}

const allSelected = computed<boolean | 'indeterminate'>(() => table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
</script>

<template>
  <div data-slot="data-table" :class="cn('flex w-full min-w-0 flex-col gap-3', props.class)">
    <div v-if="toolbar || $slots.actions" data-slot="data-table-toolbar" class="flex flex-wrap items-center gap-2">
      <Input
        v-if="props.searchable"
        v-model="globalFilter"
        type="search"
        :aria-label="text.search"
        :placeholder="text.search"
        class="max-w-xs min-w-40 flex-1"
      />
      <div class="ml-auto flex flex-wrap items-center gap-2">
        <slot name="actions" :table="table" />
        <DropdownMenu v-if="props.columnToggle">
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <Columns3 aria-hidden="true" />
              {{ text.columns }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuCheckboxItem
              v-for="column in hideableColumns"
              :key="column.id"
              :model-value="column.getIsVisible()"
              @update:model-value="(value: boolean | 'indeterminate') => column.toggleVisibility(value === true)"
              @select.prevent
            >
              {{ columnLabel(column) }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <Table
      :caption="props.caption"
      :caption-hidden="props.captionHidden"
      :density="props.density"
      :stack-on-mobile="props.stackOnMobile"
      :sticky-header="props.stickyHeader"
      :container-class="props.containerClass"
      :aria-busy="props.loading ? 'true' : undefined"
    >
      <TableHeader>
        <TableRow v-for="group in table.getHeaderGroups()" :key="group.id">
          <TableHead v-if="props.selectable" class="w-10">
            <Checkbox
              :model-value="allSelected"
              :aria-label="text.selectAll"
              @update:model-value="(value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(value === true)"
            />
          </TableHead>
          <TableHead
            v-for="header in group.headers"
            :key="header.id"
            :col-span="header.colSpan"
            :sort="ariaSort(header.column)"
          >
            <template v-if="!header.isPlaceholder">
              <Button
                v-if="header.column.getCanSort()"
                variant="ghost"
                size="sm"
                class="-ml-3"
                @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <slot :name="`header-${header.column.id}`" :column="header.column" :header="header" :sorted="header.column.getIsSorted()">
                  <FlexRender :header="header" />
                </slot>
                <ArrowUp v-if="header.column.getIsSorted() === 'asc'" aria-hidden="true" />
                <ArrowDown v-else-if="header.column.getIsSorted() === 'desc'" aria-hidden="true" />
                <ChevronsUpDown v-else aria-hidden="true" />
              </Button>
              <slot v-else :name="`header-${header.column.id}`" :column="header.column" :header="header" :sorted="false">
                <FlexRender :header="header" />
              </slot>
            </template>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="props.loading">
          <TableRow v-if="$slots.loading">
            <TableCell :colspan="colSpan" class="max-sm:!block">
              <slot name="loading" />
            </TableCell>
          </TableRow>
          <template v-else>
            <TableRow v-for="n in props.loadingRows" :key="n" data-slot="data-table-skeleton-row">
              <TableCell v-if="props.selectable" class="w-10">
                <Skeleton class="size-4" />
              </TableCell>
              <TableCell v-for="column in visibleColumns" :key="column.id" :label="columnLabel(column)">
                <Skeleton class="h-4 w-full max-w-40" />
              </TableCell>
            </TableRow>
          </template>
        </template>
        <TableRow v-else-if="rows.length === 0" data-slot="data-table-empty">
          <TableCell :colspan="colSpan" class="max-sm:!block max-sm:!text-center">
            <slot name="empty">
              <Empty class="w-full border-0 py-8">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Inbox />
                  </EmptyMedia>
                  <EmptyTitle>{{ text.emptyTitle }}</EmptyTitle>
                  <EmptyDescription>{{ text.emptyDescription }}</EmptyDescription>
                </EmptyHeader>
              </Empty>
            </slot>
          </TableCell>
        </TableRow>
        <template v-else>
          <TableRow v-for="row in rows" :key="row.id" :selected="row.getIsSelected()">
            <TableCell v-if="props.selectable" class="w-10">
              <Checkbox
                :model-value="row.getIsSelected()"
                :aria-label="text.selectRow"
                :disabled="!row.getCanSelect()"
                @update:model-value="(value: boolean | 'indeterminate') => row.toggleSelected(value === true)"
              />
            </TableCell>
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :label="columnLabel(cell.column)">
              <slot :name="`cell-${cell.column.id}`" :row="row" :column="cell.column" :value="cell.getValue()" :cell="cell">
                <FlexRender :cell="cell" />
              </slot>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <p v-if="props.loading" role="status" class="sr-only">
      {{ text.loading }}
    </p>

    <div
      v-if="props.selectable || pageCount > 1"
      data-slot="data-table-footer"
      class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
    >
      <p v-if="props.selectable" class="text-sm text-muted-foreground">
        {{ text.selected(selectedCount, totalRows) }}
      </p>
      <template v-if="pageCount > 1">
        <Pagination
          :page="pageState.pageIndex + 1"
          :total="totalRows"
          :items-per-page="pageState.pageSize"
          :aria-label="text.pagination"
          class="hidden w-auto sm:ml-auto sm:flex"
          @update:page="(page: number) => table.setPageIndex(page - 1)"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrev />
            <template v-for="(item, i) in items" :key="i">
              <PaginationItem v-if="item.type === 'page'" :value="item.value" />
              <PaginationEllipsis v-else />
            </template>
            <PaginationNext />
          </PaginationContent>
        </Pagination>
        <SimplePagination
          :page="pageState.pageIndex + 1"
          :total="totalRows"
          :items-per-page="pageState.pageSize"
          :aria-label="text.pagination"
          :prev-label="text.previous"
          :next-label="text.next"
          class="sm:hidden"
          @update:page="(page: number) => table.setPageIndex(page - 1)"
        >
          <template #status="{ page, pageCount: count }">
            {{ text.status(page, count) }}
          </template>
        </SimplePagination>
      </template>
    </div>
  </div>
</template>
