import type { H3Event } from 'h3'
import type { Task } from '~/types/domain'
import { getTasks, setTasks } from './tasks.get'

export default defineEventHandler(async (event: H3Event) => {
  const body = (await readBody<Task>(event)) as Task
  const existing = getTasks()

  const next = [...existing, body]
  setTasks(next)

  return { ok: true }
})

