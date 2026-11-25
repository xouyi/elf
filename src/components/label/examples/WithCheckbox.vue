<script setup lang="ts">
import { ElfLabel } from '@xouyi/elfui'
import { ref } from 'vue'

const accepted = ref(false)
</script>

<template>
  <div class="flex items-center gap-3">
    <input id="label-terms" v-model="accepted" type="checkbox" class="size-4 accent-primary">
    <ElfLabel for="label-terms">
      Accept the team code of conduct
    </ElfLabel>
  </div>
</template>
