<script setup lang="ts">
import type { NavigationMenuViewportProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuViewport, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<NavigationMenuViewportProps>(), {
  align: 'start',
})
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuViewport
    data-slot="navigation-menu-viewport"
    v-bind="forwarded"
    :class="cn(
      'absolute top-full left-(--reka-navigation-menu-viewport-left) mt-1.5 h-(--reka-navigation-menu-viewport-height) w-(--reka-navigation-menu-viewport-width) max-w-[calc(100vw-1.25rem)] origin-top overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-zoom-in_120ms_ease-out] motion-reduce:animate-none!',
      props.class,
    )"
  />
</template>
