<script setup lang="ts">
import { ElfToggleGroup, ElfToggleGroupItem } from '@xouyi/elfui'
import { Bold, Italic, Underline } from '@lucide/vue'
import { ref } from 'vue'

const marks = ref<string[]>(['bold'])
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <ElfToggleGroup v-model="marks" type="multiple" aria-label="Text formatting">
      <ElfToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ElfToggleGroupItem>
      <ElfToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ElfToggleGroupItem>
      <ElfToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ElfToggleGroupItem>
    </ElfToggleGroup>
    <p class="text-sm text-muted-foreground">
      Active: {{ marks.length ? marks.join(', ') : 'none' }}
    </p>
  </div>
</template>
