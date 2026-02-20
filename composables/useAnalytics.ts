import { storeToRefs } from 'pinia'
import { useAnalyticsStore } from '../stores/analytics.store'
import { useTaskStore } from '../stores/task.store'

export function useAnalytics() {
  const analyticsStore = useAnalyticsStore()
  const taskStore = useTaskStore()
  const { score, trend, level, series, completionHeatmap } = storeToRefs(analyticsStore)

  function recompute() {
    analyticsStore.recomputeFromTasks(taskStore.tasks)
  }

  return {
    score,
    trend,
    level,
    series,
    completionHeatmap,
    recompute
  }
}

