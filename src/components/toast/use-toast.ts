import type { ToastObject } from 'reka-ui'
import { createToastManager } from 'reka-ui'

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive'

export interface ToastActionOptions {
  /** Text of the action button ("Undo"). */
  label: string
  /** Called when the action is activated. The toast closes afterwards. */
  onClick?: (event: MouseEvent) => void
  /**
   * Alternative way to perform the action, for screen reader users who cannot reach the button in time.
   * Defaults to `label`.
   */
  altText?: string
}

export interface ToastOptions {
  /** Stable id. Showing a toast with an existing id updates it in place and restarts its timer. */
  id?: string
  /** Secondary text under the message. */
  description?: string
  /** Visual style, icon and announcement priority. `destructive` is announced assertively, the others politely. */
  variant?: ToastVariant
  /** Milliseconds before the toast closes. `0` or `Infinity` keeps it until dismissed. Defaults to the `duration` of `ElfToaster`. */
  duration?: number
  /** An action button, for example "Undo". */
  action?: ToastActionOptions
  /** Called when the toast closes (dismissed, swiped, timed out, or its action was used). */
  onClose?: () => void
}

export interface ToastPromiseOptions<Value> {
  /** Message while the promise is pending. The toast stays open until the promise settles. */
  loading: string
  /** Message when the promise resolves; a function receives the value. */
  success: string | ((value: Value) => string)
  /** Message when the promise rejects; a function receives the error. */
  error: string | ((error: unknown) => string)
  /** Description shown in every state, or a function of the settled value. */
  description?: string
  /** Other options (duration, action) applied to the settled toast. */
  options?: Pick<ToastOptions, 'duration' | 'action' | 'onClose'>
}

export interface ToastData {
  variant: ToastVariant
}

/** A toast as stored by the queue, with its `variant` in `data`. */
export type ElfToastObject = ToastObject<ToastData>

/** The queue every `ElfToaster` subscribes to. Events before a toaster mounts are replayed once it does; on the server they are dropped. */
export const toastManager = createToastManager<ToastData>()

function toAction(action: ToastActionOptions | undefined) {
  return action
    ? { label: action.label, altText: action.altText ?? action.label, onClick: action.onClick }
    : undefined
}

function show(message: string, options: ToastOptions = {}): string {
  const variant = options.variant ?? 'default'
  return toastManager.add({
    id: options.id,
    title: message,
    description: options.description,
    // Destructive toasts interrupt (assertive); everything else is announced politely.
    type: variant === 'destructive' ? 'foreground' : 'background',
    duration: options.duration,
    actionProps: toAction(options.action),
    onClose: options.onClose,
    data: { variant },
  })
}

function promise<Value>(task: Promise<Value>, options: ToastPromiseOptions<Value>): Promise<Value> {
  const id = show(options.loading, { description: options.description })
  toastManager.update(id, { status: 'loading' })
  const settle = (variant: ToastVariant, status: string, message: string) => {
    toastManager.update(id, {
      title: message,
      description: options.description,
      status,
      type: variant === 'destructive' ? 'foreground' : 'background',
      duration: options.options?.duration,
      actionProps: toAction(options.options?.action),
      onClose: options.options?.onClose,
      data: { variant },
    })
  }
  return task.then(
    (value) => {
      settle('success', 'success', typeof options.success === 'function' ? options.success(value) : options.success)
      return value
    },
    (error: unknown) => {
      settle('destructive', 'error', typeof options.error === 'function' ? options.error(error) : options.error)
      throw error
    },
  )
}

/** Show a toast. Returns its id. */
export interface ToastFunction {
  (message: string, options?: ToastOptions): string
  /** Show a `success` toast. */
  success: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  /** Show a `warning` toast. */
  warning: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  /** Show a `destructive` toast (announced assertively). */
  error: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  /** Show a loading toast that becomes a `success` or `destructive` toast when the promise settles. Returns the promise. */
  promise: typeof promise
  /** Update a visible toast by id. */
  update: (id: string, options: ToastOptions & { message?: string }) => void
  /** Close the toast with this id, or every toast without an id. */
  dismiss: (id?: string) => void
}

export const toast: ToastFunction = Object.assign(
  (message: string, options?: ToastOptions) => show(message, options),
  {
    success: (message: string, options?: Omit<ToastOptions, 'variant'>) => show(message, { ...options, variant: 'success' }),
    warning: (message: string, options?: Omit<ToastOptions, 'variant'>) => show(message, { ...options, variant: 'warning' }),
    error: (message: string, options?: Omit<ToastOptions, 'variant'>) => show(message, { ...options, variant: 'destructive' }),
    promise,
    update(id: string, options: ToastOptions & { message?: string }) {
      const { message, variant, action, ...rest } = options
      toastManager.update(id, {
        ...rest,
        ...(message === undefined ? {} : { title: message }),
        ...(variant === undefined ? {} : { data: { variant }, type: variant === 'destructive' ? 'foreground' : 'background' }),
        ...(action === undefined ? {} : { actionProps: toAction(action) }),
      })
    },
    dismiss: (id?: string) => toastManager.close(id),
  },
)

/**
 * The toast API. Call it from any component, composable or plain module; the toasts appear in the
 * `ElfToaster` mounted in the app. It is a module singleton, so it holds no per-request state and is safe on the server (calls there are no-ops).
 */
export function useToast() {
  return { toast, dismiss: toast.dismiss }
}
