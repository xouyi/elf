import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Separator } from './Separator.vue'

export interface SeparatorProps extends RekaSeparatorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
