<script setup lang="ts">
import { ElfAlertDialog, ElfAlertDialogAction, ElfAlertDialogCancel, ElfAlertDialogContent, ElfAlertDialogDescription, ElfAlertDialogFooter, ElfAlertDialogHeader, ElfAlertDialogTitle, ElfButton } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref(false)
const removed = ref(0)

function remove() {
  removed.value += 1
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ElfButton variant="outline" @click="open = true">
      Remove member
    </ElfButton>
    <span class="text-sm text-muted-foreground">open = {{ open }}, removed = {{ removed }}</span>
    <ElfAlertDialog v-model:open="open">
      <ElfAlertDialogContent>
        <ElfAlertDialogHeader>
          <ElfAlertDialogTitle>Remove this member?</ElfAlertDialogTitle>
          <ElfAlertDialogDescription>They lose access to every team app immediately.</ElfAlertDialogDescription>
        </ElfAlertDialogHeader>
        <ElfAlertDialogFooter>
          <ElfAlertDialogCancel>Cancel</ElfAlertDialogCancel>
          <ElfAlertDialogAction variant="destructive" @click="remove">
            Remove
          </ElfAlertDialogAction>
        </ElfAlertDialogFooter>
      </ElfAlertDialogContent>
    </ElfAlertDialog>
  </div>
</template>
