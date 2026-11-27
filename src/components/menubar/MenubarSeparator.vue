<script setup lang="ts">
import type { MenubarSeparatorProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { MenubarSeparator, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuSeparatorClass } from '../dropdown-menu'

const props = defineProps<MenubarSeparatorProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSeparator
    data-slot="menubar-separator"
    v-bind="forwarded"
    :class="cn(menuSeparatorClass, props.class)"
  />
</template>
