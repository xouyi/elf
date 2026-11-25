<script setup lang="ts">
import { ElfButton, ElfKbd } from '@xouyi/elfui'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfButton variant="outline">
      Search <ElfKbd>/</ElfKbd>
    </ElfButton>
    <ElfButton>
      Save <ElfKbd class="border-transparent bg-primary-foreground/15 text-primary-foreground">S</ElfKbd>
    </ElfButton>
  </div>
</template>
