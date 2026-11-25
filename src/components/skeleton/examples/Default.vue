<script setup lang="ts">
import { ElfSkeleton } from 'elfui'
</script>

<template>
  <div class="flex items-center gap-4">
    <ElfSkeleton class="size-12 rounded-full" />
    <div class="grid gap-2">
      <ElfSkeleton class="h-4 w-60" />
      <ElfSkeleton class="h-4 w-44" />
    </div>
  </div>
</template>
