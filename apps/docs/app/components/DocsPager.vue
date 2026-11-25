<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

defineProps<{ prev?: { title: string, path: string } | null, next?: { title: string, path: string } | null }>()
</script>

<template>
  <nav v-if="prev || next" aria-label="Pagination" class="mt-12 grid gap-3 border-t pt-6 sm:grid-cols-2">
    <NuxtLink v-if="prev" :to="prev.path" class="group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-accent">
      <span class="flex items-center gap-1 text-xs text-muted-foreground"><ChevronLeft class="size-3.5" /> Previous</span>
      <span class="font-medium">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else class="hidden sm:block" />
    <NuxtLink v-if="next" :to="next.path" class="group flex flex-col items-end gap-1 rounded-lg border p-4 text-right transition-colors hover:bg-accent">
      <span class="flex items-center gap-1 text-xs text-muted-foreground">Next <ChevronRight class="size-3.5" /></span>
      <span class="font-medium">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>
