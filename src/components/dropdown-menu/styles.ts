import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/** Classes of the floating menu panel, shared by DropdownMenu and ContextMenu (and their sub menus). */
export const menuContentClass = 'z-50 min-w-40 overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-[elf-fade-out_100ms_ease-in_forwards] data-[state=open]:animate-[elf-zoom-in_120ms_ease-out] motion-reduce:animate-none!'

/** Classes of a group label inside a menu. */
export const menuLabelClass = 'px-2 py-1.5 text-xs font-medium text-muted-foreground data-[inset]:pl-8'

/** Classes of the divider between menu groups. */
export const menuSeparatorClass = '-mx-1 my-1 h-px bg-border'

/** Classes of the shortcut hint at the end of an item. Put `ElfKbd` elements or plain text inside. */
export const menuShortcutClass = 'ml-auto inline-flex items-center gap-1 pl-4 text-xs tracking-widest text-muted-foreground group-data-[highlighted]/menu-item:text-accent-foreground'

/** Item rows: 40px tall on small screens (touch), compact from the `md` breakpoint. */
export const menuItemVariants = cva(
  'group/menu-item relative flex min-h-10 cursor-default items-center gap-2 rounded-sm px-2 py-2 text-base outline-hidden select-none md:min-h-0 md:py-1.5 md:text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:[&_svg:not([class*=text-])]:text-accent-foreground',
        destructive: 'text-destructive-text data-[highlighted]:bg-destructive/15 data-[highlighted]:text-destructive-text [&_svg:not([class*=text-])]:text-destructive-text!',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type MenuItemVariants = VariantProps<typeof menuItemVariants>
