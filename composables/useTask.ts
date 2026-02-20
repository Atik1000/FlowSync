import { storeToRefs } from 'pinia'
import type { TaskColumn, TaskPriority } from '../types/domain'
import { useTaskStore } from '../stores/task.store'
import { useActivityStore } from '../stores/activity.store'
import { useUserStore } from '../stores/user.store'
import { useRealtime } from './useRealtime'
import { $fetch } from 'ofetch'

interface CreateTaskInput {
  title: string
  description: string
  deadline: string
  priority?: TaskPriority
  column?: TaskColumn
}

interface AiPriorityResponse {
  suggestedPriority: TaskPriority
  reasoning: string
}

export function useTask() {
  const taskStore = useTaskStore()
  const activityStore = useActivityStore()
  const userStore = useUserStore()
  const { tasks, isLoading } = storeToRefs(taskStore)
  const { broadcast } = useRealtime()

  async function fetchTasks() {
    isLoading.value = true
    try {
      const data = await $fetch('/api/tasks')
      if (Array.isArray(data)) {
        taskStore.setTasks(data)
      }
    } finally {
      isLoading.value = false
    }
  }

  async function createTask(input: CreateTaskInput) {
    const column: TaskColumn = input.column ?? 'backlog'

    const aiResult = await $fetch<AiPriorityResponse>('/api/ai-priority', {
      method: 'POST',
      body: {
        title: input.title,
        description: input.description,
        deadline: input.deadline
      }
    })

    const priority: TaskPriority = input.priority ?? aiResult.suggestedPriority

    const created = taskStore.addTask({
      title: input.title,
      description: input.description,
      priority,
      column,
      deadline: input.deadline
    })

    await $fetch('/api/tasks', {
      method: 'POST',
      body: created
    })

    activityStore.logTaskCreate(created.title)

    broadcast({
      type: 'task:created',
      payload: {
        taskId: created.id,
        taskTitle: created.title,
        userName: userStore.displayName
      }
    })

    return {
      task: created,
      aiReasoning: aiResult.reasoning
    }
  }

  async function updateTask(taskId: string, patch: Partial<Parameters<typeof taskStore.addTask>[0]>) {
    const existing = tasks.value.find((t) => t.id === taskId)
    if (!existing) return

    Object.assign(existing, patch)

    await $fetch('/api/tasks/update', {
      method: 'POST',
      body: existing
    })
  }

  return {
    tasks,
    isLoading,
    fetchTasks,
    createTask,
    updateTask
  }
}

