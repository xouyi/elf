import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { fieldContextKey, useFieldContext } from './context'
export type { FieldContext } from './context'
export { default as Field } from './Field.vue'
export { default as FieldControl } from './FieldControl.vue'
export { default as FieldDescription } from './FieldDescription.vue'
export { default as FieldError } from './FieldError.vue'
export { default as FieldLabel } from './FieldLabel.vue'

export const fieldVariants = cva(
  'group flex w-full flex-col gap-2',
  {
    variants: {
      orientation: {
        vertical: 'flex-col',
        horizontal: 'sm:flex-row sm:items-start sm:gap-4',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

export type FieldVariants = VariantProps<typeof fieldVariants>

export interface FieldProps {
  /** Id of the control. Defaults to a generated, SSR-safe id; the label, description and error ids derive from it. */
  id?: string
  /** Label text. For richer content use the `label` slot or `ElfFieldLabel`. */
  label?: string
  /** Helper text under the control, referenced by the control through `aria-describedby`. */
  description?: string
  /** Error message. When set, the field is invalid: the control gets `aria-invalid="true"` and references the message. */
  error?: string
  /** Marks the field as invalid without a message, for example while a server check runs. */
  invalid?: boolean
  /** The control is required: adds a visual marker to the label and `aria-required="true"` to the control. */
  required?: boolean
  /** The control is disabled: dims the label and sets `disabled` on the control. */
  disabled?: boolean
  /** Place the label above (`vertical`) or beside (`horizontal`, from the `sm` breakpoint) the control. */
  orientation?: FieldVariants['orientation']
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface FieldLabelProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface FieldDescriptionProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}

export interface FieldErrorProps {
  /** Extra classes, merged with the base classes through `cn()`. */
  class?: HTMLAttributes['class']
}
