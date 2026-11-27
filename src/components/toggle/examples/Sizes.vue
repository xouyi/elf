<script setup lang="ts">
import { ElfToggle } from '@xouyi/elfui'
import { Underline } from '@lucide/vue'
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfToggle variant="outline" size="sm" aria-label="Underline, small">
      <Underline />
    </ElfToggle>
    <ElfToggle variant="outline" aria-label="Underline, default">
      <Underline />
    </ElfToggle>
    <ElfToggle variant="outline" size="lg" aria-label="Underline, large">
      <Underline />
    </ElfToggle>
  </div>
</template>
