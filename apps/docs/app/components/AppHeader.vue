<script setup lang="ts">
import { Search } from '@lucide/vue'

const site = useSite()
const { open: searchOpen, shortcut } = useSearchState()
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
    <div class="mx-auto flex h-14 w-full max-w-[90rem] items-center gap-2 px-4 sm:gap-3 sm:px-6">
      <MobileNav />
      <NuxtLink to="/" class="flex items-center gap-2 rounded-md" aria-label="ElfUI home">
        <AppLogo />
      </NuxtLink>
      <ElfBadge variant="outline" class="hidden sm:inline-flex">
        v{{ site.version }}
      </ElfBadge>
      <nav aria-label="Main" class="ml-4 hidden items-center gap-1 text-sm lg:flex">
        <ElfButton as-child variant="ghost" size="sm">
          <NuxtLink to="/docs/getting-started/introduction">
            Docs
          </NuxtLink>
        </ElfButton>
        <ElfButton as-child variant="ghost" size="sm">
          <NuxtLink to="/docs/components/button">
            Components
          </NuxtLink>
        </ElfButton>
        <ElfButton as-child variant="ghost" size="sm">
          <NuxtLink to="/docs/resources/roadmap">
            Roadmap
          </NuxtLink>
        </ElfButton>
      </nav>
      <div class="ml-auto flex items-center gap-1.5 sm:gap-2">
        <ElfButton variant="outline" size="sm" class="h-8 gap-2 text-muted-foreground sm:w-56 sm:justify-start lg:w-64" @click="searchOpen = true">
          <Search />
          <span class="sr-only sm:not-sr-only">Search docs...</span>
          <kbd class="ml-auto hidden rounded-sm border bg-muted px-1.5 font-mono text-[0.6875rem] sm:inline">{{ shortcut }}</kbd>
        </ElfButton>
        <ThemeSwitcher />
        <ElfButton as-child variant="ghost" size="icon" class="hidden sm:inline-flex">
          <a :href="site.repo" target="_blank" rel="noopener" aria-label="ElfUI on GitHub"><GithubIcon /></a>
        </ElfButton>
      </div>
    </div>
  </header>
</template>
