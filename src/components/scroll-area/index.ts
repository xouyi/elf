import type { ScrollAreaRootProps, ScrollAreaScrollbarProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as ScrollArea } from './ScrollArea.vue'
export { default as ScrollBar } from './ScrollBar.vue'

export interface ScrollAreaProps extends ScrollAreaRootProps {
  /** Which scrollbars to render: `vertical` (default), `horizontal` or `both`. */
  orientation?: 'vertical' | 'horizontal' | 'both'
  /**
   * Accessible name of the scrollable region. The viewport is keyboard focusable so that arrow keys, Page Up/Down,
   * Home and End scroll it; naming it (`role="region"`) tells screen reader users what they are scrolling.
   */
  label?: string
  /** Extra classes for the scrolling viewport (the focusable element), merged with `cn()`. */
  viewportClass?: HTMLAttributes['class']
  /** Extra classes for the root, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ScrollBarProps extends Omit<ScrollAreaScrollbarProps, 'orientation'> {
  /** Direction of the bar. */
  orientation?: 'vertical' | 'horizontal'
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
