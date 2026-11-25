import type { HTMLAttributes } from 'vue'

export { default as Skeleton } from './Skeleton.vue'

export interface SkeletonProps {
  /** Extra classes, merged with the base classes through `cn()`. Set the size and shape here (`h-4 w-40`, `size-10 rounded-full`). */
  class?: HTMLAttributes['class']
}
