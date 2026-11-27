import type { TooltipContentProps as RekaTooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { tooltipProviderKey } from './context'
export { default as Tooltip } from './Tooltip.vue'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipProvider } from './TooltipProvider.vue'
export { default as TooltipTrigger } from './TooltipTrigger.vue'

export interface TooltipContentProps extends RekaTooltipContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
