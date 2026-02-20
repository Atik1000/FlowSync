import { defineStore } from 'pinia'
import type { Task } from '~/types/domain'
import { useTaskStore } from './task.store'

export interface ProductivityPoint {
  date: string
  completedCount: number
  focusMinutes: number
}

interface AnalyticsState {
  lastComputedAt: string | null
  score: number
  trend: 'up' | 'down' | 'flat'
  series: ProductivityPoint[]
}

export const useAnalyticsStore = defineStore('analytics', {
  state: (): AnalyticsState => ({
    lastComputedAt: null,
    score: 0,
    trend: 'flat',
    series: []
  }),
  getters: {
    level: (state) => {
      if (state.score >= 80) return 'Elite'
      if (state.score >= 50) return 'Pro'
      return 'Beginner'
    },
    completionHeatmap: (state) => {
      return state.series.map((p) => ({
        date: p.date,
        value: p.completedCount
      }))
    }
  },
  actions: {
    recomputeFromTasks(tasks?: Task[]) {
      const taskStore = useTaskStore()
      const allTasks = tasks ?? taskStore.tasks

      const byDate: Record<string, ProductivityPoint> = {}

      for (const task of allTasks) {
        const date = task.deadline.slice(0, 10)
        if (!byDate[date]) {
          byDate[date] = {
            date,
            completedCount: 0,
            focusMinutes: 0
          }
        }
        if (task.completed) {
          byDate[date].completedCount++
        }
        byDate[date].focusMinutes += task.focusTime
      }

      this.series = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))

      const completedTotal = allTasks.filter((t) => t.completed).length
      const focusTotal = allTasks.reduce((sum, t) => sum + t.focusTime, 0)
      const days = Math.max(1, this.series.length)
      const consistency = completedTotal / days

      const rawScore = completedTotal * 5 + focusTotal * 2 + consistency * 10
      const clamped = Math.max(0, Math.min(100, Math.round(rawScore)))

      this.trend =
        clamped > this.score ? 'up' : clamped < this.score ? 'down' : this.trend
      this.score = clamped
      this.lastComputedAt = new Date().toISOString()
    }
  }
})

