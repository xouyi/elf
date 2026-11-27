<script setup lang="ts">
import type { SidebarProps } from './index'
import { Primitive } from 'reka-ui'
import { computed, provide } from 'vue'
import { cn } from '../../lib/utils'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '../sheet'
import { sidebarPanelKey, useSidebar } from './context'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
  label: 'Sidebar',
  description: 'Application navigation.',
  as: 'nav',
})

const sidebar = useSidebar()

// Parts read this to show tooltips and to place them on the correct side. On a phone the sheet is always expanded.
provide(sidebarPanelKey, {
  collapsible: computed(() => (sidebar.isMobile.value ? 'none' : props.collapsible)),
  side: computed(() => (sidebar.isMobile.value ? 'left' : props.side)),
})

const collapsedAttr = computed(() => (sidebar.state.value === 'collapsed' && props.collapsible !== 'none' ? props.collapsible : ''))
const floating = computed(() => props.variant !== 'sidebar')
</script>

<template>
  <!-- Phones: an off-canvas sheet (a modal dialog) that slides in from the left. -->
  <Sheet
    v-if="sidebar.isMobile.value && props.collapsible !== 'none'"
    :open="sidebar.openMobile.value"
    @update:open="sidebar.setOpenMobile"
  >
    <SheetContent
      side="left"
      :show-close-button="false"
      data-slot="sidebar-sheet"
      v-bind="$attrs"
      :class="cn('group w-[min(18rem,calc(100%-2.5rem))] gap-0 overflow-hidden bg-card p-0 text-card-foreground sm:max-w-none sm:p-0', props.class)"
    >
      <SheetTitle class="sr-only">
        {{ props.label }}
      </SheetTitle>
      <SheetDescription class="sr-only">
        {{ props.description }}
      </SheetDescription>
      <Primitive
        :as="props.as"
        :aria-label="props.label"
        class="flex h-full w-full min-w-0 flex-col"
      >
        <slot />
      </Primitive>
    </SheetContent>
  </Sheet>

  <!-- Desktop: a sticky column. Its width animates; the panel keeps its own width while it slides away (offcanvas). -->
  <div
    v-else
    data-slot="sidebar"
    :data-state="sidebar.state.value"
    :data-collapsible="collapsedAttr"
    :data-variant="props.variant"
    :data-side="props.side"
    :class="cn(
      'group peer sticky top-0 h-svh shrink-0 text-card-foreground transition-[width] duration-200 ease-linear max-md:hidden motion-reduce:transition-none',
      props.collapsible === 'none' ? 'w-(--sidebar-width) max-md:flex' : 'w-(--sidebar-width) data-[collapsible=icon]:w-(--sidebar-width-icon) data-[collapsible=offcanvas]:w-0',
      floating && 'p-2 data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]',
      props.variant === 'inset' && (props.side === 'left' ? 'pr-0' : 'pl-0'),
      props.side === 'right' && 'order-last',
    )"
  >
    <Primitive
      :as="props.as"
      :aria-label="props.label"
      v-bind="$attrs"
      data-slot="sidebar-panel"
      :class="cn(
        'flex h-full min-w-0 flex-col transition-[transform,visibility] duration-200 ease-linear motion-reduce:transition-none',
        props.collapsible === 'offcanvas' ? 'w-(--sidebar-width)' : 'w-full',
        props.variant === 'sidebar' && 'bg-card',
        props.variant === 'sidebar' && (props.side === 'left' ? 'border-r' : 'border-l'),
        props.variant === 'floating' && 'rounded-lg border bg-card shadow-sm',
        props.variant === 'inset' && 'bg-transparent',
        props.collapsible === 'offcanvas' && 'group-data-[collapsible=offcanvas]:invisible',
        props.collapsible === 'offcanvas' && (props.side === 'left' ? 'group-data-[collapsible=offcanvas]:-translate-x-full' : 'group-data-[collapsible=offcanvas]:translate-x-full'),
        props.class,
      )"
    >
      <slot />
    </Primitive>
    <!-- Outside the panel so it stays visible and unclipped while the panel slides away. -->
    <slot name="rail" />
  </div>
</template>
