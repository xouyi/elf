<script setup lang="ts">
import type { NavigationMenuTriggerProps } from './index'
import { ChevronDown } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuTrigger, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { navigationMenuTriggerStyle } from './styles'

const props = defineProps<NavigationMenuTriggerProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="forwarded"
    :class="cn(navigationMenuTriggerStyle(), props.class)"
  >
    <slot />
    <ChevronDown
      class="relative top-px ml-0.5 size-3 transition-transform duration-200 group-data-[state=open]/navigation-trigger:rotate-180 motion-reduce:transition-none"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
