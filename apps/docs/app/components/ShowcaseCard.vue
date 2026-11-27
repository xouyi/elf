<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

defineProps<{
  /** Component name shown as the card title, e.g. `Button`. */
  title: string
  /** One sentence on what the live demo shows. */
  description: string
  /** Docs page of the component. */
  to: string
}>()
</script>

<template>
  <article class="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card">
    <header class="grid gap-1 p-5 pb-0">
      <h3 class="font-semibold">
        {{ title }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </header>
    <div class="flex min-w-0 flex-1 flex-wrap content-center items-center gap-3 p-5">
      <slot />
    </div>
    <footer class="border-t px-5 py-3 text-sm">
      <NuxtLink :to="to" class="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline">
        View docs <span class="sr-only">for {{ title }}</span><ArrowRight class="size-4" aria-hidden="true" />
      </NuxtLink>
    </footer>
  </article>
</template>
