<script setup lang="ts">
import type { EmptyTitleProps } from './index'
import { Primitive } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<EmptyTitleProps>(), {
  as: 'h3',
})
</script>

<template>
  <Primitive
    data-slot="empty-title"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('text-lg font-medium tracking-tight', props.class)"
  >
    <slot />
  </Primitive>
</template>
