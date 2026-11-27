<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuIndicator, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<NavigationMenuIndicatorProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="forwarded"
    :class="cn(
      'top-full z-1 flex h-2 items-end justify-center overflow-hidden data-[orientation=horizontal]:absolute data-[orientation=horizontal]:left-(--reka-navigation-menu-indicator-position) data-[orientation=horizontal]:w-(--reka-navigation-menu-indicator-size) data-[state=hidden]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=visible]:animate-[elf-fade-in_150ms_ease-out] motion-reduce:animate-none!',
      props.class,
    )"
  >
    <div class="relative top-[60%] size-2 rotate-45 rounded-tl-sm border-t border-l bg-popover shadow-md" />
  </NavigationMenuIndicator>
</template>
