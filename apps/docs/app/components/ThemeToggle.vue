<script setup lang="ts">
import type { SiteTheme } from '~/composables/useSiteTheme'

defineProps<{ modelValue: SiteTheme, label?: string, compact?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [theme: SiteTheme] }>()
</script>

<template>
  <div role="group" :aria-label="label ?? 'Theme'" class="inline-flex items-center border bg-muted p-0.5 rounded-lg">
    <ElfButton
      v-for="t in siteThemes"
      :key="t.value"
      :variant="modelValue === t.value ? 'secondary' : 'ghost'"
      size="sm"
      class="h-7 gap-1.5 px-2 text-xs"
      :class="modelValue === t.value ? 'shadow-sm' : 'text-muted-foreground'"
      :aria-pressed="modelValue === t.value"
      :aria-label="`${t.label} theme`"
      @click="emit('update:modelValue', t.value)"
    >
      <span class="size-2.5 shrink-0 rounded-badge" :style="{ background: t.swatch }" aria-hidden="true" />
      <span :class="compact ? 'sr-only md:not-sr-only' : ''">{{ t.label }}</span>
    </ElfButton>
  </div>
</template>
