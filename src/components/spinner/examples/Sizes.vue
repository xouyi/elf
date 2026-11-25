<script setup lang="ts">
import { ElfSpinner } from '@elf/ui'
</script>

<template>
  <div class="flex items-center gap-6 text-primary">
    <ElfSpinner size="sm" label="Loading, small" />
    <ElfSpinner label="Loading, default" />
    <ElfSpinner size="lg" label="Loading, large" />
    <ElfSpinner size="xl" label="Loading, extra large" />
  </div>
</template>
