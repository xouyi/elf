<script setup lang="ts">
import { ElfStatCard } from '@xouyi/elfui'
</script>

<template>
  <div class="grid w-full max-w-xl gap-4 sm:grid-cols-2">
    <ElfStatCard label="Active members" loading loading-label="Loading active members" />
    <ElfStatCard label="Open issues" loading loading-label="Loading open issues" />
  </div>
</template>
