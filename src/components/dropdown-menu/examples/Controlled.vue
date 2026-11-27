<script setup lang="ts">
import { ElfButton, ElfDropdownMenu, ElfDropdownMenuContent, ElfDropdownMenuItem, ElfDropdownMenuTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfDropdownMenu v-model:open="open">
      <ElfDropdownMenuTrigger as-child>
        <ElfButton variant="outline">
          Menu
        </ElfButton>
      </ElfDropdownMenuTrigger>
      <ElfDropdownMenuContent align="start">
        <ElfDropdownMenuItem>First</ElfDropdownMenuItem>
        <ElfDropdownMenuItem>Second</ElfDropdownMenuItem>
      </ElfDropdownMenuContent>
    </ElfDropdownMenu>
    <p class="text-sm text-muted-foreground">
      open = {{ open }}
    </p>
  </div>
</template>
