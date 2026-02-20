import { defineStore } from 'pinia'
import type { TaskColumn } from '~/types/domain'
import { useTaskStore } from './task.store'

export interface BoardColumnDefinition {
  id: TaskColumn
  title: string
  description: string
}

interface BoardState {
  columns: BoardColumnDefinition[]
}

export const useBoardStore = defineStore('board', {
  state: (): BoardState => ({
    columns: [
      {
        id: 'backlog',
        title: 'Backlog',
        description: 'Ideas and upcoming work'
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        description: 'Currently being worked on'
      },
      {
        id: 'review',
        title: 'Review',
        description: 'Awaiting feedback or QA'
      },
      {
        id: 'done',
        title: 'Done',
        description: 'Completed work'
      }
    ]
  }),
  getters: {
    getColumn: (state) => (id: TaskColumn) => state.columns.find((c) => c.id === id)
  },
  actions: {
    moveTaskWithinBoard(taskId: string, toColumn: TaskColumn) {
      const taskStore = useTaskStore()
      taskStore.moveTask(taskId, toColumn)
    }
  }
})

