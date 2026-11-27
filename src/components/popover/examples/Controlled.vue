<script setup lang="ts">
import { ElfButton, ElfPopover, ElfPopoverClose, ElfPopoverContent, ElfPopoverTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfPopover v-model:open="open">
      <ElfPopoverTrigger as-child>
        <ElfButton variant="outline">
          Filters
        </ElfButton>
      </ElfPopoverTrigger>
      <ElfPopoverContent class="grid gap-3">
        <p class="text-sm">
          Show only items that are low in stock.
        </p>
        <ElfPopoverClose as-child>
          <ElfButton size="sm">
            Apply
          </ElfButton>
        </ElfPopoverClose>
      </ElfPopoverContent>
    </ElfPopover>
    <p class="text-sm text-muted-foreground">
      open = {{ open }}
    </p>
  </div>
</template>
