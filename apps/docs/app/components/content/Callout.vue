<script setup lang="ts">
import { AlertTriangle, Info, Lightbulb, OctagonAlert } from '@lucide/vue'

const props = withDefaults(defineProps<{ type?: 'info' | 'tip' | 'warning' | 'danger', title?: string }>(), { type: 'info' })
const styles = {
  info: { icon: Info, color: 'text-primary', border: 'border-l-primary' },
  tip: { icon: Lightbulb, color: 'text-success', border: 'border-l-success' },
  warning: { icon: AlertTriangle, color: 'text-warning', border: 'border-l-warning' },
  danger: { icon: OctagonAlert, color: 'text-destructive', border: 'border-l-destructive' },
}
const style = computed(() => styles[props.type])
</script>

<template>
  <aside class="my-5 flex gap-3 rounded-lg border border-l-4 bg-card p-4 text-sm" :class="style.border" role="note">
    <component :is="style.icon" class="mt-0.5 size-4 shrink-0" :class="style.color" aria-hidden="true" />
    <div class="min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <p v-if="title" class="mb-1 font-semibold">
        {{ title }}
      </p>
      <slot />
    </div>
  </aside>
</template>
