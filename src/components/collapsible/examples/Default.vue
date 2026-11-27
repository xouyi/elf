<script setup lang="ts">
import { ChevronsUpDown } from '@lucide/vue'
import { ElfButton, ElfCollapsible, ElfCollapsibleContent, ElfCollapsibleTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfCollapsible class="w-full max-w-sm space-y-2">
    <div class="flex items-center justify-between gap-4">
      <h4 class="text-sm font-semibold">
        3 starred repositories
      </h4>
      <ElfCollapsibleTrigger as-child>
        <ElfButton variant="ghost" size="icon" aria-label="Toggle repositories">
          <ChevronsUpDown />
        </ElfButton>
      </ElfCollapsibleTrigger>
    </div>
    <div class="rounded-md border px-4 py-2 text-sm">
      novatron/hq
    </div>
    <ElfCollapsibleContent class="space-y-2">
      <div class="rounded-md border px-4 py-2 text-sm">
        novatron/kit
      </div>
      <div class="rounded-md border px-4 py-2 text-sm">
        novatron/scout
      </div>
    </ElfCollapsibleContent>
  </ElfCollapsible>
</template>
