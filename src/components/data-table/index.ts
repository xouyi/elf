import type { Column, ColumnDef, Row, RowData } from '@tanstack/vue-table'
import type { HTMLAttributes } from 'vue'
import type { TableProps } from '../table'
import type { DataTableFeatures } from './features'

export { default as DataTable } from './DataTable.vue'
export { createDataTableColumnHelper, dataTableFeatures } from './features'
export type { DataTableFeatures } from './features'
export type {
  ColumnVisibilityState as DataTableColumnVisibility,
  PaginationState as DataTablePagination,
  SortingState as DataTableSorting,
} from '@tanstack/vue-table'

/** Selected rows keyed by row id, the value of `v-model:selection`. */
export type DataTableSelection = Record<string, boolean>

/** A column definition for `ElfDataTable` (TanStack `ColumnDef` with the table's feature set filled in). */
// `any` for the value type, as in TanStack v8: a list of columns with different accessor types is not assignable to `unknown`.
export type DataTableColumn<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>

/** A TanStack row of an `ElfDataTable`, as passed to the `cell-<key>` slots. */
export type DataTableRow<TData extends RowData> = Row<DataTableFeatures, TData>

/** A TanStack column of an `ElfDataTable`, as passed to the `cell-<key>` and `header-<key>` slots. */
export type DataTableColumnInstance<TData extends RowData> = Column<DataTableFeatures, TData, unknown>

/** Texts of `ElfDataTable`. Translate them by passing any subset to the `labels` prop. */
export interface DataTableLabels {
  /** Accessible name and placeholder of the search input. Default `Search`. */
  search: string
  /** Label of the column visibility button. Default `Columns`. */
  columns: string
  /** Accessible name of the header checkbox that selects every row of the page. Default `Select all rows`. */
  selectAll: string
  /** Accessible name of each row checkbox. Default `Select row`. */
  selectRow: string
  /** Screen reader announcement while `loading` is set. Default `Loading`. */
  loading: string
  /** Title of the default empty state. Default `No results`. */
  emptyTitle: string
  /** Description of the default empty state. Default `There are no rows to show.` */
  emptyDescription: string
  /** Accessible name of the pagination landmark. Default `Pagination`. */
  pagination: string
  /** Name of the previous page button on small screens. Default `Previous`. */
  previous: string
  /** Name of the next page button on small screens. Default `Next`. */
  next: string
  /** Text of the selection summary. Default `<selected> of <total> row(s) selected`. */
  selected: (selected: number, total: number) => string
  /** Page status on small screens. Default `Page <page> of <pageCount>`. */
  status: (page: number, pageCount: number) => string
}

export interface DataTableProps<TData extends RowData = RowData> extends Pick<TableProps, 'caption' | 'captionHidden' | 'density' | 'stackOnMobile' | 'stickyHeader' | 'containerClass'> {
  /** Column definitions: TanStack `ColumnDef`s, usually built with `createDataTableColumnHelper()`. Keep the array stable (a constant or a `computed`). Group headers are supported, but columns should be flat. */
  columns: DataTableColumn<TData>[]
  /** The rows. In server-driven mode this is the current page only. */
  data: TData[]
  /** Unique id of a row: a key of the row object or a function. Selection state is keyed by it. Defaults to the row index, which is only safe for static data. */
  rowKey?: (keyof TData & string) | ((row: TData, index: number) => string)
  /** Show the loading state: skeleton rows (or the `loading` slot), `aria-busy` and a screen reader announcement. */
  loading?: boolean
  /** Number of skeleton rows shown while loading. */
  loadingRows?: number
  /** Add a checkbox column; the selected rows are bound with `v-model:selection`. */
  selectable?: boolean
  /** Paginate the rows. Turn off to show every row. */
  paginated?: boolean
  /** Rows per page when `v-model:pagination` is not used. */
  pageSize?: number
  /** Show a search input in the toolbar, bound to `v-model:globalFilter`. */
  searchable?: boolean
  /** Show the column visibility menu in the toolbar. */
  columnToggle?: boolean
  /** Sort on the server: the table keeps the order of `data` and reports changes through `v-model:sorting`. */
  manualSorting?: boolean
  /** Paginate on the server: `data` is already the current page. Set `rowCount` too. */
  manualPagination?: boolean
  /** Filter on the server: the table does not filter `data` and reports the search through `v-model:globalFilter`. */
  manualFiltering?: boolean
  /** Total number of rows on the server, for the page count in `manualPagination` mode. */
  rowCount?: number
  /** Partial overrides of the texts, for translation. */
  labels?: Partial<DataTableLabels>
  /** Extra classes for the root element, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
