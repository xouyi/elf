<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useResizeObserver, useVModel } from '@vueuse/core'
import { nextTick, onMounted, ref, watch } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  /** Initial value when the textarea is uncontrolled. */
  defaultValue?: string
  /** Current value, bound with `v-model`. */
  modelValue?: string
  /** Grow and shrink with the content. Set a `max-h-*` class to cap the height; the textarea then scrolls. */
  autoResize?: boolean
  /** Marks the textarea as invalid: sets `aria-invalid="true"` and the destructive border and ring. */
  invalid?: boolean
  /** Visible lines. With `autoResize` this is the minimum height. */
  rows?: number
  /** Maximum number of characters the user can enter. */
  maxlength?: number
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}>(), {
  autoResize: false,
  invalid: false,
  rows: 3,
})

const emits = defineEmits<{
  /** Emitted with the new value whenever the user edits the text. */
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const el = ref<HTMLTextAreaElement>()

function resize() {
  const node = el.value
  if (!node || !props.autoResize)
    return
  node.style.height = 'auto'
  // scrollHeight excludes the borders, which box-sizing: border-box adds back.
  node.style.height = `${node.scrollHeight + node.offsetHeight - node.clientHeight}px`
}

watch(modelValue, () => nextTick(resize), { flush: 'post' })
watch(() => [props.autoResize, props.rows], async () => {
  if (!props.autoResize && el.value)
    el.value.style.height = ''
  await nextTick()
  resize()
})
onMounted(resize)

// Wrapping changes with the width, not only with the text.
let lastWidth = 0
useResizeObserver(el, ([entry]) => {
  const width = entry?.contentRect.width ?? 0
  if (width !== lastWidth) {
    lastWidth = width
    resize()
  }
})
</script>

<template>
  <textarea
    ref="el"
    v-model="modelValue"
    data-slot="textarea"
    :rows="props.rows"
    :maxlength="props.maxlength"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :class="cn(
      'w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/30',
      props.autoResize ? 'resize-none' : 'resize-y',
      props.class,
    )"
  />
</template>
