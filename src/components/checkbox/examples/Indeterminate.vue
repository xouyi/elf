<script setup lang="ts">
import { ElfCheckbox, ElfLabel } from '@xouyi/elfui'
import { computed, ref } from 'vue'

const subteams = ref([
  { id: 'mechanical', label: 'Mechanical', checked: true },
  { id: 'electrical', label: 'Electrical', checked: false },
  { id: 'software', label: 'Software', checked: true },
])

// 'indeterminate' when only some children are selected.
const all = computed<boolean | 'indeterminate'>({
  get() {
    const selected = subteams.value.filter(s => s.checked).length
    if (selected === 0)
      return false
    return selected === subteams.value.length ? true : 'indeterminate'
  },
  set(value) {
    for (const subteam of subteams.value)
      subteam.checked = value === true
  },
})
</script>

<template>
  <div class="grid gap-3">
    <div class="flex items-center gap-3">
      <ElfCheckbox id="checkbox-all" v-model="all" />
      <ElfLabel for="checkbox-all">
        All subteams
      </ElfLabel>
    </div>
    <div class="grid gap-3 pl-7">
      <div v-for="subteam in subteams" :key="subteam.id" class="flex items-center gap-3">
        <ElfCheckbox :id="`checkbox-${subteam.id}`" v-model="subteam.checked" />
        <ElfLabel :for="`checkbox-${subteam.id}`">
          {{ subteam.label }}
        </ElfLabel>
      </div>
    </div>
  </div>
</template>
