<script setup lang="ts">
import meta from '~/generated/component-meta.json'
import tokens from '~/generated/tokens.json'

interface TokenRow { name: string, isColor: boolean, values: Record<string, { css: string, hex: string | null }> }

const props = defineProps<{ component: string }>()
const data = (meta as unknown as Record<string, { tokens: string[] }>)[props.component]
if (!data) throw new Error(`ComponentTokens: unknown component "${props.component}"`)
const rows = (tokens.tokens as TokenRow[]).filter(t => data.tokens.includes(t.name))
</script>

<template>
  <ul class="not-prose my-4 flex flex-wrap gap-2" aria-label="Theme tokens used by this component">
    <li v-for="row in rows" :key="row.name" class="flex items-center gap-2 rounded-md border bg-card px-2.5 py-1 text-xs">
      <span v-if="row.isColor" class="flex">
        <span v-for="t in tokens.themes" :key="t" class="size-3.5 border first:rounded-l-sm last:rounded-r-sm" :style="{ background: row.values[t]!.css }" :title="`${t}: ${row.values[t]!.hex}`" aria-hidden="true" />
      </span>
      <code class="font-mono">--elf-{{ row.name }}</code>
    </li>
  </ul>
</template>
