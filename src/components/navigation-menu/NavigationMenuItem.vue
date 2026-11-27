<script setup lang="ts">
import type { NavigationMenuItemProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuItem, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<NavigationMenuItemProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    v-bind="forwarded"
    :class="cn('relative', props.class)"
  >
    <slot />
  </NavigationMenuItem>
</template>
