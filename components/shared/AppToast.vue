<template>
  <div class="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
    <div class="flex w-full max-w-xl flex-col gap-2 px-4">
      <TransitionGroup name="toast">
        <article
          v-for="toast in items"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 rounded-2xl border bg-white/95 p-3.5 text-sm shadow-soft dark:border-slate-800/80 dark:bg-slate-900/95"
        >
          <div
            class="mt-0.5 h-2 w-2 shrink-0 rounded-full"
            :class="dotClass(toast.variant)"
          />
          <p class="flex-1 text-sm text-slate-800 dark:text-slate-100">
            {{ toast.message }}
          </p>
          <button
            type="button"
            class="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            @click="dismiss(toast.id)"
          >
            ✕
          </button>
        </article>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastVariant } from '~/composables/useToast'
import { useToast } from '~/composables/useToast'

const { items, dismiss } = useToast()

function dotClass(variant: ToastVariant) {
  if (variant === 'success') return 'bg-emerald-500'
  if (variant === 'warning') return 'bg-amber-500'
  if (variant === 'error') return 'bg-red-500'
  return 'bg-slate-400'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.15s ease-out;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>

