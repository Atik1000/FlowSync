<template>
  <section
    class="card relative overflow-hidden"
    :class="paddingClass"
  >
    <header
      v-if="title || $slots.header"
      class="mb-3 flex items-center justify-between gap-3"
    >
      <div class="min-w-0">
        <h2
          v-if="title"
          class="truncate text-sm font-semibold text-slate-900 dark:text-slate-50"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          class="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
        >
          {{ subtitle }}
        </p>
      </div>
      <div
        v-if="$slots.actions"
        class="shrink-0"
      >
        <slot name="actions" />
      </div>
      <slot
        v-else
        name="header"
      />
    </header>

    <div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    padding?: 'none' | 'sm' | 'md'
  }>(),
  {
    padding: 'md'
  }
)

const paddingClass = computed(() => {
  if (props.padding === 'none') return 'p-0'
  if (props.padding === 'sm') return 'p-3'
  return 'p-4 sm:p-5'
})
</script>

