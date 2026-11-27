<script setup lang="ts">
import type { DropdownMenuLabelProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuLabel, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuLabelClass } from './styles'

const props = defineProps<DropdownMenuLabelProps>()
const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    :data-inset="props.inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(menuLabelClass, props.class)"
  >
    <slot />
  </DropdownMenuLabel>
</template>
