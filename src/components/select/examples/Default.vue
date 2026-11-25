<script setup lang="ts">
import { ElfLabel, ElfSelect, ElfSelectContent, ElfSelectItem, ElfSelectTrigger, ElfSelectValue } from '@xouyi/elfui'
import { ref } from 'vue'

const subteam = ref('')
</script>

<template>
  <div class="grid w-64 gap-2">
    <ElfLabel for="select-subteam">
      Subteam
    </ElfLabel>
    <ElfSelect v-model="subteam">
      <ElfSelectTrigger id="select-subteam">
        <ElfSelectValue placeholder="Choose a subteam" />
      </ElfSelectTrigger>
      <ElfSelectContent>
        <ElfSelectItem value="mechanical">
          Mechanical
        </ElfSelectItem>
        <ElfSelectItem value="electrical">
          Electrical
        </ElfSelectItem>
        <ElfSelectItem value="software">
          Software
        </ElfSelectItem>
        <ElfSelectItem value="business">
          Business and outreach
        </ElfSelectItem>
      </ElfSelectContent>
    </ElfSelect>
  </div>
</template>
