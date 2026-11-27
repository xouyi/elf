<script setup lang="ts">
import type { AlertProps } from './index'
import { CircleAlert, CircleCheck, Info, TriangleAlert } from '@lucide/vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { alertVariants } from './index'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'default',
  showIcon: true,
})

const icons = { default: Info, destructive: CircleAlert, success: CircleCheck, warning: TriangleAlert }
const role = computed(() => {
  if (props.role === 'none')
    return undefined
  return props.role ?? (props.variant === 'destructive' ? 'alert' : 'status')
})
</script>

<template>
  <div
    data-slot="alert"
    :data-variant="props.variant"
    :role="role"
    :class="cn(alertVariants({ variant: props.variant }), props.class)"
  >
    <span
      v-if="props.showIcon"
      data-slot="alert-icon"
      aria-hidden="true"
      class="mt-0.5 shrink-0 group-data-[variant=destructive]/alert:text-destructive-text group-data-[variant=success]/alert:text-success-text group-data-[variant=warning]/alert:text-warning-text [&_svg]:size-4"
    >
      <slot name="icon">
        <component :is="icons[props.variant ?? 'default']" />
      </slot>
    </span>
    <div data-slot="alert-content" class="grid min-w-0 flex-1 gap-1">
      <slot />
    </div>
  </div>
</template>
