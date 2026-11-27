import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Breadcrumb } from './Breadcrumb.vue'
export { default as BreadcrumbEllipsis } from './BreadcrumbEllipsis.vue'
export { default as BreadcrumbItem } from './BreadcrumbItem.vue'
export { default as BreadcrumbLink } from './BreadcrumbLink.vue'
export { default as BreadcrumbList } from './BreadcrumbList.vue'
export { default as BreadcrumbPage } from './BreadcrumbPage.vue'
export { default as BreadcrumbSeparator } from './BreadcrumbSeparator.vue'

export interface BreadcrumbProps {
  /** Accessible name of the navigation landmark. Translate it, and make it unique when a page has several trails. */
  ariaLabel?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbListProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbLinkProps extends PrimitiveProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbPageProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbSeparatorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbEllipsisProps {
  /** Screen reader text for the ellipsis (the visible content is an icon). */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
