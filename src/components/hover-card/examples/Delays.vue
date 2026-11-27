<script setup lang="ts">
import { ElfHoverCard, ElfHoverCardContent, ElfHoverCardTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfHoverCard :open-delay="100" :close-delay="100">
    <ElfHoverCardTrigger as-child>
      <a href="#quick" class="text-sm text-primary underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">Quick preview</a>
    </ElfHoverCardTrigger>
    <ElfHoverCardContent side="top" class="w-64">
      <p class="text-sm">
        Opens after 100 ms and closes 100 ms after the pointer leaves.
      </p>
    </ElfHoverCardContent>
  </ElfHoverCard>
</template>
