<script setup lang="ts">
import type { ElfToastObject } from './use-toast'
import { CircleAlert, CircleCheck, LoaderCircle, TriangleAlert, X } from '@lucide/vue'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../button'
import { toastVariants } from './index'

const props = defineProps<{
  /** The queued toast to render. */
  toast: ElfToastObject
  /** Render the dismiss button. */
  closeButton: boolean
  /** Accessible name of the dismiss button. */
  closeLabel: string
}>()

const variant = computed(() => props.toast.data?.variant ?? 'default')
const loading = computed(() => props.toast.status === 'loading')
const icons = { success: CircleCheck, warning: TriangleAlert, destructive: CircleAlert }
const icon = computed(() => (loading.value ? LoaderCircle : variant.value === 'default' ? undefined : icons[variant.value]))
</script>

<template>
  <ToastRoot
    data-slot="toast"
    :data-variant="variant"
    :toast="props.toast"
    :class="toastVariants({ variant })"
  >
    <span
      v-if="icon"
      data-slot="toast-icon"
      aria-hidden="true"
      :class="cn('mt-0.5 shrink-0 [&_svg]:size-4', variant === 'destructive' && 'text-destructive-text', variant === 'success' && 'text-success', variant === 'warning' && 'text-warning')"
    >
      <component :is="icon" :class="loading && 'animate-spin motion-reduce:animate-none'" />
    </span>
    <div data-slot="toast-content" class="grid min-w-0 flex-1 gap-1">
      <ToastTitle data-slot="toast-title" class="text-sm leading-snug font-medium" />
      <ToastDescription data-slot="toast-description" class="text-sm leading-snug text-muted-foreground" />
      <ToastAction
        data-slot="toast-action"
        :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-2 justify-self-start max-sm:h-10')"
      />
    </div>
    <ToastClose
      v-if="props.closeButton"
      data-slot="toast-close"
      class="absolute top-2 right-2 inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:size-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4"
    >
      <X />
      <span class="sr-only">{{ props.closeLabel }}</span>
    </ToastClose>
  </ToastRoot>
</template>
