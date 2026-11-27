<script setup lang="ts">
import { ElfScrollArea } from '@xouyi/elfui'

const types = ['always', 'auto', 'hover', 'scroll'] as const
const lines = Array.from({ length: 12 }, (_, i) => `Line ${i + 1}`)
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
    <div v-for="type in types" :key="type" class="grid gap-1">
      <p class="text-xs font-medium">
        type="{{ type }}"
      </p>
      <ElfScrollArea :type="type" :label="`Scrollbar type ${type}`" class="h-32 rounded-md border">
        <ul class="p-2 text-sm text-muted-foreground">
          <li v-for="line in lines" :key="line">
            {{ line }}
          </li>
        </ul>
      </ElfScrollArea>
    </div>
  </div>
</template>
