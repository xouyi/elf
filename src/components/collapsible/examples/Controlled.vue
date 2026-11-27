<script setup lang="ts">
import { ElfButton, ElfCollapsible, ElfCollapsibleContent, ElfCollapsibleTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <ElfCollapsible v-model:open="open" class="w-full max-w-sm space-y-2">
    <div class="flex items-center gap-3">
      <ElfCollapsibleTrigger as-child>
        <ElfButton variant="outline">
          {{ open ? 'Hide' : 'Show' }} filters
        </ElfButton>
      </ElfCollapsibleTrigger>
      <span class="text-sm text-muted-foreground">open = {{ open }}</span>
    </div>
    <ElfCollapsibleContent class="rounded-md border px-4 py-3 text-sm">
      Season, event and alliance filters live here.
    </ElfCollapsibleContent>
  </ElfCollapsible>
</template>
