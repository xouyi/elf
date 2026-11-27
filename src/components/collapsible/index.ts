export { default as Collapsible } from './Collapsible.vue'
export { default as CollapsibleContent } from './CollapsibleContent.vue'
export { default as CollapsibleTrigger } from './CollapsibleTrigger.vue'

/** Height animation of the content, shared by the collapsible and the accordion. Stops under reduced motion (see styles.css). */
export const collapsibleContentClass = 'overflow-hidden data-[state=closed]:animate-[elf-collapsible-up_200ms_ease-out] data-[state=open]:animate-[elf-collapsible-down_200ms_ease-out]'
