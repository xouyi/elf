<script setup lang="ts">
import type { ElfToastObject } from './use-toast'
import { useToastManager } from 'reka-ui'
import { computed, nextTick, ref, watch } from 'vue'
import ToastItem from './ToastItem.vue'

defineProps<{
  /** Render the dismiss button on every toast. */
  closeButton: boolean
  /** Accessible name of the dismiss button. */
  closeLabel: string
}>()

// Closed toasts stay in the list until their exit animation ends. Render oldest first: Reka ranks toasts by mount order
// (for `limit`), and the toaster flips the visual order with flex-direction.
const { toasts } = useToastManager()
const ordered = computed(() => [...(toasts.value as ElfToastObject[])].reverse())

// Reka announces each toast from an aria-hidden live region, which assistive technology may skip. These two
// persistent, visually hidden regions are the reliable announcement: text written into an existing live region is
// read, polite for ordinary toasts and assertive (role=alert) for destructive ones.
const polite = ref('')
const assertive = ref('')
const seen = new Map<string, number>()

watch(() => (toasts.value as ElfToastObject[]).map(t => `${t.id}:${t.updateKey}:${t.open}`).join('|'), async () => {
  for (const toast of toasts.value as ElfToastObject[]) {
    if (!toast.open || seen.get(toast.id) === toast.updateKey)
      continue
    seen.set(toast.id, toast.updateKey)
    const text = [toast.title, toast.description].filter(Boolean).join('. ')
    const target = toast.type === 'foreground' ? assertive : polite
    target.value = ''
    await nextTick()
    target.value = text
  }
  const ids = new Set((toasts.value as ElfToastObject[]).map(t => t.id))
  for (const id of seen.keys()) {
    if (!ids.has(id))
      seen.delete(id)
  }
}, { immediate: true })
</script>

<template>
  <div data-slot="toast-announcer" class="sr-only">
    <div role="status" aria-live="polite" aria-atomic="true">
      {{ polite }}
    </div>
    <div role="alert" aria-live="assertive" aria-atomic="true">
      {{ assertive }}
    </div>
  </div>
  <ToastItem
    v-for="toast in ordered"
    :key="toast.id"
    :toast="toast"
    :close-button="closeButton"
    :close-label="closeLabel"
  />
</template>
