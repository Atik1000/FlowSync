import type { H3Event } from 'h3'
import type { TaskPriority } from '../../types/domain'

interface AiPriorityInput {
  title: string
  description: string
  deadline: string
}

interface AiPriorityOutput {
  suggestedPriority: TaskPriority
  reasoning: string
}

export default defineEventHandler(async (event: H3Event) => {
  const body = (await readBody<AiPriorityInput>(event)) as AiPriorityInput

  const now = new Date()
  const deadlineDate = new Date(body.deadline)
  const daysDiff = Math.max(
    0,
    Math.round((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  )

  const normalizedTitle = `${body.title} ${body.description}`.toLowerCase()

  let suggestedPriority: TaskPriority = 'medium'
  const reasons: string[] = []

  if (daysDiff <= 1) {
    suggestedPriority = 'high'
    reasons.push('Deadline is within the next 24 hours.')
  } else if (daysDiff <= 3) {
    suggestedPriority = 'medium'
    reasons.push('Deadline is approaching in the next few days.')
  } else {
    suggestedPriority = 'low'
    reasons.push('Deadline is more than three days away.')
  }

  if (normalizedTitle.includes('landing') || normalizedTitle.includes('billing')) {
    suggestedPriority = 'high'
    reasons.push('Task appears related to core customer journey (landing/billing).')
  }

  if (normalizedTitle.includes('refactor') || normalizedTitle.includes('cleanup')) {
    if (suggestedPriority !== 'high') {
      suggestedPriority = 'low'
      reasons.push('Work sounds like refactor/cleanup and can be scheduled later.')
    }
  }

  const reasoning =
    reasons.join(' ') ||
    'Defaulted to medium priority as no strong urgency or risk indicators were detected.'

  const response: AiPriorityOutput = {
    suggestedPriority,
    reasoning
  }

  return response
})

