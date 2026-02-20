import type { TaskColumn } from '../types/domain'
import { useActivityStore } from '../stores/activity.store';
import { useRealtime } from './useRealtime';
import { useTaskStore } from '../stores/task.store';
import { useUserStore } from '../stores/user.store';
import { useBoardStore } from './../stores/board.store';
import { storeToRefs } from 'pinia'
export function useBoard() {
  const boardStore = useBoardStore()
  const taskStore = useTaskStore()
  const activityStore = useActivityStore()
  const userStore = useUserStore()
  const { columns } = storeToRefs(boardStore)
  const { byColumn } = storeToRefs(taskStore)
  const { broadcast } = useRealtime()

  function handleTaskMove(taskId: string, from: TaskColumn, to: TaskColumn) {
    if (from === to) return
    const task = taskStore.tasks.find((t) => t.id === taskId)
    if (!task) return

    const fromCol = boardStore.getColumn(from)
    const toCol = boardStore.getColumn(to)

    const previousColumn = task.column
    taskStore.moveTask(taskId, to)

    broadcast({
      type: 'task:moved',
      payload: {
        taskId,
        fromColumn: fromCol?.title ?? from,
        toColumn: toCol?.title ?? to,
        taskTitle: task.title,
        userName: userStore.displayName
      }
    })

    activityStore.logTaskMove(
      task.title,
      fromCol?.title ?? previousColumn,
      toCol?.title ?? to
    )
  }

  return {
    columns,
    byColumn,
    handleTaskMove
  }
}

