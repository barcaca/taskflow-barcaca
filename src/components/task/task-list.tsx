import { Task } from '@prisma/client'

import { TaskItem } from '@/components/task/task-item'

interface TaskListProps {
  items: Task[]
}
export function TaskList({ items }: TaskListProps) {
  return items.map((item) => {
    return <TaskItem key={item.id} task={item} />
  })
}
