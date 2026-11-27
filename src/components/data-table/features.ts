import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from '@tanstack/vue-table'

/**
 * The TanStack Table features `ElfDataTable` registers: sorting, global filtering, column visibility, pagination and
 * row selection, with the client row models and only the sort and filter functions it needs (the rest stay out of your bundle).
 */
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
  },
  filterFns: { includesString: filterFn_includesString },
})

/** The feature set of `ElfDataTable`; the first type argument of TanStack's `Table`, `Row` and `Column` types. */
export type DataTableFeatures = typeof dataTableFeatures

/**
 * Creates the TanStack column helper for `ElfDataTable`, so column definitions are typed without importing TanStack.
 *
 * @example
 * const col = createDataTableColumnHelper<Member>()
 * const columns = [col.accessor('name', { header: 'Name' }), col.accessor('points', { header: 'Points' })]
 */
export function createDataTableColumnHelper<TData extends object>() {
  return createColumnHelper<DataTableFeatures, TData>()
}
