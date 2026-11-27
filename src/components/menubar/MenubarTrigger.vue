<script setup lang="ts">
import type { MenubarTriggerProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarTrigger, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<MenubarTriggerProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    v-bind="forwarded"
    :class="cn(
      'flex h-full items-center rounded-sm px-3 text-sm font-medium outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      props.class,
    )"
  >
    <slot />
  </MenubarTrigger>
</template>
