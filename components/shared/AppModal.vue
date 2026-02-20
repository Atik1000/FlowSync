<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm"
        @click.self="emit('update:modelValue', false)"
      >
        <Transition name="scale-fade">
          <div class="card w-full max-w-lg p-5 shadow-soft">
            <header class="mb-4 flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h2 class="text-base font-semibold leading-tight text-slate-900 dark:text-slate-50">
                  {{ title }}
                </h2>
                <p
                  v-if="subtitle"
                  class="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
                >
                  {{ subtitle }}
                </p>
              </div>
              <button
                type="button"
                class="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                @click="emit('update:modelValue', false)"
              >
                <span class="sr-only">Close</span>
                ✕
              </button>
            </header>

            <div class="space-y-4">
              <slot />
            </div>

            <footer
              v-if="$slots.footer"
              class="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800"
            >
              <slot name="footer" />
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  subtitle?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(4px);
}
</style>

