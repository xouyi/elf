<script setup lang="ts">
import { ElfButton, ElfTooltip, ElfTooltipContent, ElfTooltipProvider, ElfTooltipTrigger } from '@xouyi/elfui'

const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <ElfTooltipProvider :delay-duration="150">
    <div class="flex flex-wrap items-center gap-2">
      <ElfTooltip v-for="side in sides" :key="side">
        <ElfTooltipTrigger as-child>
          <ElfButton variant="outline" size="sm" class="capitalize">
            {{ side }}
          </ElfButton>
        </ElfTooltipTrigger>
        <ElfTooltipContent :side="side">
          Appears on the {{ side }}
        </ElfTooltipContent>
      </ElfTooltip>
    </div>
  </ElfTooltipProvider>
</template>
