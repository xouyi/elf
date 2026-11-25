<script setup lang="ts">
import { ElfButton } from '@xouyi/elfui'
import { Plus } from '@lucide/vue'

const sizes = ['sm', 'default', 'lg'] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfButton v-for="size in sizes" :key="size" :size="size">
      {{ size }}
    </ElfButton>
    <ElfButton size="icon" aria-label="Add">
      <Plus />
    </ElfButton>
  </div>
</template>
