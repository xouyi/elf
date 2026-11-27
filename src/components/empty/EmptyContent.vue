<script setup lang="ts">
import type { EmptyPartProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<EmptyPartProps>()
</script>

<template>
  <div
    data-slot="empty-content"
    :class="cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-3 text-sm text-balance', props.class)"
  >
    <slot />
  </div>
</template>
