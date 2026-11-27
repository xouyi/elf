<script setup lang="ts">
import type { ToggleGroupItemExtraProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, useForwardProps } from 'reka-ui'
import { computed, inject } from 'vue'
import { cn } from '../../lib/utils'
import { toggleGroupKey, toggleVariants } from './index'

const props = defineProps<ToggleGroupItemExtraProps>()

const group = inject(toggleGroupKey, {})
const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size')
const forwarded = useForwardProps(delegatedProps)
const variant = computed(() => props.variant ?? group.variant ?? 'default')
const size = computed(() => props.size ?? group.size ?? 'default')
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    data-slot="toggle-group-item"
    :data-variant="variant"
    :data-size="size"
    v-bind="forwarded"
    :class="cn(
      toggleVariants({ variant, size }),
      group.joined && 'rounded-none first:rounded-s-md last:rounded-e-md focus-visible:z-10',
      group.joined && variant === 'outline' && 'not-first:-ms-px',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
