<script setup lang="ts">
import { ElfCard, ElfCardContent, ElfCardHeader, ElfSkeleton, ElfVisuallyHidden } from '@xouyi/elfui'
</script>

<template>
  <ElfCard class="w-full max-w-sm" aria-busy="true">
    <ElfVisuallyHidden role="status">
      Loading robot status
    </ElfVisuallyHidden>
    <ElfCardHeader>
      <ElfSkeleton class="h-5 w-32" />
      <ElfSkeleton class="h-4 w-48" />
    </ElfCardHeader>
    <ElfCardContent class="grid gap-2">
      <ElfSkeleton class="h-24 w-full" />
      <ElfSkeleton class="h-4 w-3/4" />
    </ElfCardContent>
  </ElfCard>
</template>
