<script setup lang="ts">
import { ElfButton, ElfTooltip, ElfTooltipContent, ElfTooltipTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfTooltip>
    <ElfTooltipTrigger as-child>
      <ElfButton variant="outline">
        Hover or focus me
      </ElfButton>
    </ElfTooltipTrigger>
    <ElfTooltipContent>
      Saved to your team library
    </ElfTooltipContent>
  </ElfTooltip>
</template>
