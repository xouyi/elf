<script setup lang="ts">
import tokens from '~/generated/tokens.json'

interface Pair { fg: string, bg: string, kind: string, min: number, ratio: number, pass: boolean }
const contrast = tokens.contrast as Record<string, Pair[]>
const utility = (name: string) => (name === 'radius' ? 'rounded-lg' : name === 'radius-pill' ? 'rounded-badge' : name === 'border' ? 'border-border' : name === 'input' ? 'border-input' : name === 'ring' ? 'ring-ring' : name.endsWith('-foreground') ? `text-${name}` : `bg-${name}`)
</script>

<template>
  <div class="not-prose api-table">
    <h3 id="token-table" class="doc-heading mt-8 mb-2 text-lg font-semibold">
      Token table
    </h3>
    <p class="mb-3 text-sm text-muted-foreground">
      Generated from <code>src/themes/*.css</code> at build time. Swatches show the resolved color.
    </p>
    <div class="table-wrap border">
      <table>
        <caption class="sr-only">
          Theme tokens
        </caption>
        <thead>
          <tr>
            <th scope="col">Token</th><th scope="col">Tailwind utility</th>
            <th v-for="t in tokens.themes" :key="t" scope="col">
              {{ t }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in (tokens.tokens as any[])" :key="row.name">
            <td class="font-mono text-[0.8125rem] whitespace-nowrap">
              --elf-{{ row.name }}
            </td>
            <td class="font-mono text-xs whitespace-nowrap text-muted-foreground">
              {{ utility(row.name) }}
            </td>
            <td v-for="t in tokens.themes" :key="t">
              <span class="flex items-center gap-2">
                <span v-if="row.isColor" class="size-5 shrink-0 border" :style="{ background: row.values[t].css }" aria-hidden="true" />
                <span class="font-mono text-xs">{{ row.values[t].hex ?? row.values[t].css }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 id="contrast" class="doc-heading mt-10 mb-2 text-lg font-semibold">
      Contrast
    </h3>
    <p class="mb-3 text-sm text-muted-foreground">
      WCAG 2.2 ratios computed at build time with the same code as <code>bun run contrast</code>. Text pairs must reach 4.5:1, borders and focus rings 3:1.
    </p>
    <div class="table-wrap border">
      <table>
        <caption class="sr-only">
          Contrast ratios
        </caption>
        <thead>
          <tr>
            <th scope="col">Foreground</th><th scope="col">Background</th><th scope="col">Required</th>
            <th v-for="t in tokens.themes" :key="t" scope="col">
              {{ t }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pair, i) in contrast[tokens.themes[0]!]" :key="`${pair.fg}-${pair.bg}`">
            <td class="font-mono text-xs">
              {{ pair.fg }}
            </td>
            <td class="font-mono text-xs">
              {{ pair.bg }}
            </td>
            <td class="text-xs whitespace-nowrap">
              {{ pair.min }}:1 {{ pair.kind }}
            </td>
            <td v-for="t in tokens.themes" :key="t">
              <span class="flex items-center gap-2">
                <span class="font-mono text-xs">{{ contrast[t]![i]!.ratio.toFixed(2) }}:1</span>
                <ElfBadge :variant="contrast[t]![i]!.pass ? 'success' : 'destructive'">
                  {{ contrast[t]![i]!.pass ? 'Pass' : 'Fail' }}
                </ElfBadge>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
