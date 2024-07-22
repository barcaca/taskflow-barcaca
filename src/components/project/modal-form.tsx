import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { FormCreateProject } from './form-create-project'

interface ModalFormProjectProps {
  userId: string
}
export function ModalFormProject({ userId }: ModalFormProjectProps) {
  const [open, setOpen] = useState<boolean>(false)

  function handleCloseModal() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="flex size-5 w-full p-0.5 md:w-fit">
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 rounded-md p-2 md:left-1/4">
        <FormCreateProject userId={userId} onCloseModal={handleCloseModal} />
      </DialogContent>
    </Dialog>
  )
}
