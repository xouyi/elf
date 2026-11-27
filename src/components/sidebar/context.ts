import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export type SidebarState = 'expanded' | 'collapsed'
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'
export type SidebarSide = 'left' | 'right'

export interface SidebarContext {
  /** `expanded` or `collapsed`. On a phone the sheet is separate: see `openMobile`. */
  state: ComputedRef<SidebarState>
  /** Desktop open state (the expanded sidebar). Read-only: change it with `setOpen`. */
  open: Readonly<Ref<boolean>>
  /** Open or collapse the desktop sidebar. Emits `update:open` and is persisted when `storageKey` is set. */
  setOpen: (value: boolean) => void
  /** Whether the off-canvas sheet is open (phones, below the `md` breakpoint). */
  openMobile: Readonly<Ref<boolean>>
  /** Open or close the mobile sheet. */
  setOpenMobile: (value: boolean) => void
  /** `true` below the `md` breakpoint (768px) once mounted; the sidebar then renders as a sheet. */
  isMobile: ComputedRef<boolean>
  /** Toggle the sheet on phones and the desktop sidebar elsewhere. */
  toggleSidebar: () => void
}

/** What the nearest `ElfSidebar` tells its parts (not the provider: a page may hold more than one sidebar). */
export interface SidebarPanelContext {
  collapsible: ComputedRef<SidebarCollapsible>
  side: ComputedRef<SidebarSide>
}

export const sidebarContextKey: InjectionKey<SidebarContext> = Symbol('elf-sidebar')
export const sidebarPanelKey: InjectionKey<SidebarPanelContext> = Symbol('elf-sidebar-panel')

/** The surrounding `ElfSidebarProvider`: state and actions for custom triggers and layouts. Throws outside a provider. */
export function useSidebar(): SidebarContext {
  const context = inject(sidebarContextKey, null)
  if (!context)
    throw new Error('useSidebar() must be used inside <ElfSidebarProvider>.')
  return context
}

/** The nearest `ElfSidebar`, or `undefined` outside one. */
export function useSidebarPanel(): SidebarPanelContext | undefined {
  return inject(sidebarPanelKey, undefined)
}
