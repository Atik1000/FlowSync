export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskColumn = 'backlog' | 'in-progress' | 'review' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  column: TaskColumn
  createdAt: string
  deadline: string
  focusTime: number
  completed: boolean
}

export type ActivityType = 'create' | 'move' | 'complete' | 'focus'

export interface Activity {
  id: string
  type: ActivityType
  message: string
  timestamp: string
  userId: string
}

