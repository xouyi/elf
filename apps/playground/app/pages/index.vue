<script setup lang="ts">
import { Plus } from '@lucide/vue'

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const badges = ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'] as const
const theme = ref<'novatron' | 'elf'>('novatron')
watchEffect(() => {
  if (import.meta.client) document.documentElement.dataset.theme = theme.value
})
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-6">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Elf playground</h1>
      <ElfButton variant="outline" size="sm" @click="theme = theme === 'novatron' ? 'elf' : 'novatron'">
        Theme: {{ theme }}
      </ElfButton>
    </header>

    <ElfCard>
      <ElfCardHeader>
        <ElfCardTitle>Buttons and badges</ElfCardTitle>
        <ElfCardDescription>Every variant rendered by the Nuxt module.</ElfCardDescription>
        <ElfCardAction><ElfBadge variant="success">Live</ElfBadge></ElfCardAction>
      </ElfCardHeader>
      <ElfCardContent class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <ElfButton v-for="v in variants" :key="v" :variant="v">{{ v }}</ElfButton>
          <ElfButton size="icon" aria-label="Add"><Plus /></ElfButton>
        </div>
        <div class="flex flex-wrap gap-2">
          <ElfBadge v-for="v in badges" :key="v" :variant="v">{{ v }}</ElfBadge>
        </div>
        <ElfInput placeholder="Type here" aria-label="Demo input" />
      </ElfCardContent>
    </ElfCard>

    <ElfTabs default-value="one">
      <ElfTabsList aria-label="Demo tabs">
        <ElfTabsTrigger value="one">One</ElfTabsTrigger>
        <ElfTabsTrigger value="two">Two</ElfTabsTrigger>
      </ElfTabsList>
      <ElfTabsContent value="one">First panel</ElfTabsContent>
      <ElfTabsContent value="two">Second panel</ElfTabsContent>
    </ElfTabs>

    <ElfDialog>
      <ElfDialogTrigger as-child><ElfButton>Open dialog</ElfButton></ElfDialogTrigger>
      <ElfDialogContent>
        <ElfDialogHeader>
          <ElfDialogTitle>Dialog title</ElfDialogTitle>
          <ElfDialogDescription>Accessible, keyboard friendly.</ElfDialogDescription>
        </ElfDialogHeader>
        <ElfDialogFooter show-close-button />
      </ElfDialogContent>
    </ElfDialog>
  </main>
</template>
