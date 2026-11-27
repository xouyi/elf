<script setup lang="ts">
import type { SidebarMenuButtonProps } from './index'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { useSidebar, useSidebarPanel } from './context'
import { sidebarMenuButtonVariants } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: 'button',
  isActive: false,
  variant: 'default',
  size: 'default',
})

const sidebar = useSidebar()
const panel = useSidebarPanel()

// The label is only needed (and the tooltip only wanted) while the sidebar is an icon rail on desktop.
const tooltipDisabled = computed(() => !props.tooltip || sidebar.isMobile.value || sidebar.state.value !== 'collapsed' || panel?.collapsible.value !== 'icon')

function onClick(event: MouseEvent) {
  // A link navigates: close the phone sheet so the page is visible. A button (for example a collapsible trigger) keeps it open.
  if (sidebar.isMobile.value && (event.currentTarget as HTMLElement).closest('a[href]'))
    sidebar.setOpenMobile(false)
}
</script>

<template>
  <Tooltip :disabled="tooltipDisabled">
    <TooltipTrigger as-child>
      <Primitive
        v-bind="$attrs"
        data-slot="sidebar-menu-button"
        :data-active="props.isActive"
        :data-variant="props.variant"
        :data-size="props.size"
        :aria-current="props.isActive ? 'page' : undefined"
        :type="props.as === 'button' ? 'button' : undefined"
        :as="props.as"
        :as-child="props.asChild"
        :class="cn(sidebarMenuButtonVariants({ variant: props.variant, size: props.size }), props.class)"
        @click="onClick"
      >
        <slot />
      </Primitive>
    </TooltipTrigger>
    <TooltipContent
      v-if="props.tooltip"
      :side="panel?.side.value === 'right' ? 'left' : 'right'"
      align="center"
    >
      {{ props.tooltip }}
    </TooltipContent>
  </Tooltip>
</template>
