<template>
  <article
    class="card-soft group flex cursor-grab flex-col gap-2 rounded-2xl p-3.5 text-sm active:cursor-grabbing"
    :data-id="task.id"
  >
    <header class="flex items-start justify-between gap-2">
      <h3 class="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
        {{ task.title }}
      </h3>
      <span
        class="pill shrink-0"
        :class="priorityClass"
      >
        {{ task.priority }}
      </span>
    </header>

    <p class="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
      {{ task.description }}
    </p>

    <footer class="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1">
          ⏱
          <span>{{ task.focusTime }}m</span>
        </span>
        <span class="inline-flex items-center gap-1">
          📅
          <span>{{ deadlineLabel }}</span>
        </span>
      </div>
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          @click.stop="emit('start-focus', task.id)"
        >
          Focus
        </button>
        <span
          v-if="task.completed"
          class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
        >
          ✓ Done
        </span>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Task } from '~/types/domain'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'start-focus', taskId: string): void
}>()

const priorityClass = computed(() => {
  if (props.task.priority === 'high') {
    return 'border-red-100 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100'
  }
  if (props.task.priority === 'medium') {
    return 'border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100'
  }
  return 'border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-100'
})

const deadlineLabel = computed(() => {
  const date = new Date(props.task.deadline)
  return date.toLocaleDateString()
})
</script>

