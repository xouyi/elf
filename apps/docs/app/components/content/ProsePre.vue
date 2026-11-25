<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string
  class?: string
}>()
</script>

<template>
  <div class="code-block relative my-5 overflow-hidden rounded-lg border">
    <div v-if="filename" class="border-b bg-muted px-4 py-2 font-mono text-xs text-muted-foreground">
      {{ filename }}
    </div>
    <div class="absolute top-1.5 right-1.5 z-10" :class="filename ? 'top-10' : ''">
      <CopyButton v-if="code" :text="code" />
    </div>
    <pre :class="props.class" tabindex="0"><slot /></pre>
  </div>
</template>
