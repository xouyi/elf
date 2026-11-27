import type { InjectionKey } from 'vue'

/** Provided by `ElfTooltipProvider` so that `ElfTooltip` knows a shared provider already exists. */
export const tooltipProviderKey: InjectionKey<true> = Symbol('elf-tooltip-provider')
