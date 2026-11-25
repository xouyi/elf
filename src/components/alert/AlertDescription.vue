<script setup lang="ts">
import type { AlertDescriptionProps } from './index'
import { cn } from '../../lib/utils'

const props = defineProps<AlertDescriptionProps>()
</script>

<template>
  <div
    data-slot="alert-description"
    :class="cn(
      'text-sm text-muted-foreground [&_p]:leading-relaxed',
      'group-data-[variant=destructive]/alert:text-foreground/80 group-data-[variant=success]/alert:text-foreground/80 group-data-[variant=warning]/alert:text-foreground/80',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
