<script setup lang="ts">
import { ElfAspectRatio } from '@xouyi/elfui'

const ratios = [
  { label: '1 / 1', value: 1 },
  { label: '4 / 3', value: 4 / 3 },
  { label: '16 / 9', value: 16 / 9 },
  { label: '21 / 9', value: 21 / 9 },
]
</script>

<template>
  <div class="grid w-full max-w-md grid-cols-2 items-start gap-3">
    <ElfAspectRatio v-for="r in ratios" :key="r.label" :ratio="r.value" class="border border-border">
      <div class="flex size-full items-center justify-center text-sm text-muted-foreground">
        {{ r.label }}
      </div>
    </ElfAspectRatio>
  </div>
</template>
