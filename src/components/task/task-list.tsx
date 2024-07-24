import { Label, Project, Task } from '@prisma/client'

import { TaskItem } from '@/components/task/task-item'

interface TaskListProps {
  items: Task[]
  labels: Label[]
  projects: Project[]
}
export function TaskList({ items, projects, labels }: TaskListProps) {
  return items.map((item) => {
    return (
      <TaskItem key={item.id} task={item} projects={projects} labels={labels} />
    )
  })
}
