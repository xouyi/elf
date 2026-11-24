<script setup lang="ts">
import type { BadgeProps } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'
import { badgeVariants } from './index'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
  variant: 'default',
})
const delegatedProps = reactiveOmit(props, 'class', 'variant')
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="props.variant"
    :class="cn(badgeVariants({ variant: props.variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
