import type { LabelProps as RekaLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Label } from './Label.vue'

export interface LabelProps extends RekaLabelProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
