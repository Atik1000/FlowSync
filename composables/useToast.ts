import { computed, ref } from 'vue'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  createdAt: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const items = computed(() => toasts.value)

  function push(message: string, variant: ToastVariant = 'info', timeout = 4000) {
    const id = crypto.randomUUID()
    const toast: Toast = {
      id,
      message,
      variant,
      createdAt: Date.now()
    }
    toasts.value = [toast, ...toasts.value].slice(0, 5)

    if (timeout > 0) {
      window.setTimeout(() => dismiss(id), timeout)
    }
  }

  function dismiss(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function clear() {
    toasts.value = []
  }

  return {
    items,
    push,
    dismiss,
    clear
  }
}

