<script setup lang="ts">
import type { SidebarMenuSubButtonProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'
import { useSidebar } from './context'

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  as: 'a',
  isActive: false,
})

const sidebar = useSidebar()

function onClick(event: MouseEvent) {
  // A link navigates: close the phone sheet so the page is visible.
  if (sidebar.isMobile.value && (event.currentTarget as HTMLElement).closest('a[href]'))
    sidebar.setOpenMobile(false)
}
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-sub-button"
    :data-active="props.isActive"
    :aria-current="props.isActive ? 'page' : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex h-9 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground md:h-7 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0', props.class)"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
