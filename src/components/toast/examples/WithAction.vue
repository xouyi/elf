<script setup lang="ts">
import { ElfButton, useToast } from '@xouyi/elfui'
import { ref } from 'vue'

const { toast } = useToast()
const restored = ref(0)

function remove() {
  toast('Item removed', {
    description: 'It will be deleted for good in a few seconds.',
    duration: 8000,
    action: { label: 'Undo', altText: 'Undo removing the item', onClick: () => { restored.value += 1 } },
  })
}
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfButton variant="outline" @click="remove">
      Remove item
    </ElfButton>
    <span class="text-sm text-muted-foreground">restored = {{ restored }}</span>
  </div>
</template>
