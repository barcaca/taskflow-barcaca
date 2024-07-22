'use client'
import { Task } from '@prisma/client'
import { CheckIcon } from 'lucide-react'
import { useTransition } from 'react'

import { updateTaskAction } from '@/actions/task/update'
import { Button } from '@/components/ui/button'
import { customToast } from '@/lib/custom-toast'

interface FormUpdateTaskProps {
  task: Task
}
export function FormUpdateTask({ task }: FormUpdateTaskProps) {
  const [isPending, startTransition] = useTransition()
  const { isCompleted, taskName } = task
  const updateTaskById = updateTaskAction.bind(null, task.userId, task.id)
  async function onToggleIsCompleted(formData: FormData) {
    startTransition(() => {
      updateTaskById(formData).then((data) => {
        customToast(data)
      })
    })
  }

  return (
    <form action={onToggleIsCompleted} className="col-span-2 flex-1">
      <div className="flex items-center gap-3">
        <input
          type="hidden"
          name="isCompleted"
          value={isCompleted ? 'true' : ' false'}
        />
        <Button
          variant={'outline'}
          className={`${isCompleted ? 'bg-primary hover:bg-transparent' : 'bg-transparent hover:bg-primary/50'} group h-8 min-w-8 border-primary p-0`}
          disabled={isPending}
        >
          <CheckIcon size={16} className="text-background" />
        </Button>
        <span className="w-32 truncate md:w-full">{taskName}</span>
      </div>
    </form>
  )
}
