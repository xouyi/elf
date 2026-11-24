import type { Component } from 'vue'

/**
 * Renders a template once per Elf theme side by side. Theme tokens are scoped to
 * `[data-theme]`, so nested wrappers show both themes at once.
 */
export function bothThemes(components: Record<string, Component>, template: string, setup?: () => Record<string, unknown>) {
  return () => ({
    components,
    setup: setup ?? (() => ({})),
    template: `
      <div class="grid w-[min(92vw,56rem)] gap-4 md:grid-cols-2">
        <div v-for="theme in ['elf', 'novatron']" :key="theme" :data-theme="theme" class="bg-background p-4 text-foreground border">
          <p class="mb-3 text-xs font-medium text-muted-foreground uppercase">{{ theme }}</p>
          ${template}
        </div>
      </div>`,
  })
}
