<script setup lang="ts">
import { ElfScrollArea } from '@xouyi/elfui'

const parts = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Sprocket ${i + 1}` }))
</script>

<template>
  <ElfScrollArea orientation="horizontal" label="Parts gallery" class="w-full max-w-md rounded-md border">
    <div class="flex w-max gap-3 p-4">
      <figure v-for="part in parts" :key="part.id" class="shrink-0">
        <div class="flex h-24 w-32 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          #{{ part.id }}
        </div>
        <figcaption class="pt-2 text-xs text-muted-foreground">
          {{ part.name }}
        </figcaption>
      </figure>
    </div>
  </ElfScrollArea>
</template>
