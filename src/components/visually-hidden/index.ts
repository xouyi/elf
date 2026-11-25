import type { VisuallyHiddenProps as RekaVisuallyHiddenProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as VisuallyHidden } from './VisuallyHidden.vue'

export interface VisuallyHiddenProps extends RekaVisuallyHiddenProps {
  /** Extra classes, merged onto the element. */
  class?: HTMLAttributes['class']
}
