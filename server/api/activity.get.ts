import type { Activity } from '~/types/domain'

let activities: Activity[] = []

export default defineEventHandler(() => {
  return activities
})

export function appendActivity(entry: Activity) {
  activities = [entry, ...activities].slice(0, 500)
}

