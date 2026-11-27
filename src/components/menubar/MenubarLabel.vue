<script setup lang="ts">
import type { MenubarLabelProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarLabel, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuLabelClass } from '../dropdown-menu'

const props = defineProps<MenubarLabelProps>()
const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarLabel
    data-slot="menubar-label"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuLabelClass, props.class)"
  >
    <slot />
  </MenubarLabel>
</template>
