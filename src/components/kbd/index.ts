import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'

export interface KbdProps extends PrimitiveProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface KbdGroupProps extends PrimitiveProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
