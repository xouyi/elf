<script setup lang="ts">
import type { AlertTitleProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<AlertTitleProps>()
</script>

<template>
  <div
    data-slot="alert-title"
    :class="cn(
      'leading-snug font-medium tracking-tight',
      'group-data-[variant=destructive]/alert:text-destructive-text group-data-[variant=success]/alert:text-success-text group-data-[variant=warning]/alert:text-warning-text',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
