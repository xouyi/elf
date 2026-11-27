<script setup lang="ts">
import { Bold, Italic, Link } from '@lucide/vue'
import { ElfButton, ElfTooltip, ElfTooltipContent, ElfTooltipProvider, ElfTooltipTrigger } from '@xouyi/elfui'

const actions = [
  { label: 'Bold', icon: Bold },
  { label: 'Italic', icon: Italic },
  { label: 'Insert link', icon: Link },
]
</script>

<template>
  <!-- One provider shares the open delay: after the first tooltip, neighbours open instantly. -->
  <ElfTooltipProvider :delay-duration="300" :skip-delay-duration="500">
    <div class="flex gap-1">
      <ElfTooltip v-for="action in actions" :key="action.label">
        <ElfTooltipTrigger as-child>
          <ElfButton variant="ghost" size="icon" :aria-label="action.label">
            <component :is="action.icon" />
          </ElfButton>
        </ElfTooltipTrigger>
        <ElfTooltipContent>{{ action.label }}</ElfTooltipContent>
      </ElfTooltip>
    </div>
  </ElfTooltipProvider>
</template>
