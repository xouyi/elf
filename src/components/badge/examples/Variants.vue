<script setup lang="ts">
import { ElfBadge } from 'elfui'

const variants = ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'] as const
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <ElfBadge v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </ElfBadge>
  </div>
</template>
