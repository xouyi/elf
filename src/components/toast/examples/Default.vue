<script setup lang="ts">
import { ElfButton, useToast } from '@xouyi/elfui'

// Mount one <ElfToaster /> in app.vue; useToast() works from any component.
const { toast } = useToast()
</script>

<template>
  <ElfButton variant="outline" @click="toast('Roster saved', { description: 'Your changes are visible to every member.' })">
    Show toast
  </ElfButton>
</template>
