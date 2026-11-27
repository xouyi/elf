<script setup lang="ts">
import { ElfThemeSwitcher } from '@xouyi/elfui'
</script>

<template>
  <ElfThemeSwitcher
    variant="buttons"
    label="Color scheme"
    :labels="{ elf: 'Violet', nova: 'Gold', elfwood: 'Light' }"
  />
</template>
