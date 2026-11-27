<script setup lang="ts">
import type { NavigationMenuContentEmits } from 'reka-ui'
import type { NavigationMenuContentProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<NavigationMenuContentProps>()
const emits = defineEmits<NavigationMenuContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    v-bind="forwarded"
    :class="cn(
      'p-2 data-[motion^=from-]:animate-[elf-fade-in_150ms_ease-out] data-[motion^=to-]:animate-[elf-fade-out_150ms_ease-in_forwards] motion-reduce:animate-none!',
      'group-data-[viewport=false]/navigation-menu:absolute group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:left-0 group-data-[viewport=false]/navigation-menu:z-50 group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-md group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-[elf-zoom-in_120ms_ease-out] group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards]',
      props.class,
    )"
  >
    <slot />
  </NavigationMenuContent>
</template>
