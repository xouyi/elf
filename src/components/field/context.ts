import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface FieldContext {
  /** Id of the control. The label points at it with `for`. */
  id: string
  /** Id of the label element. */
  labelId: string
  /** Id of the description element. */
  descriptionId: string
  /** Id of the error element. */
  errorId: string
  /** The field is invalid: it was marked `invalid` or it shows an error. */
  invalid: ComputedRef<boolean>
  /** The control is required. */
  required: ComputedRef<boolean>
  /** The control is disabled. */
  disabled: ComputedRef<boolean>
  /** A description is rendered, so the control should reference it. */
  hasDescription: ComputedRef<boolean>
  /** An error is rendered, so the control should reference it. */
  hasError: ComputedRef<boolean>
  /** Called by `ElfFieldDescription` and `ElfFieldError` while they are mounted; returns the cleanup. */
  register: (part: 'description' | 'error') => () => void
}

export const fieldContextKey: InjectionKey<FieldContext> = Symbol('elf-field')

/** The surrounding `ElfField`, or `undefined` when used on its own. Use it to wire a custom control. */
export function useFieldContext(): FieldContext | undefined {
  return inject(fieldContextKey, undefined)
}
