<script setup lang="ts">
const stats = [
  { label: 'Matches scouted', value: '128', note: '+12 this week', variant: 'success' },
  { label: 'Open tasks', value: '9', note: '3 overdue', variant: 'warning' },
  { label: 'Robot health', value: '94%', note: 'Pit check passed', variant: 'default' },
  { label: 'Failed uploads', value: '2', note: 'Retry needed', variant: 'destructive' },
] as const

const matches = [
  { id: 'Q12', event: 'Istanbul Regional', result: 'Won', variant: 'success', score: '84 - 61' },
  { id: 'Q15', event: 'Istanbul Regional', result: 'Lost', variant: 'destructive', score: '58 - 72' },
  { id: 'Q19', event: 'Istanbul Regional', result: 'Tie', variant: 'secondary', score: '66 - 66' },
  { id: 'Q23', event: 'Istanbul Regional', result: 'Pending', variant: 'outline', score: '-' },
] as const

const search = ref('')
const filtered = computed(() =>
  matches.filter(m => `${m.id} ${m.event} ${m.result}`.toLowerCase().includes(search.value.toLowerCase())),
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="text-sm text-muted-foreground">A realistic screen composed only of Elf components.</p>
    </div>

    <section aria-label="Key figures" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ElfCard v-for="s in stats" :key="s.label" class="gap-3 py-4">
        <ElfCardHeader>
          <ElfCardDescription>{{ s.label }}</ElfCardDescription>
          <ElfCardTitle class="text-3xl">{{ s.value }}</ElfCardTitle>
          <ElfCardAction><ElfBadge :variant="s.variant">{{ s.note }}</ElfBadge></ElfCardAction>
        </ElfCardHeader>
      </ElfCard>
    </section>

    <ElfCard>
      <ElfCardHeader>
        <ElfCardTitle>Recent matches</ElfCardTitle>
        <ElfCardDescription>Filter with the input; badges show the result.</ElfCardDescription>
        <ElfCardAction>
          <ElfButton as-child size="sm" variant="outline"><NuxtLink to="/members">Open roster</NuxtLink></ElfButton>
        </ElfCardAction>
      </ElfCardHeader>
      <ElfCardContent class="flex flex-col gap-4">
        <ElfInput v-model="search" type="search" placeholder="Filter matches" aria-label="Filter matches" />
        <ul class="divide-y rounded-lg border">
          <li v-for="m in filtered" :key="m.id" class="flex items-center justify-between gap-3 p-3">
            <div>
              <p class="font-medium">{{ m.id }}</p>
              <p class="text-sm text-muted-foreground">{{ m.event }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm tabular-nums">{{ m.score }}</span>
              <ElfBadge :variant="m.variant">{{ m.result }}</ElfBadge>
            </div>
          </li>
          <li v-if="!filtered.length" class="p-3 text-sm text-muted-foreground">No matches found.</li>
        </ul>
      </ElfCardContent>
    </ElfCard>
  </div>
</template>
