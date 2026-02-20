import { defineStore } from 'pinia'
import type { Activity, ActivityType } from '~/types/domain'
import { useUserStore } from './user.store'

interface ActivityState {
  items: Activity[]
}

export const useActivityStore = defineStore('activity', {
  state: (): ActivityState => ({
    items: []
  }),
  getters: {
    ordered: (state) =>
      [...state.items].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
  },
  actions: {
    log(type: ActivityType, message: string) {
      const userStore = useUserStore()
      const activity: Activity = {
        id: crypto.randomUUID(),
        type,
        message,
        timestamp: new Date().toISOString(),
        userId: userStore.id ?? 'anonymous'
      }
      this.items.unshift(activity)
    },
    logTaskCreate(taskTitle: string) {
      this.log('create', `Created task “${taskTitle}”`)
    },
    logTaskMove(taskTitle: string, from: string, to: string) {
      this.log('move', `Moved “${taskTitle}” from ${from} → ${to}`)
    },
    logTaskComplete(taskTitle: string) {
      this.log('complete', `Completed “${taskTitle}”`)
    },
    logFocusStart(taskId: string) {
      this.log('focus', `Started focus session on task ${taskId}`)
    }
  }
})

