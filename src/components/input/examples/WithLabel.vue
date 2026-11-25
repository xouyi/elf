<script setup lang="ts">
import { ElfInput } from '@xouyi/elfui'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="grid w-72 gap-2">
    <label for="email" class="text-sm font-medium">Email</label>
    <ElfInput id="email" v-model="email" type="email" placeholder="you@example.com" />
    <p class="text-sm text-muted-foreground">
      Value: {{ email || 'empty' }}
    </p>
  </div>
</template>
