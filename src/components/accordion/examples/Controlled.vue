<script setup lang="ts">
import { ElfAccordion, ElfAccordionContent, ElfAccordionItem, ElfAccordionTrigger } from '@xouyi/elfui'
import { ref } from 'vue'

const open = ref<string | undefined>('a')
</script>

<template>
  <div class="w-full max-w-lg space-y-3">
    <p class="text-sm text-muted-foreground">
      open = {{ open ?? 'none' }}
    </p>
    <ElfAccordion v-model="open" type="single" collapsible>
      <ElfAccordionItem value="a">
        <ElfAccordionTrigger>First section</ElfAccordionTrigger>
        <ElfAccordionContent>One item is open at a time.</ElfAccordionContent>
      </ElfAccordionItem>
      <ElfAccordionItem value="b">
        <ElfAccordionTrigger>Second section</ElfAccordionTrigger>
        <ElfAccordionContent>Opening this closes the first.</ElfAccordionContent>
      </ElfAccordionItem>
    </ElfAccordion>
  </div>
</template>
