'use client'
import { Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState, useTransition } from 'react'

import { deleteProjectAction } from '@/actions/project/delete'
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

interface FormDeleteProjectProps {
  userId: string
  projectId: string
  projectName: string
}
export function FormDeleteProject({
  userId,
  projectId,
  projectName,
}: FormDeleteProjectProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const deleteProjectActionById = deleteProjectAction.bind(
    null,
    userId,
    projectId,
  )
  async function onDeleteProject() {
    startTransition(() => {
      deleteProjectActionById().then((data) => {
        customToast(data)
        if (data.status === 200) redirect('/correio')
      })
    })
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'destructive'} className="absolute right-0 gap-2">
          <span>Excluir Projeto</span>
          <Trash2Icon size={16} className="text-destructive-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Projeto</DialogTitle>
          <DialogDescription>
            Essa ação é irreversível, isso irá excluir todos as tarefas juntos,
            deseja excluir o Projeto <strong>{projectName}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row-reverse gap-2">
          <form action={onDeleteProject}>
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
