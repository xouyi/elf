<script setup lang="ts">
import { ElfLabel, ElfSwitch } from '@xouyi/elfui'
import { ref } from 'vue'

const publicProfile = ref(false)
</script>

<template>
  <div class="flex w-96 max-w-full items-center justify-between gap-4 rounded-lg border p-4">
    <div class="grid gap-1">
      <ElfLabel for="switch-profile">
        Public profile
      </ElfLabel>
      <p id="switch-profile-help" class="text-sm text-muted-foreground">
        Other teams can see your name and subteam.
      </p>
    </div>
    <ElfSwitch
      id="switch-profile"
      v-model="publicProfile"
      aria-describedby="switch-profile-help"
    />
  </div>
</template>
