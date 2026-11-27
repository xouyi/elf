<script setup lang="ts">
import type { StatCardProps } from './index'
import { Minus, TrendingDown, TrendingUp } from '@lucide/vue'
import { useId } from 'vue'
import { cn } from '../../lib/utils'
import Skeleton from '../skeleton/Skeleton.vue'
import VisuallyHidden from '../visually-hidden/VisuallyHidden.vue'
import { statCardVariants } from './index'

const props = withDefaults(defineProps<StatCardProps>(), {
  tone: 'default',
  trendDirection: 'flat',
  loadingLabel: 'Loading',
})

const labelId = useId()
const icons = { up: TrendingUp, down: TrendingDown, flat: Minus }
</script>

<template>
  <div
    data-slot="stat-card"
    :data-tone="props.tone"
    :data-loading="props.loading ? 'true' : undefined"
    role="group"
    :aria-labelledby="labelId"
    :aria-busy="props.loading ? 'true' : undefined"
    :class="cn(statCardVariants({ tone: props.tone }), props.class)"
  >
    <p :id="labelId" data-slot="stat-card-label" class="text-sm font-medium text-muted-foreground">
      <slot name="label">
        {{ props.label }}
      </slot>
    </p>
    <template v-if="props.loading">
      <VisuallyHidden role="status">
        {{ props.loadingLabel }}
      </VisuallyHidden>
      <Skeleton class="mt-1 h-8 w-24" />
      <Skeleton class="mt-1 h-4 w-32" />
    </template>
    <template v-else>
      <p data-slot="stat-card-value" class="text-3xl font-semibold tracking-tight tabular-nums">
        <slot>
          {{ props.value }}
        </slot>
      </p>
      <div v-if="props.trend || props.hint || $slots.hint" class="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
        <span
          v-if="props.trend"
          data-slot="stat-card-trend"
          :data-direction="props.trendDirection"
          class="inline-flex items-center gap-1 font-medium group-data-[tone=destructive]/stat:text-destructive-text group-data-[tone=success]/stat:text-success-text group-data-[tone=warning]/stat:text-warning-text"
        >
          <component :is="icons[props.trendDirection]" aria-hidden="true" class="size-4" />
          <VisuallyHidden v-if="props.trendLabel">{{ props.trendLabel }}</VisuallyHidden>
          <span :aria-hidden="props.trendLabel ? 'true' : undefined">{{ props.trend }}</span>
        </span>
        <span v-if="props.hint || $slots.hint" data-slot="stat-card-hint">
          <slot name="hint">{{ props.hint }}</slot>
        </span>
      </div>
    </template>
  </div>
</template>
