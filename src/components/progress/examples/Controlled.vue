<script setup lang="ts">
import { ElfButton, ElfProgress } from '@xouyi/elfui'
import { ref } from 'vue'

const value = ref(20)
function step(delta: number) {
  value.value = Math.min(100, Math.max(0, value.value + delta))
}
</script>

<template>
  <div class="grid w-80 max-w-full gap-3">
    <ElfProgress v-model="value" label="Upload progress" />
    <div class="flex items-center gap-2">
      <ElfButton variant="outline" size="sm" :disabled="value <= 0" @click="step(-20)">
        Less
      </ElfButton>
      <ElfButton variant="outline" size="sm" :disabled="value >= 100" @click="step(20)">
        More
      </ElfButton>
      <output class="ml-auto text-sm text-muted-foreground tabular-nums">{{ value }}%</output>
    </div>
  </div>
</template>
