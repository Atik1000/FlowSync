<template>
  <div class="flex h-full flex-col rounded-2xl bg-slate-50/80 p-3 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900/60 dark:ring-slate-800/80">
    <header class="mb-2 flex items-center justify-between gap-2">
      <div>
        <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {{ column.title }}
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {{ column.description }}
        </p>
      </div>
      <span class="pill shrink-0">
        {{ tasks.length }} tasks
      </span>
    </header>

    <VueDraggableNext
      :list="tasks"
      group="flowsync-tasks"
      item-key="id"
      class="scroll-y-soft flex-1 space-y-2 pt-1"
      ghost-class="opacity-50"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <TaskCard
          :task="element"
          @start-focus="(id) => emit('start-focus', id)"
        />
      </template>
      <template #footer>
        <div
          v-if="!tasks.length"
          class="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-500"
        >
          No tasks yet. Drag one here or create a new task.
        </div>
      </template>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
import type { BoardColumnDefinition } from '~/stores/board.store'
import type { Task, TaskColumn } from '~/types/domain'
import TaskCard from './TaskCard.vue'
import { VueDraggableNext } from 'vue-draggable-next'

const props = defineProps<{
  column: BoardColumnDefinition
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'task-moved', payload: { taskId: string; from: TaskColumn; to: TaskColumn }): void
  (e: 'start-focus', taskId: string): void
}>()

function onDragEnd(evt: any) {
  const item = evt.item as HTMLElement | undefined
  if (!item) return
  const taskId = (item.dataset.id as string | undefined) ?? ''
  if (!taskId) return

  const task = props.tasks.find((t) => t.id === taskId)
  if (!task) return

  const from = task.column
  const to = props.column.id as TaskColumn
  emit('task-moved', { taskId, from, to })
}
</script>

