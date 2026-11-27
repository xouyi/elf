<script setup lang="ts">
import {
  ElfButton,
  ElfDropdownMenu,
  ElfDropdownMenuCheckboxItem,
  ElfDropdownMenuContent,
  ElfDropdownMenuLabel,
  ElfDropdownMenuSeparator,
  ElfDropdownMenuTrigger,
} from '@xouyi/elfui'
import { ref } from 'vue'

const showStatus = ref(true)
const showSku = ref(false)
const showNotes = ref(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfDropdownMenu>
      <ElfDropdownMenuTrigger as-child>
        <ElfButton variant="outline">
          Columns
        </ElfButton>
      </ElfDropdownMenuTrigger>
      <ElfDropdownMenuContent class="w-48" align="start">
        <ElfDropdownMenuLabel>Visible columns</ElfDropdownMenuLabel>
        <ElfDropdownMenuSeparator />
        <ElfDropdownMenuCheckboxItem v-model="showStatus">
          Status
        </ElfDropdownMenuCheckboxItem>
        <ElfDropdownMenuCheckboxItem v-model="showSku">
          SKU
        </ElfDropdownMenuCheckboxItem>
        <ElfDropdownMenuCheckboxItem v-model="showNotes" disabled>
          Notes (unavailable)
        </ElfDropdownMenuCheckboxItem>
      </ElfDropdownMenuContent>
    </ElfDropdownMenu>
    <p class="text-sm text-muted-foreground">
      status = {{ showStatus }}, sku = {{ showSku }}
    </p>
  </div>
</template>
