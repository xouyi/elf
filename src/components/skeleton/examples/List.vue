<script setup lang="ts">
import { ElfSkeleton } from '@elf/ui'
</script>

<template>
  <ul class="grid w-full max-w-md gap-3" aria-busy="true" aria-label="Members, loading">
    <li v-for="n in 4" :key="n" class="flex items-center gap-3 border border-border p-3">
      <ElfSkeleton class="size-8 rounded-full" />
      <div class="grid flex-1 gap-1.5">
        <ElfSkeleton class="h-3.5 w-1/2" />
        <ElfSkeleton class="h-3 w-3/4" />
      </div>
    </li>
  </ul>
</template>
