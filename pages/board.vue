<template>
  <div class="flex h-full flex-col gap-4">
    <section class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="page-title">
          Team board
        </h1>
        <p class="page-subtitle">
          Drag tasks across stages, start focus sessions, and let FlowSync broadcast updates.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <AppButton
          variant="ghost"
          @click="openCreateModal"
        >
          + New task
        </AppButton>
      </div>
    </section>

    <section class="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <BoardColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :tasks="byColumn(column.id)"
        @task-moved="onTaskMoved"
        @start-focus="onStartFocus"
      />
    </section>

    <CreateTaskModal v-model="showCreateModal" />
  </div>
</template>

<script setup lang="ts">
import AppButton from '~/components/shared/AppButton.vue'
import BoardColumn from '~/components/board/BoardColumn.vue'
import CreateTaskModal from '~/components/board/CreateTaskModal.vue'
import type { TaskColumn } from '~/types/domain'
import { useBoard } from '~/composables/useBoard'
import { useTask } from '~/composables/useTask'
import { useFocusTimer } from '~/composables/useFocusTimer'

definePageMeta({
  middleware: 'auth'
})

const { columns, byColumn, handleTaskMove } = useBoard()
const { fetchTasks } = useTask()
const { start } = useFocusTimer()

const showCreateModal = ref(false)

onMounted(() => {
  fetchTasks()
})

function onTaskMoved(payload: { taskId: string; from: TaskColumn; to: TaskColumn }) {
  handleTaskMove(payload.taskId, payload.from, payload.to)
}

function onStartFocus(taskId: string) {
  start(taskId)
}

function openCreateModal() {
  showCreateModal.value = true
}
</script>

