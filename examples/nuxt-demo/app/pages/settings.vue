<script setup lang="ts">
const theme = useElfTheme()
const team = reactive({ name: 'Novatron Robotics', number: '10202' })
const saved = ref(false)
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-semibold">Settings</h1>
      <p class="text-sm text-muted-foreground">Tabs with a profile form and a theme panel.</p>
    </div>

    <ElfTabs default-value="profile">
      <ElfTabsList aria-label="Settings sections">
        <ElfTabsTrigger value="profile">Profile</ElfTabsTrigger>
        <ElfTabsTrigger value="appearance">Appearance</ElfTabsTrigger>
        <ElfTabsTrigger value="danger">Danger zone</ElfTabsTrigger>
      </ElfTabsList>

      <ElfTabsContent value="profile">
        <ElfCard>
          <ElfCardHeader>
            <ElfCardTitle>Team profile</ElfCardTitle>
            <ElfCardDescription>Shown on every exported report.</ElfCardDescription>
          </ElfCardHeader>
          <ElfCardContent class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <label for="team-name" class="text-sm font-medium">Team name</label>
              <ElfInput id="team-name" v-model="team.name" />
            </div>
            <div class="grid gap-1.5">
              <label for="team-number" class="text-sm font-medium">Team number</label>
              <ElfInput id="team-number" v-model="team.number" inputmode="numeric" />
            </div>
          </ElfCardContent>
          <ElfCardFooter class="gap-3">
            <ElfButton @click="saved = true">Save changes</ElfButton>
            <ElfBadge v-if="saved" variant="success">Saved</ElfBadge>
          </ElfCardFooter>
        </ElfCard>
      </ElfTabsContent>

      <ElfTabsContent value="appearance">
        <ElfCard>
          <ElfCardHeader>
            <ElfCardTitle>Theme</ElfCardTitle>
            <ElfCardDescription>Current theme: <ElfBadge variant="outline">{{ theme }}</ElfBadge></ElfCardDescription>
          </ElfCardHeader>
          <ElfCardContent class="flex gap-2">
            <ElfButton :variant="theme === 'novatron' ? 'default' : 'outline'" @click="theme = 'novatron'">Novatron</ElfButton>
            <ElfButton :variant="theme === 'elf' ? 'default' : 'outline'" @click="theme = 'elf'">Elf</ElfButton>
          </ElfCardContent>
        </ElfCard>
      </ElfTabsContent>

      <ElfTabsContent value="danger">
        <ElfCard>
          <ElfCardHeader>
            <ElfCardTitle>Delete season data</ElfCardTitle>
            <ElfCardDescription>This permanently removes every match log.</ElfCardDescription>
          </ElfCardHeader>
          <ElfCardFooter>
            <ElfDialog>
              <ElfDialogTrigger as-child><ElfButton variant="destructive">Delete data</ElfButton></ElfDialogTrigger>
              <ElfDialogContent>
                <ElfDialogHeader>
                  <ElfDialogTitle>Delete all season data?</ElfDialogTitle>
                  <ElfDialogDescription>This action cannot be undone.</ElfDialogDescription>
                </ElfDialogHeader>
                <ElfDialogFooter show-close-button>
                  <ElfButton variant="destructive">Delete</ElfButton>
                </ElfDialogFooter>
              </ElfDialogContent>
            </ElfDialog>
          </ElfCardFooter>
        </ElfCard>
      </ElfTabsContent>
    </ElfTabs>
  </div>
</template>
