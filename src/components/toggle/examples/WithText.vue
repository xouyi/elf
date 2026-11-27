<script setup lang="ts">
import { ElfToggle } from '@xouyi/elfui'
import { Bell } from '@lucide/vue'
import { ref } from 'vue'

const subscribed = ref(false)
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <ElfToggle v-model="subscribed" variant="outline">
      <Bell />
      Notify me
    </ElfToggle>
    <p class="text-sm text-muted-foreground">
      Notifications are {{ subscribed ? 'on' : 'off' }}.
    </p>
  </div>
</template>
