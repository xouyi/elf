<script setup lang="ts">
import type { ContextMenuLabelProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuLabel, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuLabelClass } from '../dropdown-menu'

const props = defineProps<ContextMenuLabelProps>()
const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuLabelClass, props.class)"
  >
    <slot />
  </ContextMenuLabel>
</template>
