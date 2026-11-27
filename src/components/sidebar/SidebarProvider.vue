<script setup lang="ts">
import type { SidebarProviderProps } from './index'
import { useEventListener, useMediaQuery, useVModel } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, onMounted, provide, ref, watch } from 'vue'
import { cn } from '../../lib/utils'
import { TooltipProvider } from '../tooltip'
import { sidebarContextKey } from './context'
import { SIDEBAR_MOBILE_BREAKPOINT } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  open: undefined,
  defaultOpen: true,
  shortcut: 'b',
  storageKey: undefined,
})
const emit = defineEmits<{
  /** The desktop sidebar was expanded or collapsed (also when a stored state is restored). */
  'update:open': [value: boolean]
}>()

const open = useVModel(props, 'open', emit, { passive: true, defaultValue: props.defaultOpen }) as Ref<boolean>
const openMobile = ref(false)

// Below md the sidebar is a sheet. Only trust the media query after mount so the server and the first client render agree.
const mounted = ref(false)
const query = useMediaQuery(`(max-width: ${SIDEBAR_MOBILE_BREAKPOINT - 0.02}px)`)
const isMobile = computed(() => mounted.value && query.value)
onMounted(() => {
  mounted.value = true
  if (!props.storageKey)
    return
  try {
    const stored = localStorage.getItem(props.storageKey)
    if (stored === 'true' || stored === 'false')
      setOpen(stored === 'true')
  }
  catch { /* storage may be blocked: the default applies */ }
})

function setOpen(value: boolean) {
  open.value = value
}

// Persist every change, including a controlled `open` changed by the parent, but only after the stored value was read.
watch(open, (value) => {
  if (!mounted.value || !props.storageKey)
    return
  try {
    localStorage.setItem(props.storageKey, String(value))
  }
  catch { /* storage may be blocked */ }
})

function setOpenMobile(value: boolean) {
  openMobile.value = value
}

function toggleSidebar() {
  if (isMobile.value)
    setOpenMobile(!openMobile.value)
  else
    setOpen(!open.value)
}

// A sheet left open must not reappear when the window is resized back to a phone.
watch(isMobile, (mobile) => {
  if (!mobile)
    openMobile.value = false
})

function isEditable(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))
}

useEventListener(typeof window === 'undefined' ? undefined : window, 'keydown', (event: KeyboardEvent) => {
  if (!props.shortcut || event.defaultPrevented || event.altKey || event.shiftKey || !(event.metaKey || event.ctrlKey))
    return
  if (event.key.toLowerCase() !== props.shortcut.toLowerCase() || isEditable(event.target))
    return
  event.preventDefault()
  toggleSidebar()
})

const context = {
  state: computed(() => (open.value ? 'expanded' : 'collapsed') as 'expanded' | 'collapsed'),
  open,
  setOpen,
  openMobile,
  setOpenMobile,
  isMobile,
  toggleSidebar,
}
provide(sidebarContextKey, context)
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div
      data-slot="sidebar-provider"
      v-bind="$attrs"
      style="--sidebar-width: 16rem; --sidebar-width-icon: 3rem"
      :class="cn('flex min-h-svh w-full overflow-x-clip has-data-[variant=inset]:bg-card', props.class)"
    >
      <slot
        :open="open"
        :state="context.state.value"
        :open-mobile="openMobile"
        :is-mobile="isMobile"
      />
    </div>
  </TooltipProvider>
</template>
