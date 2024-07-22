'use client'
import { EditIcon } from 'lucide-react'
import { useState, useTransition } from 'react'

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

interface FormEditTaskProps {
  userId: string
  taskId: string
}
export function FormEditTask({ userId }: FormEditTaskProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="size-8 p-1">
          <span className="sr-only">Excluir</span>
          <EditIcon size={16} className="text-muted-foreground" />
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
          <form action="">
            <Button variant={'destructive'}>Excluir</Button>
          </form>
          <DialogClose>
            <Button>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
