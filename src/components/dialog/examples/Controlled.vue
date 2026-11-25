<script setup lang="ts">
import { ElfButton, ElfDialog, ElfDialogContent, ElfDialogDescription, ElfDialogHeader, ElfDialogTitle } from 'elfui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex items-center gap-3">
    <ElfButton variant="outline" @click="open = true">
      Open dialog
    </ElfButton>
    <span class="text-sm text-muted-foreground">open = {{ open }}</span>
    <ElfDialog v-model:open="open">
      <ElfDialogContent>
        <ElfDialogHeader>
          <ElfDialogTitle>Controlled dialog</ElfDialogTitle>
          <ElfDialogDescription>The open state lives in your component.</ElfDialogDescription>
        </ElfDialogHeader>
      </ElfDialogContent>
    </ElfDialog>
  </div>
</template>
