<script setup lang="ts">
import { ElfGradientText } from '@xouyi/elfui'

const variants = ['brand', 'aurora', 'sunset', 'forest'] as const
</script>

<template>
  <ul class="grid gap-2 text-2xl font-semibold tracking-tight">
    <li v-for="variant in variants" :key="variant">
      <ElfGradientText :variant="variant">
        {{ variant }}
      </ElfGradientText>
    </li>
  </ul>
</template>
