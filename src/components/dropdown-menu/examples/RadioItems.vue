<script setup lang="ts">
import {
  ElfButton,
  ElfDropdownMenu,
  ElfDropdownMenuContent,
  ElfDropdownMenuLabel,
  ElfDropdownMenuRadioGroup,
  ElfDropdownMenuRadioItem,
  ElfDropdownMenuSeparator,
  ElfDropdownMenuTrigger,
} from '@xouyi/elfui'
import { ref } from 'vue'

const sort = ref('name')
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfDropdownMenu>
      <ElfDropdownMenuTrigger as-child>
        <ElfButton variant="outline">
          Sort
        </ElfButton>
      </ElfDropdownMenuTrigger>
      <ElfDropdownMenuContent class="w-48" align="start">
        <ElfDropdownMenuLabel>Sort by</ElfDropdownMenuLabel>
        <ElfDropdownMenuSeparator />
        <ElfDropdownMenuRadioGroup v-model="sort">
          <ElfDropdownMenuRadioItem value="name">
            Name
          </ElfDropdownMenuRadioItem>
          <ElfDropdownMenuRadioItem value="quantity">
            Quantity
          </ElfDropdownMenuRadioItem>
          <ElfDropdownMenuRadioItem value="updated">
            Last updated
          </ElfDropdownMenuRadioItem>
        </ElfDropdownMenuRadioGroup>
      </ElfDropdownMenuContent>
    </ElfDropdownMenu>
    <p class="text-sm text-muted-foreground">
      sort = {{ sort }}
    </p>
  </div>
</template>
