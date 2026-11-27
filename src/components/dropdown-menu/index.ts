import type { DropdownMenuCheckboxItemProps as RekaCheckboxItemProps, DropdownMenuContentProps as RekaContentProps, DropdownMenuItemProps as RekaItemProps, DropdownMenuLabelProps as RekaLabelProps, DropdownMenuRadioItemProps as RekaRadioItemProps, DropdownMenuSeparatorProps as RekaSeparatorProps, DropdownMenuSubContentProps as RekaSubContentProps, DropdownMenuSubTriggerProps as RekaSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { MenuItemVariants } from './styles'

export { default as DropdownMenu } from './DropdownMenu.vue'
export { default as DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem.vue'
export { default as DropdownMenuContent } from './DropdownMenuContent.vue'
export { default as DropdownMenuGroup } from './DropdownMenuGroup.vue'
export { default as DropdownMenuItem } from './DropdownMenuItem.vue'
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue'
export { default as DropdownMenuRadioGroup } from './DropdownMenuRadioGroup.vue'
export { default as DropdownMenuRadioItem } from './DropdownMenuRadioItem.vue'
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue'
export { default as DropdownMenuShortcut } from './DropdownMenuShortcut.vue'
export { default as DropdownMenuSub } from './DropdownMenuSub.vue'
export { default as DropdownMenuSubContent } from './DropdownMenuSubContent.vue'
export { default as DropdownMenuSubTrigger } from './DropdownMenuSubTrigger.vue'
export { default as DropdownMenuTrigger } from './DropdownMenuTrigger.vue'
export { menuContentClass, menuItemVariants, menuLabelClass, menuSeparatorClass, menuShortcutClass } from './styles'
export type { MenuItemVariants } from './styles'

export interface DropdownMenuContentProps extends RekaContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuSubContentProps extends RekaSubContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuItemProps extends RekaItemProps {
  /** `destructive` colours the item for irreversible actions such as delete. */
  variant?: MenuItemVariants['variant']
  /** Indent the item so that it lines up with items that have a checkbox or radio indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuCheckboxItemProps extends RekaCheckboxItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuRadioItemProps extends RekaRadioItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuLabelProps extends RekaLabelProps {
  /** Indent the label so that it lines up with items that have an indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuSeparatorProps extends RekaSeparatorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuSubTriggerProps extends RekaSubTriggerProps {
  /** Indent the trigger so that it lines up with items that have an indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuShortcutProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
