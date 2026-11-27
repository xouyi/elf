<script setup lang="ts">
import type { ThemeSwitcherProps } from './index'
import { Palette } from '@lucide/vue'
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import { computed } from 'vue'
import { useElfTheme } from '../../composables/use-elf-theme'
import { cn } from '../../lib/utils'
import { Button } from '../button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ThemeSwitcherProps>(), {
  variant: 'select',
  label: 'Theme',
})

// The app-wide theme state. Only when `themes` names a theme the app does not know does the switcher keep a state of its own.
const shared = useElfTheme<string>()
const own = props.themes?.some(name => !shared.themes.includes(name)) ? useElfTheme<string>({ themes: props.themes }) : undefined
const { theme, setTheme } = own ?? shared

const names = computed(() => (props.themes ?? shared.themes) as readonly string[])
const nameOf = (value: string) => props.labels?.[value] ?? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
const current = computed(() => nameOf(theme.value))
const next = computed(() => nameOf(names.value[(names.value.indexOf(theme.value) + 1) % names.value.length] ?? theme.value))

/** Moves to the next offered theme (not the next of the app, which may offer more). */
function toggle() {
  setTheme(names.value[(names.value.indexOf(theme.value) + 1) % names.value.length] ?? theme.value)
}

function choose(value: unknown) {
  if (typeof value === 'string')
    setTheme(value)
}
</script>

<template>
  <Select v-if="props.variant === 'select'" :model-value="theme" @update:model-value="choose">
    <SelectTrigger
      data-slot="theme-switcher"
      data-variant="select"
      :aria-label="props.label"
      v-bind="$attrs"
      :class="cn('w-40', props.class)"
    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="name in names" :key="name" :value="name">
        <span :data-theme="name" class="size-2.5 shrink-0 rounded-(--elf-radius-pill) bg-primary" aria-hidden="true" />
        {{ nameOf(name) }}
      </SelectItem>
    </SelectContent>
  </Select>

  <RadioGroupRoot
    v-else-if="props.variant === 'buttons'"
    data-slot="theme-switcher"
    data-variant="buttons"
    :model-value="theme"
    :aria-label="props.label"
    loop
    v-bind="$attrs"
    :class="cn('inline-flex max-w-full flex-wrap items-center gap-0.5 rounded-md border border-border bg-muted p-0.5', props.class)"
    @update:model-value="choose"
  >
    <RadioGroupItem
      v-for="name in names"
      :key="name"
      :value="name"
      data-slot="theme-switcher-item"
      class="inline-flex h-7 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:shadow-sm"
    >
      <span :data-theme="name" class="size-2.5 shrink-0 rounded-(--elf-radius-pill) bg-primary" aria-hidden="true" />
      {{ nameOf(name) }}
    </RadioGroupItem>
  </RadioGroupRoot>

  <Button
    v-else
    data-slot="theme-switcher"
    data-variant="toggle"
    variant="ghost"
    size="icon"
    type="button"
    :aria-label="`${props.label}: ${current}`"
    :title="`${props.label}: ${current}. Switch to ${next}.`"
    v-bind="$attrs"
    :class="props.class"
    @click="toggle"
  >
    <Palette aria-hidden="true" />
  </Button>
</template>
