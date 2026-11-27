<script setup lang="ts">
import { ArrowRight, ChevronDown, Copy, Pencil, Trash2 } from '@lucide/vue'

const site = useSite()
useSeoMeta({
  title: 'ElfUI - accessible Vue and Nuxt components on Reka UI and Tailwind v4',
  description: 'Accessible, themeable Vue 3 and Nuxt 4 components on Reka UI and Tailwind CSS v4. Install the package or copy the source, with three themes, a shadcn-vue registry and llms.txt.',
})
useHead({ titleTemplate: '%s' })

const install = `bunx ${site.name}@latest init`
const { toast } = useToast()
const { setTheme } = useSiteTheme()
const theme = useDisplayTheme()

const email = ref('')
const subteam = ref('software')
const plan = ref('weekly')
const notifications = ref(true)
const terms = ref(true)
const progress = ref(68)

const members = ['Ayşe Demir', 'Mehmet Kaya', 'Zeynep Arslan', 'Can Yıldız']
const themeNotes: Record<string, string> = {
  elf: 'Violet on pure black, rounded.',
  nova: 'Gold on obsidian, square corners.',
  elfwood: 'Light: green on white.',
}
</script>

<template>
  <div>
    <section class="mx-auto grid w-full max-w-[90rem] justify-items-start gap-6 px-4 pt-16 pb-12 sm:px-6 lg:pt-24 lg:pb-16">
      <ElfBadge variant="outline">
        v{{ site.version }} - Vue 3, Nuxt 4, Tailwind CSS v4
      </ElfBadge>
      <h1 class="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
        Accessible components for <ElfGradientText variant="brand">Vue and Nuxt</ElfGradientText>
      </h1>
      <p class="max-w-2xl text-lg text-muted-foreground">
        ElfUI is a set of accessible components built on Reka UI and styled with Tailwind CSS v4. Pick one of three themes, then install the package or copy the source into your project.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <ElfButton as-child size="lg" glow>
          <NuxtLink to="/docs/getting-started/introduction">
            Get started <ArrowRight />
          </NuxtLink>
        </ElfButton>
        <ElfButton as-child size="lg" variant="outline">
          <a :href="site.repo" target="_blank" rel="noopener"><GithubIcon /> GitHub</a>
        </ElfButton>
      </div>
      <CodeSnippet :code="install" lang="bash" class="w-full max-w-xl" />
    </section>

    <section class="border-y bg-card/50" aria-labelledby="themes-heading">
      <div class="mx-auto flex w-full max-w-[90rem] flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="themes-heading" class="text-lg font-semibold">
            Three themes, one switch
          </h2>
          <p class="text-sm text-muted-foreground">
            Choose a theme and watch every component below change: {{ themeNotes[theme] }}
          </p>
        </div>
        <ThemeToggle :model-value="theme" label="Preview theme" @update:model-value="setTheme" />
      </div>
    </section>

    <section class="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6" aria-labelledby="showcase-heading">
      <h2 id="showcase-heading" class="text-2xl font-semibold tracking-tight">
        Live components
      </h2>
      <p class="mt-2 max-w-2xl text-muted-foreground">
        Everything here is the real library running in your browser. Click, tab through and type.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ShowcaseCard title="Button" description="Variants, sizes and an optional glow." to="/docs/components/button">
          <ElfButton glow>
            Glow
          </ElfButton>
          <ElfButton variant="secondary">
            Secondary
          </ElfButton>
          <ElfButton variant="outline">
            Outline
          </ElfButton>
          <ElfButton variant="destructive" size="sm">
            Delete
          </ElfButton>
        </ShowcaseCard>

        <ShowcaseCard title="Gradient Text" description="Theme-aware gradients for headlines." to="/docs/components/gradient-text">
          <p class="text-3xl font-semibold tracking-tight">
            Ship <ElfGradientText variant="aurora" animate>faster</ElfGradientText>
          </p>
        </ShowcaseCard>

        <ShowcaseCard title="Field, Input and Select" description="Labels, hints and form controls wired together." to="/docs/components/field">
          <div class="grid w-full gap-4">
            <ElfField label="Email" description="We never share it.">
              <ElfFieldControl>
                <ElfInput v-model="email" type="email" placeholder="you@example.com" />
              </ElfFieldControl>
            </ElfField>
            <div class="grid gap-2">
              <ElfLabel for="home-subteam">
                Subteam
              </ElfLabel>
              <ElfSelect v-model="subteam">
                <ElfSelectTrigger id="home-subteam" class="w-full">
                  <ElfSelectValue placeholder="Choose a subteam" />
                </ElfSelectTrigger>
                <ElfSelectContent>
                  <ElfSelectItem value="mechanical">
                    Mechanical
                  </ElfSelectItem>
                  <ElfSelectItem value="software">
                    Software
                  </ElfSelectItem>
                  <ElfSelectItem value="outreach">
                    Outreach
                  </ElfSelectItem>
                </ElfSelectContent>
              </ElfSelect>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Checkbox, Switch and Radio Group" description="Selection controls with real keyboard support." to="/docs/components/checkbox">
          <div class="grid w-full gap-4">
            <div class="flex items-center gap-3">
              <ElfCheckbox id="home-terms" v-model="terms" />
              <ElfLabel for="home-terms">
                Accept the terms
              </ElfLabel>
            </div>
            <div class="flex items-center gap-3">
              <ElfSwitch id="home-notify" v-model="notifications" />
              <ElfLabel for="home-notify">
                Email notifications
              </ElfLabel>
            </div>
            <ElfRadioGroup v-model="plan" aria-label="Digest frequency" class="flex gap-5">
              <div class="flex items-center gap-2">
                <ElfRadioGroupItem id="home-daily" value="daily" />
                <ElfLabel for="home-daily">
                  Daily
                </ElfLabel>
              </div>
              <div class="flex items-center gap-2">
                <ElfRadioGroupItem id="home-weekly" value="weekly" />
                <ElfLabel for="home-weekly">
                  Weekly
                </ElfLabel>
              </div>
            </ElfRadioGroup>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Tabs" description="Arrow keys move between panels." to="/docs/components/tabs">
          <ElfTabs default-value="overview" class="w-full">
            <ElfTabsList aria-label="Project sections">
              <ElfTabsTrigger value="overview">
                Overview
              </ElfTabsTrigger>
              <ElfTabsTrigger value="activity">
                Activity
              </ElfTabsTrigger>
            </ElfTabsList>
            <ElfTabsContent value="overview" class="text-sm text-muted-foreground">
              A summary of the project and who works on it.
            </ElfTabsContent>
            <ElfTabsContent value="activity" class="text-sm text-muted-foreground">
              Recent commits, reviews and releases.
            </ElfTabsContent>
          </ElfTabs>
        </ShowcaseCard>

        <ShowcaseCard title="Alert" description="Status messages with a variant for every tone." to="/docs/components/alert">
          <div class="grid w-full gap-3">
            <ElfAlert>
              <ElfAlertTitle>Heads up</ElfAlertTitle>
              <ElfAlertDescription>Your changes are saved automatically.</ElfAlertDescription>
            </ElfAlert>
            <ElfAlert variant="warning">
              <ElfAlertTitle>Battery low</ElfAlertTitle>
              <ElfAlertDescription>Swap it before the next match.</ElfAlertDescription>
            </ElfAlert>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Progress" description="A labelled, accessible progress bar." to="/docs/components/progress">
          <div class="grid w-full gap-4">
            <ElfProgress v-model="progress" label="Uploading roster.csv" />
            <div class="flex gap-2">
              <ElfButton size="sm" variant="outline" :disabled="progress <= 0" @click="progress = Math.max(0, progress - 10)">
                -10%
              </ElfButton>
              <ElfButton size="sm" variant="outline" :disabled="progress >= 100" @click="progress = Math.min(100, progress + 10)">
                +10%
              </ElfButton>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Avatar" description="Image with an initials fallback, and a stacked group." to="/docs/components/avatar">
          <ElfAvatarGroup aria-label="Software subteam, 7 members">
            <ElfAvatar v-for="name in members" :key="name">
              <ElfAvatarFallback :name="name" />
            </ElfAvatar>
            <ElfAvatar>
              <ElfAvatarFallback>+3</ElfAvatarFallback>
            </ElfAvatar>
          </ElfAvatarGroup>
        </ShowcaseCard>

        <ShowcaseCard title="Dropdown Menu" description="Menus with roving focus and type-ahead." to="/docs/components/dropdown-menu">
          <ElfDropdownMenu>
            <ElfDropdownMenuTrigger as-child>
              <ElfButton variant="outline">
                Actions <ChevronDown />
              </ElfButton>
            </ElfDropdownMenuTrigger>
            <ElfDropdownMenuContent align="start">
              <ElfDropdownMenuLabel>Item</ElfDropdownMenuLabel>
              <ElfDropdownMenuItem><Pencil /> Rename</ElfDropdownMenuItem>
              <ElfDropdownMenuItem><Copy /> Duplicate</ElfDropdownMenuItem>
              <ElfDropdownMenuSeparator />
              <ElfDropdownMenuItem variant="destructive">
                <Trash2 /> Delete
              </ElfDropdownMenuItem>
            </ElfDropdownMenuContent>
          </ElfDropdownMenu>
        </ShowcaseCard>

        <ShowcaseCard title="Tooltip" description="Opens on hover and on keyboard focus." to="/docs/components/tooltip">
          <ElfTooltip>
            <ElfTooltipTrigger as-child>
              <ElfButton variant="outline">
                Hover or focus me
              </ElfButton>
            </ElfTooltipTrigger>
            <ElfTooltipContent>Saved to your library</ElfTooltipContent>
          </ElfTooltip>
        </ShowcaseCard>

        <ShowcaseCard title="Dialog and Sheet" description="Modal surfaces that trap and restore focus." to="/docs/components/dialog">
          <ElfDialog>
            <ElfDialogTrigger as-child>
              <ElfButton variant="outline">
                Open dialog
              </ElfButton>
            </ElfDialogTrigger>
            <ElfDialogContent>
              <ElfDialogHeader>
                <ElfDialogTitle>Edit profile</ElfDialogTitle>
                <ElfDialogDescription>Update your display name.</ElfDialogDescription>
              </ElfDialogHeader>
              <ElfInput aria-label="Display name" placeholder="Display name" />
              <ElfDialogFooter>
                <ElfDialogClose as-child>
                  <ElfButton variant="outline">
                    Cancel
                  </ElfButton>
                </ElfDialogClose>
                <ElfButton>Save</ElfButton>
              </ElfDialogFooter>
            </ElfDialogContent>
          </ElfDialog>
          <ElfSheet>
            <ElfSheetTrigger as-child>
              <ElfButton variant="outline">
                Open sheet
              </ElfButton>
            </ElfSheetTrigger>
            <ElfSheetContent side="right">
              <ElfSheetHeader>
                <ElfSheetTitle>Filters</ElfSheetTitle>
                <ElfSheetDescription>Narrow the list down.</ElfSheetDescription>
              </ElfSheetHeader>
              <ElfSheetFooter>
                <ElfSheetClose as-child>
                  <ElfButton>Done</ElfButton>
                </ElfSheetClose>
              </ElfSheetFooter>
            </ElfSheetContent>
          </ElfSheet>
        </ShowcaseCard>

        <ShowcaseCard title="Toast" description="Polite announcements that never steal focus." to="/docs/components/toast">
          <ElfButton variant="outline" @click="toast.success('Roster saved', { description: 'Visible to every member.' })">
            Show toast
          </ElfButton>
        </ShowcaseCard>
      </div>
    </section>

    <section class="border-t bg-card/50" aria-labelledby="cta-heading">
      <div class="mx-auto flex w-full max-w-[90rem] flex-col items-start gap-5 px-4 py-14 sm:px-6">
        <h2 id="cta-heading" class="text-2xl font-semibold tracking-tight sm:text-3xl">
          Build your next interface with ElfUI
        </h2>
        <p class="max-w-2xl text-muted-foreground">
          Every component page has live examples, copyable source, a generated API reference and accessibility notes.
        </p>
        <div class="flex flex-wrap gap-3">
          <ElfButton as-child size="lg">
            <NuxtLink to="/docs/getting-started/introduction">
              Read the docs <ArrowRight />
            </NuxtLink>
          </ElfButton>
          <ElfButton as-child size="lg" variant="outline">
            <NuxtLink to="/docs/components/button">
              Browse components
            </NuxtLink>
          </ElfButton>
        </div>
      </div>
    </section>
  </div>
</template>
