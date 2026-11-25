<script setup lang="ts">
import { ElfButton } from 'elfui'

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <ElfButton v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </ElfButton>
  </div>
</template>
