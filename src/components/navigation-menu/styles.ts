import { cva } from 'class-variance-authority'

/** Classes of a top-level entry of the navigation bar (a trigger, or a link that has no flyout). Tall enough to touch on small screens. */
export const navigationMenuTriggerStyle = cva(
  'group/navigation-trigger inline-flex h-10 w-max items-center justify-center gap-1 rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-[color,background-color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 md:h-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
)

/** Classes of a link inside a flyout panel: a block with room for a title and a description. */
export const navigationMenuItemLinkClass = 'flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-[color,background-color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[active]:bg-accent/50 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-muted-foreground'
