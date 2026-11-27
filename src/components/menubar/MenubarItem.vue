<script setup lang="ts">
import type { MenubarItemEmits } from 'reka-ui'
import type { MenubarItemProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemVariants } from '../dropdown-menu'

const props = withDefaults(defineProps<MenubarItemProps>(), {
  variant: 'default',
})
const emits = defineEmits<MenubarItemEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'inset')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarItem
    data-slot="menubar-item"
    :data-variant="props.variant"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuItemVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </MenubarItem>
</template>
