import type { ContextMenuCheckboxItemProps as RekaCheckboxItemProps, ContextMenuContentProps as RekaContentProps, ContextMenuItemProps as RekaItemProps, ContextMenuLabelProps as RekaLabelProps, ContextMenuRadioItemProps as RekaRadioItemProps, ContextMenuSeparatorProps as RekaSeparatorProps, ContextMenuSubContentProps as RekaSubContentProps, ContextMenuSubTriggerProps as RekaSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { MenuItemVariants } from '../dropdown-menu'

export { default as ContextMenu } from './ContextMenu.vue'
export { default as ContextMenuCheckboxItem } from './ContextMenuCheckboxItem.vue'
export { default as ContextMenuContent } from './ContextMenuContent.vue'
export { default as ContextMenuGroup } from './ContextMenuGroup.vue'
export { default as ContextMenuItem } from './ContextMenuItem.vue'
export { default as ContextMenuLabel } from './ContextMenuLabel.vue'
export { default as ContextMenuRadioGroup } from './ContextMenuRadioGroup.vue'
export { default as ContextMenuRadioItem } from './ContextMenuRadioItem.vue'
export { default as ContextMenuSeparator } from './ContextMenuSeparator.vue'
export { default as ContextMenuShortcut } from './ContextMenuShortcut.vue'
export { default as ContextMenuSub } from './ContextMenuSub.vue'
export { default as ContextMenuSubContent } from './ContextMenuSubContent.vue'
export { default as ContextMenuSubTrigger } from './ContextMenuSubTrigger.vue'
export { default as ContextMenuTrigger } from './ContextMenuTrigger.vue'

export interface ContextMenuContentProps extends RekaContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuSubContentProps extends RekaSubContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuItemProps extends RekaItemProps {
  /** `destructive` colours the item for irreversible actions such as delete. */
  variant?: MenuItemVariants['variant']
  /** Indent the item so that it lines up with items that have a checkbox or radio indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuCheckboxItemProps extends RekaCheckboxItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuRadioItemProps extends RekaRadioItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuLabelProps extends RekaLabelProps {
  /** Indent the label so that it lines up with items that have an indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuSeparatorProps extends RekaSeparatorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuSubTriggerProps extends RekaSubTriggerProps {
  /** Indent the trigger so that it lines up with items that have an indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface ContextMenuShortcutProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
