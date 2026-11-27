<script setup lang="ts">
import type { EmptyPartProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<EmptyPartProps>()
</script>

<template>
  <p
    data-slot="empty-description"
    :class="cn('text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', props.class)"
  >
    <slot />
  </p>
</template>
