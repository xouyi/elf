<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { useSidebar } from './context'

const props = withDefaults(defineProps<{
  /** Accessible name of the rail button (use your app language). */
  label?: string
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), {
  label: 'Toggle sidebar',
})

const sidebar = useSidebar()
</script>

<template>
  <!-- A pointer affordance only: keyboard users have the trigger and the shortcut, so it stays out of the tab order. -->
  <button
    data-slot="sidebar-rail"
    type="button"
    tabindex="-1"
    :aria-label="props.label"
    :title="props.label"
    :class="cn(
      'absolute inset-y-0 z-20 hidden w-4 transition-colors outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-border md:block motion-reduce:transition-none',
      'group-data-[side=left]:-right-2 group-data-[side=left]:cursor-w-resize group-data-[side=right]:-left-2 group-data-[side=right]:cursor-e-resize',
      'group-data-[collapsible=offcanvas]:cursor-e-resize group-data-[collapsible=offcanvas]:group-data-[side=right]:cursor-w-resize',
      props.class,
    )"
    @click="sidebar.toggleSidebar()"
  />
</template>
