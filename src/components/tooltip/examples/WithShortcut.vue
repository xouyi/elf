<script setup lang="ts">
import { ElfButton, ElfKbd, ElfTooltip, ElfTooltipContent, ElfTooltipTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfTooltip>
    <ElfTooltipTrigger as-child>
      <ElfButton variant="outline">
        Save
      </ElfButton>
    </ElfTooltipTrigger>
    <ElfTooltipContent class="flex items-center gap-2">
      Save changes <ElfKbd>Ctrl S</ElfKbd>
    </ElfTooltipContent>
  </ElfTooltip>
</template>
