import { Label, Project, Task } from '@prisma/client'
import { SignalHighIcon, SignalLowIcon, SignalMediumIcon } from 'lucide-react'

import { BadgeTask } from '@/components/task/badge-task'
import { FormDeleteTask } from '@/components/task/form-delete-task'
import { FormEditTask } from '@/components/task/form-edit-task'
import { FormUpdateTask } from '@/components/task/form-update-task'

interface TaskItemProps {
  task: Task
  labels: Label[]
  projects: Project[]
}
export function TaskItem({ task, labels, projects }: TaskItemProps) {
  const { id, userId } = task

  function getPriorityIcon(priority: string) {
    switch (priority) {
      case 'low':
        return <SignalLowIcon size={20} className="text-green-500" />
      case 'medium':
        return <SignalMediumIcon size={20} className="text-yellow-500" />
      case 'high':
        return <SignalHighIcon size={20} className="text-red-500" />
      default:
        return null
    }
  }
  return (
    <div className="grid min-h-12 w-full grid-cols-3 items-center gap-1 rounded-sm bg-background px-3 py-2 shadow-shape sm:flex">
      <FormUpdateTask task={task} />

      <div className="relative col-span-2 flex h-8 w-full items-center">
        <BadgeTask
          dueDate={task.dueDate}
          isEndAt={task.endAt as string}
          isStartAt={task.startAt as string}
          srOnly
        />
      </div>
      <div className="col-start-3 row-start-1 ml-auto">
        {getPriorityIcon(task.priority)}
      </div>
      <div className="ml-auto flex gap-2">
        <FormEditTask task={task} labels={labels} projects={projects} />
        <FormDeleteTask userId={userId} taskId={id} />
      </div>
    </div>
  )
}
