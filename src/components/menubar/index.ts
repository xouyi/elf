import type { MenubarCheckboxItemProps as RekaCheckboxItemProps, MenubarContentProps as RekaContentProps, MenubarItemProps as RekaItemProps, MenubarLabelProps as RekaLabelProps, MenubarRadioItemProps as RekaRadioItemProps, MenubarRootProps as RekaRootProps, MenubarTriggerProps as RekaTriggerProps, MenubarSeparatorProps as RekaSeparatorProps, MenubarSubContentProps as RekaSubContentProps, MenubarSubTriggerProps as RekaSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { MenuItemVariants } from '../dropdown-menu'

export { default as Menubar } from './Menubar.vue'
export { default as MenubarCheckboxItem } from './MenubarCheckboxItem.vue'
export { default as MenubarContent } from './MenubarContent.vue'
export { default as MenubarGroup } from './MenubarGroup.vue'
export { default as MenubarItem } from './MenubarItem.vue'
export { default as MenubarLabel } from './MenubarLabel.vue'
export { default as MenubarMenu } from './MenubarMenu.vue'
export { default as MenubarRadioGroup } from './MenubarRadioGroup.vue'
export { default as MenubarRadioItem } from './MenubarRadioItem.vue'
export { default as MenubarSeparator } from './MenubarSeparator.vue'
export { default as MenubarShortcut } from './MenubarShortcut.vue'
export { default as MenubarSub } from './MenubarSub.vue'
export { default as MenubarSubContent } from './MenubarSubContent.vue'
export { default as MenubarSubTrigger } from './MenubarSubTrigger.vue'
export { default as MenubarTrigger } from './MenubarTrigger.vue'

export interface MenubarProps extends RekaRootProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarTriggerProps extends RekaTriggerProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarContentProps extends RekaContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarSubContentProps extends RekaSubContentProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarItemProps extends RekaItemProps {
  /** `destructive` colours the item for irreversible actions such as delete. */
  variant?: MenuItemVariants['variant']
  /** Indent the item so that it lines up with items that have a checkbox or radio indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarCheckboxItemProps extends RekaCheckboxItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarRadioItemProps extends RekaRadioItemProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarLabelProps extends RekaLabelProps {
  /** Indent the label so that it lines up with items that have an indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarSeparatorProps extends RekaSeparatorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarSubTriggerProps extends RekaSubTriggerProps {
  /** Indent the trigger so that it lines up with items that have an indicator. */
  inset?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface MenubarShortcutProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
