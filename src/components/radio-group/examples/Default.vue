<script setup lang="ts">
import { ElfLabel, ElfRadioGroup, ElfRadioGroupItem } from '@xouyi/elfui'
import { ref } from 'vue'

const subteam = ref('software')
</script>

<template>
  <ElfRadioGroup v-model="subteam" aria-label="Subteam">
    <div class="flex items-center gap-3">
      <ElfRadioGroupItem id="radio-mechanical" value="mechanical" />
      <ElfLabel for="radio-mechanical">
        Mechanical
      </ElfLabel>
    </div>
    <div class="flex items-center gap-3">
      <ElfRadioGroupItem id="radio-electrical" value="electrical" />
      <ElfLabel for="radio-electrical">
        Electrical
      </ElfLabel>
    </div>
    <div class="flex items-center gap-3">
      <ElfRadioGroupItem id="radio-software" value="software" />
      <ElfLabel for="radio-software">
        Software
      </ElfLabel>
    </div>
  </ElfRadioGroup>
</template>
