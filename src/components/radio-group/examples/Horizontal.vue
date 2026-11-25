<script setup lang="ts">
import { ElfLabel, ElfRadioGroup, ElfRadioGroupItem } from '@xouyi/elfui'
import { ref } from 'vue'

const size = ref('m')
const sizes = ['S', 'M', 'L', 'XL']
</script>

<template>
  <ElfRadioGroup v-model="size" orientation="horizontal" aria-label="Shirt size">
    <div v-for="s in sizes" :key="s" class="flex items-center gap-2">
      <ElfRadioGroupItem :id="`radio-size-${s}`" :value="s.toLowerCase()" />
      <ElfLabel :for="`radio-size-${s}`">
        {{ s }}
      </ElfLabel>
    </div>
  </ElfRadioGroup>
</template>
