'use client'
import { Trash2Icon } from 'lucide-react'
import { useState, useTransition } from 'react'

import { deleteTaskAction } from '@/actions/task/delete'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { customToast } from '@/lib/custom-toast'

interface FormDeleteTaskProps {
  userId: string
  taskId: string
}
export function FormDeleteTask({ userId, taskId }: FormDeleteTaskProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const deleteTaskActionById = deleteTaskAction.bind(null, userId, taskId)
  async function onDeleteTask() {
    startTransition(() => {
      deleteTaskActionById().then((data) => {
        customToast(data)
      })
    })
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="size-8 p-1">
          <span className="sr-only">Excluir</span>
          <Trash2Icon size={16} className="text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Tarefa</DialogTitle>
          <DialogDescription>
            Essa ação é irreversível, deseja excluir a tarefa?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row-reverse gap-2">
          <form action={onDeleteTask}>
            <Button variant={'destructive'} disabled={isPending}>
              Excluir
            </Button>
          </form>
          <DialogClose>
            <Button disabled={isPending}>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
