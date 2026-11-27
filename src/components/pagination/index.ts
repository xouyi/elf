import type { PaginationEllipsisProps as RekaEllipsisProps, PaginationFirstProps as RekaFirstProps, PaginationLastProps as RekaLastProps, PaginationListItemProps as RekaListItemProps, PaginationNextProps as RekaNextProps, PaginationPrevProps as RekaPrevProps, PaginationRootProps as RekaRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '../button'

export { default as Pagination } from './Pagination.vue'
export { default as PaginationContent } from './PaginationContent.vue'
export { default as PaginationEllipsis } from './PaginationEllipsis.vue'
export { default as PaginationFirst } from './PaginationFirst.vue'
export { default as PaginationItem } from './PaginationItem.vue'
export { default as PaginationLast } from './PaginationLast.vue'
export { default as PaginationNext } from './PaginationNext.vue'
export { default as PaginationPrev } from './PaginationPrev.vue'
export { default as SimplePagination } from './SimplePagination.vue'

export interface PaginationProps extends RekaRootProps {
  /** Accessible name of the navigation landmark. Translate it, and make it unique when a page has several paginations. */
  ariaLabel?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface SimplePaginationProps extends Omit<RekaRootProps, 'siblingCount' | 'showEdges'> {
  /** Accessible name of the navigation landmark. */
  ariaLabel?: string
  /** Text and accessible name of the previous button. */
  prevLabel?: string
  /** Text and accessible name of the next button. */
  nextLabel?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface PaginationItemProps extends RekaListItemProps {
  /** Button size; page numbers are square by default. */
  size?: ButtonVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface PaginationEllipsisProps extends RekaEllipsisProps {
  /** Screen reader text for the ellipsis (the visible content is an icon). */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface PaginationPrevProps extends RekaPrevProps {
  /** Button size. Use `icon` for an icon-only button. */
  size?: ButtonVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface PaginationNextProps extends RekaNextProps {
  /** Button size. Use `icon` for an icon-only button. */
  size?: ButtonVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface PaginationFirstProps extends RekaFirstProps {
  /** Button size. */
  size?: ButtonVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface PaginationLastProps extends RekaLastProps {
  /** Button size. */
  size?: ButtonVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
