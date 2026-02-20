import { defineStore } from 'pinia'
import type { Task, TaskColumn, TaskPriority } from '~/types/domain'

interface TaskState {
  tasks: Task[]
  isLoading: boolean
}

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [],
    isLoading: false
  }),
  getters: {
    byColumn: (state) => {
      return (column: TaskColumn) => state.tasks.filter((t) => t.column === column)
    },
    completedToday: (state) => {
      const today = new Date().toISOString().slice(0, 10)
      return state.tasks.filter(
        (t) => t.completed && t.deadline.slice(0, 10) <= today
      )
    }
  },
  actions: {
    setTasks(tasks: Task[]) {
      this.tasks = tasks
    },
    addTask(payload: {
      title: string
      description: string
      priority: TaskPriority
      column: TaskColumn
      deadline: string
    }) {
      const task: Task = {
        id: crypto.randomUUID(),
        title: payload.title,
        description: payload.description,
        priority: payload.priority,
        column: payload.column,
        createdAt: new Date().toISOString(),
        deadline: payload.deadline,
        focusTime: 0,
        completed: payload.column === 'done'
      }
      this.tasks.push(task)
      return task
    },
    moveTask(id: string, toColumn: TaskColumn) {
      const task = this.tasks.find((t) => t.id === id)
      if (!task) return
      task.column = toColumn
      if (toColumn === 'done') {
        task.completed = true
      }
    },
    updateFocusTime(taskId: string, deltaMinutes: number) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (!task) return
      task.focusTime = Math.max(0, task.focusTime + deltaMinutes)
    }
  }
})

