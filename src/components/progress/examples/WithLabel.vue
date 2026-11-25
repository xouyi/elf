<script setup lang="ts">
import { ElfProgress } from '@xouyi/elfui'
import { computed } from 'vue'

const done = 7
const total = 12
const value = computed(() => done / total * 100)
</script>

<template>
  <div class="grid w-80 max-w-full gap-2">
    <div class="flex items-baseline justify-between text-sm">
      <span id="progress-tasks-label" class="font-medium">Build tasks</span>
      <span class="text-muted-foreground">{{ done }} of {{ total }} done</span>
    </div>
    <ElfProgress
      :model-value="value"
      aria-labelledby="progress-tasks-label"
      :get-value-text="() => `${done} of ${total} tasks done`"
    />
  </div>
</template>
