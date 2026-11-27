<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuSeparator, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuSeparatorClass } from './styles'

const props = defineProps<DropdownMenuSeparatorProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="forwarded"
    :class="cn(menuSeparatorClass, props.class)"
  />
</template>
