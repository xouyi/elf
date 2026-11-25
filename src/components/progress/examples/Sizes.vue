<script setup lang="ts">
import { ElfProgress } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-80 max-w-full gap-4">
    <ElfProgress :model-value="30" size="sm" label="Small bar" />
    <ElfProgress :model-value="55" label="Default bar" />
    <ElfProgress :model-value="80" size="lg" label="Large bar" />
  </div>
</template>
