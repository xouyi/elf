<script setup lang="ts">
import { LayoutDashboard, Palette, Settings, Users } from '@lucide/vue'

const theme = useDemoTheme()
const route = useRoute()
const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
]
</script>

<template>
  <div class="min-h-dvh">
    <header class="border-b">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="text-lg font-semibold text-primary">Elf demo</NuxtLink>
          <nav aria-label="Main" class="flex gap-1">
            <ElfButton
              v-for="item in nav"
              :key="item.to"
              as-child
              size="sm"
              :variant="route.path === item.to ? 'secondary' : 'ghost'"
            >
              <NuxtLink :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined">
                <component :is="item.icon" /> {{ item.label }}
              </NuxtLink>
            </ElfButton>
          </nav>
        </div>
        <ElfTabs v-model="theme">
          <ElfTabsList aria-label="Theme">
            <ElfTabsTrigger value="nova"><Palette class="size-3.5" /> Nova</ElfTabsTrigger>
            <ElfTabsTrigger value="elf"><Palette class="size-3.5" /> Elf</ElfTabsTrigger>
            <ElfTabsTrigger value="elfwood"><Palette class="size-3.5" /> Elfwood</ElfTabsTrigger>
          </ElfTabsList>
        </ElfTabs>
      </div>
    </header>
    <main class="mx-auto max-w-5xl p-4 sm:py-8">
      <NuxtPage />
    </main>
  </div>
</template>
