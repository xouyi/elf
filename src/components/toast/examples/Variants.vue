<script setup lang="ts">
import { ElfButton, useToast } from '@xouyi/elfui'

const { toast } = useToast()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <ElfButton variant="outline" @click="toast('New message', { description: 'Mentor Aylin replied to your post.' })">
      Default
    </ElfButton>
    <ElfButton variant="outline" @click="toast.success('Roster saved')">
      Success
    </ElfButton>
    <ElfButton variant="outline" @click="toast.warning('Battery 3 is low', { description: 'Swap it before the next match.' })">
      Warning
    </ElfButton>
    <ElfButton variant="outline" @click="toast.error('Save failed', { description: 'The roster could not be saved.' })">
      Destructive
    </ElfButton>
  </div>
</template>
