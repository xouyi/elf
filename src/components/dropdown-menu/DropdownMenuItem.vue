<script setup lang="ts">
import type { DropdownMenuItemEmits } from 'reka-ui'
import type { DropdownMenuItemProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from './styles'

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  variant: 'default',
})
const emits = defineEmits<DropdownMenuItemEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'inset')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-variant="props.variant"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuItemVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
