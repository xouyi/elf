<script setup lang="ts">
import type { SidebarTriggerProps } from './index'
import { PanelLeft } from '@lucide/vue'
import { cn } from '../../lib/utils'
import { Button } from '../button'
import { useSidebar } from './context'

const props = withDefaults(defineProps<SidebarTriggerProps>(), {
  label: 'Toggle sidebar',
})

const sidebar = useSidebar()
</script>

<template>
  <Button
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    type="button"
    :aria-expanded="sidebar.isMobile.value ? sidebar.openMobile.value : sidebar.open.value"
    :aria-haspopup="sidebar.isMobile.value ? 'dialog' : undefined"
    :class="cn('size-10 md:size-8', props.class)"
    @click="sidebar.toggleSidebar()"
  >
    <slot>
      <PanelLeft />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
