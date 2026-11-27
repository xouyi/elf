import type { PrimitiveProps } from 'reka-ui'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { sidebarContextKey, sidebarPanelKey, useSidebar, useSidebarPanel } from './context'
export type { SidebarCollapsible, SidebarContext, SidebarPanelContext, SidebarSide, SidebarState } from './context'
export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarContent } from './SidebarContent.vue'
export { default as SidebarFooter } from './SidebarFooter.vue'
export { default as SidebarGroup } from './SidebarGroup.vue'
export { default as SidebarGroupContent } from './SidebarGroupContent.vue'
export { default as SidebarGroupLabel } from './SidebarGroupLabel.vue'
export { default as SidebarHeader } from './SidebarHeader.vue'
export { default as SidebarInset } from './SidebarInset.vue'
export { default as SidebarMenu } from './SidebarMenu.vue'
export { default as SidebarMenuBadge } from './SidebarMenuBadge.vue'
export { default as SidebarMenuButton } from './SidebarMenuButton.vue'
export { default as SidebarMenuItem } from './SidebarMenuItem.vue'
export { default as SidebarMenuSub } from './SidebarMenuSub.vue'
export { default as SidebarMenuSubButton } from './SidebarMenuSubButton.vue'
export { default as SidebarMenuSubItem } from './SidebarMenuSubItem.vue'
export { default as SidebarProvider } from './SidebarProvider.vue'
export { default as SidebarRail } from './SidebarRail.vue'
export { default as SidebarSeparator } from './SidebarSeparator.vue'
export { default as SidebarTrigger } from './SidebarTrigger.vue'

/** Width in px of the viewport below which the sidebar becomes an off-canvas sheet (Tailwind `md`). */
export const SIDEBAR_MOBILE_BREAKPOINT = 768

export const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground motion-reduce:transition-none group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border border-border bg-background hover:border-transparent',
      },
      size: {
        default: 'h-10 text-sm md:h-8',
        sm: 'h-9 text-xs md:h-7',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>

export interface SidebarProviderProps {
  /** Desktop open state (`v-model:open`). Uncontrolled when omitted: it starts at `defaultOpen`. */
  open?: boolean
  /** Initial desktop state when `open` is not controlled. */
  defaultOpen?: boolean
  /**
   * Key of the Ctrl/Cmd shortcut that toggles the sidebar (attribute: `shortcut`). The default is `b` (Ctrl+B or
   * Cmd+B); `false` turns the shortcut off. Ignored while focus is in a text field.
   */
  shortcut?: string | false
  /**
   * `localStorage` key that remembers the desktop state (attribute: `storage-key`). It is read after mount, so the
   * server render and the first client render always use `defaultOpen`. Persistence is off when omitted.
   */
  storageKey?: string
  /** Extra classes for the wrapper, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface SidebarProps {
  /** Edge the sidebar sits on. */
  side?: 'left' | 'right'
  /** `sidebar` is flush with the edge, `floating` is an inset card, `inset` frames an `ElfSidebarInset`. */
  variant?: 'sidebar' | 'floating' | 'inset'
  /**
   * How the sidebar collapses on desktop: `offcanvas` slides away completely, `icon` shrinks to an icon rail (use
   * `tooltip` on each menu button) and `none` is always expanded (also on phones, with no sheet).
   */
  collapsible?: 'offcanvas' | 'icon' | 'none'
  /** Accessible name of the navigation landmark and of the mobile sheet (use your app language). */
  label?: string
  /** Description announced when the mobile sheet opens. Visually hidden. */
  description?: string
  /** Element of the panel, `nav` by default. */
  as?: PrimitiveProps['as']
  /** Extra classes for the panel, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface SidebarTriggerProps {
  /** Accessible name of the button (use your app language). */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface SidebarMenuButtonProps extends PrimitiveProps {
  /** Marks the current page: sets `data-active` and `aria-current="page"`. */
  isActive?: boolean
  /** Label shown in a tooltip while the sidebar is collapsed to icons. */
  tooltip?: string
  /** Visual style. */
  variant?: SidebarMenuButtonVariants['variant']
  /** Height of the button; it is taller on phones for touch. */
  size?: SidebarMenuButtonVariants['size']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface SidebarMenuSubButtonProps extends PrimitiveProps {
  /** Marks the current page: sets `data-active` and `aria-current="page"`. */
  isActive?: boolean
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
