<script setup lang="ts">
import { ElfAccordion, ElfAccordionContent, ElfAccordionItem, ElfAccordionTrigger } from '@xouyi/elfui'
</script>

<template>
  <ElfAccordion type="single" collapsible class="w-full max-w-lg">
    <ElfAccordionItem value="open">
      <ElfAccordionTrigger>Available section</ElfAccordionTrigger>
      <ElfAccordionContent>This one can be opened.</ElfAccordionContent>
    </ElfAccordionItem>
    <ElfAccordionItem value="locked" disabled>
      <ElfAccordionTrigger>Locked section</ElfAccordionTrigger>
      <ElfAccordionContent>Skipped by the keyboard.</ElfAccordionContent>
    </ElfAccordionItem>
    <ElfAccordionItem value="last">
      <ElfAccordionTrigger>Last section</ElfAccordionTrigger>
      <ElfAccordionContent>Arrow keys jump over the disabled item.</ElfAccordionContent>
    </ElfAccordionItem>
  </ElfAccordion>
</template>
