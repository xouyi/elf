import type { NavigationMenuContentProps as RekaContentProps, NavigationMenuIndicatorProps as RekaIndicatorProps, NavigationMenuItemProps as RekaItemProps, NavigationMenuLinkProps as RekaLinkProps, NavigationMenuListProps as RekaListProps, NavigationMenuRootProps as RekaRootProps, NavigationMenuTriggerProps as RekaTriggerProps, NavigationMenuViewportProps as RekaViewportProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as NavigationMenu } from './NavigationMenu.vue'
export { default as NavigationMenuContent } from './NavigationMenuContent.vue'
export { default as NavigationMenuIndicator } from './NavigationMenuIndicator.vue'
export { default as NavigationMenuItem } from './NavigationMenuItem.vue'
export { default as NavigationMenuLink } from './NavigationMenuLink.vue'
export { default as NavigationMenuList } from './NavigationMenuList.vue'
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue'
export { default as NavigationMenuViewport } from './NavigationMenuViewport.vue'
export { navigationMenuItemLinkClass, navigationMenuTriggerStyle } from './styles'

export interface NavigationMenuProps extends RekaRootProps {
  /** Render the shared viewport, so that every flyout panel grows from one animated surface. Turn it off to let each panel sit under its own trigger. */
  viewport?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuListProps extends RekaListProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuItemProps extends RekaItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuTriggerProps extends RekaTriggerProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuContentProps extends RekaContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuLinkProps extends RekaLinkProps {
  /** `trigger` styles a top-level link like a trigger; `item` styles a link inside a flyout panel (room for a title and a description). */
  variant?: 'item' | 'trigger'
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuViewportProps extends RekaViewportProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuIndicatorProps extends RekaIndicatorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
