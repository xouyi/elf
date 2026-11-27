<script setup lang="ts">
import { ElfScrollArea, ElfSeparator } from '@xouyi/elfui'

const items = Array.from({ length: 24 }, (_, i) => `Fastener M${i + 3} x 20`)
</script>

<template>
  <ElfScrollArea label="Inventory list" class="h-72 w-64 rounded-md border">
    <div class="p-4">
      <h4 class="mb-3 text-sm font-medium">
        Fasteners
      </h4>
      <template v-for="item in items" :key="item">
        <div class="text-sm">
          {{ item }}
        </div>
        <ElfSeparator class="my-2" />
      </template>
    </div>
  </ElfScrollArea>
</template>
