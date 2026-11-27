<script setup lang="ts">
import type { TableProps } from './index'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, provide, reactive, ref } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './index'
import TableCaption from './TableCaption.vue'

const props = withDefaults(defineProps<TableProps>(), {
  density: 'default',
})

const context = reactive({ get stack() { return props.stackOnMobile ?? false } })
provide(tableContextKey, context)

// A scrollable region must be reachable by keyboard. The container only joins the tab order while it overflows, sideways or (with a limited height, for example for a sticky header) vertically.
const container = ref<HTMLElement>()
const scrollable = ref(false)
function measure() {
  const el = container.value
  scrollable.value = !!el && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)
}
onMounted(measure)
useResizeObserver(container, measure)
</script>

<template>
  <div
    ref="container"
    data-slot="table-container"
    :role="scrollable ? 'region' : undefined"
    :aria-label="scrollable ? props.caption : undefined"
    :tabindex="scrollable ? 0 : undefined"
    :class="cn(
      'relative w-full overflow-x-auto rounded-lg border outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      props.stackOnMobile && 'max-sm:overflow-visible max-sm:rounded-none max-sm:border-0',
      props.containerClass,
    )"
  >
    <table
      data-slot="table"
      :data-density="props.density"
      :data-stack="props.stackOnMobile ? 'true' : 'false'"
      :data-sticky="props.stickyHeader ? 'true' : 'false'"
      :role="props.stackOnMobile ? 'table' : undefined"
      :class="cn('group/table w-full caption-top border-collapse text-sm', props.class)"
    >
      <slot name="caption">
        <TableCaption :class="props.captionHidden && 'sr-only'">
          {{ props.caption }}
        </TableCaption>
      </slot>
      <slot />
    </table>
  </div>
</template>
