<script setup lang="ts">
import { ArrowRight, Contrast, Palette, ShieldCheck, Sparkles } from '@lucide/vue'

const config = useRuntimeConfig()
useSeoMeta({
  title: 'ElfUI - a dark-only design system for Vue and Nuxt',
  description: 'Accessible Vue 3 and Nuxt 4 components on Reka UI and Tailwind CSS v4, with two themes, a shadcn-vue registry and llms.txt.',
})
useHead({ titleTemplate: '%s' })

const install = `bun add github:xouyi/elfUI#v${config.public.version} tailwindcss @tailwindcss/vite\nbun add -d typescript`
const features = [
  { icon: ShieldCheck, title: 'Accessible by default', text: 'Reka UI primitives handle focus, keyboard and ARIA. Every example is checked with axe in both themes.' },
  { icon: Palette, title: 'Two themes, one file each', text: 'Elf (violet, rounded) and Novatron (gold on obsidian, sharp corners). Add your own with a block of CSS variables.' },
  { icon: Contrast, title: 'Dark only, contrast verified', text: 'No light mode to maintain. WCAG AA ratios of every token pair are computed on each build.' },
  { icon: Sparkles, title: 'Built for people and AI', text: 'Install the package, copy sources with the shadcn-vue registry, or point an assistant at llms.txt.' },
]
const components = ['button', 'input', 'badge', 'card', 'dialog', 'tabs']
</script>

<template>
  <div>
    <section class="mx-auto grid w-full max-w-[90rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:py-24">
      <div class="flex min-w-0 flex-col items-start gap-6">
        <ElfBadge variant="outline">
          v{{ config.public.version }} - Vue 3, Nuxt 4, Tailwind CSS v4
        </ElfBadge>
        <h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          A dark-only design system for Vue and Nuxt.
        </h1>
        <p class="max-w-xl text-lg text-muted-foreground">
          ElfUI is a set of accessible components built on Reka UI primitives, themed with CSS variables and distributed as source. Use it as a package or copy it into your project.
        </p>
        <div class="flex flex-wrap gap-3">
          <ElfButton as-child size="lg">
            <NuxtLink to="/docs/getting-started/introduction">
              Get started <ArrowRight />
            </NuxtLink>
          </ElfButton>
          <ElfButton as-child size="lg" variant="outline">
            <NuxtLink to="/docs/components/button">
              Browse components
            </NuxtLink>
          </ElfButton>
        </div>
        <CodeSnippet :code="install" lang="bash" class="w-full max-w-xl" />
      </div>

      <div class="grid min-w-0 content-start gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" aria-label="Live preview in both themes">
        <div v-for="t in siteThemes" :key="t.value" :data-theme="t.value" class="preview-surface grid gap-4 rounded-lg border p-4">
          <p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {{ t.label }}
          </p>
          <ElfCard class="gap-4 py-4">
            <ElfCardHeader>
              <ElfCardTitle>Robot status</ElfCardTitle>
              <ElfCardDescription>Drivetrain diagnostics.</ElfCardDescription>
              <ElfCardAction>
                <ElfBadge variant="success">
                  Ready
                </ElfBadge>
              </ElfCardAction>
            </ElfCardHeader>
            <ElfCardContent class="grid gap-3">
              <ElfInput :aria-label="`${t.label} example input`" placeholder="Search matches" />
              <div class="flex flex-wrap gap-2">
                <ElfButton size="sm">
                  Open log
                </ElfButton>
                <ElfButton size="sm" variant="outline">
                  Dismiss
                </ElfButton>
                <ElfBadge variant="warning">
                  Pending
                </ElfBadge>
              </div>
            </ElfCardContent>
          </ElfCard>
        </div>
      </div>
    </section>

    <section class="border-y bg-card/50">
      <div class="mx-auto grid w-full max-w-[90rem] gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div v-for="f in features" :key="f.title" class="flex flex-col gap-2">
          <component :is="f.icon" class="size-5 text-primary" aria-hidden="true" />
          <h2 class="font-semibold">
            {{ f.title }}
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ f.text }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6">
      <h2 class="text-2xl font-semibold tracking-tight">
        Components
      </h2>
      <p class="mt-2 text-muted-foreground">
        Every page has live examples, copyable source, a generated API reference, accessibility notes and the tokens used.
      </p>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="c in components" :key="c">
          <NuxtLink :to="`/docs/components/${c}`" class="flex items-center justify-between rounded-lg border bg-card p-4 font-medium capitalize transition-colors hover:bg-accent">
            {{ c }} <ArrowRight class="size-4 text-muted-foreground" />
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
