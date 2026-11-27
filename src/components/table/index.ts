import type { HTMLAttributes, InjectionKey } from 'vue'

export { default as Table } from './Table.vue'
export { default as TableBody } from './TableBody.vue'
export { default as TableCaption } from './TableCaption.vue'
export { default as TableCell } from './TableCell.vue'
export { default as TableFooter } from './TableFooter.vue'
export { default as TableHead } from './TableHead.vue'
export { default as TableHeader } from './TableHeader.vue'
export { default as TableRow } from './TableRow.vue'

/** Row spacing of the table. */
export type TableDensity = 'compact' | 'default' | 'comfortable'

/** Values of the `aria-sort` attribute of a column header. */
export type TableSort = 'ascending' | 'descending' | 'none' | 'other'

/** State that `ElfTable` shares with its parts. */
export interface TableContext {
  /** True while the table turns into a stack of cards below the `sm` breakpoint. */
  stack: boolean
}

/** @internal */
export const tableContextKey: InjectionKey<TableContext> = Symbol('elf-table')

export interface TableProps {
  /**
   * Accessible name and visible title of the table. Required: a table without a caption is unnamed for screen reader
   * users. Hide it visually with `captionHidden`, or replace the markup with the `caption` slot.
   */
  caption: string
  /** Hide the caption visually; screen readers still announce it. */
  captionHidden?: boolean
  /** Row spacing: `compact` for dense admin lists, `comfortable` for roomy ones. */
  density?: TableDensity
  /**
   * Below the `sm` breakpoint, show every row as a card with `label: value` lines instead of scrolling sideways.
   * Give each `ElfTableCell` a `label` prop. The header row stays in the accessibility tree but is hidden visually,
   * and ARIA table roles keep the semantics intact.
   */
  stackOnMobile?: boolean
  /**
   * Keep the header row visible while the rows scroll. Needs a height limit on the scroll container, for example
   * `containerClass="max-h-80"`.
   */
  stickyHeader?: boolean
  /** Extra classes for the `table` element, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
  /** Extra classes for the scroll container around the table. */
  containerClass?: HTMLAttributes['class']
}

export interface TableCaptionProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface TableHeadProps {
  /** Sort state of the column, rendered as `aria-sort`. Put the sort button in the default slot. */
  sort?: TableSort
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface TableCellProps {
  /** Column name shown before the value when the table is stacked on mobile (`data-label`). */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface TableRowProps {
  /** Mark the row as selected (`data-state="selected"`), for example from a selection checkbox. */
  selected?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface TableSectionProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
