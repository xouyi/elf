<script setup lang="ts">
import { ElfButton } from '@xouyi/elfui'

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const
</script>

<template>
  <div class="flex flex-wrap gap-4 p-2">
    <ElfButton v-for="variant in variants" :key="variant" :variant="variant" glow>
      {{ variant }}
    </ElfButton>
  </div>
</template>
