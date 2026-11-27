<script setup lang="ts">
import type { ToasterPosition, ToasterProps } from './index'
import { ToastPortal, ToastProvider, ToastViewport } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import ToastList from './ToastList.vue'
import { toastManager } from './use-toast'

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'bottom-right',
  limit: 3,
  duration: 5000,
  label: 'Notifications ({hotkey})',
  announceLabel: 'Notification',
  hotkey: () => ['F8'],
  closeLabel: 'Close',
  closeButton: true,
})

const swipeDirections: Record<ToasterPosition, 'left' | 'right' | 'up' | 'down'> = {
  'top-left': 'left',
  'top-center': 'up',
  'top-right': 'right',
  'bottom-left': 'left',
  'bottom-center': 'down',
  'bottom-right': 'right',
}

const placement: Record<ToasterPosition, string> = {
  'top-left': 'top-0 left-0 flex-col-reverse pt-[max(1rem,env(safe-area-inset-top))] [--elf-toast-shift:-0.5rem] sm:max-w-sm',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col-reverse pt-[max(1rem,env(safe-area-inset-top))] [--elf-toast-shift:-0.5rem] sm:max-w-sm',
  'top-right': 'top-0 right-0 flex-col-reverse pt-[max(1rem,env(safe-area-inset-top))] [--elf-toast-shift:-0.5rem] sm:max-w-sm',
  'bottom-left': 'bottom-0 left-0 flex-col pb-[max(1rem,env(safe-area-inset-bottom))] [--elf-toast-shift:0.5rem] sm:max-w-sm',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col pb-[max(1rem,env(safe-area-inset-bottom))] [--elf-toast-shift:0.5rem] sm:max-w-sm',
  'bottom-right': 'bottom-0 right-0 flex-col pb-[max(1rem,env(safe-area-inset-bottom))] [--elf-toast-shift:0.5rem] sm:max-w-sm',
}

const swipeDirection = computed(() => swipeDirections[props.position])
</script>

<template>
  <ToastProvider
    :toast-manager="toastManager"
    :limit="props.limit"
    :duration="props.duration"
    :label="props.announceLabel"
    :swipe-direction="swipeDirection"
  >
    <ToastList :close-button="props.closeButton" :close-label="props.closeLabel" />
    <ToastPortal>
      <ToastViewport
        data-slot="toaster"
        :hotkey="props.hotkey"
        :label="props.label"
        :class="cn('fixed z-[100] m-0 flex max-h-dvh w-full list-none gap-2 px-4 py-4 outline-none', placement[props.position], props.class)"
      />
    </ToastPortal>
  </ToastProvider>
</template>
