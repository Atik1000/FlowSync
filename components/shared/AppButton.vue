<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    :class="[
      variantClasses,
      block ? 'w-full' : 'inline-flex',
      loading ? 'cursor-wait' : ''
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="h-4 w-4 rounded-full border-2 border-slate-200 border-t-white dark:border-slate-700 dark:border-t-slate-200 animate-spin" />
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    type?: 'button' | 'submit' | 'reset'
    block?: boolean
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    block: false,
    disabled: false,
    loading: false
  }
)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700'
    case 'ghost':
      return 'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 shadow-none'
    case 'danger':
      return 'bg-danger-500 text-white hover:bg-red-600 focus-visible:ring-red-500'
    default:
      return 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500'
  }
})
</script>

