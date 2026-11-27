<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from './index'
import { ChevronRight } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuSubTrigger, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from '../dropdown-menu'

const props = defineProps<ContextMenuSubTriggerProps>()
const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuItemVariants(), 'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground', props.class)"
  >
    <slot />
    <ChevronRight class="ml-auto size-4 rtl:rotate-180" />
  </ContextMenuSubTrigger>
</template>
