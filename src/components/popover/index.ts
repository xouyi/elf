import type { PopoverContentProps as RekaPopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { popoverPanelClass } from './styles'
export { default as Popover } from './Popover.vue'
export { default as PopoverAnchor } from './PopoverAnchor.vue'
export { default as PopoverClose } from './PopoverClose.vue'
export { default as PopoverContent } from './PopoverContent.vue'
export { default as PopoverTrigger } from './PopoverTrigger.vue'

export interface PopoverContentProps extends RekaPopoverContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
