<script setup lang="ts">
import { ElfCheckbox, ElfLabel } from '@xouyi/elfui'
import { ref } from 'vue'

const accepted = ref(false)
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfCheckbox id="checkbox-terms" v-model="accepted" />
    <ElfLabel for="checkbox-terms">
      Accept the team code of conduct
    </ElfLabel>
  </div>
</template>
