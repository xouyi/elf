<script setup lang="ts">
import { ElfButton, ElfTooltip, ElfTooltipContent, ElfTooltipTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfTooltip v-model:open="open">
      <ElfTooltipTrigger as-child>
        <ElfButton variant="outline">
          Details
        </ElfButton>
      </ElfTooltipTrigger>
      <ElfTooltipContent>Opens a read-only summary</ElfTooltipContent>
    </ElfTooltip>
    <p class="text-sm text-muted-foreground">
      open = {{ open }}
    </p>
  </div>
</template>
