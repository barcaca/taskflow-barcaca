'use client'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { FormCreateTags } from './form-create-tags'

interface ModalFormTagsProps {
  userId: string
}
export function ModalFormTags({ userId }: ModalFormTagsProps) {
  const [open, setOpen] = useState<boolean>(false)

  function handleCloseModal() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">
          Criar Tag
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 rounded-md p-2">
        <FormCreateTags userId={userId} onCloseModal={handleCloseModal} />
      </DialogContent>
    </Dialog>
  )
}
