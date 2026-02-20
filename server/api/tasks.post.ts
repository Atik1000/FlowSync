import type { H3Event } from 'h3'
import type { Task } from '~/types/domain'
import { setTasks } from './tasks.get'

export default defineEventHandler(async (event: H3Event) => {
  const body = (await readBody<Task>(event)) as Task
  const existing = await $fetch<Task[]>('/api/tasks')

  const next = [...existing, body]
  setTasks(next)

  return { ok: true }
})

