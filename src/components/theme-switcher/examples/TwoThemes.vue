<script setup lang="ts">
import { ElfThemeSwitcher } from '@xouyi/elfui'
</script>

<template>
  <ElfThemeSwitcher variant="buttons" :themes="['elf', 'elfwood']" :labels="{ elf: 'Dark', elfwood: 'Light' }" />
</template>
