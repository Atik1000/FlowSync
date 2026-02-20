import { computed, onBeforeUnmount, ref } from 'vue'
import { useRealtime } from './useRealtime'
import { useActivityStore } from '~/stores/activity.store'
import { useUserStore } from '~/stores/user.store'
import { useTaskStore } from '~/stores/task.store'

interface FocusTimerState {
  taskId: string | null
  remainingSeconds: number
  isRunning: boolean
}

const DEFAULT_DURATION_SECONDS = 25 * 60

const state = ref<FocusTimerState>({
  taskId: null,
  remainingSeconds: DEFAULT_DURATION_SECONDS,
  isRunning: false
})

let interval: number | null = null

export function useFocusTimer() {
  const { broadcast } = useRealtime()
  const activityStore = useActivityStore()
  const userStore = useUserStore()
  const taskStore = useTaskStore()

  const remainingSeconds = computed(() => state.value.remainingSeconds)
  const isRunning = computed(() => state.value.isRunning)
  const activeTaskId = computed(() => state.value.taskId)

  const formatted = computed(() => {
    const minutes = Math.floor(state.value.remainingSeconds / 60)
    const seconds = state.value.remainingSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  function clearIntervalTimer() {
    if (interval != null) {
      window.clearInterval(interval)
      interval = null
    }
  }

  function start(taskId: string, durationSeconds = DEFAULT_DURATION_SECONDS) {
    clearIntervalTimer()

    state.value.taskId = taskId
    state.value.remainingSeconds = durationSeconds
    state.value.isRunning = true

    const userName = userStore.displayName
    const task = taskStore.tasks.find((t) => t.id === taskId)

    broadcast({
      type: 'focus:started',
      payload: {
        taskId,
        userName,
        taskTitle: task?.title
      }
    })

    activityStore.logFocusStart(taskId)

    interval = window.setInterval(() => {
      if (state.value.remainingSeconds <= 1) {
        clearIntervalTimer()
        state.value.isRunning = false
        state.value.remainingSeconds = 0
        if (state.value.taskId) {
          const minutes = Math.round(durationSeconds / 60)
          taskStore.updateFocusTime(state.value.taskId, minutes)
        }
      } else {
        state.value.remainingSeconds -= 1
      }
    }, 1000)
  }

  function pause() {
    clearIntervalTimer()
    state.value.isRunning = false
  }

  function reset() {
    clearIntervalTimer()
    state.value.isRunning = false
    state.value.remainingSeconds = DEFAULT_DURATION_SECONDS
    state.value.taskId = null
  }

  onBeforeUnmount(() => {
    clearIntervalTimer()
  })

  return {
    remainingSeconds,
    formatted,
    isRunning,
    activeTaskId,
    start,
    pause,
    reset
  }
}

