<script setup lang="ts">
import type { NavigationMenuListProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuList, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<NavigationMenuListProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="forwarded"
    :class="cn('group flex flex-1 list-none flex-wrap items-center justify-center gap-1', props.class)"
  >
    <slot />
  </NavigationMenuList>
</template>
