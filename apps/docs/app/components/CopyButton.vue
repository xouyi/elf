<script setup lang="ts">
import { Check, Copy } from '@lucide/vue'

const props = withDefaults(defineProps<{ text: string, label?: string }>(), { label: 'Copy code' })
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
  }
  catch {
    // Clipboard API unavailable (insecure context): fall back to a temporary textarea.
    const area = document.createElement('textarea')
    area.value = props.text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.append(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1800)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <ElfButton variant="ghost" size="icon" class="size-8 text-muted-foreground" :aria-label="label" @click="copy">
    <Check v-if="copied" class="text-success" />
    <Copy v-else />
    <span class="sr-only" role="status" aria-live="polite">{{ copied ? 'Copied' : '' }}</span>
  </ElfButton>
</template>
