<script setup lang="ts">
import type { EmptyMediaProps } from './index'
import { cn } from '../../lib/utils'
import { emptyMediaVariants } from './index'

const props = withDefaults(defineProps<EmptyMediaProps>(), {
  variant: 'default',
})
</script>

<template>
  <div
    data-slot="empty-media"
    :data-variant="props.variant"
    aria-hidden="true"
    :class="cn(emptyMediaVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </div>
</template>
