<script setup lang="ts">
import { ElfAlert, ElfAlertDescription, ElfAlertTitle, ElfButton } from '@xouyi/elfui'
import { ref } from 'vue'

const failed = ref(false)
const saved = ref(false)

function save(ok: boolean) {
  failed.value = !ok
  saved.value = ok
}
</script>

<template>
  <div class="grid max-w-lg gap-4">
    <div class="flex gap-2">
      <ElfButton variant="outline" @click="save(true)">
        Save
      </ElfButton>
      <ElfButton variant="outline" @click="save(false)">
        Save with an error
      </ElfButton>
    </div>
    <!-- Inserted after the page loaded, so the live region role announces it. -->
    <ElfAlert v-if="failed" variant="destructive">
      <ElfAlertTitle>Save failed</ElfAlertTitle>
      <ElfAlertDescription>The roster could not be saved. Try again in a moment.</ElfAlertDescription>
    </ElfAlert>
    <ElfAlert v-if="saved" variant="success">
      <ElfAlertTitle>Roster saved</ElfAlertTitle>
    </ElfAlert>
  </div>
</template>
