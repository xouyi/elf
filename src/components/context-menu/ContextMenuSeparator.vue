<script setup lang="ts">
import type { ContextMenuSeparatorProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuSeparator, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuSeparatorClass } from '../dropdown-menu'

const props = defineProps<ContextMenuSeparatorProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    v-bind="forwarded"
    :class="cn(menuSeparatorClass, props.class)"
  />
</template>
