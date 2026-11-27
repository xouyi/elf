<script setup lang="ts">
import type { ContextMenuItemEmits } from 'reka-ui'
import type { ContextMenuItemProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from '../dropdown-menu'

const props = withDefaults(defineProps<ContextMenuItemProps>(), {
  variant: 'default',
})
const emits = defineEmits<ContextMenuItemEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'inset')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    :data-variant="props.variant"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuItemVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </ContextMenuItem>
</template>
