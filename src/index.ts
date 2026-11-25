export { cn } from './lib/utils'

export { Button as ElfButton, buttonVariants } from './components/button'
export type { ButtonProps, ButtonVariants } from './components/button'

export { Input as ElfInput } from './components/input'

export { Badge as ElfBadge, badgeVariants } from './components/badge'
export type { BadgeProps, BadgeVariants } from './components/badge'

export {
  Card as ElfCard,
  CardAction as ElfCardAction,
  CardContent as ElfCardContent,
  CardDescription as ElfCardDescription,
  CardFooter as ElfCardFooter,
  CardHeader as ElfCardHeader,
  CardTitle as ElfCardTitle,
} from './components/card'

export {
  Dialog as ElfDialog,
  DialogClose as ElfDialogClose,
  DialogContent as ElfDialogContent,
  DialogDescription as ElfDialogDescription,
  DialogFooter as ElfDialogFooter,
  DialogHeader as ElfDialogHeader,
  DialogOverlay as ElfDialogOverlay,
  DialogTitle as ElfDialogTitle,
  DialogTrigger as ElfDialogTrigger,
} from './components/dialog'

export {
  Tabs as ElfTabs,
  TabsContent as ElfTabsContent,
  TabsList as ElfTabsList,
  TabsTrigger as ElfTabsTrigger,
} from './components/tabs'

export { VisuallyHidden as ElfVisuallyHidden } from './components/visually-hidden'
export type { VisuallyHiddenProps } from './components/visually-hidden'

export { Label as ElfLabel } from './components/label'
export type { LabelProps } from './components/label'

export { Separator as ElfSeparator } from './components/separator'
export type { SeparatorProps } from './components/separator'

export { Kbd as ElfKbd, KbdGroup as ElfKbdGroup } from './components/kbd'
export type { KbdGroupProps, KbdProps } from './components/kbd'

export { Spinner as ElfSpinner, spinnerVariants } from './components/spinner'
export type { SpinnerProps, SpinnerVariants } from './components/spinner'

export const elfThemes = ['elf', 'novatron'] as const
export type ElfTheme = (typeof elfThemes)[number]
