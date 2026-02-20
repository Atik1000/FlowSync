import { useEventBus } from '@vueuse/core'

export type RealtimeEventType =
  | 'task:created'
  | 'task:moved'
  | 'task:completed'
  | 'focus:started'

export interface RealtimeEventPayload {
  taskId?: string
  fromColumn?: string
  toColumn?: string
  userName?: string
  taskTitle?: string
}

export interface RealtimeEvent {
  type: RealtimeEventType
  payload: RealtimeEventPayload
  timestamp: string
}

const BUS_KEY = 'flowsync-realtime'

export function useRealtime() {
  const bus = useEventBus<RealtimeEvent>(BUS_KEY)

  function broadcast(event: Omit<RealtimeEvent, 'timestamp'> & { timestamp?: string }) {
    const withTimestamp: RealtimeEvent = {
      ...event,
      timestamp: event.timestamp ?? new Date().toISOString()
    }
    bus.emit(withTimestamp)
  }

  function onEvent(handler: (event: RealtimeEvent) => void) {
    const off = bus.on(handler)
    return () => off()
  }

  return {
    broadcast,
    onEvent
  }
}

