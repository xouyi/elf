<script setup lang="ts">
import { ElfButton, ElfPopover, ElfPopoverContent, ElfPopoverTrigger } from '@xouyi/elfui'

const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <ElfPopover v-for="side in sides" :key="side">
      <ElfPopoverTrigger as-child>
        <ElfButton variant="outline" size="sm" class="capitalize">
          {{ side }}
        </ElfButton>
      </ElfPopoverTrigger>
      <ElfPopoverContent :side="side" class="w-56">
        <p class="text-sm">
          Opens on the {{ side }} and flips when there is no room.
        </p>
      </ElfPopoverContent>
    </ElfPopover>
  </div>
</template>
