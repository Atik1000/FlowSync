import { defineNuxtPlugin } from '#app'
import { useRealtime } from '~/composables/useRealtime'
import { useToast } from '~/composables/useToast'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtPlugin(() => {
  if (process.server) return

  const { onEvent } = useRealtime()
  const { push } = useToast()
  const userStore = useUserStore()

  onEvent((event) => {
    const actor = event.payload.userName || userStore.displayName || 'Someone'
    const title = event.payload.taskTitle ?? 'a task'

    switch (event.type) {
      case 'task:created':
        push(`${actor} created “${title}”`, 'success')
        break
      case 'task:moved': {
        const from = event.payload.fromColumn ?? 'Unknown'
        const to = event.payload.toColumn ?? 'Unknown'
        push(`${actor} moved “${title}” from ${from} → ${to}`, 'info')
        break
      }
      case 'task:completed':
        push(`${actor} completed “${title}” 🎯`, 'success')
        break
      case 'focus:started':
        push(`${actor} started a focus session on “${title}”`, 'info')
        break
      default:
        break
    }
  })
})

