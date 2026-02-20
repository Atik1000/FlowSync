import type { Task } from '../../types/domain'

let tasks: Task[] = []

export default defineEventHandler(() => {
  if (!tasks.length) {
    const now = new Date()
    const today = now.toISOString().slice(0, 10)
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)

    tasks = [
      {
        id: crypto.randomUUID(),
        title: 'Landing Page UI',
        description: 'Polish hero section and pricing cards',
        priority: 'high',
        column: 'in-progress',
        createdAt: now.toISOString(),
        deadline: today,
        focusTime: 40,
        completed: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Onboarding checklist',
        description: 'Define first-time user milestones',
        priority: 'medium',
        column: 'backlog',
        createdAt: now.toISOString(),
        deadline: tomorrow,
        focusTime: 0,
        completed: false
      }
    ]
  }

  return tasks
})

export function setTasks(next: Task[]) {
  tasks = next
}

export function getTasks() {
  return tasks
}


