import type { HoverCardContentProps as RekaHoverCardContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as HoverCard } from './HoverCard.vue'
export { default as HoverCardContent } from './HoverCardContent.vue'
export { default as HoverCardTrigger } from './HoverCardTrigger.vue'

export interface HoverCardContentProps extends RekaHoverCardContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
